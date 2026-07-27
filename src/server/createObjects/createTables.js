const {createPool} = require("mysql2");
const {database} = require("../config");

const createTable = async (tableName) => {
    const pool = createPool(database);

    try {
        const [result] = await pool.promise().query(
            `CREATE TABLE IF NOT EXISTS ${pool.escapeId(tableName)} (
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
            );`
        );

        console.log(`Table ${tableName} is ready`);
        return result;
    } finally {
        await pool.promise().end();
    }
};

module.exports = createTable;
