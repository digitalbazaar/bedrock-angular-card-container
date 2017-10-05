/*!
 * Card Container module.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Ganesh Annan
 */
import angular from 'angular';
import CardContainerComponent from './card-container-component.js';

const module = angular.module('bedrock.card-container', ['ngMaterial']);

module.component('brCardContainer', CardContainerComponent);
