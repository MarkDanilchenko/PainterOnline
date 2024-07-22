// --------------------------------------SERVER_CONFIG
const express = require("express");
const server = express();
const cors = require("cors");
const corsOptions = {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE"],
};
server.use(cors(corsOptions));
// aWss is needed for broadcast messages to all connected clients.
const expressWs = require("express-ws")(server);
const aWss = expressWs.getWss();
const { router } = require("./router/router.js");

// --------------------------------------COMMON_MIDDLEWARE
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// --------------------------------------WEBSOCKET
const connectionHandler = (ws, msg) => {
	console.log(`User: ${msg.username} was connected to the server. ID: ${msg.id}.`);
	// Broadcast message to all connected clients with the same session ID (which is the :id param in the URL on client).
	// Each websocket connection has its own id. It is assigned by the express-ws middleware.
	// However, we need to set it manually for the broadcasting to work.
	// We get the id from the parsed message and assign it to the ws object.
	// After this, we can use ws.id in the forEach loop below to send messages only to clients with the same session id.
	ws.id = msg.id;
	broadcastHandler(ws, msg);
};

const broadcastHandler = (ws, msg) => {
	aWss.clients.forEach((client) => {
		if (client.id === msg.id) {
			client.send(JSON.stringify(msg));
		}
	});
};

server.ws("/", (ws, req) => {
	ws.on("message", (message) => {
		const msg = JSON.parse(message);
		switch (msg.type) {
			case "connection":
				connectionHandler(ws, msg);
				break;
			case "draw":
				broadcastHandler(ws, msg);
				break;
			case "clear":
				broadcastHandler(ws, msg);
				break;
			default:
				break;
		}
	});
});

// --------------------------------------ROUTES
server.use("/api/v1", router);

server.all("/", async (req, res) => {
	res.status(302);
	res.redirect("/api/v1");
});

server.all("*", async (req, res) => {
	res.status(404);
	res.json({ message: "Resource Not found. Please, check the URL and try again." });
	res.end();
});

// --------------------------------------EXPORT
module.exports = { server };
