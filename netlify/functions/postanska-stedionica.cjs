const axios = require("axios");

exports.handler = async function(event, context) {
  try {
    const url = "https://www.posted.co.rs/testsite/kursna-json.php";
    const response = await axios.get(url);

    if (response.status === 200) {
      const data = response.data;
      const exchangeRates = [];

      if (data.Kursna_lista && data.Kursna_lista.Valuta) {
        const valute = data.Kursna_lista.Valuta;

        // Get date from first entry
        const dateText = valute[0]?.Vreme || "";
        let date = new Date().toISOString().split('T')[0];

        if (dateText) {
          const dateParts = dateText.split('.');
          if (dateParts.length === 3) {
            const day = dateParts[0].padStart(2, '0');
            const month = dateParts[1].padStart(2, '0');
            const year = dateParts[2];
            date = `${year}-${month}-${day}`;
          }
        }

        valute.forEach(valuta => {
          const currency = valuta.Oznaka_valute;
          const buyingRate = parseFloat(valuta.Klkup_kurs);
          const sellingRate = parseFloat(valuta.Prodajni_kurs);

          if (currency && buyingRate > 0 && sellingRate > 0) {
            exchangeRates.push({
              bank: "Poštanska štedionica",
              currency: currency,
              buyingRate: buyingRate.toFixed(4),
              sellingRate: sellingRate.toFixed(4),
              date: date
            });
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
    console.error("Error fetching Poštanska štedionica rates:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
