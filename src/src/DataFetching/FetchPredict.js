import axios from "axios";
import {useEffect, useState} from "react";
import PredictEloPercent from "../Predictions/PredictEloPercent";
import PredictElo from "../Predictions/PredictElo";
import PredictPSPA from "../Predictions/PredictPSPA";

const FetchPredict = ({selectedSport, selectedMode, rating, year}) => {

  const [matches, setMatches] = useState([]);
  let componentToRender;
  switch (rating) {
    case "Elo Overall":
      componentToRender = <PredictElo matches={matches} selectedMode={selectedMode}/>;
      break;
    case "Elo Percent":
      componentToRender = <PredictEloPercent matches={matches} selectedMode={selectedMode}/>;
      break;
    case "PS/G PA/G":
      componentToRender = <PredictPSPA matches={matches} selectedMode={selectedMode}/>;
      break;
    default:
      componentToRender = null; // or a default component
  }

  useEffect(() => {
      switch (year) {
          case 'Last Year':
              year = 1;
              break;
          case 'Last 3 Years':
              year = 3;
              break;
          case 'Last 5 Years':
              year = 5;
      }
      let evaluateString = "";
      if (selectedMode === "evaluate") {
          evaluateString = " without recent 12 games"
      }
      fetch(`http://localhost:3001/api/${selectedSport}_games/${selectedMode}/?rating=${rating} last ${year} Years${evaluateString}`, {
  method: 'GET', 
}) .then(response => response.json())
  .then(data => {
    setMatches([...data]);

  })
  .catch(error => {
    console.error('Error:', error);
  });
  }, [selectedSport, selectedMode, year]);
      return (
          <div>{componentToRender}</div>
    );

}

export default FetchPredict;