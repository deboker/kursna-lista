const axios = require("axios");

exports.handler = async function(event, context) {
  try {
    const url = "https://www.bancaintesa.rs/Downloads/BIB-Kursna%20lista.txt";
    const response = await axios.get(url);

    if (response.status === 200) {
      const text = response.data;
      const lines = text.split('\n');
      const exchangeRates = [];

      // Find the date from the first line
      const dateLine = lines[0];
      const dateMatch = dateLine.match(/(\d{2}\.\d{2}\.\d{4})/);
      const date = dateMatch ? dateMatch[1].split('.').reverse().join('-') : new Date().toISOString().split('T')[0];

      // Skip header lines and process data
      for (let i = 3; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Split by whitespace
        const parts = line.split(/\s+/);
        if (parts.length < 6) continue;

        const currency = parts[0];
        const buyingRate = parseFloat(parts[2].replace(',', '.')).toFixed(4);
        const sellingRate = parseFloat(parts[5].replace(',', '.')).toFixed(4);

        // Skip if rates are 0
        if (parseFloat(buyingRate) > 0 && parseFloat(sellingRate) > 0) {
          exchangeRates.push({
            bank: "Banca Intesa",
            currency: currency,
            buyingRate: buyingRate,
            sellingRate: sellingRate,
            date: date
          });
        }
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
    console.error("Error fetching Banca Intesa rates:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
