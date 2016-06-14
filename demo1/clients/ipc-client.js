/**
 * MQ IPC Client
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

var Kalm = require('kalm');
var msgpack = require('kalm-msgpack');

/* Init ----------------------------------------------------------------------*/

Kalm.encoders.register('msgpack', msgpack);

var client = new Kalm.Client({
	adapter: 'ipc',
	port: 3000,
	encoder: 'msgpack'
});

client.subscribe('foo', (payload) => console.log(payload));
client.send('register', 'foo');