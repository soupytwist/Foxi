var Card = require("./Card");
var CARDS = require("./cards");
var CARDNUM = require("./cardnum");
var api = require("../rpcapi");
var util = require("../util");
var state = require("../state");

// SETTINGS --------------------------------------------------------------------
function SettingsCard() {
  Card.call(this, CARDNUM.SETTINGS, "#card-settings");
}
SettingsCard.prototype = Object.create(Card.prototype);

SettingsCard.prototype.show = function() {
  state.toCard(this);
  util.setHeader("Settings");
  util.showBackButton(function() {
    CARDS.TVSHOWS.activate();
  });
};

SettingsCard.prototype.load = function() {
  var card = this;
  card.render('settings', { host: localStorage.cfg_host, port: localStorage.cfg_port });

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

module.exports = new SettingsCard();
