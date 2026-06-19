const {createPool} = require("mysql2");
const {database} = require("../config");

const createTable = (table_name) => {
    const pool = createPool(database);
    pool.query(`CREATE TABLE IF NOT EXISTS ${pool.escapeId(table_name)} (
      game_ID INT,
      teamname_home VARCHAR(255),
      teamname_away VARCHAR(255),
      hometeam_score INT,
      awayteam_score INT,
      playdate DATE,
      playweek INT, 
      hometeam_result DOUBLE,
      awayteam_result DOUBLE,  
      PRIMARY KEY(game_ID)
        );`, (err, res) => {
        if (err) {
          console.error('Error creating table:', err);
        } else {
          console.log('Table created successfully');
        }
        pool.end();
      }
    );
}

module.exports = createTable;