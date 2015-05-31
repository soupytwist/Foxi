"use strict";

import kodi from './kodi';
import MediaList from './MediaList';
import Episode from './Episode';
import {playlist as playlist_tpl, episode as episode_tpl} from './templates';

export default class Playlist extends MediaList {
  constructor(...args) {
    super(...args);
    Object.assign(this.capabilities, {
      detail: false
    });
  }

  get title() {
    return "Now Playing";
  }

  get content() {
    return playlist_tpl({items: this.items});
  }

  get content_list() {
    return episode_tpl.list(this);
  }

  query_list() {
    return kodi.Playlist_GetItems({
      playlistid: this.data.playlistid,
      properties: ['title', 'tvshowid', 'season', 'episode', 'showtitle', 'art']
    }).then(d => {
      this.items = [];
      d.result.items.forEach(itemData => {
        switch(itemData.type) {
          case 'episode':
            itemData.episodeid = itemData.id;
            this.items.push(new Episode(itemData));
            break;
        }
      });
    }).catch(err => {
      console.error(err);
    });
  }
}
