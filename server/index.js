
startHttpServer();
startWebSocketServer();

function startWebSocketServer()
{
	var WebSocketServer = new require('ws');

// подключенные клиенты
	var clients = {};

// WebSocket-сервер на порту 8081
	var webSocketServer = new WebSocketServer.Server({
		port: 8081
	});

	console.log('WebSocket server listening on port 8081');

	webSocketServer.on('connection', function (ws)
	{

		var id = Math.random();
		clients[id] = ws;
		console.log("новое соединение " + id);

		ws.on('message', function (message)
		{
			console.log('получено сообщение ' + message);

			for (var key in clients)
			{
				if (clients[key] != ws)
				{
					clients[key].send(message);
				}
			}
		});

		ws.on('close', function ()
		{
			console.log('соединение закрыто ' + id);
			delete clients[id];
		});

	});
}

function startHttpServer()
{
	var express = require('express');
	var app = express();

	app.use(express.static(__dirname + '/../client'));

	app.listen(3000, function () {
		console.log('Http server listening on port 3000');
	});
}