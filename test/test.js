/*
 * Card Container test demo.
 *
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');

// load bedrock dependencies
require('bedrock-express');
require('bedrock-server');
require('bedrock-views');

require('./configs/container');

bedrock.start();
