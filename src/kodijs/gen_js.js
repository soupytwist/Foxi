var fs = require('fs');
var TABWIDTH=2;
var COLWIDTH=80;
var TAB=repeat(' ',TABWIDTH);

var _ = require('lodash');
var data = require('./data');

function gen_method_docs(name, method) {
    var descriptionLines = wrap_lines(method.description, COLWIDTH-3);
    var lines = descriptionLines;

    lines.unshift("");
    lines.unshift(name);
    
    if (method.params) {
        lines.push('');
        _.each(method.params, function(param) {
            var paramLines = parse_type(param);
            paramLines[0] = '@param ' + paramLines[0];
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


function gen_method(name, method) {
    var shortName = name.split('.').pop();
    var doc = gen_method_docs(name, method);
    var apiName = "api_"+name.split('.').slice(0,-1).join('_');
    
    var functionLines = [];
    functionLines.push(shortName + ": function(params) {");
    functionLines = functionLines.concat(gen_method_body(name, method));
    functionLines.push('},');

    return doc.concat(functionLines);
}


function gen_method_body(name, method) {
    return [ TAB + "return rpc.send_msg('"+name+"', params);" ];
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
  "",
  "module.exports.api = {",
  gen_tree(M, 1),
  "};",
  "",
  "module.exports.rpc = rpc;"
]).join('\n'));
