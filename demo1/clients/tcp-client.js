/**
 * MQ TCP Client
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

//var Kalm = require('kalm');
var Kalm = require('/home/frederic/Documents/workspace/Kalm');

/* Init ----------------------------------------------------------------------*/

var client = new Kalm.Client({
	adapter: 'tcp',
	port: 4000
});

client.send('foo', 'hello from tcp!');