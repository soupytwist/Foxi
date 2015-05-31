"use strict";

import TVShow from '../js/TVShow';
import Season from '../js/Season';
import kodi from '../js/kodi';
import {TVSHOW_SAMPLE, SEASONS_RESPONSE} from './fixtures';

function P(data) {
  return () => new Promise(r => { r(data); });
}

describe('TVShow', () => {
  var tvshow;

  beforeEach(() => {
    tvshow = new TVShow(TVSHOW_SAMPLE[0]);
  });

  afterEach(() => {
  });


  it('should have a title', () => {
    expect(tvshow.title).toEqual('Sample TV Show 1');
  });


  it('should load seasons from kodi', (done) => {
    spyOn(kodi, 'VideoLibrary_GetSeasons')
      .and.callFake(P(SEASONS_RESPONSE));

    tvshow.query_list().then(() => {
      expect(kodi.VideoLibrary_GetSeasons).toHaveBeenCalled();
      expect(tvshow.items.length).toEqual(3);
      expect(tvshow.items[0].season).toEqual(1);
      expect(tvshow.items[1].season).toEqual(2);
      expect(tvshow.items[2].season).toEqual(3);
      done();
    });
  });


  it('should render a list of seasons', () => {
    tvshow.items = [
      for (data of SEASONS_RESPONSE.result.seasons)
        new Season(data)
    ];

    var tmpDOM = document.createElement('div');
    tmpDOM.innerHTML = tvshow.content;
    expect(tmpDOM.children.length).toEqual(1);

    var list = tmpDOM.children[0];
    expect(list.getElementsByTagName('li').length).toEqual(3);
  });
});
