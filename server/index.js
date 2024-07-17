// --------------------------------------APP_CONFIG
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const { server } = require('./server.js');
const host_server = process.env.HOST_SERVER || '127.0.0.1';
const port_server = process.env.PORT_SERVER || 5000;

// --------------------------------------START SERVER+DB
(async () => {
	try {
		server.listen(port_server, host_server, () => {
			console.log(`Server is running on http://${host_server}:${port_server}`);
		});
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
})();

// --------------------------------------EXIT SERVER+DB
process.on('SIGINT', () => {
	console.warn(`Server is shutting down...`);
	process.exit(0);
});
