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
  CNY: "Kineski juan"
};

function ExchangeRateTable({ exchangeRates, selectedCurrency }) {
  // Filter for selected currency
  const filteredRates = selectedCurrency
    ? exchangeRates.filter(rate => rate.currency === selectedCurrency)
    : exchangeRates;

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
          {filteredRates.map((rate, index) => (
            <tr key={index}>
              <td>{rate.currency}</td>
              <td>{currencyNames[rate.currency] || rate.currency}</td>
              <td>{rate.buyingRate}</td>
              <td>{rate.middleRate || ((parseFloat(rate.buyingRate) + parseFloat(rate.sellingRate)) / 2).toFixed(4)}</td>
              <td>{rate.sellingRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExchangeRateTable;
