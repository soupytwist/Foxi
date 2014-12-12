var api = require("./rpcapi");
var state = require("./state");
var CARDS = require("./cards/cards").CARDS;

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
    if (np.episodeid !== payload.data.item.id) {
      CARDS.NOWPLAYING.setNowPlayingEpisode(payload.data.item.id);
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
  });

  // INIT ----------------------------------------------------------------------
  if (localStorage.cfg_host && localStorage.cfg_port) {
    // If we have a saved connection, reconnect
    CARDS.SETTINGS.tryConnect();

  } else {
    // Prompt the user to enter the host information
    CARDS.SETTINGS.activate();
  }

  $("#nowplaying-button").click(function() {
    CARDS.NOWPLAYING.activate();
  });
  $("#classic-remote-button").click(function() {
    CARDS.CLASSIC_REMOTE.activate();
  });
};

/*
  $("#volume-bar").change(function() {
    var setVol = api.Application.SetVolume({ volume: parseInt(this.value) });
    setVol.then(function(msg) {
      console.log(msg);
    });
  });

  // Get the current volume before enabling the volume bar
  api.Application.GetProperties({ properties: ['volume'] }).then(function(data) {
    $("#volume-bar").val(String(data.result.volume)).removeAttr('disabled');
  });
  api.Application.GetProperties({ properties: ['volume'] }).then(function(data) {
    $('#card-nowplaying').html(templates.volume({ episode: episode, volume: data.result.volume }));
    $("#volume-indicator").addClass('fade');

    function updateVolume(evt) {
      var ol = $("#volume-bar");
      var ymin = $(ol).position().top;
      var ycur = evt.changedTouches[0].clientY;
      var ymax = $(ol).height();

      var vol = (((ymax - ycur) * 1.0) / (ymax - ymin)) * 100;
      vol = Math.max(0, Math.min(100, parseInt(vol)));
      console.log(ymin + " " + ycur + " " + ymax + " " + vol);

      //api.Application.SetVolume({ volume: vol }).then(function(data) {
        $("#volume-indicator").removeClass('fade').text(String(vol));
        window.setTimeout(function() { $("#volume-indicator").addClass('fade'); }, 100);
      //});
    }

    $("#volume-bar ol").on('touchstart', function() {
      $(this).on('touchmove', updateVolume);
      $(this).on('touchend', function() {
        $("#volume-bar ol").off('touchmove').off('touchend');
      });
    });
    showCard("#card-nowplaying", "left");
  });

  showBackButton(showTVShowList);
}
*/
