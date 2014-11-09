require('../es6-promise').polyfill();
var ctr = 0;
var ws;
var promises = {};
var subscriptions = {};
var _ = require("lodash");

function connect(host, port) {

  /*
   * Return a promise that the connection will be established.
   * When the connection is successful, event handler are setup>
   */
  return new Promise(function(resolve, reject) {
    if (!host || !port) {
      reject();
      return;
    }

    var connection = new WebSocket('ws://'+host+':'+port+'/jsonrpc');
    connection.onerror = function() {
      console.log("Connection refused");
      reject();
    };
    connection.onopen = function() {
      ws = connection;

      ws.onmessage = function(evt) {
        var data = JSON.parse(evt.data);
        console.log("<-- " + (data.id||"no-id") + " : " + (data.method||"no-method") + " : " + evt.data);

        if (data.id in promises) {
          console.log("Resolving promise [" + data.id + "]");
          var p = promises[data.id];
          p.resolve(data);
          delete promises[data.id];

        } else if (data.method in subscriptions) {
          console.log("Notifying subscription [" + data.method + "]");
          var s = subscriptions[data.method];
          s(data.params);
        
        } else {
          console.warn("Unhandled message [" + (data.id||"no-id") + " : " + (data.method||"no-method") +
              "]; Awaiting: [" + Object.keys(promises).join(', ') + "]");
        }
      };

      ws.onerror = function(err) {
        console.error(err);
      };

      resolve();
    };
  });
}

function send_msg(method, params) {
  console.log("Send msg");
  if (!ws) {
    throw "No WebSocket connection";
  }
  var idStr = "msg_"+(ctr++); 
  var msg = {
    jsonrpc: "2.0",
    method: method,
    id: idStr,
  };
  if (params) {
    msg.params = params;
  }

  return new Promise(function(resolve, reject) {
    console.log("--> " + JSON.stringify(msg));
    promises[idStr] = {
      resolve : resolve,
      reject: reject
    };
    ws.send(JSON.stringify(msg));
  });
}

function subscribe(method, fct) {
  subscriptions[method] = fct;
}

function unsubscribe(method) {
  // TODO
  delete subscriptions[method];
}

module.exports.connect = connect;
module.exports.send_msg = send_msg;
module.exports.subscribe = subscribe;
module.exports.unsubscribe = unsubscribe;
