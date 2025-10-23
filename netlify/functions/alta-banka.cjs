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
      // Store all rates with dates to find the most recent
      const ratesByDate = {};
      const rows = table.find('tbody tr');

      rows.each((i, row) => {
        const cells = $(row).find('td');
        if (cells.length >= 7) {
          // Columns: Datum(0), Šifra(1), Valuta(2), Paritet(3), Kupovni(4), Srednji(5), Prodajni(6)
          const dateStr = $(cells[0]).text().trim();
          const currencyCode = $(cells[2]).text().trim(); // Valuta column (not Šifra)

          // Extract rates - using devize (forex) rates
          const buyingRateText = $(cells[4]).text().trim().replace(',', '.');
          const sellingRateText = $(cells[6]).text().trim().replace(',', '.');

          const buyingRate = parseFloat(buyingRateText);
          const sellingRate = parseFloat(sellingRateText);

          if (currencyCode && !isNaN(buyingRate) && !isNaN(sellingRate)) {
            const key = currencyCode;

            // Parse date to find most recent
            const dateParts = dateStr.split(' ')[0].split('/');
            if (dateParts.length === 3) {
              const dateValue = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

              if (!ratesByDate[key] || dateValue > ratesByDate[key].date) {
                ratesByDate[key] = {
                  date: dateValue,
                  currency: currencyCode.toUpperCase(),
                  buyingRate: buyingRate.toFixed(4),
                  sellingRate: sellingRate.toFixed(4)
                };
              }
            }
          }
        }
      });

      // Convert to array
      Object.values(ratesByDate).forEach(rate => {
        exchangeRates.push({
          bank: "Alta Banka",
          currency: rate.currency,
          buyingRate: rate.buyingRate,
          sellingRate: rate.sellingRate,
          date: today
        });
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
