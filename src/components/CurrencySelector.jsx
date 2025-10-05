import React from "react";

function CurrencySelector({ selectedCurrency, onCurrencyChange, onShowResults }) {
  const handleCurrencyChange = (e) => {
    onCurrencyChange(e.target.value);
  };

  return (
    <div className="currency-selector">
      <label>Izaberite valutu:</label>
      <div className="selector-controls">
        <select
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          <option value="EUR">EUR - Euro</option>
          <option value="USD">USD - Američki dolar</option>
          <option value="GBP">GBP - Funta Sterlinga</option>
          <option value="CHF">CHF - Švajcarski franak</option>
          <option value="AUD">AUD - Australijski dolar</option>
          <option value="CAD">CAD - Kanadski dolar</option>
          <option value="BAM">BAM - Konvertibilna marka</option>
        </select>
        <button onClick={onShowResults} className="show-results-btn">
          Prikaži rezultat
        </button>
      </div>
    </div>
  );
}

export default CurrencySelector;
