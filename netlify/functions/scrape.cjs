const axios = require("axios");

exports.handler = async function(event, context) {
  try {
    // Fetch all current exchange rates from NBS via Kurs API
    const response = await axios.get('https://kurs.resenje.org/api/v1/rates/today');

    if (response.status === 200 && response.data && response.data.rates) {
      const rates = response.data.rates;
      const exchangeRates = [];

      // Convert API response to our format
      rates.forEach(rate => {
        if (rate.code && rate.exchange_middle) {
          exchangeRates.push({
            bank: "Narodna Banka Srbije",
            currency: rate.code.toUpperCase(),
            buyingRate: rate.exchange_buy ? rate.exchange_buy.toFixed(4) : rate.exchange_middle.toFixed(4),
            sellingRate: rate.exchange_sell ? rate.exchange_sell.toFixed(4) : rate.exchange_middle.toFixed(4),
            date: rate.date
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
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No data available" })
      };
    }
  } catch (error) {
    console.error("Error fetching exchange rates:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
