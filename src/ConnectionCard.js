"use strict";

import Card from './Card';
import ListCard from './ListCard';
import {SourceList} from './Sources';
import kodi, {connector} from './kodi';
import {app} from './utils';
import player from './player';
import {connection as template} from './templates';
import config from './config';

export default class ConnectionCard extends Card {
  constructor() {
    super({
      title: 'Connection Setup',
      connection: config.connection
    });

    // Set up callback for the connector
    connector.onConnecting = () => {
      app.setConnectingDialogVisible(true);
      app.setConnectionEstablished(true);
    };
    connector.onConnected = () => {
      app.setConnectingDialogVisible(false);
      app.setConnectionEstablished(true);
    };
    connector.onDisconnected = () => {
      app.setConnectingDialogVisible(false);
      app.setConnectionEstablished(false);
    };
    connector.onConnectionFailed = () => {
      app.setConnectingDialogVisible(false);
      if (app.stack.count() > 1) {
        app.stack.rewind();
      }
    };
    var dialog = document.getElementById('dialog-connecting-cancel');
    if (dialog) {
      dialog.addEventListener('click', () => connector.cancelConnecting());
    }
  }

  prepare() {
    this.render();
    this.bindEvents();

    if (this.model.connection.host) {
      this.connect();
    }

    return new Promise(r => r());
  }

  render() {
    super.render();
    this.elm.innerHTML = template(this.model);
  }

  bindEvents() {
    var button = document.getElementById('action-connect');
    button.addEventListener('click', () => {
      var hostInput = document.getElementById('connection-host');
      var portInput = document.getElementById('connection-port');

      this.model.connection.host = hostInput.value;
      this.model.connection.port = parseInt(portInput.value);
      this.connect();
    });
  }

  connect() {
    var button = document.getElementById('action-connect');
    var errorMsg = this.elm.getElementsByClassName('error-message')[0];
    button.classList.remove('recommend');

    var cfg = this.model.connection;
    connector.connect(cfg.host, cfg.port).then(
      // Success
      function() {
        player.initialize(kodi);

        if (app.stack.count() > 1) {
          app.stack.fastForward();
        } else {
          let sourcesCard = new ListCard(new SourceList());
          sourcesCard.prepare().then(() => {
            app.stack.push(sourcesCard);
            button.classList.add('recommend');
          });
        }
        errorMsg.innerHTML = '';
      },
      // Failure
      function(err) {
        button.classList.add('recommend');
        errorMsg.innerHTML = err;
      }
    );
  }
}
