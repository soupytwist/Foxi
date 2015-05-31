"use strict";

import kodi from './kodi';
import MediaList from './MediaList';
import Episode from './Episode';

import {season as template} from './templates';

export default class Season extends MediaList {
  get title() {
    return this.data.showtitle;
  }

  get subtitle() {
    return this.data.label;
  }

  get id() {
    return this.data.seasonid;
  }

  get season() {
    return this.data.season;
  }

  get episodeCount() {
    return this.data.episode;
  }

  get cover() {
    var uri = decodeURIComponent(this.data.art.poster);
    if (uri.slice(0, 8) === 'image://') {
      return uri.slice(8, -1);
    }
    return uri;
  }

  get content_list() {
    return template.list(this);
  }

  query_playlist() {
    return kodi.VideoLibrary_GetEpisodes({
      tvshowid: this.data.tvshowid,
      season: this.season,
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

  query_list() {
    return kodi.VideoLibrary_GetEpisodes({
      tvshowid: this.data.tvshowid,
      season: this.season,
      properties: ['title','art','episode', 'season', 'showtitle'],
      sort: {
        order: 'ascending',
        method: 'episode'
      }
    }).then(d => {
      this.items = [
        for (episodeData of d.result.episodes)
          new Episode(episodeData)
      ];
    }).catch(err => {
      console.error(err);
    });
  }
}
