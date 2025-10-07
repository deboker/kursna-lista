const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async function(event, context) {
  try {
    const url = "https://www.procreditbank.rs/kursna-lista";
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const exchangeRates = [];

      // Get current date
      const date = new Date().toISOString().split('T')[0];

      // Find all table rows with currency data
      // Structure: currency name/code, paritet, srednji, kupovni, prodajni, (min kupovni)
      $('table.kursna-lista-table tr').each((index, element) => {
        const cells = $(element).find('td');

        if (cells.length >= 5) {
          // Extract currency code from the first cell
          const currencyElement = $(cells[0]).find('.currency');
          const currencyText = currencyElement.text().trim();

          // Extract 3-letter currency code (EUR, USD, etc.)
          const currencyMatch = currencyText.match(/\b([A-Z]{3})\b/);
          const currency = currencyMatch ? currencyMatch[1] : null;

          // Get rates from cells
          const paritet = $(cells[1]).text().trim();
          const middleRate = $(cells[2]).text().trim().replace(',', '.');
          const buyingRate = $(cells[3]).text().trim().replace(',', '.');
          const sellingRate = $(cells[4]).text().trim().replace(',', '.');

          // Only add valid currencies with non-zero rates
          if (currency &&
              buyingRate &&
              sellingRate &&
              parseFloat(buyingRate) > 0 &&
              parseFloat(sellingRate) > 0) {
            exchangeRates.push({
              bank: "ProCredit Bank",
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
    console.error("Error fetching ProCredit Bank rates:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
