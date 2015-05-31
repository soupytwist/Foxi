"use strict";

import Handlebars from 'handlebars';
import template_src from './views/template_src';

var partial = (fct) => ((ctx) => new Handlebars.SafeString(fct(ctx)));
var T = template_src.call({}, Handlebars);

Handlebars.registerHelper('hasProperty', function(val) {
  return val !== undefined;
});

export default Handlebars;

export var list = T.list;

export var playlist = T.playlist;

export var source = {
  list:   partial(T.list_source)
};

export var tvshow  = {
  list:   partial(T.list_tvshow),
  detail: partial(T.detail_tvshow)
};

export var season = {
  list:   partial(T.list_season),
  //detail: partial(T.detail_season)
};

export var episode = {
  list:   partial(T.list_episode),
  detail: partial(T.detail_episode)
};

export var movie = {
  list:   partial(T.list_movie),
  detail: partial(T.detail_movie)
};

export var nowplaying = {
  video:   partial(T.nowplaying_video),
  episode: partial(T.nowplaying_episode)
};

export var connection = T.connection;
