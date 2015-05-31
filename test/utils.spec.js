"use strict";

import Card from '../js/Card';
import {app} from '../js/utils';

describe('utils', () => {
  var elms = {};
  
  beforeEach(() => {
    elms.cardContainer = document.createElement('div');
    spyOn(document, 'getElementById').and.callFake((id) => elms[id]);
  });

  afterEach(() => {
    app.stack._stack = [];
  });

  describe('#app', () => {

    it('should show the back button when more than one card is on the stack', () => {
      var card1 = new Card();
      var card2 = new Card();

      spyOn(card1, 'enter');
      spyOn(card1, 'exit');
      spyOn(card2, 'enter');
      spyOn(card2, 'exit');
      spyOn(app, 'setBackButton');

      // First card is pushed
      app.stack.push(card1);
      expect(card1.enter).toHaveBeenCalledWith(-1);
      expect(card1.exit.calls.count()).toEqual(0);

      // Stays hidden with only one card on the stack
      expect(app.setBackButton).toHaveBeenCalledWith(false);
      app.setBackButton.calls.reset();

      // Second card is pushed
      app.stack.push(card2);
      expect(card2.enter).toHaveBeenCalledWith(-1);
      expect(card1.exit).toHaveBeenCalledWith(-1);

      // Should be shown with two cards on the stack
      expect(app.setBackButton).toHaveBeenCalledWith(true);
      app.setBackButton.calls.reset();

      card1.enter.calls.reset();
      app.stack.pop();
      expect(card1.enter).toHaveBeenCalledWith(1);
      expect(card2.exit).toHaveBeenCalledWith(1);

      // Is hidden with only one card on the stack
      expect(app.setBackButton).toHaveBeenCalledWith(false);
    });

  });

});
