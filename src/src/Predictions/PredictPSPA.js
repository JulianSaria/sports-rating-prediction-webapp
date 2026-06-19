import PredictionList from "../ListDisplays/PredictionList";
import EvaluationList from "../ListDisplays/EvaluationList";
import {useState, useEffect} from "react";

const PredictPSPA = ({matches, selectedMode}) => {

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
          componentToRender = null;
      }

useEffect(() => {
    const predictionData = matches.map(item => {
        let home_PS = item.rating_home_team;
        let home_PA = item.rating_home_team_2;
        let exponent = 2.37;
        let pyth_home = home_PS ** exponent / (home_PA**exponent + home_PS**exponent);

        let away_PS = item.rating_away_team;
        let away_PA = item.rating_away_team_2;
        let pyth_away = away_PS ** exponent / (away_PA**exponent + away_PS**exponent);

        let win_home = (( pyth_home - (pyth_home * pyth_away) ) / (pyth_home + pyth_away - 2* pyth_home * pyth_away) ) * 100
        let win_away = 100 - win_home;

        let difference = Math.abs(win_home - win_away);
        let draw = (100 - difference) * 0.4;
        //console.log(draw);
        win_home -= draw/2;
        win_away -= draw/2



        let playdate = new Date(item.playdate);
        playdate = playdate.toLocaleDateString('en-GB')


        //HOME BONUS NOCH DAZU

        return {
            homeTeam: item.teamname_home,
            homeTeamScore: item.hometeam_score,
            awayTeam: item.teamname_away,
            awayTeamScore: item.awayteam_score,
            winHome: win_home,
            winAway: win_away,
            draw: draw,
            playdate: playdate,
        };

    });
    setPrediction([...predictionData]);
}, [matches]);

      return (
      <div>
     {componentToRender}
      </div>
    );
  };


export default PredictPSPA;