const express = require('express');

const app = express();

const loginController = require('./controllers/loginController.js');
const notesController = require('./controllers/notesController.js');
const http = require('http');

app.use(express.json());
app.use('/auth', loginController);
app.use('/notes', notesController);

const httpServer = http.createServer(app);
const port = 3030;

httpServer.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`);
});

module.exports = { app };

