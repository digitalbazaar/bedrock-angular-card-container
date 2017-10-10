/*!
 * Card Container Component.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Ganesh Annan
 */

export default {
  bindings: {
    cards: '=brCards',
    maxDisplay: '<brMaxDisplay'
  },
  transclude: true,
  controller: Ctrl,
  templateUrl:
    'bedrock-angular-card-container/card-container-component.html'
};

/* @ngInject */
function Ctrl($scope) {
  const self = this;

  self.loading = true;
  let originalCards;

  self.$onInit = () => {
    originalCards = self.cards;
    $scope.$on('MOVE_CARDS_UP', () => self.up());
    $scope.$on('MOVE_CARDS_DOWN', () => self.down());
    updateCards();
    self.loading = false;
  };

  function rightRotate() {
    const lastCard = originalCards.pop();
    originalCards = [lastCard, ...originalCards];
  }

  function leftRotate() {
    const firstCard = originalCards.shift();
    originalCards = [...originalCards, firstCard];
  }

  function updateCards() {
    self.cards = originalCards.slice(0, self.maxDisplay);
  }

  self.down = () => {
    rightRotate();
    updateCards();
  }

  self.up = () => {
    leftRotate();
    updateCards();
  }
}
