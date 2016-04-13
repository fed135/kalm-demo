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

	// Start listening for web-socket connections
  var server = new Kalm.Server({
	  port: config.port,
	  adapter: 'ws'
	});

	server.channel('positionEvent', function(data, socket) {
	 	// On receiving position updates from a socket, broadcast them back
	 	// to all the connected sockets
	 	server.broadcast('positionEvent', {
	 		id: socket.uid,
	 		x: data.x,
	 		y: data.y
	 	});
	});
}

/* Exports -------------------------------------------------------------------*/

module.exports.start = start;