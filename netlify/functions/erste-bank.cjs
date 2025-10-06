const axios = require("axios");

exports.handler = async function(event, context) {
  try {
    // Get current date in DD.MM.YYYY. format
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const datum = `${day}.${month}.${year}.`;

    const url = `https://moduli.erstebank.rs/aspx/kursna_lista/datum.aspx?datum=${datum}&eng=false`;
    const response = await axios.get(url);

    if (response.status === 200) {
      const data = response.data;
      const exchangeRates = [];

      // Format date for our response (YYYY-MM-DD)
      const dateFormatted = `${year}-${month}-${day}`;

      // Process each currency from API response
      data.forEach((item) => {
        // Use KupovniDevize (buying foreign exchange) and ProdajniDevize (selling foreign exchange)
        const buyingRate = item.KupovniDevize;
        const sellingRate = item.ProdajniDevize;

        // Only add currencies with valid rates (greater than 0)
        if (item.Oznaka && buyingRate > 0 && sellingRate > 0) {
          exchangeRates.push({
            bank: "Erste Bank",
            currency: item.Oznaka,
            buyingRate: buyingRate.toFixed(4),
            sellingRate: sellingRate.toFixed(4),
            date: dateFormatted
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
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch data" })
      };
    }
  } catch (error) {
    console.error("Error fetching Erste Bank rates:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
