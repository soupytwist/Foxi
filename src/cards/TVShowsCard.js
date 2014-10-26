var Card = require("./Card");
var CARDS = require("./cards").CARDS;
var CARDNUM = require("./cards").CARDNUM;
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
  util.setHeader();
  util.setSubheader();
  util.hideBackButton();
  util.showSettingsButton(function() {
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

module.exports = new TVShowsCard();
