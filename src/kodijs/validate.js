var type = require("./validate_types");

function required(x, name) {
    if (x === undefined)  {
        throw new Error(name + " is required");
    }
}

function undefinedOrNull(x, name, t) {
  if (x !== undefined && x !== null) {
    throw new Error(name + " should be null");
  }
}

function integer(x, name, t) {
    if (x === undefined)
        return;
    number(x, name, t);
}

function number(x, name, t) {
    if (x === undefined)
        return;
    if (typeof x !== 'number') {
        throw new Error(name + " must be a number; got: " + x);
    }
    if (t.minimum !== undefined && x < t.minimum) {
        throw new Error(name + " must be at least " + t.min + "; actual: " + x);
    }
    if (t.maximum !== undefined && x > t.maximum) {
        throw new Error(name + " must be at most " + t.max + "; actual: " + x);
    }
}

function string(x, name, t) {
    if (x === undefined)
        return;
    if (typeof x !== 'string') {
        throw new Error(name + " must be a string; got: " + x);
    }
    if (t.minLength !== undefined && x.length < t.minLength) {
        throw new Error(name + " must be at least " + t.min + "; actual: " + x.length);
    }
    if (t.maxLength !== undefined && x.length > t.maxLength) {
        throw new Error(name + " must be at most " + t.max + "; actual: " + x.length);
    }
    if (t.enums !== undefined && t.enums.indexOf(x) === -1) {
      throw new Error(name + " must be one of the values: [" + t.enums.join(',') + "]");
    }
}

function boolean(x, name, t) {
  if (x === undefined)
    return;
  if (typeof x !== 'boolean') {
    throw new Error(name + " must be a boolean; got: " + x);
  }
}

function array(x, name, t) {
    if (x === undefined)
        return;
    if (x === undefined || x.length === undefined) {
        throw new Error(name + " must be an array; got: " + (typeof x));
    }
    if (t.minItems !== undefined && x.length < t.minItems) {
        throw new Error(name + " must have at least " + t.min + " items; actual: " + x.length);
    }
    if (t.maxItems !== undefined && x.length > t.maxItems) {
        throw new Error(name + " must have at most " + t.max + " items; actual: " + x.length);
    }
}

module.exports.required = required;
module.exports.undefinedOrNull = undefinedOrNull;
module.exports.boolean = boolean;
module.exports.integer = integer;
module.exports.number = number;
module.exports.string = string;
module.exports.array = array;
module.exports.type = type;
