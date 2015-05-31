"use strict";

//import kodi from './kodi';
import kodi from './kodi';
import Media from './Media';
import {movie as template} from './templates';

export default class Movie extends Media {
  get title() {
    return this.data.title || this.data.label;
  }

  get plot() {
    return this.data.plot;
  }

  get genre() {
    return this.data.genre;
  }

  get year() {
    return this.data.year;
  }

  get id() {
    return this.data.movieid;
  }

  get action_default() {
    return 'detail';
  }

  get poster() {
    var uri = decodeURIComponent(this.data.art.poster);
    if (uri.slice(0, 8) === 'image://') {
      uri = uri.slice(8, -1);
    }

    if (uri.charAt(0) === '/') {
      uri = "http://127.0.0.1:8080/vfs/" + encodeURIComponent(uri);
    }
    return uri;
  }

  get content_list() {
    return template.list(this);
  }

  get content_detail() {
    return template.detail(this);
  }

  query_detail() {
    return kodi.VideoLibrary_GetMovieDetails({
      movieid: this.id,
      properties: ['title', 'genre', 'year', 'plot', 'art']
    }).then(response => {
      let newData = response.result.moviedetails;
      if (this.data !== newData) {
        Object.assign(this.data, newData);
        return true;
      }
      return false;
    });
  }

  query_playlist() {
    return new Promise(r =>
        r([{ movieid: this.id }])
    );
  }
}
