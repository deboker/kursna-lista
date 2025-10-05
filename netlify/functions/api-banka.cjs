const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async function(event, context) {
  try {
    const url = "https://www.apibank.rs/detaljnija-kursna-lista/?tab=2";
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const exchangeRates = [];

      // Find the date
      let date = new Date().toISOString().split('T')[0];

      // Get the 4th table (index 3) which contains exchange rates
      const mainTable = $('table').eq(3);

      mainTable.find('tr').each((index, element) => {
        const cells = $(element).find('td');

        // Data rows have 11-12 cells
        if (cells.length >= 11 && index > 0) {
          const dateText = $(cells[0]).text().trim();
          const currency = $(cells[4]).text().trim(); // Oznaka valute
          const buyingRate = $(cells[8]).text().trim().replace(',', '.'); // Devize kupovni
          const sellingRate = $(cells[10]).text().trim().replace(',', '.'); // Devize prodajni

          // Parse date (format: MM/DD/YY)
          if (dateText) {
            const dateParts = dateText.split('/');
            if (dateParts.length === 3) {
              const month = dateParts[0].padStart(2, '0');
              const day = dateParts[1].padStart(2, '0');
              const year = '20' + dateParts[2];
              date = `${year}-${month}-${day}`;
            }
          }

          // Skip if currency is invalid or rates are missing/zero
          if (currency &&
              currency.length === 3 &&
              buyingRate &&
              sellingRate &&
              buyingRate !== '-' &&
              sellingRate !== '-' &&
              parseFloat(buyingRate) > 0 &&
              parseFloat(sellingRate) > 0) {
            exchangeRates.push({
              bank: "API Banka",
              currency: currency,
              buyingRate: parseFloat(buyingRate).toFixed(4),
              sellingRate: parseFloat(sellingRate).toFixed(4),
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
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch data" })
      };
    }
  } catch (error) {
    console.error("Error fetching API Banka rates:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
