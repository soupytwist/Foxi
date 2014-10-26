var fs = require('fs');
var TABWIDTH=2;
var COLWIDTH=80;
var TAB=repeat(' ',TABWIDTH);
var VALIDATION=true; // for debugging
var VALIDATE_PROPS = [
  "minimum", "maximum", "enums", "exclusiveMinimum", "exclusiveMaximum", "minItems",
  "maxItems", "uniqueItems", "minLength", "maxLength", "divisibleBy"
];

var _ = require('lodash');
var data = require('./data');


// -----------------------------------------------------------------------------
// DOCUMENTATION ---------------------------------------------------------------
// -----------------------------------------------------------------------------
function gen_method_docs(name, method) {
  var descriptionLines = wrap_lines(method.description, COLWIDTH-3);
  var lines = descriptionLines;

  lines.unshift("");
  lines.unshift(name);
  
  if (method.params) {
    lines.push('');
    _.each(method.params, function(param) {
      var paramLines = parse_type(param);
      paramLines[0] = '@param ' + param.name + ": " + paramLines[0];
      lines = lines.concat(paramLines);
    });
  }
  
  if (method.returns && _.isString(method.returns.type) || _.isString(method.returns.$ref)) {
    lines.push('');
    var returnsLines = parse_type(method.returns);
    returnsLines[0] = '@returns ' + returnsLines[0];
    lines = lines.concat(returnsLines);
  }

  for (var i in lines) {
    lines[i] = ' * ' + lines[i];
  }

  lines.unshift('/**');
  lines.push(' */');

  return lines;
}


function parse_type(o) {
  if (_.isArray(o.type)) {
    return [_.map(o.type, function(type) { return parse_type(type); }).join(' | ')];
  }

  if (o.type) {
    switch (o.type) {
      case 'object':
        return parse_object(o);
      case 'array':
        return parse_array(o);
      default:
        return [o.type];
    }
  } else if (o.$ref) {
    return ['$' + o.$ref];
  }
  return ['unknown'];
}


function parse_object(o) {
  if (!o.properties) {
    return ['object'];
  }

  return _.flatten([
    '{',
    _.map(o.properties, function(property, propName) {
      if (property.required) {
        return TAB + propName + " : " + parse_type(property);
      } else {
        return TAB + '[' + propName + "] : " + parse_type(property);
      }
    }),
    '}'
  ]);
}


function parse_array(a) {
  var inner = parse_type(a.items);
  inner[0] = "Array<" + inner[0];
  inner[inner.length-1] = inner[inner.length-1] + ">";
  return inner;
}


// -----------------------------------------------------------------------------
// VALIDATION ------------------------------------------------------------------
// -----------------------------------------------------------------------------
function gen_type_validation(o, name) {
  return _.flatten([
    'validate_type["' + name + '"] = function (x, name) {',
    TAB + 'if (x === undefined) return;',
    _.map(gen_validate_check_type(o, name, 'x'), indent.bind(this,1)),
    "};",
    ""
  ]);
}


function gen_validate_params(method) {
  var lines = [];

  if (method.params) {
    _.each(method.params, function(param) {

      var name = param.name;
      var check = [];
      if (param.required) {
        check.push('validate.required(x.'+name+', "'+name+'");');
      }
      if (param.type) {
        check = check.concat(gen_validate_check_type(param, name, 'x.'+name));
      } else if (param.$ref) {
        check.push('validate.type["'+param.$ref+'"](x.'+name+', "'+name+'");');
      }

      if (check) {
        lines = lines.concat(check);
      }
    });
  }
  return lines;
}


