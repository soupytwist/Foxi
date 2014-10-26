var Handlebars = require('handlebars');
var templates = require("./templates")(Handlebars);
var api = require("./rpcapi");
var state = require("./state");
var _ = require("lodash");

var CARDNUM = {
  NONE: -1,
  SETTINGS: 0,
  TVSHOWS: 1,
  SEASONS: 2,
  EPISODES: 3,
  NOWPLAYING: 4
};

var CARDS = {};

// UI HELPERS ------------------------------------------------------------------
function hideBackButton() {
  $("#back-button").hide();
}


function hideSettingsButton() {
  $("#settings-button").hide();
}


function showBackButton(action) {
  hideSettingsButton();
  if (action) {
    $("#back-button").show().off('click').on('click', action);
  } else {
    $("#back-button").show();
  }
}


function showSettingsButton(action) {
  hideBackButton();
  if (action) {
    $("#settings-button").show().off('click').on('click', action);
  } else {
    $("#settings-button").show();
  }
}


function setHeader(text) { 
  if (!text) {
    $("#header > h1").text("Foxi");
    return;
  }
  $("#header > h1").text(text);
  $("#header").show();
}


function setSubheader(text) { 
  if (!text) {
    $("#app").removeClass("subheader-visible");
    return;
  }
  $("#subheader > h2").text(text);
  $("#app").addClass("subheader-visible");
}


// HANDLEBARS HELPERS ----------------------------------------------------------
function getImageUrl(img) {
  if (img.startsWith('image://')) {
    var src = decodeURIComponent(img.substr(8, img.length-9));
    if (src.startsWith('/')) {
      src = 'http://' + localStorage.cfg_host + ":8080/vfs/" + encodeURIComponent(src);
    }
    return src;
  }
  return null;
}

Handlebars.registerHelper('img_thumbnail', function() {
  var img = Handlebars.escapeExpression(this.thumbnail);
  var src = getImageUrl(img);
  if (src) {
    return new Handlebars.SafeString('<img alt="thumb" src="'+src+'">');
  }
  return new Handlebars.SafeString('<img alt="missing" src="">');
});

Handlebars.registerHelper('img_banner', function() {
  var img = Handlebars.escapeExpression(this.art.banner);
  var title = Handlebars.escapeExpression(this.label);
  var src = getImageUrl(img);
  if (src) {
    return new Handlebars.SafeString('<img alt="'+title+'" src="'+src+'">');
  }
  return new Handlebars.SafeString(title);
});

Handlebars.registerHelper('img_season_art', function() {
  var img = Handlebars.escapeExpression(this.art.poster);
  var season = Handlebars.escapeExpression(this.season);
  var src = getImageUrl(img);
  if (src) {
    return new Handlebars.SafeString('<img alt="'+season+'" src="'+src+'">');
  }
  return new Handlebars.SafeString(season);
});

Handlebars.registerHelper('img_episode_art', function() {
  var img = Handlebars.escapeExpression(this.art.thumb);
  var src = getImageUrl(img);
  if (src) {
    return new Handlebars.SafeString('<img alt="X" src="'+src+'">');
  }
  return new Handlebars.SafeString("X");
});

// CARD ------------------------------------------------------------------------
function Card(num, id) {
  this.num = num;
  this.id = id;
  this.loaded = false;
}

Card.prototype.activate = function(forceReload) {
  if (forceReload || !this.loaded) {
    this.load();
    return;
  }
  this.show();
};
Card.prototype.deactivate = function() {};

Card.prototype.render = function(tplName, data) {
  console.log("Rendering: " + tplName);
  $(this.id).html(templates[tplName](data));
};
Card.prototype.show = function() {};
Card.prototype.load = function() {};


// TV SHOWS --------------------------------------------------------------------
function TVShowsCard() {
  Card.call(this, CARDNUM.TVSHOWS, "#card-tv-shows");
}
TVShowsCard.prototype = Object.create(Card.prototype);

TVShowsCard.prototype.show = function() {
  state.toCard(this);
  setHeader();
  setSubheader();
  hideBackButton();
  showSettingsButton(function() {
    CARDS.SETTINGS.activate();
  });
};

