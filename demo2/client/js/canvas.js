define('js/canvas', [
	'Arstider/Mouse',
	'Arstider/Engine',
	'kalm',
	'kalm-websocket',
	'js/config'

	], function(Mouse, Engine, Kalm, ws, config) {

		var colorsMenu = document.getElementById('colorsMenu');
		var sizesMenu = document.getElementById('sizesMenu');
		var canvas = document.getElementById('canvas');
		var cursor = document.getElementById('cursor');

		var fingerPositions = [];
		var fingerData = {
			size: config.sizes[0],
			color: config.colors[4],
			x:0,
			y:0
		};

		var client;

		function createButton(type, label) {
			var node = document.createElement('div');
			node.className = type + ' ' + type[0] + label;
			node.onclick = () => fingerData[type] = label;
			var nodeItem = document.createElement('div');
			nodeItem.className = 'item';
			node.appendChild(nodeItem);
			return node;
		}

		function updateCursor() {
			cursor.style.backgroundColor = fingerData.color;
			cursor.style.height = cursor.style.width = fingerData.size + 'px';
			cursor.style.top = (fingerData.y - (fingerData.size * 0.5)) + 'px';
			cursor.style.left = (fingerData.x - (fingerData.size * 0.5)) + 'px';
		}

		function socketSetup() {
			Kalm.adapters.register('ws', ws);

			client = new Kalm.Client({
				hostname: config.serverUrl,
				adapter: 'ws',
				channels: {
					handshake: function(data) {
						// Client gets assigned an id when connecting to the server
						client.id = data;
						console.log('You are client #' + client.id);
					}
				}
			});

			client.subscribe('positionEvent', function(data, socket) {
				// Need to update the position of user X to position Y 
				if (data.id !== client.id) {
					fingerPositions.push(data);
				}
			}, {delay: (1000/60)});	// Bundles multiple fingers
		}

		return {
			onload: function() {
				config.colors.forEach((color) => colorsMenu.appendChild(createButton('color', color)));
				config.sizes.forEach((size) => sizesMenu.appendChild(createButton('size', size)));

				socketSetup();
			},

			update: function() {
				fingerData.x = Mouse.x(0);
				fingerData.y = Mouse.y(0);
				//for (var i = 0; i < Mouse.count(); i++) {
				var i = 0;

				if (Mouse.isPressed(i)) {
					fingerPositions.push({
						id: client.id,
						x: Mouse.x(i),
						y: Mouse.y(i),
						color: fingerData.color,
						size: fingerData.size
					});

					client.send('positionEvent', fingerPositions[fingerPositions.length -1]);
				}

				setTimeout(updateCursor, 0);
			},

			postDraw: function() {
				var ctx = Engine.context;
				fingerPositions.forEach(function(finger) {
					ctx.beginPath();
					ctx.fillStyle = fingerData.color;
					ctx.arc(finger.x, finger.y, fingerData.size*0.5, 0, 2*Math.PI, false);
					ctx.closePath();
					ctx.fill();
				});
				
				fingerPositions.length = 0;
			}
		}
	}
);