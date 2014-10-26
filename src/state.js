var _ = require("lodash");
var activeCard;
var subCtr = 0;

function toCard(card) {
  $("#main").addClass("animating");

  console.log("Showing card: " + card.id);
  // If there is no active card, just show the new one
  if (activeCard) {
    var dir = activeCard.num < card.num ? 'left' : 'right';
    $(activeCard.id).removeClass("card-active").addClass(dir);
    activeCard.deactivate();
  }

  $(card.id).removeClass("left right").addClass("card-active");
  activeCard = card;
}

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
  console.log("Updated " + value);
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
  console.log("Notified " + value);
  this.cb(value);
};

module.exports = {
  show: null,
  season: null,
  episode: null,
  nowplaying: new Observable({}),
  player: {
    volume: new Observable(0),
    muted: new Observable(false),
    playspeed: 0,
    position: 0,
    duration: 0
  }
};

module.exports.toCard = toCard;
