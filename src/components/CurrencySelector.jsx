import React from "react";

function CurrencySelector({ selectedCurrencyPair, onCurrencyChange }) {
  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    onCurrencyChange(name, value);
  };

  return (
    <div className="currency-selector">
      <label>Izaberite valutni par:</label>
      <select
        name="from"
        value={selectedCurrencyPair.from}
        onChange={handleCurrencyChange}
      >
        <option value="RSD">RSD</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
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
      </select>
    </div>
  );
}

export default CurrencySelector;
