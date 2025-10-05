const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async function(event, context) {
  try {
    const url = "https://nle.in.rs/kursna/lista.htm";
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const exchangeRates = [];

      // Find the date
      const dateText = $('body').text();
      const dateMatch = dateText.match(/(\d{2}\.\d{2}\.\d{4})/);
      const date = dateMatch ? dateMatch[1].split('.').reverse().join('-') : new Date().toISOString().split('T')[0];

      // Parse table rows
      $('table tr').each((index, element) => {
        const cells = $(element).find('td');
        if (cells.length >= 8) {
          const currency = $(cells[3]).text().trim();
          const buyingRate = $(cells[5]).text().trim().replace(',', '.');
          const sellingRate = $(cells[7]).text().trim().replace(',', '.');

          if (currency && buyingRate && sellingRate && parseFloat(buyingRate) > 0) {
            exchangeRates.push({
              bank: "Addiko Bank",
              currency: currency,
              buyingRate: buyingRate,
              sellingRate: sellingRate,
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
    console.error("Error fetching Addiko Bank rates:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
