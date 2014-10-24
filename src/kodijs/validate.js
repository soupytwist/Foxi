
function required(params, name) {
    var x = params[name];
    if (x === undefined)  {
        throw name + " is required";
    }
}

function integer(params, name, t) {
    var x = params[name];
    if (x === undefined)
        return;
    number(params, name, t);
}

function number(params, name, t) {
    if (x === undefined)
        return;
    if (typeof x !== 'number') {
        throw name + " must be a number; got: " + x;
    }
    if (t.minimum !== undefined && x < t.minimum) {
        throw name + " must be at least " + t.min + "; actual: " + x;
    }
    if (t.maximum !== undefined && x > t.maximum) {
        throw name + " must be at most " + t.max + "; actual: " + x;
    }
}

function string(params, name, t) {
    if (x === undefined)
        return;
    if (typeof x !== 'string') {
        throw name + " must be a string; got: " + x;
    }
    if (t.minLength !== undefined && x.length < t.minLength) {
        throw name + " must be at least " + t.min + "; actual: " + x.length;
    }
    if (t.maxLength !== undefined && x.length > t.maxLength) {
        throw name + " must be at most " + t.max + "; actual: " + x.length;
    }
}

module.exports.required = required;
module.exports.integer = integer;
module.exports.number = number;
module.exports.string = string;
