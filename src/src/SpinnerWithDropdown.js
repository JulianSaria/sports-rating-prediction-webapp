import {useState} from 'react';
import FetchRating from "./DataFetching/FetchRating";

  const SpinnerWithDropdown = ({ rating, selectedOption, selectedSport, selectedMode, onOptionChange }) => {
    //const [selectedOption, setSelectedOption] = useState('Last 5 Years');
    const [lastYears, setLastYears] = useState(5);

    const options = ['Last Year', 'Last 3 Years', 'Last 5 Years'];
    const year = [1, 3, 5];

    const handleOptionChange = (event) => {
      const selectedOption = event.target.value;
      //setSelectedOption(selectedOption);
      setLastYears(year[options.indexOf(selectedOption)]);
      onOptionChange(selectedOption);
    };

      return (
      <div>
        <div>
          <label>Rating from: </label>
          <select value={selectedOption} onChange={handleOptionChange}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FetchRating selectedSport={selectedSport} selectedMode={selectedMode} year={lastYears} rating={rating}></FetchRating>
        </div>
      </div>
    );
  };

export default SpinnerWithDropdown;