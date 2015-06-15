"use strict";

import FoxiDB from './db';

var _app = {};
var _lastCard;
var _rewindedCard;
var _isDialog;

export var app = {
  get windowTitle() {
    return _app.windowTitle;
  },

  set windowTitle(title) {
    _app.windowTitle = title;
    document.getElementById('window-title').innerHTML = title || '';
  },

  get windowSubtitle() {
    return _app.windowSubtitle;
  },

  set windowSubtitle(subtitle) {
    _app.windowSubtitle = subtitle;
    document.getElementById('window-subtitle').innerHTML = subtitle || '';
  },

  setConnectionEstablished(val) {
    var app = document.getElementById('app');
    if (val && app.classList.contains('disconnected')) {
      app.classList.remove('disconnected');
    } else if (!val && !app.classList.contains('disconnected')) {
      app.classList.add('disconnected');
    }
  },

  setBackButton(show) {
    var but = document.getElementById('back-button');
    var visible = but.classList.contains('visible');

    if (show && !visible) {
      but.classList.add('visible');
    } else if (!show && visible) {
      but.classList.remove('visible');
    }

    if (_isDialog) {
      but.setAttribute('data-icon', 'close');
    } else {
      but.setAttribute('data-icon', 'back');
    }
  },

  setConnectingDialogVisible(val) {
    let dialog = document.getElementById('dialog-connecting');
    if (!val && dialog.classList.contains('connecting')) {
      dialog.classList.remove('connecting');
    } else if (val && !dialog.classList.contains('connecting')) {
      dialog.classList.add('connecting');
    }
  },

  stack: {
    _stack: [],
    push(card) {
      let _stack = app.stack._stack;
      let topCard = _stack.length > 0 ? _stack.slice(-1)[0] : null;
      if (topCard !== null) {
        if (_isDialog) {
          _stack.splice(-1);
          topCard.exit(1);
        } else {
          topCard.exit(-1);
        }
      }
      _stack.push(card);
      card.enter(-1);
      _isDialog = card.isDialog;

      if (_lastCard) {
        _lastCard.destroy();
        _lastCard = null;
      }

      app.setBackButton(_stack.length > 1);
    },
    pop() {
      let _stack = app.stack._stack;
      let topCard = _stack.length > 0 ? _stack.splice(-1)[0] : null;
      if (topCard !== null) {
        topCard.exit(1);
        if (_lastCard) {
          _lastCard.destroy();
        }
        _lastCard = topCard;

        let nextCard = _stack.length > 0 ? _stack[_stack.length-1] : null;
        if (nextCard !== null) {
          nextCard.enter(1);
          _isDialog = nextCard.isDialog;
        }
      }

      app.setBackButton(_stack.length > 1);
    },
    top() {
      if (app.stack._stack.length > 0) {
        return app.stack._stack.slice(-1)[0];
      }
      return null;
    },
    count() {
      return app.stack._stack.length;
    },
    fastForward() {
      if (_rewindedCard) {
        let topCard = app.stack._stack.slice(-1)[0];
        _rewindedCard.exit(-1);
        topCard.enter(-1);
        _rewindedCard = null;
        app.setBackButton(true);
      }
    },
    rewind() {
      if (!_rewindedCard) {
        let topCard = app.stack._stack.slice(-1)[0];
        let bottomCard = app.stack._stack[0];
        topCard.exit(1);
        bottomCard.enter(1);
        _rewindedCard = bottomCard;
        app.setBackButton(false);
      }
    },
    rewindUntil(predicate) {
      var stack = app.stack._stack;
      for (var i = stack.length - 1; i >= 0; i--) {
        if (predicate(stack[i])) {
          break;
        }
      }

      if (i >= 0 && i < stack.length) {
        for (var j = stack.length - 1; j > i; j--) {
          app.stack.pop();
        }
        return true;
      }
      return false;
    }
  }
};

export var mixin = function Mixin(Parent, ...mixins) {
  class Mixed extends Parent {}
  Object.assign(Mixed.prototype, ...mixins);
  return Mixed;
};

function getTouchXY(evt) {
  return [evt.touches[0].screenX, evt.touches[0].screenY];
}

function getClickXY(evt) {
  return [evt.clientX, evt.clientY];
}

