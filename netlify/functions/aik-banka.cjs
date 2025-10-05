// Mock data for AIK Banka - to be replaced with real scraping when available
exports.handler = async function(event, context) {
  try {
    // Mock exchange rates for AIK Banka
    const exchangeRates = [
      { bank: "AIK Banka", currency: "EUR", buyingRate: "116.5000", sellingRate: "117.8000", date: new Date().toISOString().split('T')[0] },
      { bank: "AIK Banka", currency: "USD", buyingRate: "98.5000", sellingRate: "101.5000", date: new Date().toISOString().split('T')[0] },
      { bank: "AIK Banka", currency: "GBP", buyingRate: "133.0000", sellingRate: "136.0000", date: new Date().toISOString().split('T')[0] },
      { bank: "AIK Banka", currency: "CHF", buyingRate: "124.0000", sellingRate: "126.0000", date: new Date().toISOString().split('T')[0] },
      { bank: "AIK Banka", currency: "AUD", buyingRate: "64.5000", sellingRate: "66.5000", date: new Date().toISOString().split('T')[0] },
      { bank: "AIK Banka", currency: "CAD", buyingRate: "70.0000", sellingRate: "72.3000", date: new Date().toISOString().split('T')[0] },
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
