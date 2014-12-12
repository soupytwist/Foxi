module.exports.CARDNUM = {
  NONE:         -1,
  SETTINGS:     0,
  TVSHOWS:      1,
  SEASONS:      2,
  EPISODES:     3,
  NOWPLAYING:   4,
  CLASSIC_REMOTE: 5
};

module.exports.CARDS = {}
module.exports.CARDS.TVSHOWS     = require("./TVShowsCard");
module.exports.CARDS.SEASONS     = require("./SeasonsCard");
module.exports.CARDS.EPISODES    = require("./EpisodesCard");
module.exports.CARDS.NOWPLAYING  = require("./NowPlayingCard");
module.exports.CARDS.CLASSIC_REMOTE = require("./ClassicRemoteCard");
module.exports.CARDS.SETTINGS    = require("./SettingsCard");
