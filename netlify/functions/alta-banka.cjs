const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async function(event, context) {
  try {
    // Alta Banka only offers CNY and RUB exchange rates
    const response = await axios.get('https://altabanka.rs/kursna-lista-2/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const exchangeRates = [];
    const today = new Date().toISOString().split('T')[0];

    // Find the table with wpDataTable class
    const table = $('.wpDataTable');

    if (table.length > 0) {
      // Get the most recent row for each currency (first data row after header)
      const rows = table.find('tbody tr');
      const processedCurrencies = new Set();

      rows.each((i, row) => {
        const cells = $(row).find('td');
        if (cells.length >= 8) {
          const currencyCode = $(cells[1]).text().trim(); // Šifra column

          // Only process each currency once (most recent rate)
          if (!processedCurrencies.has(currencyCode) && currencyCode) {
            processedCurrencies.add(currencyCode);

            // Extract rates - using devize (forex) rates
            const buyingRate = parseFloat($(cells[4]).text().trim().replace(',', '.'));
            const sellingRate = parseFloat($(cells[6]).text().trim().replace(',', '.'));

            if (!isNaN(buyingRate) && !isNaN(sellingRate)) {
              exchangeRates.push({
                bank: "Alta Banka",
                currency: currencyCode.toUpperCase(),
                buyingRate: buyingRate.toFixed(4),
                sellingRate: sellingRate.toFixed(4),
                date: today
              });
            }
          }
        }
      });
    }

    // If scraping failed or no data, return empty array (Alta Banka only has CNY and RUB)
    if (exchangeRates.length === 0) {
      console.log("Alta Banka: No exchange rates found");
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(exchangeRates)
    };
  } catch (error) {
    console.error("Error fetching Alta Banka rates:", error.message);
    // Return empty array instead of error to not break the main app
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify([])
    };
  }
};
