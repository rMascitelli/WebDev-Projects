// Get Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
var sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'flight-info.db');

// Open and confirm DB connection
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
    	console.log(dbPath);
        return console.error(err.message);
    } else {
        console.log('Connected to the Item database.');
    }
});

// Setup CORS
app.use(cors())
console.log("Starting server from server.js");

// EXPRESS ROUTES

app.get('/', (req, res) => {
	// Return a random slice of our DB.. init_deb only creates 300 entries on first run
	var rand = Math.floor(Math.random() * 290);
	console.log(`\n## Sending flight info - Row${rand}\n`);

	// Read back the DB for debugging purposes
	db.all(`SELECT * FROM flight_info WHERE id BETWEEN ${rand} AND ${rand+10}`, (err, rows) => {
		if(err)
			console.log(err);

	    var myJSON = JSON.stringify(rows);
		res.send(myJSON);
		console.log(myJSON);
	});
});

app.get('/test', (req, res) => {
	res.send('Hello World: /test');
	console.log('Got a request at /test');
});

// 

var port = 8080;
app.listen(port, () => console.log(`Listening on Port ${port}...`));

