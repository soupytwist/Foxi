var util = require("./util");
var DB = require("./db");
var imgUtil = require("./img");

module.exports = function(Handlebars) {

  Handlebars.registerHelper('img_thumbnail', function() {
    var img = Handlebars.escapeExpression(this.thumbnail);
    var src = util.getImageUrl(img);
    if (src) {
      return new Handlebars.SafeString('<img alt="thumb" src="'+src+'">');
    }
    return new Handlebars.SafeString('<img alt="missing" src="">');
  });

  Handlebars.registerHelper('img_banner', function() {
    var img = Handlebars.escapeExpression(this.art.banner);
    var title = Handlebars.escapeExpression(this.label);
    var src = util.getImageUrl(img);

    DB.getImage(src, function(res) {
      if (res) {
        $("img[data-cache-url='"+src+"']").attr("src", res.data);
      } else {
        imgUtil.cache(src, imgUtil.dimensions.tv_banner);
      }
    });
    
    return new Handlebars.SafeString('<img alt="'+title+'" src="/assets/banner.png" data-cache-url="'+src+'">');
  });

  Handlebars.registerHelper('tv_banner', function() {
    var title = Handlebars.escapeExpression(this.title);
    var tvshowid = Handlebars.escapeExpression(this.tvshowid);
    var img = Handlebars.escapeExpression(this.art.banner);
    var src = util.getImageUrl(img);
    
    return new Handlebars.SafeString('<a class="tv-banner" data-show-name="'+title+'" data-show-id="'+tvshowid+'"><img data-cache-url="'+src+'" src="/assets/banner.png"><span>'+title+'</span></a>');
  });

  Handlebars.registerHelper('img_season_art', function() {
    var img = Handlebars.escapeExpression(this.art.poster);
    var src = util.getImageUrl(img);
    return new Handlebars.SafeString('<img data-cache-url="'+src+'" src="/assets/movie.png">');
  });

  Handlebars.registerHelper('img_episode_art', function() {
    var img = Handlebars.escapeExpression(this.art.thumb);
    var src = util.getImageUrl(img);
    return new Handlebars.SafeString('<img data-cache-url="'+src+'" src="/assets/thumb.png">');
  });

};
