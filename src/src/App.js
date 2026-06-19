import './App.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
import SpinnerWithDropdown from "./SpinnerWithDropdown";
import FetchPredict from "./DataFetching/FetchPredict";



function App() {

    const [selectedOptions, setSelectedOptions] = useState({
    spinner1: 'Last 5 Years',
    spinner2: 'Last 5 Years',
    spinner3: 'Last 5 Years',
  });

    const [selectedSport, setSelectedSport] = useState("hockey");
    const [selectedMode, setSelectedMode] = useState("predict");
    const [displayText, setdisplayText] = useState("Next");

    const handleOptionChange = (spinner, newOption) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [spinner]: newOption,
    }));
  };

     const handleHockeyClick = () => {
    setSelectedSport("hockey");
  };

     const handleTableTennisClick = () => {
    setSelectedSport("table_tennis");
  };
     
     const handleSoccerClick = () => {
    setSelectedSport("soccer");
  };

     const handleModeClick = () => {
      if (selectedMode === "predict") {
        setSelectedMode("evaluate");
        setdisplayText("Past");
      }
      else {
        setSelectedMode("predict");
        setdisplayText("Next");
      }
    };
    const ratings = ["Elo Overall", "Elo Percent", "PS/G PA/G"];

  useEffect(() => {
  }, [selectedOptions, selectedSport, selectedMode]);
  

  return (
<div className="App">
  <header className="App-header">
    <div className="DataFetch">
        <div className="Row">

            <div className="ColumnButton">
         <button onClick={handleHockeyClick} className={selectedSport === 'hockey' ? 'active' : ''}>Hockey</button>
         <button onClick={handleTableTennisClick} className={selectedSport === 'table_tennis' ? 'active' : ''}>Table Tennis</button>
         <button onClick={handleSoccerClick} className={selectedSport === 'soccer' ? 'active' : ''}>Soccer</button>
        </div>
          <div className="ColumnButton">
           <button onClick={handleModeClick}>{selectedMode}</button>
             </div>
        </div>
      <div className="Row">
        <div className="Column">
          <h1>ELO Rating</h1>
          <SpinnerWithDropdown rating={ratings[0]}
                               selectedOption={selectedOptions.spinner1}
                               selectedSport={selectedSport}
                               selectedMode={selectedMode}
                               onOptionChange={(newOption) => handleOptionChange('spinner1', newOption)}
          />
        </div>

        <div className="Column">
          <h1>Win Percentage Rating</h1>

          <SpinnerWithDropdown rating={ratings[1]}
                               selectedOption={selectedOptions.spinner2}
                               selectedSport={selectedSport}
                               selectedMode={selectedMode}
                               onOptionChange={(newOption) => handleOptionChange('spinner2', newOption)}
          />
        </div>

        <div className="Column">
          <h1>Points Scored (PS) Points Allowed (PA)</h1>
          <SpinnerWithDropdown rating={ratings[2]}
                               selectedOption={selectedOptions.spinner3}
                               selectedSport={selectedSport}
                               selectedMode={selectedMode}
                               onOptionChange={(newOption) => handleOptionChange('spinner3', newOption)}
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="Row">
        <div className="Column">
          <h2>{displayText} 12 Games with ELO prediction</h2>
          <FetchPredict selectedSport={selectedSport}
                        selectedMode={selectedMode}
                        rating={ratings[0]}
                        year={selectedOptions.spinner1}
            ></FetchPredict>
        </div>

        <div className="Column">
          <h2>{displayText} 12 Games with Win Percentage prediction</h2>
          <FetchPredict selectedSport={selectedSport}
                        selectedMode={selectedMode}
                        rating={ratings[1]}
                        year={selectedOptions.spinner2}
            ></FetchPredict>
        </div>

        <div className="Column">
          <h2>{displayText} 12 Games with PS/PA prediction</h2>
          <FetchPredict selectedSport={selectedSport}
                        selectedMode={selectedMode}
                        rating={ratings[2]}
                        year={selectedOptions.spinner3}
            ></FetchPredict>
        </div>
      </div>
    </div>
  </header>
</div>
  );
}

export default App;