function gen_validate_check_type(o, name, varname) {
  if (_.isArray(o.type)) {
    var typeCt = o.type.length;
    var lines = ['var types_left = '+typeCt+';'];
    _.each(o.type, function(type) {
      typeCt--;
      lines.push("try {");
      lines = lines.concat(_.map(gen_validate_check_type(type, name, varname), indent.bind(this, 1)));
      lines.push("} catch (type_ex) {");
      if (typeCt === 0) {
        lines.push(TAB+"if (--types_left === 0) {");
        lines.push(TAB+TAB+'throw new Error("'+name+' did not match any of the valid types");');
        lines.push(TAB+"}");
      }
      lines.push("}");
    });
    return lines;

  } else if (o.$ref) {
    return ['validate.type["'+o.$ref+'"]('+varname+', "'+name+'");'];

  } else {
    var realType = o.type || (o.extends ? 'object' : undefined);
    switch (realType) {
      case 'object':
        var lines = [];
        _.each(o.properties, function(prop, propname) {

          if (prop.required) {
            lines.push('validate.required(x.'+propname+', "'+propname+'");');
          }
          if (prop.type) {
            lines = lines.concat(gen_validate_check_type(prop, propname, 'x.'+propname));
          } else if (prop.$ref) {
            lines.push('validate.type["'+prop.$ref+'"](x.'+propname+', "'+propname+'");');
          }
        });
        if (o.extends) {
          lines.push('validate.type["'+o.extends+'"](x, "'+name+'", x);');
        }
        return lines;

      case 'array':
        var t = _.pick(o, VALIDATE_PROPS);
        var lines = ['validate.array('+varname+', "'+name+'", '+JSON.stringify(t)+');'];
        lines.push('for (var itemIdx in '+varname+'.items) {');
        lines = lines.concat(_.map(gen_validate_check_type(o.items, varname+'.items[itemIdx]', varname+'.items[itemIdx]'), indent.bind(this, 1)));
        lines.push('}');
        return lines;

      case 'null':
        return ['validate.undefinedOrNull('+varname+', "'+name+'", '+JSON.stringify(t)+');'];

      case 'boolean':
      case 'number':
      case 'integer':
      case 'string':
        var t = _.pick(o, VALIDATE_PROPS);
        return ['validate.'+o.type+'('+varname+', "'+name+'", '+JSON.stringify(t)+');'];

      default:
        return ["// missing type check - unknown type"];
    }
  }
}


// -----------------------------------------------------------------------------
// METHOD BODY -----------------------------------------------------------------
// -----------------------------------------------------------------------------
function gen_method(name, method) {
  var shortName = name.split('.').pop();
  var doc = gen_method_docs(name, method);
  var apiName = "api_"+name.split('.').slice(0,-1).join('_');
  
  var functionLines = [];
  functionLines.push(shortName + ": function(x) {");

  if (VALIDATION) {
    functionLines.push(indent(1, "try {"));
    functionLines = functionLines.concat(_.map(gen_validate_params(method), indent.bind(this,2)));
    functionLines.push(indent(1, "} catch (validation_err) {"));
    functionLines.push(indent(2, 'throw validation_err.message + "\\n" + validation_err.stack;'));
    functionLines.push(indent(1, "}"));
  }

  functionLines = functionLines.concat(gen_method_body(name, method));
  functionLines.push('},');

  return doc.concat(functionLines);
}


function gen_method_body(name, method) {
  return [ TAB + "return rpc.send_msg('"+name+"', x);" ];
}


function indent(level, line) {
  return repeat(TAB, level) + line;
}


function repeat(str, n) {
  var res = '';
  while (n-- > 0)
    res += str;
  return res;
}


function wrap_lines(str, width) {
  var words = str.split(' ');
  var lines = [];
  var line = "";

  _.each(words, function(word) {
    if (line.length + 1 + word.length > width) {
      lines.push(line);
      line = "";
    }
    if (line.length > 0)
      line += ' ';
    line += word;
  });
  if (line) {
    lines.push(line);
  }
  return lines;
}

var M = {};

function store(fullPath, d) {
  var path = fullPath.split('.');
  var name = path.slice(-1)[0];
  var tree = M;
  _.each(path.slice(0, -1), function(sub) {
  if (!tree[sub]) {
    tree[sub] = {};
  }
  tree = tree[sub];
  });
  tree[name] = d;
}

_.each(data.result.methods, function(method, name) {
  store(name, gen_method(name, method));
});

function gen_tree(tree, i) {
  var lines = [];
  _.each(tree, function(v, key) {
  lines.push('');
  if (_.isArray(v)) {
    lines = lines.concat(_.map(v, indent.bind(this, i)));
  } else {
    lines.push(indent(i, key + ": {"));
    lines = lines.concat(gen_tree(v, i+1));
    lines.push(indent(i, "},"));
  }
  lines.push('');
  });
  return lines;
}

fs.writeFile('build/rpcapi.js', _.flatten([
  "var rpc = require('./kodijs/rpc');",
  "var validate = require('./kodijs/validate');",
  "",
  "module.exports = {",
  gen_tree(M, 1),
  "};",
  "",
  "module.exports.rpc = rpc;"
]).join('\n'));

if (VALIDATION) {
  fs.writeFile('build/kodijs/validate_types.js', _.flatten([
    "var validate_type = {};",
    "var validate = require('./validate');",
    "",
    _.map(data.result.types, gen_type_validation),
    "",
    "module.exports = validate_type;"
  ]).join('\n'));
}
