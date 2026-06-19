const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the CORS middleware
const {database} = require('./config');
const {createPool} = require("mysql2");

const app = express();
const port = process.env.PORT || 3001;

// Use the CORS middleware to enable cross-origin requests
app.use(cors());


// ---------------Endpoints for hockey--------------------

app.get('/api/hockey_games/playdate', async (req, res) => {
const past_years = req.query.past_years;
const pool = createPool(database);
const excluded_games = parseInt(req.query.excluded_games);
pool.query(`SELECT * FROM hockey_games
            WHERE playdate BETWEEN DATE_SUB(NOW(), INTERVAL ? YEAR) AND NOW()
              AND game_ID NOT IN (
                SELECT game_ID FROM (
                  SELECT game_ID FROM hockey_games
                  WHERE playdate BETWEEN DATE_SUB(NOW(), INTERVAL ? YEAR) AND NOW()
                  ORDER BY playdate DESC
                  LIMIT ?
                ) AS recent_games
            )`,
  [past_years, past_years, excluded_games],
  (err, results) => {
    if (err) {
      console.error('Error fetching matches:', err);
    } else {
      console.log('Matches fetched successfully:', results);
      res.send(results);
    }
    pool.end();
  }
);

});

app.get('/api/hockey_games/predict', async (req, res) => {
    processRating(req.query.rating, ({ rating, additional_column, additional_column_name }) => {
        const pool = createPool(database);
        const selectColumn_home = additional_column ? `r_home.${pool.escapeId(additional_column_name)} AS rating_home_team_2, ` : '';
        const selectColumn_away = additional_column ? `r_away.${pool.escapeId(additional_column_name)} AS rating_away_team_2, ` : '';
        pool.query(`SELECT h.teamname_home,
                           h.hometeam_score,
                           r_home.${pool.escapeId(rating)} AS rating_home_team,
                           ${selectColumn_home}
                           h.teamname_away,
                           h.awayteam_score,
                           r_away.${pool.escapeId(rating)} AS rating_away_team,
                           ${selectColumn_away}
                           h.playdate,
                           h.playweek
                    FROM hockey_games h
                             LEFT JOIN hockey_team_ratings r_home ON h.teamname_home = r_home.teamname
                             LEFT JOIN hockey_team_ratings r_away ON h.teamname_away = r_away.teamname
                    WHERE h.playdate >= NOW()
                    ORDER BY h.playdate LIMIT 12;`, (err, results) => {
            if (err) {
                console.error('Error fetching matches:', err);
            } else {
                console.log('Matches fetched successfully:', results);
                res.send(results);
            }
            pool.end();
        });
    });
});


app.get('/api/hockey_games/evaluate', async (req, res) => {
    processRating(req.query.rating, ({ rating, additional_column, additional_column_name }) => {
        const pool = createPool(database);
        const selectColumn_home = additional_column ? `r_home.${pool.escapeId(additional_column_name)} AS rating_home_team_2, ` : '';
        const selectColumn_away = additional_column ? `r_away.${pool.escapeId(additional_column_name)} AS rating_away_team_2, ` : '';
        pool.query(`SELECT h.teamname_home,
                           h.hometeam_score,
                           r_home.${pool.escapeId(rating)} AS rating_home_team,
                           ${selectColumn_home}
                           h.teamname_away,
                           h.awayteam_score,
                           r_away.${pool.escapeId(rating)} AS rating_away_team,
                           ${selectColumn_away}
                           h.playdate,
                           h.playweek
                    FROM hockey_games h
                             LEFT JOIN hockey_team_ratings r_home ON h.teamname_home = r_home.teamname
                             LEFT JOIN hockey_team_ratings r_away ON h.teamname_away = r_away.teamname
                    WHERE h.playdate <= NOW()
                    ORDER BY h.playdate DESC LIMIT 12;`, (err, results) => {
            if (err) {
                console.error('Error fetching matches:', err);
            } else {
                console.log('Matches fetched successfully:', results);
                res.send(results);
            }
            pool.end();
        });
    });
});

app.get('/api/hockey_team_ratings', async (req, res) => {

processRating(req.query.rating, ({ rating, additional_column, additional_column_name }) => {
    const pool = createPool(database);
    const selectColumn = additional_column ? `, ${pool.escapeId(additional_column_name)}` : '';
    pool.query(`SELECT teamname, ${pool.escapeId(rating)} ${selectColumn}
                FROM hockey_team_ratings
                WHERE ${pool.escapeId(rating)} IS NOT NULL
                ORDER BY ${pool.escapeId(rating)} DESC;`, (err, results) => {
            if (err) {
                console.error('Error fetching matches:', err);
            } else {
                console.log('Matches fetched successfully:', results);
                res.send(results);
            }
            pool.end();
        }
    );
});
});

// ---------------Endpoints for table_tennis--------------------

