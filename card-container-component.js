/*!
 * Card Container Component.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
import angular from 'angular';
import jsonld from 'jsonld';
import _ from 'lodash';

export default {
  bindings: {
    cards: '<brCards',
    cardType: '<brCardType'
  },
  controller: Ctrl,
  templateUrl:
    'bedrock-angular-card-container/card-container-component.html'
};

/* @ngInject */
function Ctrl($q, brMediaQueryService) {
  const self = this;
  self.loading = true;
  self.layout = "row";

  self.$onInit = () => {
    self.currentCard = 0;
    self.cards = self.cards.map((card, idx) => ({
        data: card,
        idx
      }))
    self.loading = false;
  };

  self.onClick = direction => {
    switch(direction) {
      case 'UP':
        up();
        break;
      case 'DOWN':
        down();
        break;
      case 'LEFT':
        left();
        break;
      case 'RIGHT':
        right();
        break;
      default:
        console.log('Direction doesn\'t exist');
    }
  }

  self.toggleOrientation = () => {
    self.layout = self.layout === "row" ? "column" : "row";
  }

  self.getStyle = idx => {
    if (idx === self.currentCard) { // current card
      return {
        'border-style': 'solid',
        'border-width': '5px',
        'border-color': 'green',
        'z-index': calcZindex(idx)
      }
    } else if (idx < self.currentCard) {
      return {
        'border-style': 'dashed',
        'border-width': '5px',
        'border-color': 'blue',
        'z-index': calcZindex(idx)
      }
    } else {
      return {
        'border-style': 'dashed',
        'border-width': '5px',
        'border-color': 'orange',
        'z-index': calcZindex(idx)
      }
    }
  }

  function calcZindex(idx) {
    return cardsLength() - Math.abs(self.currentCard - idx);
  }

  function cardsLength() { return self.cards.length; }

  function incrementCardIndex() {
    const newIdx = self.currentCard + 1;
    self.currentCard = newIdx < cardsLength() ? newIdx : self.currentCard;
  }

  function decrementCardIndex() {
    const newIdx = self.currentCard - 1;
    self.currentCard = newIdx >= 0 ? newIdx : self.currentCard;
  }

  function up() {
    incrementCardIndex();
  }

  function down() {
    decrementCardIndex();
  }

  function left() {
    decrementCardIndex();
  }

  function right() {
    incrementCardIndex();
  }
}