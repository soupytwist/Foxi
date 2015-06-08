module.exports = function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["connection"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<form id=\"connection-settings\">\n  <fieldset>\n    <legend>Host</legend>\n    <p>\n      <input id=\"connection-host\" type=\"text\" placeholder=\"Host\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.connection : depth0)) != null ? stack1.host : stack1), depth0))
    + "\" required>\n      <button type=\"reset\">Clear</button>\n    </p>\n    <legend class=\"action\">Port</legend>\n    <p>\n      <input id=\"connection-port\" type=\"number\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.connection : depth0)) != null ? stack1.port : stack1), depth0))
    + "\" required>\n      <button type=\"reset\">Clear</button> \n    </p>\n    <p>\n      <button type=\"button\" id=\"action-connect\" class=\"bb-button recommend\">Connect</button>\n    </p>\n  </fieldset>\n  <p class=\"error-message\"></p>\n</form>\n";
},"useData":true});

this["JST"]["detail_episode"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "    <button class=\"action\" data-verb=\"play\">\n      Play <span data-icon=\"play\"></span>\n    </button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"view detail\">\n  <img class=\"thumbnail\" src=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"view-item-actions\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.capabilities : depth0)) != null ? stack1.play : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n\n  <h1>"
    + escapeExpression(((helper = (helper = helpers.episode_title || (depth0 != null ? depth0.episode_title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"episode_title","hash":{},"data":data}) : helper)))
    + "</h1>\n  <p>"
    + escapeExpression(((helper = (helper = helpers.plot || (depth0 != null ? depth0.plot : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"plot","hash":{},"data":data}) : helper)))
    + "</p>\n</div>\n";
},"useData":true});

this["JST"]["detail_movie"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "    <button class=\"action\" data-verb=\"play\">\n      Play <span data-icon=\"play\"></span>\n    </button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"view detail\">\n  <div class=\"poster-wrapper\">\n    <img class=\"poster\" src=\""
    + escapeExpression(((helper = (helper = helpers.poster || (depth0 != null ? depth0.poster : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"poster","hash":{},"data":data}) : helper)))
    + "\">\n  </div>\n  <div class=\"view-item-actions\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.capabilities : depth0)) != null ? stack1.play : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n\n  <h2>"
    + escapeExpression(((helper = (helper = helpers.genre || (depth0 != null ? depth0.genre : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"genre","hash":{},"data":data}) : helper)))
    + " &middot; "
    + escapeExpression(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"year","hash":{},"data":data}) : helper)))
    + "</h2>\n  <p>"
    + escapeExpression(((helper = (helper = helpers.plot || (depth0 != null ? depth0.plot : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"plot","hash":{},"data":data}) : helper)))
    + "</p>\n</div>\n";
},"useData":true});

this["JST"]["detail_tvshow"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "    <button class=\"action\" data-verb=\"shuffle\">\n      Shuffle <span data-icon=\"shuffle\"></span>\n    </button>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "    <button class=\"action\" data-verb=\"play\">\n      Play <span data-icon=\"play\"></span>\n    </button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"view detail\">\n  <div class=\"poster-wrapper\">\n    <img class=\"poster\" src=\""
    + escapeExpression(((helper = (helper = helpers.poster || (depth0 != null ? depth0.poster : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"poster","hash":{},"data":data}) : helper)))
    + "\">\n  </div>\n  <div class=\"view-item-actions\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.capabilities : depth0)) != null ? stack1.shuffle : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.capabilities : depth0)) != null ? stack1.play : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n\n  <h2>"
    + escapeExpression(((helper = (helper = helpers.genre || (depth0 != null ? depth0.genre : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"genre","hash":{},"data":data}) : helper)))
    + " &middot; "
    + escapeExpression(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"year","hash":{},"data":data}) : helper)))
    + "</h2>\n  <p>"
    + escapeExpression(((helper = (helper = helpers.plot || (depth0 != null ? depth0.plot : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"plot","hash":{},"data":data}) : helper)))
    + "</p>\n</div>\n";
},"useData":true});

this["JST"]["list"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "  <li class=\"view-item\">\n    <div class=\"view-item-content\">\n      "
    + escapeExpression(lambda((depth0 != null ? depth0.content_list : depth0), depth0))
    + "\n    </div>\n    <div class=\"view-item-actions\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.capabilities : depth0)) != null ? stack1.detail : stack1), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.capabilities : depth0)) != null ? stack1.shuffle : stack1), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.capabilities : depth0)) != null ? stack1.play : stack1), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n    <div class=\"actions-shield\"></div>\n  </li>\n";
},"2":function(depth0,helpers,partials,data) {
  return "      <button class=\"action\" data-verb=\"detail\">\n        Details <span data-icon=\"info\"></span>\n      </button>\n";
  },"4":function(depth0,helpers,partials,data) {
  return "      <button class=\"action\" data-verb=\"shuffle\">\n        Shuffle <span data-icon=\"shuffle\"></span>\n      </button>\n";
  },"6":function(depth0,helpers,partials,data) {
  return "      <button class=\"action\" data-verb=\"play\">\n        Play <span data-icon=\"play\"></span>\n      </button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<ul class=\"view list\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.items : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>\n";
},"useData":true});

