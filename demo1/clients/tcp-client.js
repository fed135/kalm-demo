/**
 * MQ TCP Client
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

var Kalm = require('kalm');

/* Init ----------------------------------------------------------------------*/

var client = new Kalm.Client({
	adapter: 'tcp',
	port: 4000,
	encoder: 'json'
});

client.send('foo', 'hello from tcp!');