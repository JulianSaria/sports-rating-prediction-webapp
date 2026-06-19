const {createPool} = require("mysql2");
const {database} = require("../config");
const insertDataIntoTable = async (games, game_type) => {
   const pool = createPool(database);

     try {     // Insert new entries into the table
        const insertPromises = games.map((game) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `INSERT INTO ${pool.escapeId(game_type)} (game_ID, teamname_home, teamname_away, hometeam_score,
                                             awayteam_score, playdate, playweek, hometeam_result, awayteam_result)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        game.gameID,
                        game.homeTeam,
                        game.awayTeam,
                        game.homeTeamScore,
                        game.awayTeamScore,
                        game.playDate,
                        game.playWeek,
                        game.homeTeamResult,
                        game.awayTeamResult,
                    ],
                    (err, res) => {
                        if (err) {
                            console.error('Error creating table:', err);
                            reject(err);
                        } else {
                            console.log('Table created successfully');
                            resolve(res);
                        }
                    }
                );
            });
        });

        // Wait for all insert queries to complete
        await Promise.all(insertPromises);

        console.log('All queries completed successfully');
    } finally {
        // Close the pool after all queries have finished
        pool.end();
    }
}

module.exports = insertDataIntoTable;