var Card = require("./Card");
var CARDS = require("./cards");
var CARDNUM = require("./cardnum");
var api = require("../rpcapi");
var util = require("../util");
var state = require("../state");
var Observable = require("../observable");
var _ = require("lodash");

// NOWPLAYING ------------------------------------------------------------------
function NowPlayingCard() {
  Card.call(this, CARDNUM.NOWPLAYING, "#card-nowplaying");
  this.subs = {};
  this.seekHandler = new Observable(0);
  this.volumeHandler = new Observable(0);
}
NowPlayingCard.prototype = Object.create(Card.prototype);

NowPlayingCard.prototype.show = function() {
  var that = this;

  Card.prototype.show.call(this);
  state.toCard(this);
  util.setHeader((state.show && state.show.label) ? state.show.label : "Now Playing");
  util.setSubheader(state.season ? ("Season " + state.season)  : "Now Playing");
  util.showBackButton(function() {
    if (state.lastCard) {
      state.lastCard.activate();
    } else {
      CARDS.TVSHOWS.activate();
    }
  });

  this.subs.playpause = state.player.speed.subscribe(this.updatePlayPauseButton.bind(this));
  this.subs.position = state.player.position.subscribe(this.updateSeekbar.bind(this));
  this.subs.duration = state.player.duration.subscribe(this.updateSeekbar.bind(this));
  this.subs.seektime = state.player.speed.subscribe(this.updateSeekTimer.bind(this));
  this.updateSeekTimer();
};


NowPlayingCard.prototype.activate = function() {
  Card.prototype.activate.call(this);

  // Show the button to switch to classic remote
  $("#classic-remote-button").show();
  $("#nowplaying-button").hide();
};


NowPlayingCard.prototype.deactivate = function() {
  this.subs.playpause.remove();
  this.subs.position.remove();
  this.subs.duration.remove();
  this.subs.seektime.remove();
  if (this.seekTimer) {
    clearInterval(this.seekTimer);
    delete this.seekTimer;
  }
  if (this.subs.muted) {
    this.subs.muted.remove();
  }

  // Show the button to switch to now playing
  $("#nowplaying-button").show();
  $("#classic-remote-button").hide();
};


NowPlayingCard.prototype.updateItem = function() {
  var item = state.nowplaying.val();

  if (!item) {
    this.updateDetails({});
  }

  // Determine the type of the now playing item
  if (item.hasOwnProperty("episodeid"))
  { // TV Show
    this.updateDetails({
      thumb: util.getImageUrl(item.thumbnail) || '/assets/thumb.png',
      title: item.title,
      description: item.plot,
      header: item.showtitle,
      subheader: "Season " + item.season
    });
  }
  else if (item.hasOwnProperty("movieid"))
  { // Movie
    this.updateDetails({
      thumb: util.getImageUrl(item.thumbnail) || '/assets/movie.png',
      title: item.title,
      description: item.plot,
      header: item.title,
      subheader: ""
    });
  }
  else
  { // Unknown - something else
    this.updateDetails({
      thumb: util.getImageUrl(item.thumbnail),
      title: item.title,
      description: item.plot,
      header: item.title,
      subheader: ""
    });
  }
};


NowPlayingCard.prototype.updateDetails = function(item) {
    // The image (thumnnail) for the now playing item
    $("#nowplaying-thumb").attr('src', item.thumb || '/assets/thumb.png');

    // The title of the content that is playing
    $("#nowplaying-episode-title").text(item.title);

    // The description of the now playing content
    $("#nowplaying-episode-plot").text(item.description);

    // The text to show in the header
    util.setHeader(item.header);

    // The text to show in the subheader
    util.setSubheader(item.subheader);
};


