import React from "react";

function ExchangeRateTable({ exchangeRates }) {
  // Filter exchange rates for EUR currency
  const eurExchangeRates = exchangeRates.filter(
    (rate) => rate.currency === "EUR"
  );

  return (
    <div className="exchange-rate-table">
      <table>
        <thead>
          <tr>
            <th>Bank</th>
            <th>Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {eurExchangeRates.map((rate, index) => (
            <tr key={index}>
              <td>{rate.bank}</td>
              <td>{`${rate.buyingRate} / ${rate.sellingRate}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExchangeRateTable;
