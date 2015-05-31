"use strict";

import kodi from './kodi';

export default class Media {
  constructor(data) {
    this.data = data;
    this.capabilities = {
      detail: 'content_detail' in this,
      play: true
    };
  }

  get title() {
    return this.data.label;
  }

  get content_list() {
    return this.title;
  }

  get subtitle() {
    return "";
  }

  get thumbnail() {
    return "/assets/thumb.png";
  }

  get action_default() {
    return 'list';
  }

  query_playlist() {
    return new Promise(r => r([]));
  }

  query_detail() {
    return new Promise(r => r(false));
  }

  playlist() {
    return kodi.Playlist_Clear({
      playlistid: 0
    }).then(() =>
      this.query_playlist().then(playlist => {
        kodi.Playlist_Add({
          playlistid: 0,
          item: playlist
        });
        return { playlistid: 0 };
      })
    );
  }

  play(options) {
    var defaults = {
      shuffled: false
    };
    this.playlist().then(playlist =>
      kodi.Player_Open({
        item: playlist,
        options: Object.assign({}, defaults, options)
      })
    );
  }

  shuffle(options) {
    this.play(Object.assign({}, options, {shuffled: true}));
  }

  getPlayerItem() {
    throw new Error("Playable.getPlayerItem() not implemented");
  }
}
