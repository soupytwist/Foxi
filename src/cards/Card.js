var Handlebars = require('handlebars');
require("../handlebars_helpers")(Handlebars);
var templates = require("../templates")(Handlebars);

// CARD ------------------------------------------------------------------------
function Card(num, id) {
  this.num = num;
  this.id = id;
  this.loaded = false;
}

Card.prototype.activate = function(forceReload) {
  if (forceReload || !this.loaded) {
    this.load();
    return;
  }
  this.show();
};
Card.prototype.deactivate = function() {};

Card.prototype.render = function(tplName, data, elem) {
  console.log("Rendering: " + tplName);
  $(elem || this.id).html(templates[tplName](data));
};
Card.prototype.show = function() {};
Card.prototype.load = function() {};

module.exports = Card;