export var addTouchListener = function(elms, opts) {
  var touchEvents = 'ontouchstart' in document.documentElement,
      touchstart = touchEvents ? 'touchstart' : 'mousedown',
      touchend = touchEvents ? 'touchend' : 'mouseup',
      touchmove = touchEvents ? 'touchmove' : 'mousemove',
      getXY = touchEvents ? getTouchXY : getClickXY,
      onSwipeRight  = opts.onSwipeRight   || opts.onSwipe,
      onSwipeLeft   = opts.onSwipeLeft    || opts.onSwipe,
      onSwipeUp     = opts.onSwipeUp      || opts.onSwipe,
      onSwipeDown   = opts.onSwipeDown    || opts.onSwipe,
      xDistance     = opts.xDistance      || opts.distance || 100,
      yDistance     = opts.yDistance      || opts.distance || 100,
      longtouchTime = opts.longTouchTime  || 1000;

  elms.forEach(elm => {
    let touchTimer = null, touching = false, touchX, touchY;

    function trackMovement(evt) {
      let [evtX, evtY] = getXY(evt), cancelled = false;

      if (Math.abs(evtX - touchX) >= xDistance) {
        if (evtX > touchX) {
          if (onSwipeRight) { onSwipeRight(elm); }
          cancelled = true;
        } else if (evtX < touchX) {
          if (onSwipeLeft) { onSwipeLeft(elm); }
          cancelled = true;
        }
      } else if (Math.abs(evtY - touchY) >= yDistance) {
        if (evtY > touchY) {
          if (onSwipeDown) { onSwipeDown(elm); }
          cancelled = true;
        } else if (evtY < touchY) {
          if (onSwipeUp) { onSwipeUp(elm); }
          cancelled = true;
        }
      }
      
      if (cancelled) {
        if (touchTimer !== null) {
          window.clearTimeout(touchTimer);
          touchTimer = null;
        }
        if ('onTouchCancel' in opts) {
          opts.onTouchCancel(elm);
        }
        window.removeEventListener(touchmove, trackMovement);
        touching = false;
      }

      evt.stopPropagation();
      
      if (opts.preventScroll) {
        evt.preventDefault();
      }
    }

    elm.addEventListener(touchstart, evt => {
      [touchX, touchY] = getXY(evt);
      if ('onTouchStart' in opts) {
        opts.onTouchStart(elm);
      }
      if ('onLongTouched' in opts) {
        touchTimer = window.setTimeout(() => {
          touchTimer = null;
          window.removeEventListener(touchmove, trackMovement);
          opts.onLongTouched(elm);
        }, longtouchTime);
      }
      touching = true;

      evt.stopPropagation();
      if (opts.preventScroll) {
        evt.preventDefault();
      }

      window.addEventListener(touchmove, trackMovement);
    });

    elm.addEventListener(touchend, evt => {
      if (!touching) {
        return;
      }
      if ('onTouched' in opts &&
        !('onLongTouched' in opts && touchTimer === null)) {
        opts.onTouched(elm);
        if (touchTimer !== null) {
          window.clearTimeout(touchTimer);
          touchTimer = null;
        }
      }
      window.removeEventListener(touchmove, trackMovement);

      evt.stopPropagation();
      if (opts.preventScroll) {
        evt.preventDefault();
      }

      touching = false;
    });
  });
};

var fxos_imgLoader = {
  loadImage(url, res) {
    console.log("Loading via FXOS Loader");
    var sizes = {low: {width: 320, height: 60}};
    
    return new Promise((resolve) => {
      FoxiDB.getImage(url, res, function(result) {
        if (result) {
          return resolve(result.data);
        } else {
          fxos_imgLoader.cache(url, sizes).then(function(data) {
            resolve(data[res]);
          });
        }
      });
    });
  },

  cache(url, sizes) {
    console.log("[CACHE MISS] " + url);

    return new Promise((resolve) => {
      // mozSystem: Allow cross-domain requests in privileged app
      var xmlHTTP = new XMLHttpRequest({ mozSystem: true, mozAnon: true });
      xmlHTTP.open('GET', url, true);

      // Must include this line - specifies the response type we want
      xmlHTTP.responseType = 'arraybuffer';

      xmlHTTP.onload = function() {
        console.log("Loaded src for " + url);
        var arr = new Uint8Array(this.response);
        var raw = Uint8ToString(arr);

        var b64 = btoa(raw);
        var data ="data:image/jpeg;base64,"+b64;
        console.log("Encoded " + url);

        var thumbnailsReady = [];
        var res = {};
        
        for (var label in sizes) {
          if (sizes.hasOwnProperty(label)) {
            thumbnailsReady.push(fxos_imgLoader.createThumbnail(data, sizes[label]).then(thumbData => {
              console.log("created thumbnail for size: " + label + " " + url);
              res[label] = thumbData;
              try { FoxiDB.addImage(url, label, thumbData); } catch (e) { }
            }));
          }
        }

        Promise.all(thumbnailsReady).then(function() {
          resolve(res);
        });
      };

      xmlHTTP.send();
    });
  },

  createThumbnail(src, size) {
    return new Promise(function(resolve) {
      console.log("Creating thumbnail ["+size.width+"x"+size.height+"]");
      var img = new Image();

      img.onload = function() {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = size.width;
        canvas.height = size.height;
        ctx.drawImage(img, 0, 0, size.width, size.height);
        resolve(canvas.toDataURL("image/png"));
      };

      img.src = src;
    });
  }
};

function Uint8ToString(u8a){
  const CHUNK_SZ = 200000;
  var c = [];
  for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
    c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
  }
  return c.join("");
}

var generic_imgLoader = {
  loadImage(url) {
    return new Promise(r => r(url));
  }
};

var imgLoader = generic_imgLoader;

export var img = {
  loadImages(elements) {
    // Convert to array, HTMLCollection is lazy-loading and
    // removing the class in this loop affects the query
    var elmArray = [].slice.call(elements);

    elmArray.forEach(elm => {
      let res = elm.getAttribute('data-res') || 'low';
      let url = elm.getAttribute('data-url');
      elm.classList.remove('img-loader');

      imgLoader.loadImage(url, res).then(src => {
        elm.setAttribute('src', src);
      });
    });
  }
};

// Detect if FxOS-specific features are available
if (window.navigator.mozApps) {
  var request = window.navigator.mozApps.getSelf();
  request.onsuccess = function() {
    if ('systemXHR' in request.result.manifest.permissions) {
      FoxiDB.init(() => { console.log("FoxiDB opened"); });
      imgLoader = fxos_imgLoader;
    }
  };
}
