const sqlite3 = require('sqlite3').verbose();

const rootDir = require('../utils/path');

module.exports = class Country {
    constructor(id, name) {
        this.id = id,
        this.name = name;
    }

    static fetchAll(cb) {
        getCountriesFromDB(cb);
    }
};

const getCountriesFromDB = cb => {
    let db = new sqlite3.Database(rootDir + '/Countries.db', sqlite3.OPEN_READWRITE, (err) => {
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
        const arrCountries = [];;

        console.log('Processing query results...');
        rows.forEach((row) => {
          arrCountries.push(new module.exports(row.Id, row.Name));
        });

        cb(arrCountries);
      });

      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
      });
}

