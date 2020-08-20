// Get Dependencies
const express = require('express');
const app = express();
const cors = require('cors');

// Setup CORS
app.use(cors())

console.log("Starting server from server.js");

app.get('/', (req, res) => {
	res.send('Hello World: /');
	console.log('Got a request at /');
});

app.get('/test', (req, res) => {
	res.send('Hello World: /test');
	console.log('Got a request at /test');
});

var port = 8080;
app.listen(port, () => console.log(`Listening on Port ${port}...`));