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
    maxDisplay: '<brMaxDisplay',
    layout: '<brLayout'
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
    $scope.$on('MOVE_CARDS_UP', () => up());
    $scope.$on('MOVE_CARDS_DOWN', () => down());
    $scope.$on('MOVE_CARDS_LEFT', () => left());
    $scope.$on('MOVE_CARDS_RIGHT', () => right());
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

  function up() {
    rightRotate();
    updateCards();
  }

  function down() {
    leftRotate();
    updateCards();
  }

  function left() {
    leftRotate();
    updateCards();
  }

  function right() {
    rightRotate();
    updateCards();
  }
}
