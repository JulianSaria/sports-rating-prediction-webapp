const {createPool} = require('mysql2');

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  connectionLimit: 10,
});

const createDatabase  = (database_name) => {
    return new Promise((resolve, reject) => {
        pool.query(`CREATE DATABASE IF NOT EXISTS ${pool.escapeId(database_name)};`, (err, res) => {
                if (err) {
                    console.error('Error creating Database:', err);
                     reject(err);
                } else {
                    console.log('Database was created successfully');
                      resolve(res);
                }
                pool.end();
            }
        );
    })
}

module.exports = createDatabase;
