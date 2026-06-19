const {createPool} = require('mysql2');
const {database} = require('../config');

//Create table for hockey


const createEloTable = (table_name) => {
    return new Promise((resolve, reject) => {
    const pool = createPool(database);
    pool.query(`CREATE TABLE IF NOT EXISTS ${pool.escapeId(table_name)} (
      teamname VARCHAR(255),
      PRIMARY KEY(teamname)
        );`, (err, res) => {
        if (err) {
          console.error('Error creating table:', err);
           reject(err);
        } else {
          console.log('Table created successfully');
          resolve(res);
        }
        pool.end();
      }
    );
    });
}

module.exports = createEloTable;