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
    recent: {
      width: 200, height: 112
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
      var res = {};
      
      function cb(thumbData) {
        console.log("created thumbnail for size: " + this.label + " " + this.url);
        res[this.label] = thumbData;
        try { DB.addImage(this.url, this.label, thumbData); } catch (e) { }
      }

      for (var label in sizes) {
        thumbnailsReady.push(createThumbnail(data, sizes[label]).then(cb.bind({label: label, url: url})));
      }

      Promise.all(thumbnailsReady).then(function() {
        resolve(res);
      });
    };

    xmlHTTP.send();
  });
}

function createThumbnail(src, size) {
  return new Promise(function(resolve, reject) {
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
    var size = $(elm).attr('data-image-size') || 'list';

    var p = new Promise(function(resolve, reject) {
      DB.getImage(src, size, function(res) {
        $(elm).removeAttr('data-cache-url');
        $(elm).removeAttr('data-image-size');
        if (res) {
          $(elm).on("load", resolve).attr("src", res.data).parent().addClass("cache-loaded");
        } else {
          cache(src, dims).then(function(data) {
            if (data.hasOwnProperty(size)) {
              $(elm).on("load", resolve).attr("src", data[size]).parent().addClass("cache-loaded");
            }
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
