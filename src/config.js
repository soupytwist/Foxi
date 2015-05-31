"use strict";

export default {
  connection: {

    // Host name
    get host() {
      return localStorage.connection_host;
    },
    set host(val) {
      localStorage.connection_host = val;
    },

    // Port - default: 9090
    get port() {
      return localStorage.connection_port || 9090;
    },
    set port(val) {
      localStorage.connection_port = val;
    },
  }
};
