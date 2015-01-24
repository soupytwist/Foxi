var Card = require("./Card");
var CARDS = require("./cards");
var CARDNUM = require("./cardnum");
var api = require("../rpcapi");
var util = require("../util");
var state = require("../state");
var imgUtil = require("../img");

// TV SHOWS --------------------------------------------------------------------
function MoviesCard() {
  Card.call(this, CARDNUM.MOVIES, "#card-movies");
}
MoviesCard.prototype = Object.create(Card.prototype);

MoviesCard.prototype.show = function() {
  Card.prototype.show.call(this);
  state.toCard(this);
  util.setHeader("Movies");
  util.setSubheader();
  util.showBackButton(function() {
    CARDS.INDEX.activate();
  });
  util.hideSettingsButton();
};

MoviesCard.prototype.load = function() {
  var card = this;
  api.VideoLibrary.GetMovies({
    properties: ['title', 'art', 'year'],
    sort: {
      order: 'ascending',
      method: 'title'
    }
  }).then(function(data) {

    card.render('movie_list', data.result);

    $("#movie-list a").click(function() {
      util.freezeUI(this);
      var itemid = parseInt($(this).attr('data-libraryid'));
      api.Player.Open({ item: { movieid: itemid } }).then(function() {
        CARDS.NOWPLAYING.activate(true);
      });
    });

    var imagesToLoad = $("#movie-list .season-banner > img[data-cache-url]");
    imgUtil.loadImages(imagesToLoad, imgUtil.dimensions.movie, 2500).then(function() {
      card.show();
      card.loaded = true;
    });
  });
};

module.exports = new MoviesCard();
