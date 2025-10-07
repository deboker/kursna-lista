const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async function(event, context) {
  try {
    const url = "https://www.yettelbank.rs/stanovnistvo/usluge/menjacnica/";

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const exchangeRates = [];

    // Current date
    const today = new Date();
    const date = today.toISOString().split('T')[0];

    // Find all table rows with exchange rate data
    $('tr').each((index, row) => {
      const cells = $(row).find('td span');

      if (cells.length === 8) {
        const currency = $(cells[1]).text().trim();
        const buyingRateText = $(cells[3]).text().trim().replace(',', '.');
        const sellingRateText = $(cells[6]).text().trim().replace(',', '.');

        const buyingRate = parseFloat(buyingRateText);
        const sellingRate = parseFloat(sellingRateText);

        if (currency && buyingRate > 0 && sellingRate > 0) {
          exchangeRates.push({
            bank: "Yettel Bank",
            currency: currency,
            buyingRate: buyingRate.toFixed(4),
            sellingRate: sellingRate.toFixed(4),
            date: date
          });
        }
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
    console.error("Error fetching Yettel Bank rates:", error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
