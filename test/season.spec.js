"use strict";

import Season from '../js/Season';
import Episode from '../js/Episode';
import kodi from '../js/kodi';
import {SEASON_SAMPLE, EPISODES_RESPONSE} from './fixtures';

function P(data) {
  return () => new Promise(r => { r(data); });
}

describe('Season', () => {
  var season;

  beforeEach(() => {
    season = new Season(SEASON_SAMPLE[0]);
  });

  afterEach(() => {
  });


  it('should have a season number', () => {
    expect(season.season).toEqual(1);
  });


  it('should load episodes from kodi', (done) => {
    spyOn(kodi, 'VideoLibrary_GetEpisodes')
      .and.callFake(P(EPISODES_RESPONSE));

    season.query_list().then(() => {
      expect(kodi.VideoLibrary_GetEpisodes).toHaveBeenCalled();
      expect(season.items.length).toEqual(2);
      expect(season.items[0].episode).toEqual(1);
      expect(season.items[1].episode).toEqual(2);
      done();
    });
  });


  it('should render a list of episodes', () => {
    season.items = [
      for (data of EPISODES_RESPONSE.result.episodes)
        new Episode(data)
    ];

    var tmpDOM = document.createElement('div');
    tmpDOM.innerHTML = season.content;
    expect(tmpDOM.children.length).toEqual(1);

    var list = tmpDOM.children[0];
    expect(list.getElementsByTagName('li').length).toEqual(2);
  });
});
