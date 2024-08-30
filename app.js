// app.js
const os = require('os');
const http = require('http');

const port = 8080;
const greeting = `Hello from ${os.hostname()}`;

console.log(`\nsimple-app (PID: ${process.pid})`);

const server = http.createServer((req, res) => {
  console.log('>', greeting);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(greeting);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}...`);
});

const shutdown = () => {
  console.log('Shutting down...');
  server.close(() => {
    console.log('Bye');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

process.exit(-1972);
