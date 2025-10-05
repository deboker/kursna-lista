const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://www.aikbanka.rs/kursna-lista/";

async function scrapeAikBankaExchangeRates() {
  try {
    const response = await axios.get(URL);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      // Select the element containing exchange rate data
      const exchangeRateTable = $("table#kursnaLista");

      // Extract exchange rate data
      const exchangeRates = [];
      exchangeRateTable.find("tbody tr").each((index, element) => {
        const currency = $(element).find("td:nth-child(1)").text();
        const buyingRate = $(element).find("td:nth-child(2)").text();
        const sellingRate = $(element).find("td:nth-child(3)").text();
        exchangeRates.push({ currency, buyingRate, sellingRate });
      });

      // Print the exchange rate data
      console.log(exchangeRates);
    } else {
      console.error("Failed to fetch data. Status code:", response.status);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

scrapeAikBankaExchangeRates();
