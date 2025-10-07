const axios = require("axios");

exports.handler = async function(event, context) {
  try {
    // Get current date in YYYYMMDD format
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;

    // Raiffeisen Bank API endpoint
    const url = `https://www.raiffeisenbank.rs/sr.exchangerates.${dateStr}.BASE.EUR-USD-CHF-GBP-AUD-RUB-SEK-CAD-DKK-JPY-NOK-PGK-HUF-PLN-AED.RSD.json`;

    const response = await axios.get(url);

    if (response.status === 200 && response.data) {
      const data = response.data;
      const exchangeRates = [];

      // Format date for our response (YYYY-MM-DD)
      const date = `${year}-${month}-${day}`;

      // Process each currency from API response
      // Data structure: { rates: [{ currencyList: [...] }] }
      if (data.rates && Array.isArray(data.rates) && data.rates[0] && data.rates[0].currencyList) {
        const currencyList = data.rates[0].currencyList;

        currencyList.forEach((item) => {
          if (item.currencyPair && item.currencyPair.left && item.buyRate && item.sellRate) {
            const currency = item.currencyPair.left.code;
            const buyingRate = item.buyRate.value;
            const sellingRate = item.sellRate.value;

            // Only add currencies with valid rates
            if (currency && buyingRate > 0 && sellingRate > 0) {
              exchangeRates.push({
                bank: "Raiffeisen Bank",
                currency: currency,
                buyingRate: buyingRate.toFixed(4),
                sellingRate: sellingRate.toFixed(4),
                date: date
              });
            }
          }
        });
      }

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
    console.error("Error fetching Raiffeisen Bank rates:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
