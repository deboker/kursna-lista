import React from "react";

function CurrencySelector({ selectedCurrencyPair, onCurrencyChange }) {
  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    onCurrencyChange(name, value);
  };

  return (
    <div className="currency-selector">
      <label>Select Currency Pair:</label>
      <select
        name="from"
        value={selectedCurrencyPair.from}
        onChange={handleCurrencyChange}
      >
        {/* Add options for different currencies */}
      </select>
      <span>to</span>
      <select
        name="to"
        value={selectedCurrencyPair.to}
        onChange={handleCurrencyChange}
      >
        {/* Add options for different currencies */}
      </select>
    </div>
  );
}

export default CurrencySelector;
