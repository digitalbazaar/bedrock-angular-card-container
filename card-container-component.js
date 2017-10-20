/*!
 * Card Container Component.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Ganesh Annan
 */

export default {
  bindings: {
    cards: '=brCards'
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

  self.$onInit = () => {
    $scope.$on('MOVE_CARDS_UP', () => self.up());
    $scope.$on('MOVE_CARDS_DOWN', () => self.down());
    $scope.$on('SELECT_IDX', (e, args) => self.select(args.idx));
    self.loading = false;
  };

  function rightRotate() {
    const lastCard = self.cards.pop();
    self.cards = [lastCard, ...self.cards];
  }

  function leftRotate() {
    const firstCard = self.cards.shift();
    self.cards = [...self.cards, firstCard];
  }

  function moveToFront(idx) {
    const front = self.cards.splice(idx, self.cards.length);
    self.cards = [...front, ...self.cards];
  }

  self.select = idx => {
    moveToFront(idx);
  }

  self.down = () => {
    leftRotate();
  }

  self.up = () => {
    rightRotate();
  }
}
