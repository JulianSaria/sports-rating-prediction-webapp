const PredictionList = ({ predictions }) => {
  return (
    <div>
      {predictions.map((item, index) => (
        <div key={index} className="bet-box">
          <div className="team-box">
            <div className="team-name">{item.homeTeam}</div>
            <div className="team-name">{item.awayTeam}</div>

          </div>
          <div className="vs">VS</div>
          <div className="team-box">
            <div className={determine_Color(item.winHome, item.draw, item.winAway)}>{item.winHome < 10 ? <>&nbsp;{item.winHome.toFixed(2)}%</> : `${item.winHome.toFixed(2)}%`}</div>
            <div className={determine_Color(item.draw, item.winHome, item.winAway)}>{item.draw < 10 ? <>&nbsp;{item.draw.toFixed(2)}%</> : `${item.draw.toFixed(2)}%`}</div>
            <div className={determine_Color(item.winAway, item.draw, item.winHome)}>{item.winAway < 10 ? <>&nbsp;{item.winAway.toFixed(2)}%</> : `${item.winAway.toFixed(2)}%`}</div>
          </div>
          <div className="team-box">
            <div className={determine_Color(item.winHome, item.draw, item.winAway)}>{item.winHome < 10 ? `${(100/item.winHome).toFixed(2)}`: `${(100/item.winHome).toFixed(2)}`}</div>
            <div className={determine_Color(item.draw, item.winHome, item.winAway)}>{item.draw > 10 ? `${(100/item.draw).toFixed(2)}`: `${(100/item.draw).toFixed(2)} `}</div>
            <div className={determine_Color(item.winAway, item.draw, item.winHome)}>{item.winAway < 10 ? `${(100/item.winAway).toFixed(2)}` : `${(100/item.winAway).toFixed(2)} `}&nbsp;</div>
          </div>
          <div className="playdate">{item.playdate}</div>
        </div>
      ))}
    </div>
  );
  
  function determine_Color(val1, val2, val3) {
  return (val1 > val2) && (val1 > val3) ? "win-percent_green" : (val1 > val2) || (val1 > val3) ? "win-percent_orange" : "win-percent_red";
}
};


export default PredictionList;