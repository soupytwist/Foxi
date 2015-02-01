var util = require("./util");
var DB = require("./db");
var imgUtil = require("./img");

module.exports = function(Handlebars) {

  Handlebars.registerHelper('img_thumbnail', function() {
    var img = Handlebars.escapeExpression(this.thumbnail);
    var src = util.getImageUrl(img);
    if (src) {
      return new Handlebars.SafeString('<img alt="thumb" data-image-size="list" src="'+src+'">');
    }
    return new Handlebars.SafeString('<img alt="missing" src="">');
  });

  Handlebars.registerHelper('tv_banner', function() {
    var title = Handlebars.escapeExpression(this.title);
    var tvshowid = Handlebars.escapeExpression(this.tvshowid);
    var img = Handlebars.escapeExpression(this.art.banner);
    var src = util.getImageUrl(img);
    
    return new Handlebars.SafeString('<a class="tv-banner selectable" data-show-name="'+title+'" data-show-id="'+tvshowid+'"><img data-image-size="list" data-cache-url="'+src+'" src="/assets/banner.png"><span>'+title+'</span></a>');
  });

  Handlebars.registerHelper('img_season_art', function() {
    var img = Handlebars.escapeExpression(this.art.poster);
    var src = util.getImageUrl(img);
    return new Handlebars.SafeString('<img data-image-size="list" data-cache-url="'+src+'" src="/assets/movie.png">');
  });

  Handlebars.registerHelper('img_movie_art', function() {
    var img = Handlebars.escapeExpression(this.art.poster);
    var src = util.getImageUrl(img);
    return new Handlebars.SafeString('<img data-image-size="list" data-cache-url="'+src+'" src="/assets/movie.png">');
  });

  Handlebars.registerHelper('img_movie_art_hq', function() {
    var img = Handlebars.escapeExpression(this.art.poster);
    var src = util.getImageUrl(img);
    return new Handlebars.SafeString('<img data-image-size="hq" data-cache-url="'+src+'" src="/assets/movie.png">');
  });

  Handlebars.registerHelper('img_episode_art', function() {
    var img = Handlebars.escapeExpression(this.art.thumb);
    var src = util.getImageUrl(img);
    return new Handlebars.SafeString('<img data-image-size="list" data-cache-url="'+src+'" src="/assets/thumb.png">');
  });

  Handlebars.registerHelper('img_episode_art_recent', function() {
    var img = Handlebars.escapeExpression(this.art.thumb);
    var src = util.getImageUrl(img);
    return new Handlebars.SafeString('<img data-image-size="recent" data-cache-url="'+src+'" src="/assets/thumb.png">');
  });

  Handlebars.registerHelper('img_episode_art_hq', function() {
    var img = Handlebars.escapeExpression(this.art.thumb);
    var src = util.getImageUrl(img);
    return new Handlebars.SafeString('<img data-image-size="hq" data-cache-url="'+src+'" src="/assets/thumb.png">');
  });
};
