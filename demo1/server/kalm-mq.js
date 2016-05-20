/**
 * Messaging queue example
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

var Kalm = require('kalm');

/* Methods -------------------------------------------------------------------*/

class MQ {

	/**
	 * MQ constructor
	 */
	constructor(options) {
		this.listeners = options.listeners.map(this.createServer.bind(this));
	}

	/**
	 * Registers for an event
	 * @param {*} payload The payload from the register request
	 * @param {function} reply The reply interface
	 * @param {object} channel The register channel object
	 */
	register(payload, reply, channel) {
		this.listeners.forEach((listener) => listener.subscribe(
			payload, 
			this.broadcast.bind(this)
		));
	}

	/**
	 * Broadcast
	 * @param {*} payload The payload from the register request
	 * @param {function} reply The reply interface
	 * @param {object} channel The register channel object
	 */
	broadcast(payload, reply, channel) {
		this.listeners.forEach((listener) => listener.whisper(
			channel.name,
			payload
		));
	}

	/**
	 * Returns a new Kalm server
	 * @param {object} config The config for the server
	 * @returns {Server} The new Kalm Server
	 */
	createServer(config) {
		config.tick = 1; // Fast heartbeat, still allows time for bundling
		config.channels = { 'register': this.register.bind(this) };
		return new Kalm.Server(config);
	}
}

/* Exports -------------------------------------------------------------------*/

module.exports = MQ;