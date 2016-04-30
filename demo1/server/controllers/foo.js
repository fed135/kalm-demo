/**
 * Foo controller
 */

'use strict';

/* Methods -------------------------------------------------------------------*/

function run(body, reply, channel) {
	console.log(body);
	body.result = 'This came from foo, on channel ' + channel.name
	reply(body);
}

/* Exports -------------------------------------------------------------------*/

module.exports = run;