var _ = require("lodash");
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
  this.notifySubscribers();
};

Observable.prototype.throttledUpdate = function(value, threshold) {
  this.value = value;
  if (this.throttleTimer) {
    clearTimeout(this.throttleTimer);
  }
  this.throttleTimer = setTimeout(this.notifySubscribers.bind(this), threshold);
};

Observable.prototype.notifySubscribers = function() {
  _.each(this.subscriptions, function(sub) {
    sub.notify(this.value);
  }, this);

  if (this.throttleTimer) {
    clearTimeout(this.throttleTimer);
    delete this.throttleTimer;
  }
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

module.exports = Observable;