// TODO Combine these two
NowPlayingCard.prototype.setNowPlayingEpisode = function(id) {
  var card = this;
  api.VideoLibrary.GetEpisodeDetails({
    episodeid: id, properties: ['title', 'showtitle', 'plot', 'thumbnail', 'season', 'runtime', 'resume']
  }).then(function(data) {
    state.nowplaying.update(data.result.episodedetails);
    state.player.position.update(data.result.episodedetails.resume.position || 0);
    state.player.duration.update(data.result.episodedetails.runtime);
    card.updateItem();
  });
};


// TODO Combine these two
NowPlayingCard.prototype.setNowPlayingMovie = function(id) {
  var card = this;
  api.VideoLibrary.GetMovieDetails({
    movieid: id, properties: ['title', 'plot', 'thumbnail', 'runtime', 'resume']
  }).then(function(data) {
    state.nowplaying.update(data.result.moviedetails);
    state.player.position.update(data.result.moviedetails.resume.position || 0);
    state.player.duration.update(data.result.moviedetails.runtime);
    card.updateItem();
  });
};


NowPlayingCard.prototype.updatePlayPauseButton = function() {
  $("#nowplaying-playpause").attr("data-icon", state.player.speed.val() === 0 ? "play" : "pause");
};


NowPlayingCard.prototype.updateSeekTimer = function() {
  var self = this;
  var speed = state.player.speed.val();
  if (speed === 0 && this.seekTimer) {
    clearInterval(this.seekTimer);
    delete this.seekTimer;
  } else if (speed !== 0) {
    if (this.seekTimer) {
      clearInterval(this.seekTimer);
    }

    // Workaround solution; when the phone goes into "standby" or something
    // the interval timer doesn't fire, so it may be longer than a second
    // between updates. This value should measure that time.
    self.lastTick = parseInt(new Date().getTime() / 1000);

    this.seekTimer = setInterval(function() {
      var pos = state.player.position.val();
      var tickNow = parseInt(new Date().getTime() / 1000);
      state.player.position.update(pos + (tickNow - self.lastTick));
      self.lastTick = tickNow;
    }, 1000 * speed);
  }
};


NowPlayingCard.prototype.updateSeekbar = function() {
  var position = state.player.position.val();
  var duration = state.player.duration.val();

  if (position === -1 || duration === -1) {
    $("#nowplaying-seek-cur").html("&ndash;");
    $("#nowplaying-seek-end").html("&ndash;");
    $("#nowplaying-seek progress").attr('value', '0');
    $("#nowplaying-seek progress").attr('max', '0');
    $("#nowplaying-seek-handler").css('left', '0%');
  } else {
    $("#nowplaying-seek-cur").html(seektime(position));
    $("#nowplaying-seek-end").html(seektime(duration));
    $("#nowplaying-seek progress").attr('value', position);
    $("#nowplaying-seek progress").attr('max', duration);

    if (!this.isSeeking) {
      $("#nowplaying-seek-handler").css('left', (100.0 * position / duration)+'%');
    }
  }
};


function seektime(secs) {
  var h = parseInt(secs / 3600);
  var xs = secs - h * 3600;
  var m = parseInt(xs / 60);
  var s = parseInt(xs - m * 60);

  if (h > 0) {
    return h + ":" + ('0'+m).slice(-2) + ":" + ('0'+s).slice(-2);
  } else if (m > 0) {
    return m + ":" + ('0'+s).slice(-2);
  } else {
    return "0:" + ('0'+s).slice(-2);
  }
}