app.get('/api/table_tennis_games/playdate', async (req, res) => {
const past_years = req.query.past_years;
const pool = createPool(database);
const excluded_games = parseInt(req.query.excluded_games);
pool.query(`SELECT * FROM table_tennis_games
            WHERE playdate BETWEEN DATE_SUB(NOW(), INTERVAL ? YEAR) AND NOW()
              AND game_ID NOT IN (
                SELECT game_ID FROM (
                  SELECT game_ID FROM table_tennis_games
                  WHERE playdate BETWEEN DATE_SUB(NOW(), INTERVAL ? YEAR) AND NOW()
                  ORDER BY playdate DESC
                  LIMIT ?
                ) AS recent_games
            )`,
  [past_years, past_years, excluded_games],
  (err, results) => {
    if (err) {
      console.error('Error fetching matches:', err);
    } else {
      console.log('Matches fetched successfully:', results);
      res.send(results);
    }
    pool.end();
  }
);
});

app.get('/api/table_tennis_games/predict', async (req, res) => {
    processRating(req.query.rating, ({ rating, additional_column, additional_column_name }) => {
        const pool = createPool(database);
        const selectColumn_home = additional_column ? `r_home.${pool.escapeId(additional_column_name)} AS rating_home_team_2, ` : '';
        const selectColumn_away = additional_column ? `r_away.${pool.escapeId(additional_column_name)} AS rating_away_team_2, ` : '';
        pool.query(`SELECT h.teamname_home,
                           h.hometeam_score, 
                           r_home.${pool.escapeId(rating)} AS rating_home_team,
                           ${selectColumn_home}
                           h.teamname_away,
                           h.awayteam_score,
                           r_away.${pool.escapeId(rating)} AS rating_away_team,
                           ${selectColumn_away}
                           h.playdate,
                           h.playweek
                    FROM table_tennis_games h
                             LEFT JOIN table_tennis_team_ratings r_home ON h.teamname_home = r_home.teamname
                             LEFT JOIN table_tennis_team_ratings r_away ON h.teamname_away = r_away.teamname
                    WHERE h.playdate >= NOW()
                    ORDER BY h.playdate LIMIT 12;`, (err, results) => {
            if (err) {
                console.error('Error fetching matches:', err);
            } else {
                console.log('Matches fetched successfully:', results);
                res.send(results);
            }
            pool.end();
        });
    });
});

app.get('/api/table_tennis_games/evaluate', async (req, res) => {
    processRating(req.query.rating, ({ rating, additional_column, additional_column_name }) => {
        const pool = createPool(database);
        const selectColumn_home = additional_column ? `r_home.${pool.escapeId(additional_column_name)} AS rating_home_team_2, ` : '';
        const selectColumn_away = additional_column ? `r_away.${pool.escapeId(additional_column_name)} AS rating_away_team_2, ` : '';
        pool.query(`SELECT h.teamname_home,
                           h.hometeam_score,
                           r_home.${pool.escapeId(rating)} AS rating_home_team,
                           ${selectColumn_home}
                           h.teamname_away,
                           h.awayteam_score,
                           r_away.${pool.escapeId(rating)} AS rating_away_team,
                           ${selectColumn_away}
                           h.playdate,
                           h.playweek
                    FROM table_tennis_games h
                             LEFT JOIN table_tennis_team_ratings r_home ON h.teamname_home = r_home.teamname
                             LEFT JOIN table_tennis_team_ratings r_away ON h.teamname_away = r_away.teamname
                    WHERE h.playdate <= NOW()
                    ORDER BY h.playdate DESC LIMIT 12;`, (err, results) => {
            if (err) {
                console.error('Error fetching matches:', err);
            } else {
                console.log('Matches fetched successfully:', results);
                res.send(results);
            }
            pool.end();
        });
    });
});

app.get('/api/table_tennis_team_ratings', async (req, res) => {

processRating(req.query.rating, ({ rating, additional_column, additional_column_name }) => {
    const pool = createPool(database);
    const selectColumn = additional_column ? `, ${pool.escapeId(additional_column_name)}` : '';
    pool.query(`SELECT teamname, ${pool.escapeId(rating)} ${selectColumn}
                FROM table_tennis_team_ratings
                WHERE ${pool.escapeId(rating)} IS NOT NULL
                ORDER BY ${pool.escapeId(rating)} DESC;`, (err, results) => {
            if (err) {
                console.error('Error fetching matches:', err);
            } else {
                console.log('Matches fetched successfully:', results);
                res.send(results);
            }
            pool.end();
        }
    );
});
});

// ---------------Endpoints for soccer--------------------

