const http = require('http');
const sqlite3 = require('sqlite3').verbose();

const arrCountries = [];

function Country(id, name) {
    this.id = id,
    this.name = name;
}

http.createServer((req, res) => {

    res.writeHead(200, { 'content-type': 'application/json'});

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
      res.end(JSON.stringify(arrCountries));
}).listen(1337, '127.0.0.1');   
