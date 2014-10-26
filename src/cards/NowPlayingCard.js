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
  state.toCard(this);
  util.setHeader((state.show && state.show.label) ? state.show.label : "Now Playing");
  util.setSubheader(state.season ? ("Season " + state.season)  : "Now Playing");
  util.showBackButton(function() {
    CARDS.TVSHOWS.activate();
  });
  this.subs.nowplaying = state.nowplaying.subscribe(this.updateEpisode.bind(this));

  //if (!state.nowplaying.val()) {
    getActivePlayer(function(playerid) {
      api.Player.GetItem({ playerid: playerid }).then(function(data) {
        if (data.result.item.id) {
          api.VideoLibrary.GetEpisodeDetails({
            episodeid: data.result.item.id, properties: ['title', 'showtitle', 'plot', 'thumbnail', 'season']
          }).then(function(data) {
            state.nowplaying.update(data.result.episodedetails);
          });
        } else {
          state.nowplaying.update({});
        }
      });
    });
  //}
};

NowPlayingCard.prototype.deactivate = function() {
  this.subs.nowplaying.remove();
};

function getActivePlayer(cb) {
  api.Player.GetActivePlayers().then(function(data) {
    var players = data.result;
    if (_.isEmpty(players)) {
      return;
    }
    cb(_.first(players).playerid);
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


NowPlayingCard.prototype.load = function() {
  var card = this;
  card.render('nowplaying', { show: state.show, season: state.season });

  getActivePlayer(function(playerid) {
    api.Player.GetProperties({ playerid: playerid, properties: ['speed'] }).then(function(data) {
      if (data.result.speed === 0) {
        $("#nowplaying-playpause").attr("data-icon", "play");
      } else {
        $("#nowplaying-playpause").attr("data-icon", "pause");
      }
    });
  });

  $("#nowplaying-playpause").on('click', function() {
    getActivePlayer(function(playerid) {
      api.Player.PlayPause({ playerid: playerid }).then(function(data) {
        if (data.result.speed === 0) {
          $("#nowplaying-playpause").attr("data-icon", "play");
        } else {
          $("#nowplaying-playpause").attr("data-icon", "pause");
        }
      });
    });
  });

  $("#nowplaying-stop").on('click', function() {
    getActivePlayer(function(playerid) {
      api.Player.Stop({ playerid: playerid }).then(function(data) {
        $("#nowplaying-playpause").attr("data-icon", "play");
      });
    });
  });

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
