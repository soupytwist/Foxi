var Card = require("./Card");
var CARDS = require("./cards");
var CARDNUM = require("./cardnum");
var api = require("../rpcapi");
var util = require("../util");
var state = require("../state");

// SETTINGS --------------------------------------------------------------------
function ConnectionCard() {
  Card.call(this, CARDNUM.CONNECTION, "#card-connection");
}
ConnectionCard.prototype = Object.create(Card.prototype);

ConnectionCard.prototype.show = function() {
  Card.prototype.show.call(this);
  state.toCard(this);
  util.setHeader("Connection Setup");
  util.hideBackButton();
};

ConnectionCard.prototype.load = function() {
  var card = this;
  card.render('connection', {
    host: localStorage.cfg_host,
    port: localStorage.cfg_port
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

ConnectionCard.prototype.tryConnect = function() {
  api.rpc.connect(localStorage.cfg_host, localStorage.cfg_port).then(
      // Success
      function() {
        CARDS.INDEX.activate();
      },
      // Error
      function() {
        $("#cfg-connect-btn").addClass("recommend");
        CARDS.CONNECTION.activate();
      }
  );
};

module.exports = new ConnectionCard();
