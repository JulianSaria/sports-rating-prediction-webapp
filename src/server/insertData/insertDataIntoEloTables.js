const {createPool} = require('mysql2');
const {database} = require("../config");



const insertDataIntoEloTable = (team_ratings, rating_table_name, rating_name) => {
    const pool = createPool(database);
    const tasks = [];
    const checkColumnTask = checkAndCreateColumn(pool, rating_table_name, rating_name);
    tasks.push(checkColumnTask);
    checkColumnTask.then(() => {
        for (const team in team_ratings) {
            tasks.push(insertOrUpdateData(pool, rating_table_name, rating_name, team, team_ratings[team]));
        }

        // Wait for all tasks to complete
        Promise.all(tasks)
            .then(() => {
                // Close the pool when all operations are completed
                pool.end();
            })
            .catch((error) => {
                console.log('Error closing Promises', error);
            });
    });
};

const insertOrUpdateData = async (pool, rating_table_name, rating_name, team_name, rating) => {
        return new Promise((innerResolve, innerReject) => {
        pool.query(
          `SELECT *
           FROM ${pool.escapeId(rating_table_name)}
           WHERE teamname = ?`,
          [team_name],
          (err, res) => {
            if (err) {
              console.error('Error finding entry:', err);
              innerReject(err);
            } else {
              console.log('Entry selected');
              if (res.length === 0) {
                // Teamname doesn't exist, insert new row
                pool.query(
                  `INSERT INTO ${pool.escapeId(rating_table_name)} (teamname, ${pool.escapeId(rating_name)})
                   VALUES (?, ?)`,
                  [team_name, rating],
                  (insertErr) => {
                    if (insertErr) {
                      console.error('Error inserting new row:', insertErr);
                      innerReject(insertErr);
                    } else {
                      console.log('New row inserted successfully');
                      innerResolve();
                    }
                  }
                );
              } else {
                // Teamname exists, update existing row
                pool.query(
                  `UPDATE ${pool.escapeId(rating_table_name)}
                   SET ${pool.escapeId(rating_name)} = ?
                   WHERE teamname = ?`,
                  [rating, team_name],
                  (updateErr) => {
                    if (updateErr) {
                      console.error('Error updating existing row:', updateErr);
                      innerReject(updateErr);
                    } else {
                      console.log('Row updated successfully');
                      innerResolve();
                    }
                  }
                );
              }
            }
          }
        );
      });
}
const checkAndCreateColumn = async (pool, rating_table_name, rating_name) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SHOW COLUMNS FROM ${pool.escapeId(rating_table_name)} LIKE ?`,
            [rating_name],
            (err, res) => {
                if (err) {
                    console.error('Error checking column:', err);
                    reject(err);
                } else {
                    if (res.length === 0) {
                        // Column doesn't exist, add it
                        pool.query(
                            `ALTER TABLE ${pool.escapeId(rating_table_name)}
                             ADD COLUMN ${pool.escapeId(rating_name)} FLOAT`,
                            (err, res) => {
                                if (err) {
                                    console.error('Error adding column:', err);
                                    reject(err);
                                } else {
                                    console.log('Column added successfully');
                                    resolve(res);
                                }
                            }
                        );
                    } else {
                        // Column already exists
                        console.log('Column already exists');
                        resolve(res);
                    }
                }
            }
        );
    });
};

module.exports = insertDataIntoEloTable;
