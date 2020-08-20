// This module creates a DB called flight_info
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./flight-info.db');

const cities = ["Toronto", "Paris", "Amsterdam", "Tokyo", "Bangkok", 
			    "Melbourne", "San Francisco", "Sicily", "Venice", "Rome", 
			    "Zagreb", "Halifax", "Vancouver", "Seattle", "Mississauga", 
			    "Brampton", "Chicago", "Dubai", "Barcelona", "Perth", "Milan", 
			    "Shanghai", "Madrid", "Athens", "Banff", "Victoria", "Dubai", "Istanbul"];

const cities_length = cities.length;
const timestamp = new Date(Date.now());
 
// NOTE: Keep in mind, sqlite is Serverless, there is no client/server model to follow
// We are using a local stored ".db" file for now
db.serialize(() => {
	db.run("CREATE TABLE if NOT EXISTS flight_info (id INTEGER NOT NULL PRIMARY KEY, \
													timestamp CHAR, \
													source TEXT, destination TEXT)");

	// Generate 300 random flights for the DB to store
	for(var i = 0; i < 300; i++) {
		// Generate 2 random numbers to simulate a "flight"
		var rand1 = Math.floor(Math.random() * cities.length);
		var rand2 = Math.floor(Math.random() * cities.length);
		var timestamp = new Date(Date.now());

		db.run(`INSERT INTO flight_info (timestamp, source, destination) VALUES ('${timestamp.toISOString()}', '${cities[rand1]}', '${cities[rand2]}')`);
	}

	console.log("Finished writing 100 new entries...");
});
 
db.close();
