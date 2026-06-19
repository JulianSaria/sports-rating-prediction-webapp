const insertDataIntoEloTable = require("../insertData/insertDataIntoEloTables");
const createEloTable = require("../createObjects/createEloTables");

const calculateAndInsertPSPAIntoTable = (sport, table_name, past_years, excluded_games) => {
    createEloTable(table_name).then(() =>
    {
        calculatePSPA(sport, past_years, excluded_games)
            .then(({ transformed_dictionary_PS, transformed_dictionary_PA }) => {
                let excludedString = "";
                if(excluded_games > 0 ) {
                    excludedString = " without recent " + excluded_games.toString() + " games";
                }
                insertDataIntoEloTable(transformed_dictionary_PS, table_name, `PS/G last ${past_years} years${excludedString}`);
                insertDataIntoEloTable(transformed_dictionary_PA, table_name, `PA/G last ${past_years} years${excludedString}`);
            });
    });
}

function calculatePSPA(sport, past_years, excluded_games) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3001/api/${sport}/playdate/?past_years=${past_years}&excluded_games=${excluded_games}`, {
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                const matchData = data.map(item => {
                    return {
                        homeTeam: item.teamname_home,
                        awayTeam: item.teamname_away,
                        hometeam_score: item.hometeam_score,
                        awayteam_score: item.awayteam_score,
                        playdate: item.playdate
                    };
                });
                let all_teams_elo = {}
                let home_away_stats = {
                    home_PS: 0,
                    home_PA: 0,
                    away_PS: 0,
                    away_PA: 0,
                    games: 0,
                    league_average: 0,
                    home_adv: 0
                };
                index = 0;
                for (const match of matchData) {
                    index += 1;
                    if (!all_teams_elo.hasOwnProperty(match.homeTeam)) {
                        //PS/G = POINTS SCORED/GAME, PA/G = POINTS ALLOWED/GAME, G = NUMBER OF GAMES,
                        // ADJ_PS/G = ADJUSTMENT_PS/G, ADJ_PA/G = ADJUSTMENT_PA/G, F_PS/G = FINAL_PS/G, F_PA/G = FINAL_PA/G
                        // PS/G PA/G  G  ADJ_PS/G ADJ_PA/G F_PS/G F_PA/G
                        all_teams_elo[match.homeTeam] = [0, 0, 0, 0, 0, 0, 0];
                    }
                    if (!all_teams_elo.hasOwnProperty(match.awayTeam)) {
                        all_teams_elo[match.awayTeam] = [0, 0, 0, 0, 0, 0, 0];
                    }

                    all_teams_elo[match.homeTeam][0] += match.hometeam_score, home_away_stats["home_PS"] += match.hometeam_score;
                    all_teams_elo[match.homeTeam][1] += match.awayteam_score, home_away_stats["home_PA"] += match.awayteam_score;
                    all_teams_elo[match.homeTeam][2] += 1, home_away_stats["games"] += 1;

                    all_teams_elo[match.awayTeam][0] += match.awayteam_score, home_away_stats["away_PS"] += match.awayteam_score;
                    all_teams_elo[match.awayTeam][1] += match.hometeam_score, home_away_stats["away_PA"] += match.hometeam_score;
                    all_teams_elo[match.awayTeam][2] += 1;
                }
                home_away_stats["league_average"] = (home_away_stats["home_PS"] + home_away_stats ["home_PA"]) / (2 * home_away_stats["games"]);
                home_away_stats["home_adv"] = (home_away_stats["home_PS"] - home_away_stats ["home_PA"]) / home_away_stats["games"];
                for (const team in all_teams_elo) {
                    all_teams_elo[team][0] = all_teams_elo[team][0] / all_teams_elo[team][2];
                    all_teams_elo[team][1] = all_teams_elo[team][1] / all_teams_elo[team][2];
                }

                let adjustment_rounds = 1;
                for (let i = 0; i < adjustment_rounds; i++) {
                    for (const match of matchData) {
                        let home_adv = home_away_stats["home_adv"];
                        let away_adv = -home_away_stats["home_adv"];

                        let home_dif_PS = all_teams_elo[match.homeTeam][0] - home_away_stats["league_average"];
                        let home_dif_PA = all_teams_elo[match.homeTeam][1] - home_away_stats["league_average"];

                        let away_dif_PS = all_teams_elo[match.awayTeam][0] - home_away_stats["league_average"];
                        let away_dif_PA = all_teams_elo[match.awayTeam][1] - home_away_stats["league_average"];

                        all_teams_elo[match.homeTeam][3] += away_dif_PS + away_adv;
                        all_teams_elo[match.homeTeam][4] += away_dif_PA + away_adv;


                        all_teams_elo[match.awayTeam][3] += home_dif_PS + home_adv;
                        all_teams_elo[match.awayTeam][4] += home_dif_PA + home_adv;
                    }
                    let teams = 0;
                    for (const team in all_teams_elo) {
                        teams += 1;
                        all_teams_elo[team][3] = Math.round((all_teams_elo[team][3] / all_teams_elo[team][2]) * 100) / 100;
                        all_teams_elo[team][4] = Math.round((all_teams_elo[team][4] / all_teams_elo[team][2]) * 100) / 100;

                        all_teams_elo[team][5] = Math.round((all_teams_elo[team][0] + all_teams_elo[team][3]) * 100) / 100;
                        all_teams_elo[team][6] = Math.round((all_teams_elo[team][1] + all_teams_elo[team][4]) * 100) / 100;
                    }
                    if (i < adjustment_rounds - 1) {
                        let delta_average = 0;
                        for (const team in all_teams_elo) {
                            delta_average += Math.abs(all_teams_elo[team][5]) + Math.abs(all_teams_elo[team][6]);
                            all_teams_elo[team][0] = all_teams_elo[team][5];
                            all_teams_elo[team][1] = all_teams_elo[team][6];

                            all_teams_elo[team][3] = all_teams_elo[team][4] = all_teams_elo[team][5] = all_teams_elo[team][6] = 0;
                        }
                        //console.log("Delta Average Round", i + 1, ": ", delta_average / (2 * teams))
                    }
                }


                const teamsArray = Object.entries(all_teams_elo);

                // Sort the array based on the last number in each team's data
                teamsArray.sort(([, a], [, b]) => b[b.length - 2] - a[a.length - 2]);

                // Convert the sorted array back to an object
                const sortedTeams = Object.fromEntries(teamsArray);

                let rank = 1;


                const transformed_dictionary_PS = Object.entries(sortedTeams).map(([name, values]) => ({
                    [name]: values[values.length - 2],
                })).reduce((acc, entry) => ({...acc, ...entry}), {});

                const transformed_dictionary_PA = Object.entries(sortedTeams).map(([name, values]) => ({
                    [name]: values[values.length - 1],
                })).reduce((acc, entry) => ({...acc, ...entry}), {});

                resolve({transformed_dictionary_PS, transformed_dictionary_PA});

            }).catch((error) => {
            reject(error);
        });




    });
}

module.exports = calculateAndInsertPSPAIntoTable;