TVShowsCard.prototype.load = function() {
  var card = this;
  api.VideoLibrary.GetTVShows({ properties: ['art', 'year'] }).then(function(data) {
    card.render('tv_show_list', data.result);
    $("#tv-show-list .banner-list-item a").click(function() {
      var showId = parseInt($(this).attr('data-show-id'));
      var showName = $(this).attr('data-show-name');
      state.show = {
        tvshowid: showId,
        label: showName
      };
      // We have to reload when a new show is selected
      CARDS.SEASONS.activate(true);
    });
    card.show();
    card.loaded = true;
  });
};


// SEASONS ---------------------------------------------------------------------
function SeasonsCard() {
  Card.call(this, CARDNUM.SEASONS, "#card-seasons");
}
SeasonsCard.prototype = Object.create(Card.prototype);

SeasonsCard.prototype.show = function() {
  state.toCard(this);
  setHeader(state.show.label);
  setSubheader();
  showBackButton(function() {
    CARDS.TVSHOWS.activate();
  });
};

SeasonsCard.prototype.load = function() {
  var card = this;
  api.VideoLibrary.GetSeasons({ tvshowid: state.show.tvshowid,
    properties: ['tvshowid', 'season', 'art'] }).then(function(data) {

    card.render('season_list', data.result);
    $("#season-list .season-list-item a").click(function() {
      state.season = parseInt($(this).attr('data-season'));
      // We have to reload when a new season is selected
      CARDS.EPISODES.activate(true);
    });
    card.show();
    card.loaded = true;
  });
};


// EPISODES --------------------------------------------------------------------
function EpisodesCard() {
  Card.call(this, CARDNUM.EPISODES, "#card-episodes");
}
EpisodesCard.prototype = Object.create(Card.prototype);

EpisodesCard.prototype.show = function() {
  state.toCard(this);
  setHeader(state.show.label);
  setSubheader("Season " + state.season);
  showBackButton(function() {
    CARDS.SEASONS.activate();
  });
};

EpisodesCard.prototype.load = function() {
  var card = this;
  api.VideoLibrary.GetEpisodes({ tvshowid: state.show.tvshowid, season: state.season,
    properties: ['title','art','episode'] }).then(function(data) {

    card.render('episode_list', data.result);
    $("#episode-list .episode-list-item a").click(function() {
      var itemid = parseInt($(this).attr('data-libraryid'));
      api.Player.Open({ item: { episodeid: itemid } }).then(function() {
        CARDS.NOWPLAYING.activate(true);
      });
    });

    card.show();
    card.loaded = true;
  });
};


// NOWPLAYING ------------------------------------------------------------------
function NowPlayingCard() {
  Card.call(this, CARDNUM.NOWPLAYING, "#card-nowplaying");
  this.subs = {};
}
NowPlayingCard.prototype = Object.create(Card.prototype);

NowPlayingCard.prototype.show = function() {
  state.toCard(this);
  setHeader((state.show && state.show.label) ? state.show.label : "Now Playing");
  setSubheader(state.season ? ("Season " + state.season)  : "Now Playing");
  showBackButton(function() {
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
    if (!players) {
      return;
    }
    cb(_.first(players).playerid);
  });
}


NowPlayingCard.prototype.updateEpisode = function() {
  var episode = state.nowplaying.val();
  if (episode && episode.thumbnail) {
    $("#nowplaying-thumb").attr('src', getImageUrl(episode.thumbnail));
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
    setHeader(episode.showtitle);
  } else {
    setHeader("Foxi");
  }
  if (episode && episode.season) {
    setSubheader("Season " + episode.season);
  } else {
    setSubheader("Now Playing");
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


// SETTINGS --------------------------------------------------------------------
function SettingsCard() {
  Card.call(this, CARDNUM.SETTINGS, "#card-settings");
}
SettingsCard.prototype = Object.create(Card.prototype);

SettingsCard.prototype.show = function() {
  state.toCard(this);
  setHeader("Settings");
  showBackButton(function() {
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
        CARDS.TVSHOWS.activate();
      },
      // Error
      function() {
        $("#cfg-connect-btn").addClass("recommend");
        CARDS.SETTINGS.activate();
      }
  );
};


CARDS.TVSHOWS = new TVShowsCard();
CARDS.SEASONS = new SeasonsCard();
CARDS.EPISODES = new EpisodesCard();
CARDS.NOWPLAYING = new NowPlayingCard();
CARDS.SETTINGS = new SettingsCard();

module.exports = CARDS;
