import React, { useState } from "react";

function CurrencyConverter({ allRates }) {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("RSD");
  const [result, setResult] = useState(null);

  // Get unique currencies from all banks
  const currencies = ["RSD", ...new Set(allRates.map(rate => rate.currency))].sort();

  const handleConvert = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setResult(null);
      return;
    }

    const numAmount = parseFloat(amount);

    // If converting from RSD to foreign currency
    if (fromCurrency === "RSD" && toCurrency !== "RSD") {
      const targetRate = allRates.find(r => r.currency === toCurrency);
      if (targetRate) {
        const middleRate = (parseFloat(targetRate.buyingRate) + parseFloat(targetRate.sellingRate)) / 2;
        const converted = numAmount / middleRate;
        setResult(converted.toFixed(2));
      }
    }
    // If converting from foreign currency to RSD
    else if (fromCurrency !== "RSD" && toCurrency === "RSD") {
      const sourceRate = allRates.find(r => r.currency === fromCurrency);
      if (sourceRate) {
        const middleRate = (parseFloat(sourceRate.buyingRate) + parseFloat(sourceRate.sellingRate)) / 2;
        const converted = numAmount * middleRate;
        setResult(converted.toFixed(2));
      }
    }
    // If converting between two foreign currencies
    else if (fromCurrency !== "RSD" && toCurrency !== "RSD") {
      const sourceRate = allRates.find(r => r.currency === fromCurrency);
      const targetRate = allRates.find(r => r.currency === toCurrency);
      if (sourceRate && targetRate) {
        const sourceMiddle = (parseFloat(sourceRate.buyingRate) + parseFloat(sourceRate.sellingRate)) / 2;
        const targetMiddle = (parseFloat(targetRate.buyingRate) + parseFloat(targetRate.sellingRate)) / 2;
        const inRSD = numAmount * sourceMiddle;
        const converted = inRSD / targetMiddle;
        setResult(converted.toFixed(2));
      }
    }
    // If both are RSD
    else {
      setResult(numAmount.toFixed(2));
    }
  };

  return (
    <div className="currency-converter">
      <h2>Konvertor valuta</h2>
      <div className="converter-form">
        <div className="form-group">
          <label>Iznos:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Unesite iznos"
            step="0.01"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Iz:</label>
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              {currencies.map(curr => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>U:</label>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              {currencies.map(curr => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={handleConvert} className="convert-btn">
          Konvertuj
        </button>

        {result !== null && (
          <div className="converter-result">
            <strong>Rezultat:</strong> {result} {toCurrency}
          </div>
        )}

        <p className="converter-note">
          Napomena: Pri konverziji se koriste srednji kursevi za date valute i nije uračunata provizija Banke na prodaju efektive.
        </p>
      </div>
    </div>
  );
}

export default CurrencyConverter;
