/**
 * Kalm Microservices example
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

var ms = require('./server/kalm-node'); 

/* Local variables -----------------------------------------------------------*/

var config = {
	services: ['foo'],
	keeper: {
		hostname: '0.0.0.0',
		port: 3000,
		adapter: 'tcp'
	},
	kalm: {
		hostname: 'http://127.0.0.1',
		port: 8080,
		adapter: 'ws'
	}
};

/* Init ----------------------------------------------------------------------*/

// Adds a keeper to the list of services, then instantiates them
config.services.unshift('keeper');
config.services.forEach(function(s) {
	new ms(config, s);
});