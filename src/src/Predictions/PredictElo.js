import PredictionList from "../ListDisplays/PredictionList";
import EvaluationList from "../ListDisplays/EvaluationList";
import {useState, useEffect} from "react";

const PredictElo = ({matches, selectedMode}) => {

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
        const eloSpread = 100;
        let ratingHome = item.rating_home_team;
        let ratingAway = item.rating_away_team;

        let winHome = ratingHome - ratingAway;
        let winAway = ratingAway - ratingHome;

        winHome = sigmoid(winHome/eloSpread)*100;
        winAway = sigmoid(winAway/eloSpread)*100;
        
        let difference = Math.abs(winHome - winAway);
        let draw = (100 - difference) * 0.4;
        winHome -= draw/2;
        winAway -= draw/2


        let playdate = new Date(item.playdate);
        playdate = playdate.toLocaleDateString('en-GB')

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
}, [matches, selectedMode]);

      return (
      <div>
        <div>
      {componentToRender}
        </div>
      </div>
    );
  };

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

export default PredictElo;