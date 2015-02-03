var api = require("./rpcapi");
var state = require("./state");
var CARDS = require("./cards/cards");
var DB = require("./db");

window.onload = function() {
  $(".card").on("transitionend", function() {
    $("#main").removeClass("animating");
  });

  // EVENTS --------------------------------------------------------------------
  // TODO Find a better place to register these
  api.rpc.subscribe("Application.OnVolumeChanged", function(payload) {
    state.player.volume.update(payload.data.volume);
    state.player.muted.update(payload.data.muted);
  });

  api.rpc.subscribe("Player.OnPlay", function(payload) {
    state.player.id.update(payload.data.player.playerid);
    state.player.speed.update(payload.data.player.speed === undefined ? 1 : payload.data.player.speed);

    var np = state.nowplaying.val();

    switch(payload.data.item.type) {
      case 'episode':
        if (np.episodeid !== payload.data.item.id) {
          CARDS.NOWPLAYING.setNowPlayingEpisode(payload.data.item.id);
        }
        break;

      case 'movie':
        if (np.movieid !== payload.data.item.id) {
          CARDS.NOWPLAYING.setNowPlayingMovie(payload.data.item.id);
        }
        break;
    }
  });

  api.rpc.subscribe("Player.OnPause", function(payload) {
    state.player.id.update(payload.data.player.playerid);
    state.player.speed.update(payload.data.player.speed === undefined ? 0 : payload.data.player.speed);
  });

  api.rpc.subscribe("Player.OnSeek", function(payload) {
    CARDS.NOWPLAYING.handleSeekResponse(payload);
  });

  api.rpc.subscribe("Player.OnStop", function(payload) {
    state.player.id.update(-1);
    state.player.speed.update(0);
    state.player.position.update(-1);
    state.player.duration.update(-1);
    state.nowplaying.update({});
    CARDS.NOWPLAYING.updateItem();
  });

  // INIT ----------------------------------------------------------------------
  DB.init(function() {
    CARDS.SETTINGS.prepare();

    if (localStorage.cfg_host && localStorage.cfg_port) {
      // If we have a saved connection, reconnect
      CARDS.CONNECTION.tryConnect();

    } else {
      // Prompt the user to enter the host information
      CARDS.CONNECTION.activate();
    }
  });

  $("#nowplaying-button").click(function() {
    CARDS.NOWPLAYING.activate();
  });
  $("#classic-remote-button").click(function() {
    CARDS.CLASSIC_REMOTE.activate();
  });
};
