// Alta Banka - Mock data (requires manual updates)
// Website uses complex JavaScript datatable that is difficult to scrape
// Data source: https://altabanka.rs/kursna-lista-2/

exports.handler = async function(event, context) {
  try {
    // Mock data with current rates (as of 2025-10-05)
    const exchangeRates = [
      { bank: "Alta Banka", currency: "EUR", buyingRate: "116.5800", sellingRate: "118.9200", date: "2025-10-05" },
      { bank: "Alta Banka", currency: "USD", buyingRate: "98.5400", sellingRate: "100.5400", date: "2025-10-05" },
      { bank: "Alta Banka", currency: "GBP", buyingRate: "128.6100", sellingRate: "131.1700", date: "2025-10-05" },
      { bank: "Alta Banka", currency: "CHF", buyingRate: "120.1600", sellingRate: "122.5600", date: "2025-10-05" },
      { bank: "Alta Banka", currency: "AUD", buyingRate: "66.5600", sellingRate: "67.8600", date: "2025-10-05" },
      { bank: "Alta Banka", currency: "CAD", buyingRate: "68.6000", sellingRate: "69.9600", date: "2025-10-05" },
      { bank: "Alta Banka", currency: "SEK", buyingRate: "10.7300", sellingRate: "10.9500", date: "2025-10-05" },
      { bank: "Alta Banka", currency: "DKK", buyingRate: "15.8300", sellingRate: "16.1500", date: "2025-10-05" },
      { bank: "Alta Banka", currency: "NOK", buyingRate: "10.1000", sellingRate: "10.3000", date: "2025-10-05" },
      { bank: "Alta Banka", currency: "JPY", buyingRate: "68.2900", sellingRate: "69.6900", date: "2025-10-05" },
      { bank: "Alta Banka", currency: "CNY", buyingRate: "13.4200", sellingRate: "16.4000", date: "2025-10-05" },
      { bank: "Alta Banka", currency: "RUB", buyingRate: "0.8200", sellingRate: "1.5300", date: "2025-10-05" },
    ];

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(exchangeRates)
    };
  } catch (error) {
    console.error("Error fetching Alta Banka rates:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
