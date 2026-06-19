---

# P1 - Sports Rating & Prediction Web App

## Description

A React-based sports analytics web app for exploring team ratings and match predictions. The application currently supports German hockey and table tennis teams, calculates rating-based win probabilities, and displays the next 12 upcoming matches as well as the previous 12 matches for evaluation.

## Structure


```
├── src                                     # "source" files to build and develop the project.
│   ├── src                                 # client-side code (React, js)
│   │   ├── DataFetching                    # sends requests to the server to fetch data from the database      
│   │   ├── ListDisplays                    # UI display of different Lists in the Webpage
│   │   ├── Predictions                     # calculates predictions from the ratings that taken from the database
│   │   ├── SpinnerWithDropdown.js          # interactive Spinner to change the years taken into account
│   │   └── App.js                          # main component that combines all React components
│   └── server                              # server (nodejs)
│       ├── calculateRatings                # calculates different ratings with the sport results from the database
│       ├── combinedFunctions               # these files connect all the files to call them in the right order
│       ├── createObjects                   # creates MySql Database and Tables
│       ├── insertData                      # inserts data into the MySql Database
│       ├── config.js                       # data for the MySql database connection and URLs to every page that should be extracted 
│       ├── server.js                       # endpoints for the React component but also the server to communicate
│       └── transformData.js                # transform the fetched data into sport results that can be put into MySql Tables
└── package.json                            # build scripts and dependencies

```

## Organizational


> Communications and documentation is done via MS Teams and live meetings. See documentation there for status reports and other documents. Recurrent meeting were scheduled as needed, minutes of those can be found in the meeting minutes files.

## Environment


> This project has been developed mainly on Windows 10 64bit using PyCharm, javascript and nodejs.


## Footnote

This notebook serves for the purposes of PR1 project dealing with Sport result evaluating at the University Of Vienna in the winter semester 2023/2024.

Author: Julian Saria
