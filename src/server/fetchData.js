const axios = require('axios');

async function fetchData(url) {
      try {
        const response = await axios.get(url);
        const data = response.data;
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }


const getHtmlData = async (url, pages) => {
  const allMatchData = [];

    for (let i = 1; i <= pages; i++) {
      try {
        const data = await fetchData(url + "md" + i.toString() + "/");
        allMatchData.push(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    return allMatchData;
}

module.exports = getHtmlData;
