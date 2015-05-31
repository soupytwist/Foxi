"use strict";

import Card from '../js/Card';

describe('Card', () => {
  var card;
  var cardContainer;
  
  beforeEach(() => {
    cardContainer = document.createElement('div');
    cardContainer.id = 'cardContainer';
    document.body.appendChild(cardContainer);
    card = new Card();
  });

  afterEach(() => {
    document.body.removeChild(cardContainer);
  });

  it('should create a container element', () => {
    expect(cardContainer.children.length).toEqual(1);
    new Card();
    expect(cardContainer.children.length).toEqual(2);
  });

  it('should destroy its container element', () => {
    card.destroy();
    expect(cardContainer.children.length).toEqual(0);
  });
});
