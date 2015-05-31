"use strict";

import Card from './Card';

export default class DetailCard extends Card {
  prepare() {
    this.render();
    this.bindEvents();

    this.model.query_detail().then(update => {
      if (update) {
        this.render();
        this.bindEvents();
      }
    }).catch(err => {
      console.error(err);
    });

    return new Promise(r => r());
  }

  render() {
    super.render();
    this.elm.innerHTML = this.model.content_detail;
  }

  bindEvents() {
    let actionElms = this.elm.getElementsByClassName('action');
    Array.prototype.forEach.call(actionElms, actionElm => {
      let verb = actionElm.getAttribute('data-verb');
      actionElm.addEventListener('click', () => {
        this.action(this.model, verb);
      });
    });
  }

  action(model, verb) {
    var action = 'action_' + (verb || model.action_default);
    if (typeof this[action] === 'function') {
      this[action](model);
    }
  }

  action_play(model) {
    model.play();
  }

  action_shuffle(model) {
    model.shuffle();
  }
}
