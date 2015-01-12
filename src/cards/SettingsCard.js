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
  state.toCard(this);
  util.setHeader("Settings");
  util.hideBackButton();
  util.hideSettingsButton();
};

SettingsCard.prototype.load = function() {
  var card = this;
  card.render('settings', {
    host: localStorage.cfg_host,
    port: localStorage.cfg_port,
    effect: localStorage.cfg_effect || "swoop",
    effect_choices: EFFECTS
  });

  $("#cfg-effect").on("change", function() {
    localStorage.cfg_effect = $(this).val();
    card.prepare();
  });

  $("#cfg-connect-btn").on('click', function() {
    var host = $("#cfg-host-field").val();
    var port = $("#cfg-port-field").val();
    localStorage.cfg_host = host;
    localStorage.cfg_port = port;
    $("#cfg-connect-btn").removeClass("recommend");
    card.tryConnect();
  });

  this.show();
};

SettingsCard.prototype.tryConnect = function() {
  api.rpc.connect(localStorage.cfg_host, localStorage.cfg_port).then(
      // Success
      function() {
        CARDS.INDEX.activate();
      },
      // Error
      function() {
        $("#cfg-connect-btn").addClass("recommend");
        CARDS.SETTINGS.activate();
      }
  );
};

SettingsCard.prototype.prepare = function() {
  var effect = localStorage.cfg_effect || "swoop";
  $("#main").attr("class", "animate-"+effect);
};

module.exports = new SettingsCard();
