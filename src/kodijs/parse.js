
function parse(jsonStr) {
    var introspection = JSON.parse(jsonStr);
    var api = introspection.result;

    var methods = parse_methods(api.methods);
    var notifications = parse_notifications(api.notifications);
    var types = parse_types(api.types);

    return {
        description: api.description,
        methods: methods,
        notifications: notifications,
        types: types,
    };
}


function parse_methods(obj) {
    return _.map(methods, parse_method);
}


function parse_method(method) {
    return {
        description: method.description,
        params: parse_params(method.params),
        returns: parse_returns(method.returns),
    };
}


function parse_params(params) {
    return _.map(params, parse_param);
}


function parse_param(param) {
    return {

    };
}
