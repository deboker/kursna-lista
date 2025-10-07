const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async function(event, context) {
  try {
    const url = "https://www.otpbanka.rs/kursna-lista/";
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const exchangeRates = [];

      // Get current date
      const date = new Date().toISOString().split('T')[0];

      // Find the first exchange table (Devize - Foreign Exchange)
      // Structure: Valuta, Zemlja, Naziv valute, Kupovni, Srednji, Prodajni, Paritet
      $('table.exchange.ajax').first().find('tbody tr').each((index, element) => {
        const cells = $(element).find('td');

        if (cells.length >= 7) {
          const currency = $(cells[0]).text().trim(); // Valuta (EUR, USD, etc)
          const buyingRate = $(cells[3]).text().trim().replace(',', '.'); // Kupovni
          const middleRate = $(cells[4]).text().trim().replace(',', '.'); // Srednji
          const sellingRate = $(cells[5]).text().trim().replace(',', '.'); // Prodajni

          // Only add valid currencies with non-zero rates
          if (currency &&
              currency.length === 3 &&
              buyingRate &&
              sellingRate &&
              parseFloat(buyingRate) > 0 &&
              parseFloat(sellingRate) > 0) {
            exchangeRates.push({
              bank: "OTP Banka",
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
    console.error("Error fetching OTP Banka rates:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
