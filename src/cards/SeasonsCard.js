var Card = require("./Card");
var CARDS = require("./cards");
var CARDNUM = require("./cardnum");
var api = require("../rpcapi");
var util = require("../util");
var state = require("../state");
var imgUtil = require("../img");

// SEASONS ---------------------------------------------------------------------
function SeasonsCard() {
  Card.call(this, CARDNUM.SEASONS, "#card-seasons");
}
SeasonsCard.prototype = Object.create(Card.prototype);

SeasonsCard.prototype.show = function() {
  state.toCard(this);
  util.setHeader(state.show.title);
  util.setSubheader();
  util.showBackButton(function() {
    CARDS.TVSHOWS.activate();
  });
};

SeasonsCard.prototype.load = function() {
  var card = this;
  api.VideoLibrary.GetSeasons({
      tvshowid: state.show.tvshowid,
      properties: ['tvshowid', 'season', 'art', 'episode'],
      sort: {
        order: 'ascending',
        method: 'season'
      }
  }).then(function(data) {

    card.render('season_list', data.result);
    $("#season-list a").click(function() {
      state.season = parseInt($(this).attr('data-season'));
      // We have to reload when a new season is selected
      CARDS.EPISODES.activate(true);
    });

    var imagesToLoad = $(".season-banner > img[data-cache-url]");
    imgUtil.loadImages(imagesToLoad, imgUtil.dimensions.tv_season, 2500).then(function() {
      card.show();
      card.loaded = true;
    });
  });
};

module.exports = new SeasonsCard();