NowPlayingCard.prototype.load = function() {
  var card = this;
  card.render('nowplaying', { show: state.show, season: state.season });

  this.updatePlayPauseButton(state.player.speed.val());

  $("#nowplaying-playpause").on('click', function() {
    var playerid = state.player.id.val();
    if (playerid !== -1) {
      api.Player.PlayPause({ playerid: playerid });
    }
  });

  $("#nowplaying-seek-forward").on('click', function() {
    var playerid = state.player.id.val();
    if (playerid !== -1) {
      api.Player.Seek({ playerid: playerid, value: "smallforward" });
    }
  });

  $("#nowplaying-seek-back").on('click', function() {
    var playerid = state.player.id.val();
    if (playerid !== -1) {
      api.Player.Seek({ playerid: playerid, value: "smallbackward" });
    }
  });

  $("#nowplaying-stop").on('click', function() {
    var playerid = state.player.id.val();
    if (playerid !== -1) {
      api.Player.Stop({ playerid: playerid });
    }
  });

  $("#nowplaying-more").on('click', function() {
    if ($("#nowplaying-controls").hasClass("expanded")) {
      $("#nowplaying-controls").removeClass("expanded");
      $("#nowplaying-more").attr('data-icon', 'dialpad');
    } else {
      $("#nowplaying-controls").addClass("expanded");
      $("#nowplaying-more").attr('data-icon', 'dismiss-keyboard');
    }
  });

  $("#nowplaying-seek-bar").on('touchstart', function() {
    console.log("Start seeking");
    card.isSeeking = true;

    card.subs.seekHandler = card.seekHandler.subscribe(function(x) {
      var playerid = state.player.id.val();
      if (playerid !== -1) {
        console.log("Seeking to " + (x * 100) + "%");
        api.Player.Seek({ playerid: playerid, value: (x * 100.0) });
      }
    });
  });

  $("#nowplaying-seek-bar").on('touchend', function() {
    console.log("End seeking");
    card.isSeeking = false;

    card.subs.seekHandler.remove();
  });

  $("#nowplaying-seek-bar").on('touchmove', function(evt) {
    if (card.isSeeking) {
      var playerid = state.player.id.val();
      if (playerid !== -1) {
        // target is the seek bar
        var touch = evt.touches[0];
        var target = document.getElementById("nowplaying-seek-bar");
        var x = (touch.clientX -16 - target.offsetLeft) / target.offsetWidth;

        // Register the seek value
        if (x < 0) {
          x = 0;
        }
        if (x > 1) {
          x = 1;
        }

        $("#nowplaying-seek-handler").css('left', (x * 100.0)+'%');
        card.seekHandler.throttledUpdate(x, 100);
      }
    }
  });
  
  $("#nowplaying-volume").on('click', function() {
    $("#overlay-volume").toggleClass('overlay-visible');
  });

  $("#overlay-volume").on('click', function() {
    $("#overlay-volume").removeClass('overlay-visible');
  });

  this.subs.volumeSlider = this.volumeHandler.subscribe(function(vol) {
    window.setTimeout(function() { $("#volume-indicator").addClass('fade'); }, 100);
    api.Application.SetVolume({ volume: vol });
  });

  function updateVolume(evt) {
    var ol = $("#volume-bar");
    var ymin = $(ol).position().top + 60;
    var ycur = evt.changedTouches[0].clientY;
    var ymax = $(ol).height() - 120;

    var vol = (((ymax - ycur) * 1.0) / (ymax - ymin)) * 100;
    vol = Math.max(0, Math.min(100, parseInt(vol)));
    console.log(ymin + " " + ycur + " " + ymax + " " + vol);

    card.volumeHandler.throttledUpdate(vol, 100);
    $("#volume-indicator").removeClass('fade').text(String(vol));
  }

  $("#volume-bar ol").on('touchstart', function() {
    $(this).on('touchmove', updateVolume);
    $(this).on('touchend', function() {
      $("#volume-bar ol").off('touchmove').off('touchend');
    });
  });

  // TODO Move this
  this.subs.muted = state.player.muted.subscribe(function(muted) {
    $("#nowplaying-volume").attr('data-icon', muted ? "mute" : "sound-max");
  });

  card.show();
  card.loaded = true;
};


NowPlayingCard.prototype.handleSeekResponse = function(resp) {
  var secs = util.timeToSecs(resp.data.player.time);
  state.player.position.update(secs);
};


NowPlayingCard.prototype.update = function() {
  $("#nowplaying-episode-title").text(state.nowplaying.title);
};

module.exports = new NowPlayingCard();
