"use strict";

import ListCard from '../js/ListCard';

describe('ListCard', () => {
  var cardContainer;
  
  beforeEach(() => {
    cardContainer = document.createElement('div');
    cardContainer.id = 'cardContainer';
    document.body.appendChild(cardContainer);
  });

  afterEach(() => {
    document.body.removeChild(cardContainer);
  });


  describe('#render', () => {

    it('should show content of its model', () => {
      var testHTML = '<span>test content</span>';
      var testModel = {content: testHTML};
      var card = new ListCard(testModel);

      expect(card.elm.innerHTML).toEqual('');
      
      card.render();
      expect(card.elm.innerHTML).toEqual(testHTML);
    });

  });


  describe('#bindEvents', () => {

    it('should bind select click events', () => {
      var model1 = {default_action: 'list'}, model2 = {default_action: 'play'},
          card = new ListCard({items: [model1, model2]}),
          item1 = document.createElement('div'),
          item2 = document.createElement('div'),
          content1 = document.createElement('div'),
          content2 = document.createElement('div');

      spyOn(item1, 'getElementsByClassName').and.callFake(name => {
        switch(name) {
          case 'view-item-content': return [content1];
          case 'actions-shield': return [document.createElement('div')];
          default: return [];
        }
      });

      spyOn(item2, 'getElementsByClassName').and.callFake(name => {
        switch(name) {
          case 'view-item-content': return [content2];
          case 'actions-shield': return [document.createElement('div')];
          default: return [];
        }
      });

      spyOn(card.elm, 'getElementsByClassName').and.callFake(name => {
        switch(name) {
          case 'view-item': return [item1, item2];
          default: return [document.createElement('div')];
        }
      });

      spyOn(content1, 'addEventListener');
      spyOn(content2, 'addEventListener');

      // Event listeners should be setup
      card.bindEvents();
      expect(content1.addEventListener).toHaveBeenCalled();
      expect(content2.addEventListener).toHaveBeenCalled();
    });


    it('should bind action click events', () => {
      var model = {play(){}, shuffle(){}},
          card = new ListCard({items: [model]}),
          item = document.createElement('div'),
          actions = {
            play: document.createElement('button'),
            shuffle: document.createElement('button'),
            details: document.createElement('button')
          };

      spyOn(card.elm, 'getElementsByClassName').and.callFake(name => {
        switch(name) {
          case 'view-item': return [item];
          default: return [document.createElement('div')];
        }
      });

      spyOn(item, 'getElementsByClassName').and.callFake(name =>
        name === 'action' ?
          Object.values(actions) : [ document.createElement('div') ]
      );

      Object.keys(actions).forEach(verb => {
        actions[verb].setAttribute('data-verb', verb);
        spyOn(actions[verb], 'addEventListener').and.callThrough();
      });

      // Event listeners should be added
      card.bindEvents();
      expect(actions.play.addEventListener).toHaveBeenCalled();
      expect(actions.shuffle.addEventListener).toHaveBeenCalled();
    });

  });


  it('should set the window title and subtitle', () => {
    var card = new ListCard({
      title: 'Card Title',
      subtitle: 'Card Subtitle',
    });

    // Almost pass-through the timed function
    spyOn(window, 'setTimeout').and.callFake(f => f());

    // Fake DOM elements
    var fakeHeader = document.createElement('h1');
    var fakeSubheader = document.createElement('h2');
    var fakeApp = document.createElement('div');

    // Return fake DOM elements by ID
    spyOn(document, "getElementById").and.callFake(id => {
      switch(id) {
        case 'window-title':     return fakeHeader;
        case 'window-subtitle':  return fakeSubheader;
        case 'app':              return fakeApp;
      }
    });

    // Activate the card and check that the DOM is updated
    card.enter();
    expect(fakeHeader.innerHTML).toBe('Card Title');
    expect(fakeSubheader.innerHTML).toBe('Card Subtitle');
  });


});
