var util = require("./util");

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
    if (src) {
      return new Handlebars.SafeString('<img alt="'+title+'" src="'+src+'">');
    }
    return new Handlebars.SafeString(title);
  });

  Handlebars.registerHelper('img_season_art', function() {
    var img = Handlebars.escapeExpression(this.art.poster);
    var season = Handlebars.escapeExpression(this.season);
    var src = util.getImageUrl(img);
    if (src) {
      return new Handlebars.SafeString('<img alt="'+season+'" src="'+src+'">');
    }
    return new Handlebars.SafeString(season);
  });

  Handlebars.registerHelper('img_episode_art', function() {
    var img = Handlebars.escapeExpression(this.art.thumb);
    var src = util.getImageUrl(img);
    if (src) {
      return new Handlebars.SafeString('<img alt="X" src="'+src+'">');
    }
    return new Handlebars.SafeString("X");
  });

};
