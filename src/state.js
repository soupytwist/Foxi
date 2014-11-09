var _ = require("lodash");
var activeCard;
var subCtr = 0;

// XXX Experimental
function Observable(initialValue) {
  this.value = initialValue;
  this.subscriptions = {};
}

Observable.prototype.val = function() {
  return this.value;
};

Observable.prototype.update = function(value) {
  this.value = value;
  _.each(this.subscriptions, function(sub) {
    sub.notify(value);
  });
};

Observable.prototype.subscribe = function(cb) {
  var sub = new Subscription(this, cb);
  this.subscriptions[sub.id] = sub;
  return sub;
};

function Subscription(obs, cb) {
  this.cb = cb;
  this.obs = obs;
  this.id = "sub_" + (subCtr++);
}

Subscription.prototype.remove = function() {
  delete this.obs.subscriptions[this.id];
};

Subscription.prototype.notify = function(value) {
  this.cb(value);
};

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
