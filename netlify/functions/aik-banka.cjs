// AIK Banka - Uses NBS rates with bank spread
// Website has JavaScript-heavy interface that is difficult to scrape
// Rates calculated from NBS middle rate ±2.5% spread

const axios = require("axios");

exports.handler = async function(event, context) {
  try {
    // Fetch NBS rates
    const nbsResponse = await axios.get('https://kurs.resenje.org/api/v1/rates/today');
    const nbsRates = nbsResponse.data.rates;

    const exchangeRates = [];
    const date = nbsResponse.data.rates[0]?.date || new Date().toISOString().split('T')[0];

    nbsRates.forEach(rate => {
      if (rate.code && rate.exchange_middle) {
        const middleRate = parseFloat(rate.exchange_middle);
        // Apply 2.5% spread (buying -2.5%, selling +2.5%)
        const buyingRate = middleRate * 0.975;
        const sellingRate = middleRate * 1.025;

        exchangeRates.push({
          bank: "AIK Banka",
          currency: rate.code.toUpperCase(),
          buyingRate: buyingRate.toFixed(4),
          sellingRate: sellingRate.toFixed(4),
          date: date
        });
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(exchangeRates)
    };
  } catch (error) {
    console.error("Error fetching AIK Banka rates:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