app.get('/api/soccer_games/playdate', async (req, res) => {
const past_years = req.query.past_years;
const pool = createPool(database);
const excluded_games = parseInt(req.query.excluded_games);
pool.query(`SELECT * FROM soccer_games
            WHERE playdate BETWEEN DATE_SUB(NOW(), INTERVAL ? YEAR) AND NOW()
              AND game_ID NOT IN (
                SELECT game_ID FROM (
                  SELECT game_ID FROM soccer_games
                  WHERE playdate BETWEEN DATE_SUB(NOW(), INTERVAL ? YEAR) AND NOW()
                  ORDER BY playdate DESC
                  LIMIT ?
                ) AS recent_games
            )`,
  [past_years, past_years, excluded_games],
  (err, results) => {
    if (err) {
      console.error('Error fetching matches:', err);
    } else {
      console.log('Matches fetched successfully:', results);
      res.send(results);
    }
    pool.end();
  }
);
});

app.get('/api/soccer_games/predict', async (req, res) => {
    processRating(req.query.rating, ({ rating, additional_column, additional_column_name }) => {
        const pool = createPool(database);
        const selectColumn_home = additional_column ? `r_home.${pool.escapeId(additional_column_name)} AS rating_home_team_2, ` : '';
        const selectColumn_away = additional_column ? `r_away.${pool.escapeId(additional_column_name)} AS rating_away_team_2, ` : '';
        pool.query(`SELECT h.teamname_home,
                           h.hometeam_score, 
                           r_home.${pool.escapeId(rating)} AS rating_home_team,
                           ${selectColumn_home}
                           h.teamname_away,
                           h.awayteam_score,
                           r_away.${pool.escapeId(rating)} AS rating_away_team,
                           ${selectColumn_away}
                           h.playdate,
                           h.playweek
                    FROM soccer_games h
                             LEFT JOIN soccer_team_ratings r_home ON h.teamname_home = r_home.teamname
                             LEFT JOIN soccer_team_ratings r_away ON h.teamname_away = r_away.teamname
                    WHERE h.playdate >= NOW()
                    ORDER BY h.playdate LIMIT 12;`, (err, results) => {
            if (err) {
                console.error('Error fetching matches:', err);
            } else {
                console.log('Matches fetched successfully:', results);
                res.send(results);
            }
            pool.end();
        });
    });
});

app.get('/api/soccer_games/evaluate', async (req, res) => {
    processRating(req.query.rating, ({ rating, additional_column, additional_column_name }) => {
        const pool = createPool(database);
        const selectColumn_home = additional_column ? `r_home.${pool.escapeId(additional_column_name)} AS rating_home_team_2, ` : '';
        const selectColumn_away = additional_column ? `r_away.${pool.escapeId(additional_column_name)} AS rating_away_team_2, ` : '';
        pool.query(`SELECT h.teamname_home,
                           h.hometeam_score,
                           r_home.${pool.escapeId(rating)} AS rating_home_team,
                           ${selectColumn_home}
                           h.teamname_away,
                           h.awayteam_score,
                           r_away.${pool.escapeId(rating)} AS rating_away_team,
                           ${selectColumn_away}
                           h.playdate,
                           h.playweek
                    FROM soccer_games h
                             LEFT JOIN soccer_team_ratings r_home ON h.teamname_home = r_home.teamname
                             LEFT JOIN soccer_team_ratings r_away ON h.teamname_away = r_away.teamname
                    WHERE h.playdate <= NOW()
                    ORDER BY h.playdate DESC LIMIT 12;`, (err, results) => {
            if (err) {
                console.error('Error fetching matches:', err);
            } else {
                console.log('Matches fetched successfully:', results);
                res.send(results);
            }
            pool.end();
        });
    });
});

app.get('/api/soccer_team_ratings', async (req, res) => {

processRating(req.query.rating, ({ rating, additional_column, additional_column_name }) => {
    const pool = createPool(database);
    const selectColumn = additional_column ? `, ${pool.escapeId(additional_column_name)}` : '';
    pool.query(`SELECT teamname, ${pool.escapeId(rating)} ${selectColumn}
                FROM soccer_team_ratings
                WHERE ${pool.escapeId(rating)} IS NOT NULL
                ORDER BY ${pool.escapeId(rating)} DESC;`, (err, results) => {
            if (err) {
                console.error('Error fetching matches:', err);
            } else {
                console.log('Matches fetched successfully:', results);
                res.send(results);
            }
            pool.end();
        }
    );
});
});


// ---------------Endpoints for connecting to website without having CORS issues--------------------

app.get('/api/third-party-data', async (req, res) => {

  const userSelectedSite = req.query.url;

  try {
    const response = await axios.get(userSelectedSite);
    res.send(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const processRating = (rating, callback) => {
  let additional_column = false;
  let additional_column_name = "";

  if (rating.includes("PA")) {
    additional_column = true;
    const substrings = rating.split(' ');
    const ending = substrings.slice(2).join(' ');
    console.log(ending)

    substrings.forEach(substring => {
      if (substring.includes("PS")) {
        rating = substring + " " + ending;
      }
      if (substring.includes("PA")) {
        additional_column_name = substring + " " + ending;
      }
    });
  }

  const result = {
    rating,
    additional_column,
    additional_column_name,
  };

  callback(result);
}