this["JST"]["list_episode"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<aside>\n  <img data-image-size=\"list\" src=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\">\n</aside>\n<p class=\"episode-title\">\n  "
    + escapeExpression(((helper = (helper = helpers.episode_title || (depth0 != null ? depth0.episode_title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"episode_title","hash":{},"data":data}) : helper)))
    + "\n</p>\n<p class=\"episode-number\">\n  Episode "
    + escapeExpression(((helper = (helper = helpers.episode || (depth0 != null ? depth0.episode : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"episode","hash":{},"data":data}) : helper)))
    + "\n</p>\n";
},"useData":true});

this["JST"]["list_movie"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<aside>\n  <img data-image-size=\"list\" src=\""
    + escapeExpression(((helper = (helper = helpers.poster || (depth0 != null ? depth0.poster : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"poster","hash":{},"data":data}) : helper)))
    + "\">\n</aside>\n<p class=\"movie-title\">\n  "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\n</p>\n<p class=\"movie-year\">\n  "
    + escapeExpression(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"year","hash":{},"data":data}) : helper)))
    + "\n</p>\n";
},"useData":true});

this["JST"]["list_season"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<aside>\n  <img data-image-size=\"list\" src=\""
    + escapeExpression(((helper = (helper = helpers.cover || (depth0 != null ? depth0.cover : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cover","hash":{},"data":data}) : helper)))
    + "\">\n</aside>\n<p class=\"season-label\">\n  Season "
    + escapeExpression(((helper = (helper = helpers.season || (depth0 != null ? depth0.season : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"season","hash":{},"data":data}) : helper)))
    + "\n</p>\n<p class=\"season-episode-ct\">\n  "
    + escapeExpression(((helper = (helper = helpers.episodeCount || (depth0 != null ? depth0.episodeCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"episodeCount","hash":{},"data":data}) : helper)))
    + " episodes\n</p>\n";
},"useData":true});

this["JST"]["list_source"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<a class=\"item-source selectable\">\n  <span>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n</a>\n";
},"useData":true});

this["JST"]["list_tvshow"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<a class=\"tv-banner selectable\" data-show-name=\""
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\" data-show-id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n  <img data-image-size=\"list\" src=\""
    + escapeExpression(((helper = (helper = helpers.banner || (depth0 != null ? depth0.banner : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"banner","hash":{},"data":data}) : helper)))
    + "\">\n  <span>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n</a>\n";
},"useData":true});

this["JST"]["nowplaying_episode"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<aside>\n  <img src=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\">\n</aside>\n<div class=\"nowplaying-info\">\n  <h3>"
    + escapeExpression(((helper = (helper = helpers.episode_title || (depth0 != null ? depth0.episode_title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"episode_title","hash":{},"data":data}) : helper)))
    + "</h3>\n  <h4>"
    + escapeExpression(((helper = (helper = helpers.show_title || (depth0 != null ? depth0.show_title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"show_title","hash":{},"data":data}) : helper)))
    + "</h4>\n  <h4>Season "
    + escapeExpression(((helper = (helper = helpers.season || (depth0 != null ? depth0.season : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"season","hash":{},"data":data}) : helper)))
    + ", Episode "
    + escapeExpression(((helper = (helper = helpers.episode || (depth0 != null ? depth0.episode : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"episode","hash":{},"data":data}) : helper)))
    + "</h4>\n</div>\n";
},"useData":true});

this["JST"]["nowplaying_video"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<aside>\n  <img src=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\">\n</aside>\n<div class=\"nowplaying-info\">\n  <h3>"
    + escapeExpression(((helper = (helper = helpers.line1 || (depth0 != null ? depth0.line1 : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"line1","hash":{},"data":data}) : helper)))
    + "</h3>\n  <h4>"
    + escapeExpression(((helper = (helper = helpers.line2 || (depth0 != null ? depth0.line2 : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"line2","hash":{},"data":data}) : helper)))
    + "</h4>\n  <h4>"
    + escapeExpression(((helper = (helper = helpers.line3 || (depth0 != null ? depth0.line3 : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"line3","hash":{},"data":data}) : helper)))
    + "</h4>\n</div>\n";
},"useData":true});

this["JST"]["playlist"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "  <li class=\"view-item\" data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\n    <div class=\"view-item-content\">\n      "
    + escapeExpression(lambda((depth0 != null ? depth0.content_list : depth0), depth0))
    + "\n    </div>\n    <div class=\"view-item-actions\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.capabilities : depth0)) != null ? stack1.detail : stack1), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n      <button class=\"action\" data-verb=\"remove\">\n        Remove <span data-icon=\"close\"></span>\n      </button>\n\n      <button class=\"action\" data-verb=\"play\">\n        Play <span data-icon=\"play\"></span>\n      </button>\n    </div>\n    <div class=\"actions-shield\"></div>\n  </li>\n";
},"2":function(depth0,helpers,partials,data) {
  return "      <button class=\"action\" data-verb=\"detail\">\n        Details <span data-icon=\"info\"></span>\n      </button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<button class=\"action\" id=\"playlist-clear\" class=\"action\">\n  Clear <span data-icon=\"close\"></span>\n</button>\n\n<ul class=\"view list\" id=\"playlist\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.items : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>\n";
},"useData":true});

return this["JST"];

};