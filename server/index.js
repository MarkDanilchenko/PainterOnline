/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config({ path: `../.env.${process.env.NODE_ENV}` });

const server = require('./server.js');
const host_server = process.env.HOST_SERVER || '127.0.0.1';
const port_server = process.env.PORT_SERVER || 5000;

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

process.on('SIGINT', () => {
  console.warn(`Server is shutting down...`);
  process.exit(0);
});
