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
    $scope.$on('SELECT_IDX', (e, args) => self.select(args.idx));
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

  function moveToFront(idx) {
    const front = originalCards.splice(idx, originalCards.length);
    originalCards = [...front, ...originalCards];
  }

  function updateCards() {
    self.cards = originalCards.slice(0, self.maxDisplay);
  }

  self.select = idx => {
    moveToFront(idx);
    updateCards();
  }

  self.down = () => {
    leftRotate();
    updateCards();
  }

  self.up = () => {
    rightRotate();
    updateCards();
  }
}
