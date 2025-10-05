// Alta Banka - Mock data (requires manual updates)
// Website uses complex JavaScript datatable that is difficult to scrape
// Data source: https://altabanka.rs/kursna-lista-2/

exports.handler = async function(event, context) {
  try {
    // Mock data with current rates (as of 2025-10-03)
    const exchangeRates = [
      { bank: "Alta Banka", currency: "EUR", buyingRate: "114.9359", sellingRate: "119.3764", date: "2025-10-03" },
      { bank: "Alta Banka", currency: "USD", buyingRate: "97.9766", sellingRate: "102.5755", date: "2025-10-03" },
      { bank: "Alta Banka", currency: "GBP", buyingRate: "129.5683", sellingRate: "138.9671", date: "2025-10-03" },
      { bank: "Alta Banka", currency: "CHF", buyingRate: "121.5218", sellingRate: "129.0386", date: "2025-10-03" },
      { bank: "Alta Banka", currency: "AUD", buyingRate: "63.5783", sellingRate: "68.1903", date: "2025-10-03" },
      { bank: "Alta Banka", currency: "CAD", buyingRate: "69.0536", sellingRate: "74.0626", date: "2025-10-03" },
      { bank: "Alta Banka", currency: "SEK", buyingRate: "10.2563", sellingRate: "11.0003", date: "2025-10-03" },
      { bank: "Alta Banka", currency: "NOK", buyingRate: "9.6541", sellingRate: "10.3545", date: "2025-10-03" },
      { bank: "Alta Banka", currency: "CNY", buyingRate: "12.6350", sellingRate: "15.4428", date: "2025-10-03" },
      { bank: "Alta Banka", currency: "RUB", buyingRate: "0.8476", sellingRate: "1.5740", date: "2025-10-03" },
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
