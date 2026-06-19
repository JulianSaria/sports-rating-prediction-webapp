const createEloTable = require("../createObjects/createEloTables");
const insertDataIntoEloTable = require("../insertData/insertDataIntoEloTables");
const {createPool} = require('mysql2');
const {database} = require("../config");

const calculateAndInsertEloIntoTable = (sport, table_name, past_years, excluded_games) => {
    //const sortedTeamsRatings = calculateElo(sport, past_years)
    createEloTable(table_name).then(() =>
    {
        calculateElo(sport, past_years, excluded_games)
            .then((sortedTeamsRatings) => {
                let excludedString = "";
                if(excluded_games > 0 ) {
                    excludedString = " without recent " + excluded_games.toString() + " games";
                }
                insertDataIntoEloTable(sortedTeamsRatings, table_name, `ELO Overall last ${past_years} years${excludedString}`);
            });
    });
}

function calculateElo(sport, past_years, excluded_games) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3001/api/${sport}/playdate/?past_years=${past_years}&excluded_games=${excluded_games}`, {
        method: 'GET', // or 'GET', 'PUT', etc., depending on your server route
    }).then(response => response.json())
        .then(data => {
            // Handle the response from the server
            const matchData = data.map(item => {
                return {
                    homeTeam: item.teamname_home,
                    awayTeam: item.teamname_away,
                    hometeam_result: item.hometeam_result,
                    awayteam_result: item.awayteam_result,
                    playdate: item.playdate
                };
            });
            all_teams_elo = {}
            for (const match of matchData) {
                if (!all_teams_elo.hasOwnProperty(match.homeTeam)) {
                    all_teams_elo[match.homeTeam] = 1500;
                }
                if (!all_teams_elo.hasOwnProperty(match.awayTeam)) {
                    all_teams_elo[match.awayTeam] = 1500;
                }

                const elo_home = all_teams_elo[match.homeTeam];
                const elo_away = all_teams_elo[match.awayTeam];

                all_teams_elo[match.homeTeam] = updateElo(elo_home, elo_away, match.hometeam_result);
                all_teams_elo[match.awayTeam] = updateElo(elo_away, elo_home, match.awayteam_result);

            }
            resolve(all_teams_elo);

        }).catch((error) => {
        reject(error);
      });
    });
}

function updateElo(ratingA, ratingB, outcomeA, k = 32) {
  const expectedA = 1 / (1 + 10 ** ((ratingB - ratingA) / 400));
  const ratingAUpdated = ratingA + k * (outcomeA - expectedA);
  return ratingAUpdated;
}

module.exports = calculateAndInsertEloIntoTable;



