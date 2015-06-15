"use strict";

import {app, img} from './utils';

export default class Card {
  constructor(model) {
    this.model = model;
    this.elm = document.createElement('div');
    this.elm.className = "card right";
    document.getElementById('cardContainer').appendChild(this.elm);
  }

  destroy() {
    document.getElementById('cardContainer').removeChild(this.elm);
  }

  enter(dir) {
    if (dir === 1) {
      this.elm.classList.remove('right');
      this.elm.classList.add('left');
    } else {
      this.elm.classList.add('right');
      this.elm.classList.remove('left');
    }

    // Leave a slight delay so animations are applied
    this.enterTimeout = window.setTimeout(() => {
      app.windowTitle = this.title;
      app.windowSubtitle = this.subtitle;
      this.elm.classList.remove("left");
      this.elm.classList.remove("right");
    }, 50);
  }

  exit(dir) {
    if (this.enterTimeout) {
      window.clearTimeout(this.enterTimeout);
      this.enterTimeout = null;
    }
    if (dir === 1) {
      this.elm.classList.add("right");
    } else {
      this.elm.classList.add("left");
    }
  }

  get title() {
    return this.model.title;
  }

  get subtitle() {
    return this.model.subtitle;
  }

  render() {
    app.windowTitle = this.title;
    app.windowSubtitle = this.subtitle;
  }

  load() { 
    if (!this.model) {
      return new Promise((resolve, reject) => {
        reject("No model");
      });

    } else {
      return this.model.query_list();
    }
  }

  postRender() {
    img.loadImages(this.elm.getElementsByClassName('img-loader'));
  }
}
