"use strict";

import ListCard from './ListCard';
import DetailCard from './DetailCard';
import {app} from './utils';

export default class PlaylistCard extends ListCard {
  bindEvents() {
    super.bindEvents();

    var clear_btn = document.getElementById('playlist-clear');
    clear_btn.addEventListener('click', () => {
      this.model.clear().then(this.prepare.bind(this));
    });
  }

  action_play(model) {
    this.model.goTo(model.playlist_position).then(this.prepare.bind(this));
  }

  action_remove(model) {
    if (model.playlist_position) {
      this.model.remove(model.playlist_position).then(this.prepare.bind(this));
    }
  }

  action_detail(model) {
    var newCard = new DetailCard(model);
    newCard.prepare().then(() =>
      app.stack.push(newCard)
    );
  }
}
