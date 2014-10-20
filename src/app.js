var api = require("./rpcapi");
var state = require("./state");
var cards = require("./cards");

window.onload = function() {

  if (localStorage.cfg_host && localStorage.cfg_port) {
    // If we have a saved connection, reconnect
    api.rpc.connect(localStorage.cfg_host, localStorage.cfg_port, function() {
      cards.TVSHOWS.activate();
    });

  } else {
    // Prompt the user to enter the host information
    showConnectForm();
  }

  $("#nowplaying-button").click(function() {
    cards.NOWPLAYING.activate();
  });
};


function showNowPlaying() {
  if ($("#card-nowplaying").hasClass("card-active")) {
    return;
  }

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
*/
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


function showConnectForm() {
  $('#main').html(templates.cfg_form());

  $("#cfg-connect-btn").on('click', function() {
    var host = $("#cfg-host-field").val();
    var port = $("#cfg-port-field").val();

    api.rpc.connect(host, port, function() {
      localStorage.cfg_host = host;
      localStorage.cfg_port = port;
    });
  });
}
