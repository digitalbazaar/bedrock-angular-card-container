/*!
 * Card Container module.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Ganesh Annan
 */
import angular from 'angular';
import CardContainerComponent from './card-container-component.js';

const module = angular.module(
  'bedrock.card-container', ['bedrock.credential', 'bedrock.form',
    'bedrock.lazyCompile', 'bedrock.media-query', 'bedrock.modal',
    'ngAnimate', 'ngMaterial']);

module.component('brCardContainer', CardContainerComponent);
