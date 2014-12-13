var Card = require("./Card");
var CARDS = require("./cards");
var CARDNUM = require("./cardnum");
var api = require("../rpcapi");
var util = require("../util");
var state = require("../state");

// TV SHOWS --------------------------------------------------------------------
function TVShowsCard() {
  Card.call(this, CARDNUM.TVSHOWS, "#card-tv-shows");
}
TVShowsCard.prototype = Object.create(Card.prototype);

TVShowsCard.prototype.show = function() {
  state.toCard(this);
  util.setHeader("TV Shows");
  util.setSubheader();
  util.showBackButton(function() {
    CARDS.INDEX.activate();
  });
  util.hideSettingsButton();
};

TVShowsCard.prototype.load = function() {
  var card = this;
  api.VideoLibrary.GetTVShows({
    properties: ['title', 'art', 'year'],
    sort: {
      order: 'ascending',
      method: 'title'
    }
  }).then(function(data) {

    card.render('tv_show_list', data.result);
    $("#tv-show-list .banner-list-item a").click(function() {
      var showId = parseInt($(this).attr('data-show-id'));
      var showName = $(this).attr('data-show-name');
      state.show = {
        tvshowid: showId,
        title: showName,
      };
      // We have to reload when a new show is selected
      CARDS.SEASONS.activate(true);
    });
    card.show();
    card.loaded = true;
  });
};

module.exports = new TVShowsCard();
