/*
 * Card Container configuration.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const config = require('bedrock').config;
const path = require('path');

const dir = path.join(__dirname);

// cache
config.paths.cache = path.resolve(path.join(dir, '../.cache'));

// server
config.server.port = 8002;
config.server.httpPort = 8001;
config.server.domain = 'localhost';

// branding
config.brand.name = 'Container Example';

config.views.vars.baseUri = config.server.baseUri;
config.views.vars.serviceHost = config.server.host;
config.views.vars.serviceDomain = config.server.domain;
config.views.vars.supportDomain = 'example.com';
config.views.vars.title = config.brand.name;
config.views.vars.siteTitle = config.brand.name;

// pseudo bower package for container
const containerPath = path.resolve(path.join(dir, '../..'));
config.views.system.packages.push({
  path: containerPath,
  manifest: path.join(containerPath, 'package.json')
});

// pseudo bower package for test files
config.views.system.packages.push({
  path: path.join(dir, '..', 'components'),
  manifest: path.join(dir, '..', 'package.json')
});
