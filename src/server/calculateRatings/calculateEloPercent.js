const insertDataIntoEloTable = require("../insertData/insertDataIntoEloTables");
const createEloTable = require("../createObjects/createEloTables");

const calculateAndInsertEloPercentIntoTable = (sport, table_name, past_years, excluded_games) => {
    createEloTable(table_name).then(() =>
    {
        calculateEloPercent(sport, past_years, excluded_games)
            .then((sortedTeamsRatings) => {
                let excludedString = "";
                if(excluded_games > 0 ) {
                    excludedString = " without recent " + excluded_games.toString() + " games";
                }
                insertDataIntoEloTable(sortedTeamsRatings, table_name, `ELO Percent last ${past_years} years${excludedString}`);
            });
    });
}




function calculateEloPercent(sport, past_years, excluded_games) {

    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3001/api/${sport}/playdate/?past_years=${past_years}&excluded_games=${excluded_games}`, {
            method: 'GET', // or 'GET', 'PUT', etc., depending on your server route
        }).then(response => response.json())
            .then(data => {
                    console.log("IM HERE")
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
                let all_teams_elo = {}
                let home_away_stats = {home: 0, away: 0, home_win_percent_average: 0};
                let league_avg = 50;
                index = 0;
                for (const match of matchData) {
                    index += 1;
                    if (!all_teams_elo.hasOwnProperty(match.homeTeam)) {
                        //W = WIN, D = DRAW, L = LOSE, G = NUMBER OF GAMES (Only Win/Lose), WP = WINPERCENT, ADJ = ADJUSTMENT, AD_WP = ADJUSTED WINPERCENT
                        // W  D  L  G WP ADJ AD_WP
                        all_teams_elo[match.homeTeam] = [0, 0, 0, 0, 0, 0, 0];
                    }
                    if (!all_teams_elo.hasOwnProperty(match.awayTeam)) {
                        //same as above
                        all_teams_elo[match.awayTeam] = [0, 0, 0, 0, 0, 0, 0];
                    }
                    if (match.hometeam_result == 0.5) {
                        all_teams_elo[match.homeTeam][1] += 1;
                        all_teams_elo[match.awayTeam][1] += 1;
                    } else {
                        match.hometeam_result == 1 ? all_teams_elo[match.homeTeam][0] += 1 : all_teams_elo[match.homeTeam][2] += 1;
                        match.awayteam_result == 1 ? all_teams_elo[match.awayTeam][0] += 1 : all_teams_elo[match.awayTeam][2] += 1;
                    }
                    if (match.hometeam_result != 0.5) {
                        match.hometeam_result == 1 ? home_away_stats["home"] += 1 : home_away_stats["away"] += 1;
                    }
                }
                for (const team in all_teams_elo) {
                    //console.log(team)
                    all_teams_elo[team][3] = all_teams_elo[team][0] + all_teams_elo[team][2];
                    all_teams_elo[team][4] = Math.round((all_teams_elo[team][0] / all_teams_elo[team][3]) * 10000) / 100;
                }
                home_away_stats["home_win_percent_average"] = (home_away_stats["home"] / (home_away_stats["home"] + home_away_stats["away"])) * 100 - league_avg;
                let adjustment_rounds = 2;
                for (let i = 0; i < adjustment_rounds; i++) {
                    for (const match of matchData) {
                        if (match.hometeam_result != 0.5) {
                            let home_adv = home_away_stats["home_win_percent_average"];
                            let away_adv = -home_away_stats["home_win_percent_average"];

                            let home_dif = all_teams_elo[match.homeTeam][4] - league_avg;
                            let away_dif = all_teams_elo[match.awayTeam][4] - league_avg;
                            all_teams_elo[match.homeTeam][5] += away_dif + away_adv;
                            all_teams_elo[match.awayTeam][5] += home_dif + home_adv;
                        }
                    }
                    let teams = 0;
                    for (const team in all_teams_elo) {
                        teams += 1;
                        all_teams_elo[team][5] = Math.round((all_teams_elo[team][5] / all_teams_elo[team][3]) * 100) / 100;
                        all_teams_elo[team][6] = Math.round((all_teams_elo[team][4] + all_teams_elo[team][5]) * 100) / 100;
                    }
                    if (i < adjustment_rounds - 1) {
                        let delta_average = 0;
                        for (const team in all_teams_elo) {
                            delta_average += Math.abs(all_teams_elo[team][5]);
                            all_teams_elo[team][4] = all_teams_elo[team][6];
                            all_teams_elo[team][5] = all_teams_elo[team][6] = 0;
                        }
                        //console.log(all_teams_elo)
                        console.log("Delta Average Round", i + 1, ": ", delta_average / teams)
                    }
                }

                const teamsArray = Object.entries(all_teams_elo);

                // Sort the array based on the last number in each team's data
                teamsArray.sort(([, a], [, b]) => b[b.length - 1] - a[a.length - 1]);

                // Convert the sorted array back to an object
                const sortedTeams = Object.fromEntries(teamsArray);

                console.log(sortedTeams);
                let rank = 1;
                for (const team in sortedTeams) {
                    console.log("Rang ", rank, ": ", team);
                    rank += 1;
                }

                const transformed_dictionary = Object.entries(sortedTeams).map(([name, values]) => ({
                    [name]: values[values.length - 1],
                })).reduce((acc, entry) => ({...acc, ...entry}), {});

                resolve(transformed_dictionary);

        }).catch((error) => {
        reject(error);
        });
    });
}

module.exports = calculateAndInsertEloPercentIntoTable;


