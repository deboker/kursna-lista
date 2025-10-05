import React from "react";

function ExchangeRateTable({ exchangeRates }) {
  return (
    <div className="exchange-rate-table">
      <table>
        <thead>
          <tr>
            <th>Valuta</th>
            <th>Kupovni / Prodajni kurs</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map((rate, index) => (
            <tr key={index}>
              <td>{rate.currency}</td>
              <td>{`${rate.buyingRate} / ${rate.sellingRate}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExchangeRateTable;
