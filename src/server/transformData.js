const cheerio = require("cheerio");

const transformData = (allMatchData) => {
    const matchList = [];
    allMatchData.map((playWeekData) =>
    {

        const $ = cheerio.load(playWeekData);
        const playWeek = parseInt($('.round-head').first().text(), 10)
        //const playWeek = parseInt($('.round-head').text().split('.')[0]);

        /*$('.round-head').each((index, element) => {
            const matchElement = $(element);
            const playWeek = parseInt(matchElement.find('.match-round').text()[0]);
            console.log(playWeek)
        });
        */
        // Select the elements containing match data
        $('.match').each((index, element) => {

            const matchElement = $(element);
            //console.log(index)
            // Extract team names and results
            const gameID = parseInt(matchElement.attr('data-match_id'));
            const homeTeam = matchElement.find('.team-name-home').text();
            const awayTeam = matchElement.find('.team-name-away').text();
            const EndResult = matchElement.find('.match-result-0').text();
            const homeTeamScore = parseInt(EndResult.substring(0, 1));
            const awayTeamScore = parseInt(EndResult.substring(1, 2));
            const playDate = new Date(matchElement.attr('data-datetime'));

            let homeTeamResult = 1;
            let awayTeamResult = 1;
            homeTeamScore > awayTeamScore ? (homeTeamResult = 1, awayTeamResult = 0) : (homeTeamResult = 0, awayTeamResult = 1)
            if (homeTeamScore == awayTeamScore) {
                homeTeamResult = 0.5;
                awayTeamResult = 0.5;
            }

            // Push the data to the matches array
            matchList.push({
                gameID,
                homeTeam,
                awayTeam,
                homeTeamScore,
                awayTeamScore,
                playDate,
                playWeek,
                homeTeamResult,
                awayTeamResult,
            });
        });
    });
      return matchList;

  }

module.exports = transformData;
