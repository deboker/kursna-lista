import React from "react";

const currencyNames = {
  EUR: "Euro",
  USD: "Američki dolar",
  GBP: "Funta Sterlinga",
  CHF: "Švajcarski franak",
  AUD: "Australijski dolar",
  CAD: "Kanadski dolar",
  CZK: "Češka kruna",
  DKK: "Danska kruna",
  HUF: "Mađarska forinta",
  NOK: "Norveška kruna",
  SEK: "Švedska kruna",
  BAM: "Konvertibilna marka",
  RUB: "Ruska rublja",
  HRK: "Hrvatska kuna",
  JPY: "Japanski jen",
  CNY: "Kineski juan",
  PLN: "Poljski zlot",
  TRY: "Turska lira",
  RON: "Rumunski lej",
  BGN: "Bugarski lev",
  MKD: "Makedonski denar",
  INR: "Indijska rupija",
  KWD: "Kuvajtski dinar",
  AED: "UAE dirham",
  BYN: "Beloruska rublja"
};

function ExchangeRateTable({ exchangeRates, selectedCurrency, allBankRates }) {
  // Filter for selected currency and exclude zero rates
  const filteredRates = exchangeRates.filter(rate => {
    const matchesCurrency = selectedCurrency ? rate.currency === selectedCurrency : true;
    const hasValidRate = parseFloat(rate.buyingRate) > 0 && parseFloat(rate.sellingRate) > 0;
    return matchesCurrency && hasValidRate;
  });

  // Find best rates for the selected currency across all banks
  const getBestRates = () => {
    if (!allBankRates || !selectedCurrency) return null;

    let bestBuyingRate = -Infinity;
    let bestSellingRate = Infinity;

    // Go through all banks
    Object.values(allBankRates).forEach(bankRates => {
      if (Array.isArray(bankRates)) {
        bankRates.forEach(rate => {
          if (rate.currency === selectedCurrency) {
            const buying = parseFloat(rate.buyingRate);
            const selling = parseFloat(rate.sellingRate);

            if (buying > 0 && buying > bestBuyingRate) {
              bestBuyingRate = buying;
            }
            if (selling > 0 && selling < bestSellingRate) {
              bestSellingRate = selling;
            }
          }
        });
      }
    });

    return {
      bestBuyingRate: bestBuyingRate === -Infinity ? null : bestBuyingRate,
      bestSellingRate: bestSellingRate === Infinity ? null : bestSellingRate
    };
  };

  const bestRates = getBestRates();

  return (
    <div className="exchange-rate-table">
      <table>
        <thead>
          <tr>
            <th>Oznaka</th>
            <th>Naziv</th>
            <th>Kupovni</th>
            <th>Srednji</th>
            <th>Prodajni</th>
          </tr>
        </thead>
        <tbody>
          {filteredRates.map((rate, index) => {
            const buying = parseFloat(rate.buyingRate);
            const selling = parseFloat(rate.sellingRate);
            const isBestBuying = bestRates && buying === bestRates.bestBuyingRate;
            const isBestSelling = bestRates && selling === bestRates.bestSellingRate;

            return (
              <tr key={index}>
                <td>{rate.currency}</td>
                <td>{currencyNames[rate.currency] || rate.currency}</td>
                <td style={isBestBuying ? { color: '#4caf50', fontWeight: 'bold' } : {}}>
                  {rate.buyingRate}
                </td>
                <td>{rate.middleRate || ((parseFloat(rate.buyingRate) + parseFloat(rate.sellingRate)) / 2).toFixed(4)}</td>
                <td style={isBestSelling ? { color: '#4caf50', fontWeight: 'bold' } : {}}>
                  {rate.sellingRate}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ExchangeRateTable;
