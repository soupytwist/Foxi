var Card = require("./Card");
var CARDS = require("./cards");
var CARDNUM = require("./cardnum");
var api = require("../rpcapi");
var util = require("../util");
var state = require("../state");

var EFFECTS = {
  none: "No animations",
  fade: "Fade",
  blur: "Blur",
  slide: "Slide",
  swoop: "3D Swoop",
};

// SETTINGS --------------------------------------------------------------------
function SettingsCard() {
  Card.call(this, CARDNUM.SETTINGS, "#card-settings");
}
SettingsCard.prototype = Object.create(Card.prototype);

SettingsCard.prototype.show = function() {
  Card.prototype.show.call(this);
  state.toCard(this);
  util.setHeader("Settings");
  util.showBackButton(function() {
    CARDS.INDEX.activate();
  });
};

SettingsCard.prototype.load = function() {
  var card = this;
  card.render('settings', {
    effect_choices: EFFECTS
  });

  $("#cfg-effect").on("change", function() {
    localStorage.cfg_effect = $(this).val();
    card.prepare();
  }).val(localStorage.cfg_effect || "blur");

  $("#update-library").on("click", function() {
    api.VideoLibrary.Scan({});
  });

  this.show();
};

SettingsCard.prototype.prepare = function() {
  var effect = localStorage.cfg_effect || "blur";
  $("#main").attr("class", "animate-"+effect);
};

module.exports = new SettingsCard();
