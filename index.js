const { BADFAMILY } = require('dns');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const port = 1337;
const arrCountries = [];

const app = express();

function Country(id, name) {
    this.id = id,
    this.name = name;
}

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/' + "index.html");
});

app.get('/api', (req, res, next) => {
  res.setHeader('content-type','application/json');
    //avoiding CORS issues
    //this says we are allowing requests from any browser from anywhere
    res.setHeader('Access-Control-Allow-Origin', '*');

    let db = new sqlite3.Database(__dirname + '/Countries.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Countries database.');
      });

      let sql = 'SELECT * FROM country';

      db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        
        //Clear the array
        arrCountries.length =0;

        console.log('Processing query results...');
        rows.forEach((row) => {
          arrCountries.push(new Country(row.Id, row.Name));
        });

        res.end(JSON.stringify(arrCountries));
      });
      
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
      });

});

app.listen(port);


