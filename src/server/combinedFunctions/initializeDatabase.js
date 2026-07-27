const getHtmlData = require("../fetchData");
const transformData = require("../transformData");
const {hockey_games, table_tennis_games, soccer_games} = require("../config");
const createDatabase = require("../createObjects/createDatabase");
const createTable = require("../createObjects/createTables");
const insertDataIntoTable = require("../insertData/insertDataIntoTables");
const deleteTable = require("../deleteTable");




deleteTable("hockey_games");
deleteTable("table_tennis_games");

async function executeSequentially() {
    try {
        let promises = []

        promises.push(await createDatabase("sport_results_2"));

         promises.push(await createTable("hockey_games"));
         promises.push(await createTable("table_tennis_games"));
         promises.push(await createTable("soccer_games"));
         await Promise.all(promises);
    console.log('All functions executed sequentially.');
  } catch (error) {
    console.error('Error:', error);
  }
}
executeSequentially().then( () => {
    Object.entries(table_tennis_games).forEach(([seasonKey, season]) => {
    putSeasonWebdataIntoDatabase(season);
});

    Object.entries(hockey_games).forEach(([seasonKey, season]) => {
    putSeasonWebdataIntoDatabase(season);

});
        Object.entries(soccer_games).forEach(([seasonKey, season]) => {
    putSeasonWebdataIntoDatabase(season);

});

});






async function putSeasonWebdataIntoDatabase(season) {
     getHtmlData(season.url, season.spielwochen).then((result) => {
        //console.log(result);
        const games = transformData(result);
        insertDataIntoTable(games, season.game_type);
    })
        .catch((error) => {
            console.error(error);
        });
}