"use strict";

import kodi from './kodi';
import Media from './Media';

import {episode as template} from './templates';

export default class Episode extends Media {
  get title() {
    return this.data.showtitle;
  }

  get subtitle() {
    if (this.data.season !== undefined) {
      return `Season ${this.data.season}`;
    }
    return undefined;
  }

  get episode_title() {
    return this.data.title;
  }

  get id() {
    return this.data.episodeid || this.data.id;
  }

  get show_title() {
    return this.data.showtitle;
  }

  get season() {
    return this.data.season;
  }

  get episode() {
    return this.data.episode;
  }

  get thumbnail() {
    var uri = decodeURIComponent(this.data.art.thumb);
    if (uri.slice(0, 8) === 'image://') {
      return uri.slice(8, -1);
    }
    return uri;
  }

  get plot() {
    return this.data.plot;
  }

  get content_list() {
    return template.list(this);
  }

  get content_detail() {
    return template.detail(this);
  }

  get action_default() {
    return 'detail';
  }

  query_playlist() {
    return new Promise(r =>
        r([{ episodeid: this.id }])
    );
  }

  query_detail() {
    return kodi.VideoLibrary_GetEpisodeDetails({
      episodeid: this.id,
      properties: ['title', 'plot', 'season', 'showtitle', 'art']
    }).then(response => {
      let newData = response.result.episodedetails;
      if (this.data !== newData) {
        Object.assign(this.data, newData);
        return true;
      }
      return false;
    });
  }

}
