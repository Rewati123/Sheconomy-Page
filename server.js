const express = require('express');
const next = require('next');

const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();


  server.get('/', (req, res) => {
    return app.render(req, res, '/program');
  });

 
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(4000, (err) => {
    if (err) throw err;
    console.log('🚀 Server running on http://localhost:4000');
  });
});
