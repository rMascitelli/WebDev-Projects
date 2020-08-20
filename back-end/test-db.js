var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

const cities = ["Toronto", "Paris", "Amsterdam", "Tokyo", "Bangkok", 
			    "Melbourne", "San Francisco", "Sicily", "Venice", "Rome", 
			    "Zagreb", "Halifax", "Vancouver", "Seattle", "Mississauga", 
			    "Brampton", "Chicago", "Dubai", "Barcelona", "Perth", "Milan", 
			    "Shanghai", "Madrid", "Athens", "Banff", "Victoria", "Dubai", "Istanbul"];

const cities_length = cities.length;
const timestamp = new Date(Date.now());
 
// TODO: Ideally I should have one module to manage the upkeep of the DB
// And another to perform the writes, but for now this is fine
db.serialize(() => {
  db.run("CREATE TABLE test_table (id INTEGER NOT NULL PRIMARY KEY, \
  									timestamp CHAR, \
  									source TEXT, destination TEXT)");

  // Generate 100 random flights for the DB to store
  for(var i = 0; i < 100; i++) {
  	// Generate 2 random numbers to simulate a "flight"
  	var rand1 = Math.floor(Math.random() * cities.length);
  	var rand2 = Math.floor(Math.random() * cities.length);
  	var timestamp = new Date(Date.now());

  	db.run(`INSERT INTO test_table (timestamp, source, destination) VALUES ('${timestamp.toISOString()}', '${cities[rand1]}', '${cities[rand2]}')`);
  }
 
  // Debug prints to check what I've entered
  db.each("SELECT * FROM test_table", function(err, row) {
      console.log(row.id + ": " + "[" + row.timestamp + "] " + row.source + " -> " + row.destination);
  });
});
 
db.close();