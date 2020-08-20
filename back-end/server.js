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
	var rand = 0, max_val = 1;
	
	db.get("SELECT COUNT(*) AS count FROM flight_info", (err, row) => {
		if(err) console.log(err);

		// Make sure request doesnt exceed the size of our DB
		rand = Math.floor(Math.random() * (row.count));

		// Set a default length of 10 if the request is empty, and check for OOB
		if(parseInt(req.query.num_flights) != 0) {
			max_val = (rand + parseInt(req.query.num_flights) > row.count) ? row.count : rand + parseInt(req.query.num_flights);
		} else {
			max_val = rand + 10;
		}

		// Read back the DB for debugging purposes
		db.all(`SELECT * FROM flight_info WHERE id BETWEEN ${rand} AND ${max_val-1}`, (err, rows) => {
			if(err) console.log(err);

		    var myJSON = JSON.stringify(rows);
			res.send(myJSON);
			//console.log(myJSON);
		});
		
		console.log(`\n## Sending flight info - Row${rand} - ${max_val}`);
	});
});

app.get('/test', (req, res) => {
	res.send('Hello World: /test');
	console.log('Got a request at /test');
});
//

var port = 8080;
app.listen(port, () => console.log(`Listening on Port ${port}...`));

