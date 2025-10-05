const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async function(event, context) {
  try {
    const url = "https://adriaticbank.rs/kursna_lista.php";
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const exchangeRates = [];

      // Find the date
      const dateText = $('body').text();
      const dateMatch = dateText.match(/(\d{2}\.\d{2}\.\d{4})/);
      const date = dateMatch ? dateMatch[1].split('.').reverse().join('-') : new Date().toISOString().split('T')[0];

      // Parse table rows - skip header rows (0-3), data starts at row 4
      $('table tr').each((index, element) => {
        const cells = $(element).find('td');

        // Data rows have 9 cells: Zemlja, Šifra, Oznaka, Paritet, Kupovni, Srednji, Prodajni, KupovniAdriatic, ProdajniAdriatic
        if (cells.length === 9 && index > 3) {
          const currency = $(cells[2]).text().trim(); // Oznaka (AUD, EUR, USD, etc)
          const buyingRate = $(cells[4]).text().trim(); // Kupovni (devize)
          const sellingRate = $(cells[6]).text().trim(); // Prodajni (devize)

          // Skip if rates are 0 or empty
          if (currency && parseFloat(buyingRate) > 0 && parseFloat(sellingRate) > 0) {
            exchangeRates.push({
              bank: "Adriatic Bank",
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
    console.error("Error fetching Adriatic Bank rates:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
