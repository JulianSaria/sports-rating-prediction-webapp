import PredictionList from "../ListDisplays/PredictionList";
import EvaluationList from "../ListDisplays/EvaluationList";
import {useState, useEffect} from "react";

const PredictEloPercent = ({matches, selectedMode}) => {
    //console.log(matches)

    const [preditions, setPrediction] = useState([]);
    let componentToRender;
    switch (selectedMode) {
        case "predict":
          componentToRender = <PredictionList predictions={preditions} />;
          break;
        case "evaluate":
          componentToRender = <EvaluationList predictions={preditions} />;
          break;
        default:
          componentToRender = null; // or a default component
      }
useEffect(() => {
    const predictionData = matches.map(item => {
        const league_average = 50;
        let ratingHome = item.rating_home_team;
        let ratingAway = item.rating_away_team;
        console.log(ratingHome, ratingAway)

        ratingHome -= league_average;
        ratingAway -= league_average;

        let winHome = ratingHome - ratingAway;
        let winAway = ratingAway - ratingHome;
        winHome += league_average;
        winAway += league_average;
        if(winHome>100) {
            winHome = 99;
            winAway = 1;
        }
        if(winAway>100) {
            winHome = 1;
            winAway = 99;
        }
        
        let difference = Math.abs(winHome - winAway);
        console.log(winHome, winAway)
        let draw = (100 - difference) * 0.4;
        console.log(draw);
        winHome -= draw/2;
        winAway -= draw/2;

        
        let playdate = new Date(item.playdate);
        playdate = playdate.toLocaleDateString('en-GB')


        //HOME BONUS NOCH DAZU

        return {
            homeTeam: item.teamname_home,
            homeTeamScore: item.hometeam_score,
            awayTeam: item.teamname_away,
            awayTeamScore: item.awayteam_score,
            winHome: winHome,
            winAway: winAway,
            draw: draw,
            playdate: playdate,
        };

    });
    setPrediction([...predictionData]);
}, [matches]);

      return (
      <div>
        <div>
        {componentToRender}
        </div>
      </div>
    );
  };

export default PredictEloPercent;