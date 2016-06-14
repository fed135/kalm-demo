/**
 * Kalm Messenging queue example
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

var MQ = require('./server/kalm-mq'); 

/* Init ----------------------------------------------------------------------*/

new MQ({
	listeners: [
		{
				adapter: 'ipc',
				port: 3000,
				encoder: 'msgpack',
				tick: 200
		},
		{
				adapter: 'tcp',
				port: 4000,
				tick: 300,
				encoder: 'json'
		}
	]
});