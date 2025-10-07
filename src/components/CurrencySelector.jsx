import React from "react";

function CurrencySelector({ selectedCurrency, onCurrencyChange, onShowResults, loading, error }) {
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
          <option value="JPY">JPY - Japanski jen</option>
          <option value="CNY">CNY - Kineski juan</option>
          <option value="NOK">NOK - Norveška kruna</option>
          <option value="SEK">SEK - Švedska kruna</option>
          <option value="DKK">DKK - Danska kruna</option>
          <option value="CZK">CZK - Češka kruna</option>
          <option value="HUF">HUF - Mađarska forinta</option>
          <option value="PLN">PLN - Poljski zlot</option>
          <option value="RUB">RUB - Ruska rublja</option>
          <option value="TRY">TRY - Turska lira</option>
        </select>
        <button onClick={onShowResults} className="show-results-btn" disabled={loading}>
          {loading ? "⏳ Učitavanje..." : error ? "❌ Greška" : "Prikaži rezultat"}
        </button>
      </div>
    </div>
  );
}

export default CurrencySelector;
