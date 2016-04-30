/**
 * Kalm micro-service creation entry point
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

var server = require('./server');
var config = require('./config');

/* Init ----------------------------------------------------------------------*/

server.start(config);