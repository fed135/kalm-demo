/**
 * MQ IPC Client
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

//var Kalm = require('kalm');
var Kalm = require('/home/frederic/Documents/workspace/Kalm');

/* Init ----------------------------------------------------------------------*/

var client = new Kalm.Client({
	adapter: 'ipc',
	port: 3000,
	encoder: 'json'
});

client.subscribe('foo', (payload) => console.log(payload));
client.send('register', 'foo');