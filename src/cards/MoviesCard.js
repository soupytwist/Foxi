var Card = require("./Card");
var CARDS = require("./cards");
var CARDNUM = require("./cardnum");
var api = require("../rpcapi");
var util = require("../util");
var state = require("../state");

// TV SHOWS --------------------------------------------------------------------
function MoviesCard() {
  Card.call(this, CARDNUM.MOVIES, "#card-movies");
}
MoviesCard.prototype = Object.create(Card.prototype);

MoviesCard.prototype.show = function() {
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
      var itemid = parseInt($(this).attr('data-libraryid'));
      api.Player.Open({ item: { movieid: itemid } }).then(function() {
        CARDS.NOWPLAYING.activate(true);
      });
    });

    card.show();
    card.loaded = true;
  });
};

module.exports = new MoviesCard();
