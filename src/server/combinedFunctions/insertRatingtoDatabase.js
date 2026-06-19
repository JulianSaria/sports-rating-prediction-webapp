const calculateAndInsertEloIntoTable = require("../calculateRatings/calculateElo");
const calculateAndInsertEloPercentIntoTable = require("../calculateRatings/calculateEloPercent");
const calculateAndInsertPSPAIntoTable = require("../calculateRatings/calculatePA_PS");

const past_years = [1, 3, 5];

for (const year in past_years) {
    console.log(year)
    calculateAndInsertEloIntoTable("hockey_games", "hockey_team_ratings", past_years[year], 0);
    calculateAndInsertEloPercentIntoTable("hockey_games", "hockey_team_ratings", past_years[year], 0);
    calculateAndInsertPSPAIntoTable("hockey_games", "hockey_team_ratings", past_years[year], 0);

    calculateAndInsertEloIntoTable("hockey_games", "hockey_team_ratings", past_years[year], 12);
    calculateAndInsertEloPercentIntoTable("hockey_games", "hockey_team_ratings", past_years[year], 12);
    calculateAndInsertPSPAIntoTable("hockey_games", "hockey_team_ratings", past_years[year], 12);
}


for (const year in past_years) {
    console.log(year)
    calculateAndInsertEloIntoTable("table_tennis_games", "table_tennis_team_ratings", past_years[year], 0);
    calculateAndInsertEloPercentIntoTable("table_tennis_games", "table_tennis_team_ratings", past_years[year], 0);
    calculateAndInsertPSPAIntoTable("table_tennis_games", "table_tennis_team_ratings", past_years[year], 0);

    calculateAndInsertEloIntoTable("table_tennis_games", "table_tennis_team_ratings", past_years[year], 12);
    calculateAndInsertEloPercentIntoTable("table_tennis_games", "table_tennis_team_ratings", past_years[year], 12);
    calculateAndInsertPSPAIntoTable("table_tennis_games", "table_tennis_team_ratings", past_years[year], 12);
}

for (const year in past_years) {
    console.log(year)
    calculateAndInsertEloIntoTable("soccer_games", "soccer_team_ratings", past_years[year], 0);
    calculateAndInsertEloPercentIntoTable("soccer_games", "soccer_team_ratings", past_years[year], 0);
    calculateAndInsertPSPAIntoTable("soccer_games", "soccer_team_ratings", past_years[year], 0);

    calculateAndInsertEloIntoTable("soccer_games", "soccer_team_ratings", past_years[year], 12);
    calculateAndInsertEloPercentIntoTable("soccer_games", "soccer_team_ratings", past_years[year], 12);
    calculateAndInsertPSPAIntoTable("soccer_games", "soccer_team_ratings", past_years[year], 12);
}

