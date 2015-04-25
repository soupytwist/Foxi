"use strict";

var Handlebars = require('handlebars');
require("../handlebars_helpers")(Handlebars);
var templates = require("../templates")(Handlebars);
var util = require("../util");

class Card {
  constructor(model) {
    this.model = model;
    this.loaded = false;
  }

  activate(forceReload) {
    if (forceReload || !this.loaded) {
      this.load();
      return;
    }
    this.show();
  }


  deactivate() {
  }

  render(tplName, data, elem) {
    console.log("Rendering: " + tplName);
    $(elem || this.id).html(templates[tplName](data));
  }

  show() {
    util.unfreezeUI();
  }

  load() {
  }
}

module.exports = Card;
