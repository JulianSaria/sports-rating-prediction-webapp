# Sport Result Evaluation

## 🖇️ Dependencies

> This project depends on the following software components:
>
> - [MySql](https://www.mysql.com) - creates a local database and uses the data for the React Component
> - [nodejs](https://nodejs.org/en) - JavaScript runtime environment for React and the express Server


## 🚀  Installation

>For this application to run you first need a local MySql-database on the port 3306 with the passwort '1234'. You can adapt these settings by changing the config.js file that can be found in src/server/config.js.

>If you don't know how to set up a MySql-database I recommend one of these two videos for a step-by-step guide

>https://www.youtube.com/watch?v=u96rVINbAUI

>https://www.youtube.com/watch?v=vHRd5suunqY

> Download and install nodejs, if it's not installed from https://nodejs.org/en

> Go to the src/server directory and open a terminal and type

> `node server.js` 

If it responds with "Server is running on port 3001" the server successfully runs.

> now go to the src/server/combinedFunctions directory and open another terminal

> runthe following commands sequentially

> `node initializeDatabase.js`

> `node insertRatingtoDatabase.js`

> If you encounter problems there might still be a bug in it. Pools sometimes do not get closed or some database error, just run the commands again. Running it twice if there were problems fixed the issues.

> Otherwise there should be a lot of print statements and after running these functions the local MySql database should be filled with a lot of data.

> Finally go to the src/src directory and open a terminal and run the following command

> `npm start`

> If react-scripts can't be found write

> `npm install -g react-scripts`

> If there is a still an issue write in the terminal of the src/src directory the following command

> `npm install react react-dom`

> After this try again following command

> `npm start`

> The React website should be available at http://localhost:3000/

## 🖼️ Visuals
![Webpage](doc/diagrams/webpage.PNG)

## 🛠️  Troubleshooting

### "ModuleNotFoundError: No module named '<module_name>'"

There could be a few potential issues:
1. Make sure that you have nodejs installed. 
2. Make sure that you have react-scripts installed 

