/**
 * Micro-serice node example
 * Nodes can act as either function nodes or gatekeepers
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

//var Kalm = require('kalm');
//var ws = require('kalm-websocket');
var Kalm = require('/home/frederic/Documents/workspace/Kalm');
var ws = require('/home/frederic/Documents/workspace/kalm-websocket');
var express = require('express');

var EventEmitter = require('events').EventEmitter;

/* Methods -------------------------------------------------------------------*/

class node {
	constructor(options, id) {
		this.isKeeper = (id === 'keeper');

		if (this.isKeeper) {
			Kalm.adapters.register('ws', ws);

			this.cache = {};	// Make an aerospike DB
			this.queue = new EventEmitter();	

			this.open = new Kalm.Server(options.kalm);
			this.net = new Kalm.Server(options.keeper);

			// Channels
			options.services.forEach((s) => {
				this.net.channel(s, this._handleInternal.bind(this));
				this.open.channel(s, this._handleExternal.bind(this));
			}, this);
		}
		else {
			this.net = new Kalm.Client(options.keeper);
			this.net.channel(id, this._runController);
		}
	}

	_runController(body, reply, channel) {
		var controller = require('./controllers/' + channel.name);
		controller(body, reply, channel);
	}

	_handleExternal(body, reply, channel) {
		var entry = this._cacheEntry(body);
		if (entry in this.cache) {
			reply(this.cache[entry]);
		}
		else {
			this.net.whisper(body.service, body);
			this.queue.once(entry, reply);
		}
	}

	_handleInternal(body, reply, channel) {
		console.log('brah?');
		var entry = this._cacheEntry(body);
		this.cache[entry] = body.result;
		this.queue.emit(entry, body.result);
	}

	_cacheEntry(body) {
		return [body.service, body.query].join('.');
	}
}

/* Exports -------------------------------------------------------------------*/

module.exports = node;