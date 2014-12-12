var Card = require("./Card");
var CARDS = require("./cards").CARDS;
var CARDNUM = require("./cards").CARDNUM;
var api = require("../rpcapi");
var util = require("../util");
var state = require("../state");
var Observable = require("../observable");
var _ = require("lodash");

// CLASSIC_REMOTE --------------------------------------------------------------
function ClassicRemoteCard() {
  Card.call(this, CARDNUM.CLASSIC_REMOTE, "#card-classic-remote");
}
ClassicRemoteCard.prototype = Object.create(Card.prototype);

ClassicRemoteCard.prototype.show = function() {
  var that = this;

  state.toCard(this);
  util.setHeader("Foxi");
  util.setSubheader("");
  util.showBackButton(function() {
    if (state.lastCard) {
      state.lastCard.activate();
    } else {
      CARDS.TVSHOWS.activate();
    }
  });
};


ClassicRemoteCard.prototype.activate = function() {
  Card.prototype.activate.call(this);

  // Show the button to switch to nowplaying
  $("#nowplaying-button").show();
  $("#classic-remote-button").hide();
};


ClassicRemoteCard.prototype.deactivate = function() {
  // Show the button to switch to classic remote
  $("#classic-remote-button").show();
  $("#nowplaying-button").hide();
};


function getActivePlayer() {
  api.Player.GetActivePlayers().then(function(data) {
    var players = data.result;
    if (_.isEmpty(players)) {
      return;
    }
    state.player.id.update(_.first(players).playerid);
  });
}


ClassicRemoteCard.prototype.load = function() {
  var card = this;
  card.render('classic_remote');

  $("#classic-playpause").on('click', function() {
    var playerid = state.player.id.val();
    if (playerid !== -1) {
      api.Player.PlayPause({ playerid: playerid });
    }
  });

  $("#classic-seek-forward").on('click', function() {
    var playerid = state.player.id.val();
    if (playerid !== -1) {
      api.Player.Seek({ playerid: playerid, value: "smallforward" });
    }
  });

  $("#classic-seek-back").on('click', function() {
    var playerid = state.player.id.val();
    if (playerid !== -1) {
      api.Player.Seek({ playerid: playerid, value: "smallbackward" });
    }
  });

  $("#classic-stop").on('click', function() {
    var playerid = state.player.id.val();
    if (playerid !== -1) {
      api.Player.Stop({ playerid: playerid });
    }
  });

  $("#classic-up").on('click', function() {
    api.Input.Up({});
  });

  $("#classic-left").on('click', function() {
    api.Input.Left({});
  });

  $("#classic-right").on('click', function() {
    api.Input.Right({});
  });

  $("#classic-down").on('click', function() {
    api.Input.Down({});
  });

  $("#classic-select").on('click', function() {
    api.Input.Select({});
  });

  $("#classic-back").on('click', function() {
    api.Input.Back({});
  });

  $("#classic-context-menu").on('click', function() {
    api.Input.ContextMenu({});
  });

  $("#classic-home").on('click', function() {
    api.Input.Home({});
  });

  $("#classic-info").on('click', function() {
    api.Input.Info({});
  });

  card.show();
  card.loaded = true;
};


ClassicRemoteCard.prototype.update = function() {
};

module.exports = new ClassicRemoteCard();
