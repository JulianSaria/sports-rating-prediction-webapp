const getHtmlData = require("../fetchData");
const transformData = require("../transformData");
const {hockey_games, table_tennis_games, soccer_games} = require("../config");
const createDatabase = require("../createObjects/createDatabase");
const createTable = require("../createObjects/createTables");
const insertDataIntoTable = require("../insertData/insertDataIntoTables");

async function putSeasonWebdataIntoDatabase(season) {
    const result = await getHtmlData(season.url, season.spielwochen);
    const games = transformData(result);
    await insertDataIntoTable(games, season.game_type);
}

async function initializeDatabase() {
    await createDatabase("sport_results_2");

    const tablePromises = [
        createTable("hockey_games"),
        createTable("table_tennis_games"),
        createTable("soccer_games"),
    ];
    await Promise.all(tablePromises);

    const seasons = [
        ...Object.values(table_tennis_games),
        ...Object.values(hockey_games),
        ...Object.values(soccer_games),
    ];
    const importPromises = seasons.map(putSeasonWebdataIntoDatabase);
    await Promise.all(importPromises);

    console.log("Database initialization completed.");
}

initializeDatabase().catch((error) => {
    console.error("Database initialization failed:", error);
    process.exitCode = 1;
});
