const { BADFAMILY } = require('dns');
const http = require('http');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const port = 1337;
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
  if (req.url === "/index.html")
  {
    res.setHeader('Content-type', 'text/html');
    let page = fs.createReadStream(__dirname + '/index.html', 'utf-8');
    page.pipe(res);
  }
  else if (req.url === "/api") {
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

        res.writeHead(200);
        res.end(JSON.stringify(arrCountries));
      });
      
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
      });
  }

}).listen(port, function() {
  console.log(`I'm listening on ${port}`);
});   
