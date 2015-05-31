"use strict";

import {TVShowSource} from '../js/Sources';
import TVShow from '../js/TVShow';
import kodi from '../js/kodi';
import {TVSHOWS_RESPONSE} from './fixtures';

function P(data) {
  return () => new Promise(r => { r(data); });
}

describe('TVShowSource', () => {
  var source;

  beforeEach(() => {
    source = new TVShowSource();
  });

  afterEach(() => {
  });


  it('should have a title', () => {
    expect(source.title).toEqual('TV Shows');
  });


  it('should load TV shows from kodi', (done) => {
    spyOn(kodi, 'VideoLibrary_GetTVShows')
      .and.callFake(P(TVSHOWS_RESPONSE));

    source.query_list().then(() => {
      expect(kodi.VideoLibrary_GetTVShows).toHaveBeenCalled();
      expect(source.items.length).toEqual(3);
      expect(source.items[0].title).toEqual("Sample TV Show 1");
      expect(source.items[1].title).toEqual("Sample TV Show 2");
      expect(source.items[2].title).toEqual("Sample TV Show 3");
      done();
    });
  });


  it('should render a list of TV shows', () => {
    source.items = [
      for (data of TVSHOWS_RESPONSE.result.tvshows)
        new TVShow(data)
    ];

    var tmpDOM = document.createElement('div');
    tmpDOM.innerHTML = source.content;
    expect(tmpDOM.children.length).toEqual(1);

    var list = tmpDOM.children[0];
    expect(list.getElementsByTagName('li').length).toEqual(3);
  });

});
