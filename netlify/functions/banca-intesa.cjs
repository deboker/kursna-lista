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
      // Format: VALUTA PARITET KUPOVNI EFEKTIVA_KUPOVNI SREDNJI PRODAJNI EFEKTIVA_PRODAJNI
      for (let i = 3; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Split by whitespace
        const parts = line.split(/\s+/);
        if (parts.length < 7) continue;

        const currency = parts[0];

        // Skip special entries
        if (currency === 'EUR_NET' || currency === 'KWD') continue;

        // Columns: 0=VALUTA, 1=PARITET, 2=KUPOVNI, 3=EFEKTIVA_KUPOVNI, 4=SREDNJI, 5=PRODAJNI, 6=EFEKTIVA_PRODAJNI
        let buyingRate = parseFloat(parts[2].replace(',', '.'));
        let sellingRate = parseFloat(parts[5].replace(',', '.'));

        // If devize rates are 0, use efektiva rates
        if (buyingRate === 0 && parts[3]) {
          buyingRate = parseFloat(parts[3].replace(',', '.'));
        }
        if (sellingRate === 0 && parts[6]) {
          sellingRate = parseFloat(parts[6].replace(',', '.'));
        }

        // Skip if both rates are still 0 or invalid
        if (buyingRate > 0 && sellingRate > 0) {
          exchangeRates.push({
            bank: "Banca Intesa",
            currency: currency,
            buyingRate: buyingRate.toFixed(4),
            sellingRate: sellingRate.toFixed(4),
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
