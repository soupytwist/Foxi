var Card = require("./Card");
var CARDS = require("./cards");
var CARDNUM = require("./cardnum");
var api = require("../rpcapi");
var util = require("../util");
var state = require("../state");
var imgUtil = require("../img");

// INDEX -----------------------------------------------------------------------
function IndexCard() {
  Card.call(this, CARDNUM.INDEX, "#card-index");
}
IndexCard.prototype = Object.create(Card.prototype);

IndexCard.prototype.show = function() {
  Card.prototype.show.call(this);
  state.toCard(this);
  util.setHeader("Foxi");
  util.setSubheader();
  util.showBackButton(function() {
    CARDS.CONNECTION.activate();
  });
};

IndexCard.prototype.load = function() {
  var card = this;
  card.render('index');

  $("a[data-card-link]").on('click', function() {
    util.freezeUI(this);
    var linked = CARDS[$(this).attr('data-card-link')];
    linked.activate();
  });

  api.VideoLibrary.GetRecentlyAddedMovies({
    properties: [ 'art' ],
    limits: {
      end: 4
    }
  }).then(function(data) {
      card.render('index_recent_movies', data.result, '#index-recent-movies');
      imgUtil.loadImages($("#index-recent-movies img[data-cache-url]"), imgUtil.dimensions.movie);
  });

  api.VideoLibrary.GetRecentlyAddedEpisodes({
    properties: [ 'art' ],
    limits: {
      end: 4
    }
  }).then(function(data) {
      card.render('index_recent_episodes', data.result, '#index-recent-episodes');
      imgUtil.loadImages($("#index-recent-episodes img[data-cache-url]"), imgUtil.dimensions.tv_thumb);
  });

  this.loaded = true;
  this.show();
};

module.exports = new IndexCard();
