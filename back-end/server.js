//const http = require('http');
const express = require('express');
const app = express();
var cors = require('cors')

app.use(cors())

console.log("Starting server from test.js");

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