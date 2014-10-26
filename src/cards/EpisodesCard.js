var Card = require("./Card");
var CARDS = require("./cards").CARDS;
var CARDNUM = require("./cards").CARDNUM;
var api = require("../rpcapi");
var util = require("../util");
var state = require("../state");

// EPISODES --------------------------------------------------------------------
function EpisodesCard() {
  Card.call(this, CARDNUM.EPISODES, "#card-episodes");
}
EpisodesCard.prototype = Object.create(Card.prototype);

EpisodesCard.prototype.show = function() {
  state.toCard(this);
  util.setHeader(state.show.title);
  util.setSubheader("Season " + state.season);
  util.showBackButton(function() {
    CARDS.SEASONS.activate();
  });
};

EpisodesCard.prototype.load = function() {
  var card = this;
  api.VideoLibrary.GetEpisodes({
    tvshowid: state.show.tvshowid,
    season: state.season,
    properties: ['title','art','episode'],
    sort: {
      order: 'ascending',
      method: 'episode'
    }
  }).then(function(data) {

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

module.exports = new EpisodesCard();
