"use strict";

import kodi from './kodi';
import MediaList from './MediaList';
import Season from './Season';

import {tvshow as template} from './templates';

export default class TVShow extends MediaList {
  get title() {
    return this.data.title || this.data.label;
  }

  get id() {
    return this.data.tvshowid;
  }

  get banner() {
    var uri = decodeURIComponent(this.data.art.banner);
    if (uri.slice(0, 8) === 'image://') {
      return uri.slice(8, -1);
    }
    return uri;
  }

  get poster() {
    var uri = decodeURIComponent(this.data.art.poster);
    if (uri.slice(0, 8) === 'image://') {
      return uri.slice(8, -1);
    }
    return uri;
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

  get content_list() {
    return template.list(this);
  }

  get content_detail() {
    return template.detail(this);
  }

  query_playlist() {
    return kodi.VideoLibrary_GetEpisodes({
      tvshowid: this.id,
      properties: [],
      sort: {
        order: 'ascending',
        method: 'episode'
      }
    }).then(playlist =>
      playlist.result.episodes.map(ep => {
        return { episodeid: ep.episodeid };
      })
    );
  }

  query_detail() {
    return kodi.VideoLibrary_GetTVShowDetails({
      tvshowid: this.id,
      properties: ['title', 'genre', 'year', 'plot', 'art']
    }).then(response => {
      let newData = response.result.tvshowdetails;
      if (this.data !== newData) {
        Object.assign(this.data, newData);
        return true;
      }
      return false;
    });
  }

  query_list() {
    return kodi.VideoLibrary_GetSeasons({
      tvshowid: this.id,
      properties: ['tvshowid', 'showtitle', 'season', 'art', 'episode'],
      sort: {
        order: 'ascending',
        method: 'season'
      }
    }).then(d => {
      this.items = [
        for (seasonData of d.result.seasons)
          new Season(seasonData)
      ];
    }).catch(err => {
      console.error(err);
    });
  }
}
