var api = require("./rpcapi");
var state = require("./state");
var cards = require("./cards");

window.onload = function() {

  $(".card").on("transitionend", function() {
    $("#main").removeClass("animating");
  });

  api.rpc.subscribe("Application.OnVolumeChanged", function(payload) {
    //state.player.volume.update(payload.data.volume);
    state.player.muted.update(payload.data.muted);
  });

  if (localStorage.cfg_host && localStorage.cfg_port) {
    // If we have a saved connection, reconnect
    cards.SETTINGS.tryConnect();

  } else {
    // Prompt the user to enter the host information
    cards.SETTINGS.activate();
  }

  $("#nowplaying-button").click(function() {
    cards.NOWPLAYING.activate();
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
