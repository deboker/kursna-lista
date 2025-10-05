import React, { useState } from "react";

function CurrencyConverter({ allBankRates }) {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("RSD");
  const [selectedBank, setSelectedBank] = useState("Narodna Banka Srbije");
  const [rateType, setRateType] = useState("srednji");
  const [result, setResult] = useState(null);

  // Get available banks
  const banks = Object.keys(allBankRates).filter(bank => allBankRates[bank].length > 0);

  // Get rates for selected bank
  const selectedRates = allBankRates[selectedBank] || [];

  // Get unique currencies from selected bank
  const currencies = ["RSD", ...new Set(selectedRates.map(rate => rate.currency))].sort();

  // Helper function to get the rate based on selected type
  const getRate = (rateData) => {
    if (rateType === "kupovni") {
      return parseFloat(rateData.buyingRate);
    } else if (rateType === "prodajni") {
      return parseFloat(rateData.sellingRate);
    } else { // srednji
      return (parseFloat(rateData.buyingRate) + parseFloat(rateData.sellingRate)) / 2;
    }
  };

  const handleConvert = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setResult(null);
      return;
    }

    const numAmount = parseFloat(amount);

    // If converting from RSD to foreign currency
    if (fromCurrency === "RSD" && toCurrency !== "RSD") {
      const targetRate = selectedRates.find(r => r.currency === toCurrency);
      if (targetRate) {
        const rate = getRate(targetRate);
        const converted = numAmount / rate;
        setResult(converted.toFixed(2));
      }
    }
    // If converting from foreign currency to RSD
    else if (fromCurrency !== "RSD" && toCurrency === "RSD") {
      const sourceRate = selectedRates.find(r => r.currency === fromCurrency);
      if (sourceRate) {
        const rate = getRate(sourceRate);
        const converted = numAmount * rate;
        setResult(converted.toFixed(2));
      }
    }
    // If converting between two foreign currencies
    else if (fromCurrency !== "RSD" && toCurrency !== "RSD") {
      const sourceRate = selectedRates.find(r => r.currency === fromCurrency);
      const targetRate = selectedRates.find(r => r.currency === toCurrency);
      if (sourceRate && targetRate) {
        const sourceRateValue = getRate(sourceRate);
        const targetRateValue = getRate(targetRate);
        const inRSD = numAmount * sourceRateValue;
        const converted = inRSD / targetRateValue;
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
          <label>Banka:</label>
          <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
            {banks.map(bank => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tip kursa:</label>
          <select value={rateType} onChange={(e) => setRateType(e.target.value)}>
            <option value="kupovni">Kupovni kurs</option>
            <option value="srednji">Srednji kurs</option>
            <option value="prodajni">Prodajni kurs</option>
          </select>
        </div>

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
          Napomena: Pri konverziji se koriste {rateType} kursevi za date valute{rateType === "srednji" ? " i nije uračunata provizija Banke na prodaju efektive" : ""}.
        </p>
      </div>
    </div>
  );
}

export default CurrencyConverter;
