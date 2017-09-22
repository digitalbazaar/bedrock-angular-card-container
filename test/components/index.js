/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import TestContainerComponent from './test-container-component.js';

const module = angular.module('bedrock.container-test', [
  'bedrock.credential', 'bedrock.card-displayer', 'bedrock.card-container'
]);

module.component('brTestContainer', TestContainerComponent);

bedrock.setRootModule(module);

/* @ngInject */
module.config($routeProvider => {
  $routeProvider
    .when('/', {
      title: 'Test',
      template: '<br-test-container></br-test-container>'
    });
}).run(brCredentialService => {
  brCredentialService.registerDisplayer({
    id: 'urn:bedrock:br-motor-vehicle-credential-displayer',
    accept: {
      'urn:bedrock:test:MotorVehicleLicenseCredential': {}
    },
    directive: 'br-motor-vehicle-credential-displayer'
  });

  // generic card types
  const cardTypes = [
    "urn:bedrock:test:CableSubscriptionCredential",
    "urn:bedrock:test:LoyaltyCardCredential",
    "urn:bedrock:test:MessageBoardSubscription",
    "urn:bedrock:test:PassportCredential",
    "urn:bedrock:test:ProofOfResidenceCredential",
    "urn:bedrock:test:LegalNameCredential"
  ];
  cardTypes.forEach(cardType => {
    const accept = {};
    accept[cardType] = {};
    brCredentialService.registerDisplayer({
      id: 'urn:bedrock:card:type:' + cardType,
      accept: accept,
      directive: 'br-credential-card-displayer'
    });
  });
});
