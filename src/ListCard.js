"use strict";

import Card from './Card';
import DetailCard from './DetailCard';
import {app, addTouchListener} from './utils';

export default class ListCard extends Card {
  prepare() {
    return this.model.query_list().then(() => {
      this.render();
      this.bindEvents();
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    this.elm.innerHTML = this.model.content;
  }

  bindEvents() {
    if (this.model) {
      var itemElms = this.elm.getElementsByClassName("view-item");

      /*
       * Bind click events to control each model
       */
      for (var i = 0; i < this.model.items.length; i++) {
        let itemElm = itemElms[i];
        let contentElm = itemElm.getElementsByClassName('view-item-content')[0];
        let itemModel = this.model.items[i];

        addTouchListener([contentElm], {
          onTouchStart: () => {
           itemElm.classList.add('selecting');
          },
          onTouched: () => {
            itemElm.classList.remove('selecting');
            this.action(itemModel);
          },
          onTouchCancel: () => {
            itemElm.classList.remove('selecting');
          },
          onLongTouched: () => {
            itemElm.classList.remove('selecting');
            itemElm.classList.add('selected');
          },
          yDistance: 5
        });

        let shieldElm = itemElm.getElementsByClassName('actions-shield')[0];
        shieldElm.addEventListener('click', () =>
          itemElm.classList.remove('selected')
        );

        let actionElms = itemElm.getElementsByClassName('action');
        Array.prototype.forEach.call(actionElms, actionElm => {
          let verb = actionElm.getAttribute('data-verb');
          actionElm.addEventListener('click', () => {
            this.action(itemModel, verb);
            itemElm.classList.remove('selected');
          });
        });
      }
    }
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

  action_list(model) {
    var newCard = new ListCard(model);
    newCard.prepare().then(() =>
      app.stack.push(newCard)
    );
  }

  action_detail(model) {
    var newCard = new DetailCard(model);
    newCard.prepare().then(() =>
      app.stack.push(newCard)
    );
  }
}
