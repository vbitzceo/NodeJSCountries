const { BADFAMILY } = require('dns');
const http = require('http');
const sqlite3 = require('sqlite3').verbose();

const arrCountries = [];

function Country(id, name) {
    this.id = id,
    this.name = name;
}

function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

http.createServer((req, res) => {

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

      wait(2000); //DO NOT DO IN PROD CODE!

      db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          arrCountries.push(new Country(row.Id, row.Name));
          console.log(row.Name);
        });
      });
      
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
      });

      res.writeHead(200);
      res.end(JSON.stringify(arrCountries));
      
}).listen(1337, '127.0.0.1');   
