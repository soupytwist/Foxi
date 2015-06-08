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
      var position = 0;
      if ('items' in d.result) {
        d.result.items.forEach(itemData => {
          itemData.playlistPosition = position++;
          switch(itemData.type) {
            case 'episode':
              this.items.push(new Episode(itemData));
              break;
          }
        });
      }
    }).catch(err => {
      console.error(err);
    });
  }

  clear() {
    return kodi.Playlist_Clear({
      playlistid: this.data.playlistid
    }).then(() => {
      this.items = [];
    });
  }

  remove(pos) {
    return kodi.Playlist_Remove({
      playlistid: this.data.playlistid,
      position: pos
    }).then(() => {
      this.items.splice(pos,pos);
    });
  }

  goTo(pos) {
    return kodi.Player_Open({
      item: {
        playlistid: this.data.playlistid,
        position: pos
      }
    });
  }
}
