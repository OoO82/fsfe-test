const express = require("express");
const server = require("http").createServer();
const WebSocketServer = require("ws").Server;

const app = express();

app.get("/", (req, res) => {
	res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(3000, () => console.log("Server started on port 3000");

const wss = new WebSocketServer({ server: server });

wss.on("connection", (ws) => {
	const numClients = wss.clients.size;
	console.log("Client connected", numClients);

	wss.broadcast(`Current visitors: ${numClients}`);

	if(ws.readyState === ws.OPEN) {
		ws.send("Welcome to my server");
	}

	ws.on("close", () => {
		wss.broadcast(`Current visitors: ${numClients}`);
		console.log("A client has disconnected");
	});
});

wss.broadcast = (data) => {
	wss.clients.forEach(client => {
		client.send(data);
	});
};
