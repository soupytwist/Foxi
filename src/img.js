var DB = require("./db");

var dimensions = {
  tv_banner: {
    list: {
      width: 320, height: 60
    }
  },
  tv_season: {
    list: {
      width: 98, height: 142
    }
  },
  tv_thumb: {
    list: {
      width: 98, height: 55
    },
    hq: {
      width: 320, height: 180
    }
  },
  movie: {
    list: {
      width: 98, height: 142
    },
    hq: {
      width: 320, height: 457
    }
  }
};

function cache(url, sizes, whenLoaded) {
  console.log("[CACHE MISS] " + url);

  return new Promise(function(resolve, reject) {
    // mozSystem: Allow cross-domain requests in privileged app
    var xmlHTTP = new XMLHttpRequest({ mozSystem: true, mozAnon: true });
    xmlHTTP.open('GET', url, true);

    // Must include this line - specifies the response type we want
    xmlHTTP.responseType = 'arraybuffer';

    xmlHTTP.onload = function(e)
    {
      console.log("Loaded src for " + url);
      var arr = new Uint8Array(this.response);
      var raw = Uint8ToString(arr);

      var b64 = btoa(raw);
      var data ="data:image/jpeg;base64,"+b64;
      console.log("Encoded " + url);

      var thumbnailsReady = [];

      for (var label in sizes) {
        //XXX
        /* jshint ignore:start */
        thumbnailsReady.push(createThumbnail(data, sizes[label]).then(function(thumbData) {
          // TODO Store by size
          DB.addImage(url, thumbData);
          return thumbData;
        }));
        /* jshint ignore:end */
        // TODO Just makes on thumb for now
        break;
      }

      Promise.all(thumbnailsReady).then(function(thumbs) {
        // TODO Callback with correct thumb
        resolve(thumbs[0]);
      });
    };

    xmlHTTP.send();
  });
}

function createThumbnail(src, size) {
  return new Promise(function(resolve, reject) {
    console.log("Creating thumbnail ["+size.width+"x"+size.height+"] of " + src);
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

function Uint8ToString(u8a){
  var CHUNK_SZ = 200000;
  var c = [];
  for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
    c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
  }
  return c.join("");
}

function loadImages(elements, dims, timeout) {
  var imgLoads = [];

  $(elements).forEach(function(elm) {
    var src = $(elm).attr('data-cache-url');

    var p = new Promise(function(resolve, reject) {
      DB.getImage(src, function(res) {
        $(elm).removeAttr('data-cache-url');
        if (res) {
          $(elm).on("load", resolve).attr("src", res.data).parent().addClass("cache-loaded");
        } else {
          cache(src, dims).then(function(data) {
            $(elm).on("load", resolve).attr("src", data).parent().addClass("cache-loaded");
          });
        }
      });
    });

    imgLoads.push(p);
  });

  var timer = new Promise(function(resolve,reject) {
    if (timeout) {
      window.setTimeout(resolve,timeout);
    }
  });

  return Promise.race([timer, Promise.all(imgLoads)]);
}

module.exports.cache = cache;
module.exports.dimensions = dimensions;
module.exports.loadImages = loadImages;
