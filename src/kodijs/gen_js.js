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
    functionLines.push(apiName + "." + shortName + " = function(params) {");
    functionLines = functionLines.concat(gen_method_body(name, method));
    functionLines.push('};');

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


function gen_method_header(fname) {
  var apiName = "api_"+fname.replace('.','_');
    return [
        "var rpc = require('../rpc');",
        "",
        "var " + apiName + " = {};",
    ];
}


function gen_method_footer(fname) {
    var apiName = "api_"+fname.replace('.','_');
    return [
        "module.exports = " + apiName + ";",
    ];
}


var methodFiles = {};


_.each(data.result.methods, function(method, name) {
    var path = name.split('.');
    var fname = path.slice(0,-1).join('.');
    var mname = path.slice(-1);
    methodFiles[fname] = (methodFiles[fname]||[]).concat([''], gen_method(name, method));
});


fs.exists('build/kodijs/methods', function(exists) {
  if (!exists) {
    fs.mkdir('build/kodijs/methods');
  }

  _.each(methodFiles, function(lines, fname) {
      fs.writeFile("build/kodijs/methods/" + fname + ".js", 
          _.flatten([
              gen_method_header(fname),
              lines,
              '',
              gen_method_footer(fname)
          ]).join('\n')
      );
  });


  fs.writeFile("build/rpcapi.js", _.flatten([
      _.map(methodFiles, function(lines, fname) {
          return "module.exports."+fname+" = require('./kodijs/methods/" + fname + ".js');";
      }),
      "module.exports.rpc = require('./kodijs/rpc');"
  ]).join('\n'));
});
