var Card = require("./Card");
var CARDS = require("./cards").CARDS;
var CARDNUM = require("./cards").CARDNUM;
var api = require("../rpcapi");
var util = require("../util");
var state = require("../state");
var _ = require("lodash");

// NOWPLAYING ------------------------------------------------------------------
function NowPlayingCard() {
  Card.call(this, CARDNUM.NOWPLAYING, "#card-nowplaying");
  this.subs = {};
}
NowPlayingCard.prototype = Object.create(Card.prototype);

NowPlayingCard.prototype.show = function() {
  var that = this;

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
  this.subs.nowplaying = state.nowplaying.subscribe(this.updateEpisode.bind(this));
  this.subs.playpause = state.player.speed.subscribe(this.updatePlayPauseButton.bind(this));
  this.subs.position = state.player.position.subscribe(this.updateSeekbar.bind(this));
  this.subs.duration = state.player.duration.subscribe(this.updateSeekbar.bind(this));
  this.subs.seektime = state.player.speed.subscribe(this.updateSeekTimer.bind(this));
  this.updateSeekTimer();

  //if (!state.nowplaying.val()) {
    var playerid = state.player.id.val();
    if (playerid !== -1) {
      api.Player.GetItem({ playerid: playerid }).then(function(data) {
        if (data.result && data.result.item.id) {
          that.setNowPlayingEpisode(data.result.item.id);
        } else {
          state.nowplaying.update({});
        }
      });
    }
  //}
};

NowPlayingCard.prototype.deactivate = function() {
  this.subs.nowplaying.remove();
  this.subs.playpause.remove();
  this.subs.position.remove();
  this.subs.duration.remove();
  this.subs.seektime.remove();
  if (this.seekTimer) {
    clearInterval(this.seekTimer);
    delete this.seekTimer;
  }
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


NowPlayingCard.prototype.setNowPlayingEpisode = function(id) {
  // TODO Support other possible item types aside from episode
  api.VideoLibrary.GetEpisodeDetails({
    episodeid: id, properties: ['title', 'showtitle', 'plot', 'thumbnail', 'season', 'runtime', 'resume']
  }).then(function(data) {
    state.nowplaying.update(data.result.episodedetails);
    state.player.position.update(data.result.episodedetails.resume.position || 0);
    state.player.duration.update(data.result.episodedetails.runtime);
  });
}


NowPlayingCard.prototype.updateEpisode = function() {
  var episode = state.nowplaying.val();
  if (episode && episode.thumbnail) {
    $("#nowplaying-thumb").attr('src', util.getImageUrl(episode.thumbnail));
  } else {
    $("#nowplaying-thumb").attr('src', "");
  }
  if (episode && episode.title) {
    $("#nowplaying-episode-title").text(episode.title);
  } else {
    $("#nowplaying-episode-title").text("Title...");
  }
  if (episode && episode.plot) {
    $("#nowplaying-episode-plot").text(episode.plot);
  } else {
    $("#nowplaying-episode-plot").text("Plot...");
  }
  if (episode && episode.showtitle) {
    util.setHeader(episode.showtitle);
  } else {
    util.setHeader("Foxi");
  }
  if (episode && episode.season) {
    util.setSubheader("Season " + episode.season);
  } else {
    util.setSubheader("Now Playing");
  }
};


NowPlayingCard.prototype.updatePlayPauseButton = function() {
  $("#nowplaying-playpause").attr("data-icon", state.player.speed.val() === 0 ? "play" : "pause");
};


NowPlayingCard.prototype.updateSeekTimer = function() {
  var speed = state.player.speed.val();
  if (speed === 0 && this.seekTimer) {
    clearInterval(this.seekTimer);
    delete this.seekTimer;
  } else if (speed !== 0) {
    if (this.seekTimer) {
      clearInterval(this.seekTimer);
    }
    this.seekTimer = setInterval(function() {
      var pos = state.player.position.val();
      state.player.position.update(pos + 1);
    }, 1000 * speed);
  }
};


NowPlayingCard.prototype.updateSeekbar = function() {
  var position = state.player.position.val();
  var duration = state.player.duration.val();

  if (position === -1 || duration === -1) {
    $("#nowplaying-seek-cur").html("&ndash;");
    $("#nowplaying-seek-end").html("&ndash;");
    $("#nowplaying-seek-handler").css('left', '0%');
    $("#nowplaying-seek progress").attr('value', '0');
    $("#nowplaying-seek progress").attr('max', '0');
  } else {
    $("#nowplaying-seek-cur").html(seektime(position));
    $("#nowplaying-seek-end").html(seektime(duration));
    $("#nowplaying-seek-handler").css('left', (100.0 * position / duration)+'%');
    $("#nowplaying-seek progress").attr('value', position);
    $("#nowplaying-seek progress").attr('max', duration);
  }
};


function seektime(secs) {
  var x = secs;
  var res = '';
  var h = parseInt(x / 3600);
  if (h > 0) {
    res += h + ':';
    x -= h * 3600;
  }
  var m = parseInt(x / 60);
  if (m < 10) {
    res += '0';
  }
  res += m + ':';
  x -= m * 60;
  if (x < 10) {
    res += '0';
  }
  res += x;
  return res;
};


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
  });

  $("#nowplaying-seek-bar").on('touchend', function() {
    console.log("End seeking");
    card.isSeeking = false;
  });

  $("#nowplaying-seek-bar").on('touchmove', function(evt) {
    if (card.isSeeking) {
      var playerid = state.player.id.val();
      if (playerid !== -1) {
        // target is the seek bar
        var touch = evt.touches[0];
        var target = document.getElementById("nowplaying-seek-bar");
        var x = (touch.clientX - target.offsetLeft) / target.offsetWidth;
        console.log("Seeking... " + touch.clientX + " - " + target.offsetLeft + " - " + target.offsetWidth);
        if (x < 0) {
          x = 0;
        }
        if (x > 1) {
          x = 1;
        }

        api.Player.Seek({ playerid: playerid, value: (x * 100) });
        state.player.position.update(parseInt(state.player.duration.val() * x));
      }
    }
  });

  // TODO Move this
  this.subs.muted = state.player.muted.subscribe(function(muted) {
    $("#nowplaying-volume").attr('data-icon', muted ? "mute" : "sound-max");
  });

  card.show();
  card.loaded = true;
};


NowPlayingCard.prototype.deactivate = function() {
  if (this.subs.muted) {
    this.subs.muted.remove();
  }
};

NowPlayingCard.prototype.update = function() {
  $("#nowplaying-episode-title").text(state.nowplaying.title);
};

module.exports = new NowPlayingCard();
