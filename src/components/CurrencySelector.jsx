import React from "react";

function CurrencySelector({ selectedCurrencyPair, onCurrencyChange, onShowResults }) {
  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    onCurrencyChange(name, value);
  };

  return (
    <div className="currency-selector">
      <label>Izaberite valutni par:</label>
      <div className="selector-controls">
        <select
          name="from"
          value={selectedCurrencyPair.from}
          onChange={handleCurrencyChange}
        >
          <option value="RSD">RSD</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="CHF">CHF</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
        </select>
        <span>u</span>
        <select
          name="to"
          value={selectedCurrencyPair.to}
          onChange={handleCurrencyChange}
        >
          <option value="EUR">EUR</option>
          <option value="RSD">RSD</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="CHF">CHF</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
        </select>
        <button onClick={onShowResults} className="show-results-btn">
          Prikaži rezultat
        </button>
      </div>
    </div>
  );
}

export default CurrencySelector;
