require('../es6-promise').polyfill();
var ctr = 0;
var ws;
var promises = {};
var _ = require("lodash");

function connect(host, port, onopen) {
  ws = new WebSocket('ws://'+host+':'+port+'/jsonrpc');

  ws.onopen = onopen;

  ws.onmessage = function(evt) {
    var data = JSON.parse(evt.data);
    var id = data.id || data.method;
    console.log("<-- " + id + " : " + evt.data);
    var p = promises[id];
    if (p) {
      console.log("Resolving [" + id + "]");
      p.resolve(data);
      delete promises[id];
    } else {
      console.error("Unhandled messaeg [" + id + "]; Awaiting: [" + Object.keys(promises).join(', ') + "]");
    }
  };

  ws.onerror = function(err) {
    console.error(err);
  };
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
  console.log("-- " + JSON.stringify(msg));
  return new Promise(function(resolve, reject) {
    console.log("--> " + JSON.stringify(msg));
    promises[idStr] = {
      resolve : resolve,
      reject: reject
    };
    ws.send(JSON.stringify(msg));
  });
}

module.exports.connect = connect;
module.exports.send_msg = send_msg;
