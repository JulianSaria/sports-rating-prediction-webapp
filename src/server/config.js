module.exports = {
database: {
  host: 'localhost',
  user: 'root',
  database: 'sport_results_2',
  password: '1234',
  connectionLimit: 10,
},

hockey_games: {
  hockey_2023_2024: {
    url: 'http://localhost:3001/api/third-party-data/?url=https://www.sport.de/widget_gameplan_round-matchday/sp24/se57323/co2167/ro162941/',
    spielwochen: 16,
    game_type: 'hockey_games',
  },
  hockey_2022_2023: {
    url: 'http://localhost:3001/api/third-party-data/?url=https://www.sport.de/widget_gameplan_round-matchday/sp24/se46877/co2167/ro136316/',
    spielwochen: 13,
    game_type: 'hockey_games',
  },
  hockey_2021_2022: {
    url: 'http://localhost:3001/api/third-party-data/?url=https://www.sport.de/widget_gameplan_round-matchday/sp24/se40326/co2167/ro119619/',
    spielwochen: 12,
    game_type: 'hockey_games',
  },
  hockey_2019_2020_2021: {
    url: 'http://localhost:3001/api/third-party-data/?url=https://www.sport.de/widget_gameplan_round-matchday/sp24/se32793/co2167/ro102937/',
    spielwochen: 18,
    game_type: 'hockey_games',
  },
},

table_tennis_games: {
  table_tennis_2023_2024: {
    url: 'http://localhost:3001/api/third-party-data/?url=https://www.sport.de/widget_gameplan_round-matchday/sp20/se54227/co2169/ro155228/',
    spielwochen: 22,
    game_type: 'table_tennis_games',
  },
  table_tennis_2022_2023: {
    url: 'http://localhost:3001/api/third-party-data/?url=https://www.sport.de/widget_gameplan_round-matchday/sp20/se47236/co2169/ro137197/',
    spielwochen: 22,
    game_type: 'table_tennis_games',
  },
  table_tennis_2021_2022: {
    url: 'http://localhost:3001/api/third-party-data/?url=https://www.sport.de/widget_gameplan_round-matchday/sp20/se40096/co2169/ro119331/',
    spielwochen: 22,
    game_type: 'table_tennis_games',
  },
  table_tennis_2020_2021: {
    url: 'http://localhost:3001/api/third-party-data/?url=https://www.sport.de/widget_gameplan_round-matchday/sp20/se36268/co2169/ro110256/',
    spielwochen: 22,
    game_type: 'table_tennis_games',
  },
},
soccer_games: {
  soccer_2023_2024: {
    url: 'http://localhost:3001/api/third-party-data/?url=https://www.sport.de/widget_gameplan_round-matchday/sp1/se51884/co12/ro148505/',
    spielwochen: 34,
    game_type: 'soccer_games',
  },
  soccer_2022_2023: {
    url: 'http://localhost:3001/api/third-party-data/?url=https://www.sport.de/widget_gameplan_round-matchday/sp1/se45495/co12/ro132754/',
    spielwochen: 34,
    game_type: 'soccer_games',
  },
  soccer_2021_2022: {
    url: 'http://localhost:3001/api/third-party-data/?url=https://www.sport.de/widget_gameplan_round-matchday/sp1/se39227/co12/ro117247/',
    spielwochen: 34,
    game_type: 'soccer_games',
  },
  soccer_2020_2021: {
    url: 'http://localhost:3001/api/third-party-data/?url=https://www.sport.de/widget_gameplan_round-matchday/sp1/se35753/co12/ro109214/',
    spielwochen: 34,
    game_type: 'soccer_games',
  },
}
}
