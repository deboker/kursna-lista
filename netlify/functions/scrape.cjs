const axios = require("axios");

exports.handler = async function(event, context) {
  try {
    // Fetch all current exchange rates from NBS via Kurs API
    const response = await axios.get('https://kurs.resenje.org/api/v1/rates/today');

    if (response.status === 200 && response.data) {
      const rates = response.data;
      const exchangeRates = [];

      // Convert API response to our format
      for (const [currency, data] of Object.entries(rates)) {
        if (data && data.middle) {
          exchangeRates.push({
            bank: "Narodna Banka Srbije",
            currency: currency.toUpperCase(),
            buyingRate: data.middle.toFixed(4),
            sellingRate: data.middle.toFixed(4),
            date: data.date || new Date().toISOString().split('T')[0]
          });
        }
      }

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
