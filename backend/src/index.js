import 'dotenv/config';
import http from 'http';
import app from './app';

const PORT = process.env.PORT || 3000;

app.set('port', PORT);

// This is done to make it possible to reuse the http-server.
// For example to run both http/https.
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); // eslint-disabled-line no-console
});
