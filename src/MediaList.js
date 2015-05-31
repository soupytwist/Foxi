"use strict";

import Media from './Media';
import {list} from './templates';

export default class MediaList extends Media {
  constructor(data) {
    super(data);
    this.items = [];
    Object.assign(this.capabilities, {
      shuffle: true
    });
  }

  get content() {
    return list({items: this.items});
  }

  query_list() {
    return new Promise(r => r([]));
  }
}
