const EvaluationList = ({ predictions }) => {
  return (
    <div>
      {predictions.map((item, index) => (
        <div key={index} className={determine_Color_Box(item.homeTeamScore, item.awayTeamScore, item.winHome, item.draw, item.winAway)}>
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
            <div className={"team-name"}>{item.homeTeamScore}</div>
            <div className={determine_Color(item.draw, item.winHome, item.winAway)}></div>
            <div className={"team-name"}>{item.awayTeamScore}</div>
          </div>
          <div className="playdate">{item.playdate}</div>
        </div>
      ))}
    </div>
  );
  
  function determine_Color(val1, val2, val3) {
  return (val1 > val2) && (val1 > val3) ? "win-percent_green" : (val1 > val2) || (val1 > val3) ? "win-percent_orange" : "win-percent_red";
}
  function determine_Color_Box(homeTeamScore, AwayTeamScore, winHomePercent, drawPercent, winAwayPercent) {
    let outcome = "win";
    if (homeTeamScore > AwayTeamScore) {
      outcome = "win";
    }
    else if (homeTeamScore === AwayTeamScore) {
      outcome = "draw";
    }
    else {
      outcome = "lose";
    }
    let predictedOutcome = Math.max(winHomePercent, drawPercent, winAwayPercent);
    let color;
    switch(outcome) {
      case "win":
        if (predictedOutcome === winHomePercent) {
          color = "bet-box-green";
        }
        else if (predictedOutcome === drawPercent) {
          color = "bet-box-orange";
        }
        else {
          color = "bet-box-red";
        }
        break;
      case "draw":
        if (predictedOutcome === drawPercent) {
          color = "bet-box-green";
        }
        else {
          color = "bet-box-orange";
        }
        break;
      case "lose":
        if (predictedOutcome === winAwayPercent) {
          color = "bet-box-green";
        }
        else if (predictedOutcome === drawPercent) {
          color = "bet-box-orange";
        }
        else {
          color = "bet-box-red";
        }
        break;
      default:
        color = "bet-box";

    }
    return color;
  }
};


export default EvaluationList;