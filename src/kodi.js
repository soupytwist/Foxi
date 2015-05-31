"use strict";

import Kodi from '../lib/kodi.v6.js';
import rpc from '../lib/rpc.websocket.js';

var connector = new rpc();
var kodi = new Kodi(connector);

kodi.subscribe = connector.subscribe.bind(connector);

export default kodi;
export var connector = connector;
