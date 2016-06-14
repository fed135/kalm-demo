/**
 * Server entry point
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

var Kalm = require('kalm');
var ws = require('kalm-websocket');

/* Methods -------------------------------------------------------------------*/

/**
 * Starts the kalm server to listen for websocket connections
 */
function start(config) {

	// Register the web-socket adapter
	Kalm.adapters.register('ws', ws);
	//Kalm.defaults.stats = true;	// Outputs savings

	// Start listening for web-socket connections
	var server = new Kalm.Server({
		port: 3000,
		adapter: 'ws',
		tick: 1000/120
	});

	server.on('connect', function(client) {
		client.send('handshake', client.id);
	});

	server.on('disconnect', function(client) {
		server.broadcast('positionEvent', { id: client.id });
	});

	server.subscribe('positionEvent', function(data, reply, channel) {
		// On receiving position updates from a socket, broadcast them back
		// to all the connected sockets
		server.broadcast('positionEvent', {
			color: data.color,
			size: data.size,
			id: data.id,
			x: data.x,
			y: data.y
		});
	}, {serverTick: true});
}

/* Exports -------------------------------------------------------------------*/

module.exports.start = start;