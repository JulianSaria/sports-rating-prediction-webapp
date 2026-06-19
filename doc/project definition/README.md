> # Application Overview and Objectives

## Application Overview

The aim of this project is to provide a Web-User Interface for the 
sports hockey and table tennis. It should mainly give the user an overview
about the standings in different leagues and also the user should be able to see
ratings of the teams, predictions for the next games. The user should a sport
interested user that wants to predict future game results and see different statistics and
ratings about his favourite team.

## Objectives

1. it should be able to extract data from the webpage https://www.sport.de for the
sports hockey and table tennis. 
2. it should be able to analyse the data and provide an All-time rating of the teams.
3. it should predict the outcome of future games.
4. it should show statistics about different clubs.

# Use Cases

1. switch between different leagues/sports
2. explore standings of leagues
3. explore a club in detail
4. explore ratings of clubs
5. make predictions of future standing of league
6. see predictions of future games

## Roles and Actors

1. sport interested user
2. coach
3. betting enthusiast user


## Use Case Diagrams

![Use Case](doc/diagrams/UseCaseDiagram.png)

## Textual Use Case Descriptions



| Category              | Entry            |
| --------------------- | ---------------- |
| Use Case ID           |                1 |
| Title                 |   switch between different leagues/sports |
| Scope                 | ---              |
| Short Description     |   the user should be able between the hockey league and the table tennis league|
| Precondition          |   the user has to have the website open |
| Actors                |   sport interested user, coach |
| Trigger               | ---              |
| Main Success Scenario | 1. user opens the website <br>2. default the Hockey league is shown. The user can choose to display the table tennis league by clicking on the "Tischtennis" button on the top <br> 3. If the user clicked the "Tischtennis" button the whole page updates and displays the default "Tischtennis" league page <br> 4. the user then can choose from the spinner on the right side of the table which league he wants to display <br> 3. the whole page updates and displays the choosen league <br>|
| Success Guarantees    | ---              |
| Exceptions            | 1. no data for this league or sport is available|
| Issues/Comments       | ---              |

| Category              | Entry            |
| --------------------- | ---------------- |
| Use Case ID           |                2 |
| Title                 |   explore standings of leagues |
| Scope                 | ---              |
| Short Description     |   the user should see a table that shows the current rankings of the teams |
| Precondition          |   the user has to have the website open |
| Actors                |   sport interested user, coach |
| Trigger               | ---              |
| Main Success Scenario | 1. user opens the website <br> 2. table is shown on the top right <br>|
| Success Guarantees    | ---              |
| Exceptions            | ---              |
| Issues/Comments       | ---              |

| Category              | Entry            |
| --------------------- | ---------------- |
| Use Case ID           |                3 |
| Title                 | explore a club in detail |
| Scope                 | ---              |
| Short Description     |   the user should be able to see a detailed describtion of a club when clicking onto any club in the current league table, in the ELO rating table or in the next rounds section.|
| Precondition          |   the user has to have the website open |
| Actors                |   sport interested user, coach|
| Trigger               | ---              |
| Main Success Scenario | 1. user opens the website <br> 2. the user clicks on a club name <br> 3. the page reloads and displays the club in detail while featuring a Graph of the position development, the last games and the Kader.<br>|
| Success Guarantees    | ---	           |
| Exceptions            | ---		   |
| Issues/Comments       | ---              |

| Category              | Entry            |
| --------------------- | ---------------- |
| Use Case ID           |                4 |
| Title                 |   explore ratings of clubs |
| Scope                 | ---              |
| Short Description     |   the user should be able to see the ratings of the clubs over a given amount of years.|
| Precondition          |   the user has to have the website open |
| Actors                |   sport interested user, coach, betting enthusiast user|
| Trigger               | ---              |
| Main Success Scenario | 1. user opens the website <br> 2. the user sees the elo rating on the right side next to the table <br> 3. the user can change the amount of years that are taken into account on the right side of the table <br>|
| Success Guarantees    | enough data being available for a good calculation|
| Exceptions            | ---		   |
| Issues/Comments       | ---              |

| Category              | Entry            |
| --------------------- | ---------------- |
| Use Case ID           |                5 |
| Title                 |   make predictions of future standing of league |
| Scope                 | ---              |
| Short Description     |   the user should be able to make prediction how the outcome on the next playing day is|
| Precondition          |   the user has to have the website open |
| Actors                |   sport interested user, betting enthusiast user|
| Trigger               | ---              |
| Main Success Scenario | 1. user opens the website <br> 2. user clicks on the Button "Prognose für nächste Runde" <br> 3. the table above updates according to the predictions <br>|
| Success Guarantees    | ---              |
| Exceptions            | 1. there aren't any rounds left in this season <br>|
| Issues/Comments       | ---              |


| Category              | Entry            |
| --------------------- | ---------------- |
| Use Case ID           |                6 |
| Title                 |   see predictions of future games |
| Scope                 | ---              |
| Short Description     |   the user should be able to see predictions with percent how likely a team is to win for the next play day|
| Precondition          |   the user has to have the website open |
| Actors                |   sport interested user, betting enthusiast user|
| Trigger               | ---              |
| Main Success Scenario | 1. user opens the website <br>2. the user can discover predictions in the section "Nächsten Spiele" under the table|
| Success Guarantees    | enough data being available for a good prediction |
| Exceptions            | ---	           |
| Issues/Comments       | ---              |


## Rating Algorithms
In this project I will use
1. the ELO rating algorithm
2. the Winpercentage of a team over a time with adjustment rounds
3. Points Scored/Points Allowed of a team over a time with adjustment rounds.

## Prediction Algorithms
1. ELO prediction by using a sigmoid function.
2. Winpercentage just with the difference between them.
3. Points Scored and Points Allowed with the Pythagorean Win Expectancy and the Log 5 Win Expectancy

# Architecture

## Overview

1. database (MySql Database)
2. data extraction and harvesting System + data evaluation System (Server)
4. user interface (React Webpage)


## Combined Architecture

![Component Diagramm](doc/diagrams/ComponentDiagram.png)

## User Interface (if applicable)

![User Interface](doc/diagrams/UserInterface.png)

# Project Management

## Milestones and Schedules

15.10.2023 - 31.10.2023 - extract data from the webpage  
01.11.2023 - 14.11.2023 - fixing issues with data extraction and making a database   
15.11.2023 - 04.12.2023 - read about prediction and ratings needed for the application and calculate them  
04.12.2023 - 18.12.2023 - making a first design UI output (incomplete)  
19.12.2023 - 08.01.2024 - implementing all UI components.  
09.01.2024 - 15.01.2024 - Code review and improvements  
16.01.2024 - 29.01.2024 - spare time if still issues are left to be solved  

_Or use GitLab milestones, time estimation + time spend functionality_

_Advice: Work with issues, plan what you need to achieve_
