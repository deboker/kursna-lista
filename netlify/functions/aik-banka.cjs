// Mock data for AIK Banka - to be replaced with real scraping when available
exports.handler = async function(event, context) {
  try {
    // Mock exchange rates for AIK Banka (based on 03.10.2025)
    // TODO: Replace with real scraping when available
    const exchangeRates = [
      { bank: "AIK Banka", currency: "EUR", buyingRate: "114.2330", sellingRate: "120.0911", date: "2025-10-03" },
      { bank: "AIK Banka", currency: "USD", buyingRate: "96.9768", sellingRate: "102.9754", date: "2025-10-03" },
      { bank: "AIK Banka", currency: "GBP", buyingRate: "130.2397", sellingRate: "138.2957", date: "2025-10-03" },
      { bank: "AIK Banka", currency: "CHF", buyingRate: "121.5218", sellingRate: "129.0386", date: "2025-10-03" },
      { bank: "AIK Banka", currency: "AUD", buyingRate: "63.9078", sellingRate: "67.8608", date: "2025-10-03" },
      { bank: "AIK Banka", currency: "CAD", buyingRate: "69.4114", sellingRate: "73.7048", date: "2025-10-03" },
      { bank: "AIK Banka", currency: "JPY", buyingRate: "65.6237", sellingRate: "69.6829", date: "2025-10-03" },
      { bank: "AIK Banka", currency: "RUB", buyingRate: "1.0292", sellingRate: "1.3924", date: "2025-10-03" },
      { bank: "AIK Banka", currency: "SEK", buyingRate: "10.3095", sellingRate: "10.9471", date: "2025-10-03" },
      { bank: "AIK Banka", currency: "NOK", buyingRate: "9.7042", sellingRate: "10.3044", date: "2025-10-03" },
      { bank: "AIK Banka", currency: "DKK", buyingRate: "15.2171", sellingRate: "16.1583", date: "2025-10-03" },
      { bank: "AIK Banka", currency: "HUF", buyingRate: "28.5769", sellingRate: "31.5849", date: "2025-10-03" },
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
