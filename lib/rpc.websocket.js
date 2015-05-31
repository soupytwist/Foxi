"use strict";
/* global WebSocket */

(function() {

  function WebSocketRPC() {
    this.ctr = 0;
    this.ws = null;
    this.promises = {};
    this.subscriptions = {};
    this.cancelConnecting = function() {};
  }

  WebSocketRPC.prototype.connect = function(host, port) {
    return this.connect_url('ws://'+host+':'+port+'/jsonrpc');
  };

  WebSocketRPC.prototype.connect_url = function(url) {
    var rpc = this;

    if (typeof rpc.onConnecting === 'function') {
      rpc.onConnecting();
    }

    /*
     * Return a promise that the connection will be established.
     * When the connection is successful, event handler are setup
     */
    return new Promise(function(resolve, reject) {
      function connectionFailed(reason) {
        if (typeof rpc.onConnectionFailed === 'function') {
          rpc.onConnectionFailed();
        }
        return reject("Connection failed. " + reason);
      }
      function connectionEstablished() {
        if (typeof rpc.onConnected === 'function') {
          rpc.onConnected();
        }
        rpc.cancelConnecting = function(){};
        return resolve();
      }

      rpc.cancelConnecting = function() {
        connectionFailed("(Cancelled)");
      };

      if (!url) {
        return connectionFailed("Missing URL");
      }

      rpc.ws = undefined;
      var connection = new WebSocket(url);

      connection.onerror = function() {
        return connectionFailed("Could not connect to : " + url);
      };

      connection.onopen = function() {
        rpc.ws = connection;

        rpc.ws.onmessage = function(evt) {
          var data = JSON.parse(evt.data);
          console.log("<-- " + (data.id||"no-id") + " : " + (data.method||"no-method") + " : " + evt.data);

          if (data.id in rpc.promises) {
            console.log("Resolving promise [" + data.id + "]");
            var p = rpc.promises[data.id];
            p.resolve(data);
            delete rpc.promises[data.id];

          } else if (data.method in rpc.subscriptions) {
            console.log("Notifying subscription [" + data.method + "]");
            var s = rpc.subscriptions[data.method];
            s(data.params);
          
          } else {
            console.warn("Unhandled message [" + (data.id||"no-id") + " : " + (data.method||"no-method") +
                "]; Awaiting: [" + Object.keys(rpc.promises).join(', ') + "]");
          }
        };

        rpc.ws.onerror = function(err) {
          console.error(err);
          if (typeof rpc.onDisconnected === 'function') {
            rpc.onDisconnected();
          }
        };

        rpc.ws.onclose = function() {
          console.warn("Connection closed");
          if (typeof rpc.onDisconnected === 'function') {
            rpc.onDisconnected();
          }
        };

        connectionEstablished();
      };
    });
  };

  WebSocketRPC.prototype.send_msg = function(method, params) {
    var rpc = this;
    console.log("Send msg: " + method);
    if (!rpc.ws) {
      throw new Error("No WebSocket connection");
    }
    
    var idStr = "msg_"+(rpc.ctr++); 
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
      rpc.promises[idStr] = {
        resolve : resolve,
        reject: reject
      };

      if (rpc.ws.readyState === WebSocket.OPEN) {
        rpc.ws.send(JSON.stringify(msg));
      } else if (rpc.ws.url) {
        rpc.connect_url(rpc.ws.url).then(function() {
          if (rpc.ws.readyState === WebSocket.OPEN) {
            rpc.ws.send(JSON.stringify(msg));
          } else {
            reject("WebSocket reconnect failed");
          }
        });
      } else {
        reject("Connection failed");
      }
    });
  };

  WebSocketRPC.prototype.subscribe = function(method, fct) {
    this.subscriptions[method] = fct;
  };

  WebSocketRPC.prototype.unsubscribe = function(method) {
    // TODO
    delete this.subscriptions[method];
  };

  module.exports = WebSocketRPC;
})();
