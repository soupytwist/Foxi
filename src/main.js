"use strict";

import ConnectionCard from './ConnectionCard';
import {app} from './utils';

var card = new ConnectionCard();
card.prepare();
app.stack.push(card);
document.getElementById('back-button').addEventListener('click', app.stack.pop);
