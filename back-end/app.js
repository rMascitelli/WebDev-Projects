const http = require('http');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Hello World');
	console.log('Got a request at /');
});

var port = 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
