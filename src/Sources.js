"use strict";

import kodi from './kodi';
import MediaList from './MediaList';
import TVShow from './TVShow';
import Movie from './Movie';
import {source as template} from './templates';

export class SourceList extends MediaList {
  constructor(data) {
    super(data);
    this.items = [
      new TVShowSource(),
      new MovieSource()
    ];

    Object.assign(this.capabilities, {
      detail: false,
      play: false,
      shuffle: false
    });
  }

  get title() {
    return "Foxi";
  }

  query_list() {
    return new Promise((resolve) => {
      resolve();
    }).catch(err => {
      console.error(err);
    });
  }
}

export class TVShowSource extends MediaList {
  constructor(...args) {
    super(...args);
    Object.assign(this.capabilities, {
      detail: false
    });
  }

  get title() {
    return "TV Shows";
  }

  get content_list() {
    return template.list(this);
  }

  query_list() {
    return kodi.VideoLibrary_GetTVShows({
      properties: ['title', 'art', 'year'],
      sort: {
        order: 'ascending',
        method: 'title'
      }
    }).then(d => {
      this.items = [
        for (showData of d.result.tvshows)
          new TVShow(showData)
      ];
    }).catch(err => {
      console.error(err);
    });
  }
}

export class MovieSource extends MediaList {
  constructor(...args) {
    super(...args);
    Object.assign(this.capabilities, {
      detail: false
    });
  }

  get title() {
    return "Movies";
  }

  get content_list() {
    return template.list(this);
  }

  query_list() {
    return kodi.VideoLibrary_GetMovies({
      properties: ['title', 'art', 'year'],
      sort: {
        order: 'ascending',
        method: 'title'
      }
    }).then(d => {
      this.items = [
        for (movieData of d.result.movies)
          new Movie(movieData)
      ];
    }).catch(err => {
      console.error(err);
    });
  }
}
