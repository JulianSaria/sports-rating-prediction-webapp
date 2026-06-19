import RatingList from "../ListDisplays/RatingList";
import {useEffect, useState} from "react";

const FetchRating = ({selectedSport, selectedMode, year, rating}) => {

  const [matches, setMatches] = useState([]);


  useEffect(() => {
      let evaluateString = "";
      if (selectedMode === "evaluate") {
          evaluateString = " without recent 12 games"
      }
      fetch(`http://localhost:3001/api/${selectedSport}_team_ratings/?rating=${rating} last ${year} Years${evaluateString}`, {
  method: 'GET', 
}) .then(response => response.json())
  .then(data => {
    setMatches([...data]);

  })
  .catch(error => {
    console.error('Error:', error);
  });
  }, [year, selectedSport, selectedMode]);
      return (
        <RatingList matches={matches}></RatingList>
    );

}

export default FetchRating;