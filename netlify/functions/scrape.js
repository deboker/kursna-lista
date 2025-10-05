const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async function(event, context) {
  try {
    const url = "https://www.aikbanka.rs/kursna-lista/";
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const exchangeRateTable = $("table#kursnaLista");
      const exchangeRates = [];

      exchangeRateTable.find("tbody tr").each((index, element) => {
        const currency = $(element).find("td:nth-child(1)").text().trim();
        const buyingRate = $(element).find("td:nth-child(2)").text().trim();
        const sellingRate = $(element).find("td:nth-child(3)").text().trim();

        if (currency && buyingRate && sellingRate) {
          exchangeRates.push({
            bank: "AIK Banka",
            currency,
            buyingRate,
            sellingRate
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
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch data" })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
