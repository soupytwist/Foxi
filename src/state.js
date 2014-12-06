var _ = require("lodash");
var Observable = require("./observable");
var activeCard;

module.exports = {
  show: null,
  season: null,
  episode: null,
  nowplaying: new Observable({}),
  player: {
    // TODO Support multiple player ids?
    id: new Observable(1), // XXX: Hardcoded for now...
    volume: new Observable(0),
    muted: new Observable(false),
    speed: new Observable(0),
    position: new Observable(-1),
    duration: new Observable(-1)
  },
  lastCard: null
};

module.exports.toCard = function(card) {
  if (activeCard === card) {
    console.log("Card: " + card.id + " is already visible, nothing to do.");
  }
  $("#main").addClass("animating");

  console.log("Showing card: " + card.id);
  // If there is no active card, just show the new one
  if (activeCard) {
    this.lastCard = activeCard;
    var dir = activeCard.num < card.num ? 'left' : 'right';
    $(activeCard.id).removeClass("card-active").addClass(dir);
    activeCard.deactivate();
  }

  $(card.id).removeClass("left right").addClass("card-active");
  activeCard = card;
};
