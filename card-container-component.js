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
    id: '<brId'
  },
  transclude: {
    'br-card-item': 'brCardItem'
  },
  controller: Ctrl,
  templateUrl:
    'bedrock-angular-card-container/card-container-component.html'
};

/* @ngInject */
function Ctrl($scope) {
  const self = this;

  self.loading = true;
  self.$onInit = () => {
    $scope.$on('MOVE_CARDS_UP', (e, args) => {
      if (args.id == self.id) {
        self.up();
      }
    });
    $scope.$on('MOVE_CARDS_DOWN', (e, args) => {
      if (args.id === self.id) {
        self.down();
      }
    });
    $scope.$on('SELECT_IDX', (e, args) => {
      if (args.id === self.id) {
        console.log(self.cards[args.idx].name);
        self.select(args.idx);
      }
    });
    self.loading = false;
  };

  function rightRotate() {
    const lastCard = self.cards.pop();
    self.cards = [lastCard, ...self.cards];
  }

  function leftRotate() {
    self.cards.push(angular.copy(self.cards.shift()));
  }

  function moveToFront(idx) {
    const front = self.cards.splice(idx - 1, self.cards.length);
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
