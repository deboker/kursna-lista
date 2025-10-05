import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencySelector from "./components/CurrencySelector";
import ExchangeRateTable from "./components/ExchangeRateTable";
import "./index.css";
import backgroundImage from "./assets/cd260a30-11d9-4634-bb33-ab81da4094c0.jpg";

function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [aikBankaRates, setAikBankaRates] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch NBS rates
        const nbsResponse = await axios.get("/.netlify/functions/scrape");
        if (nbsResponse.status === 200) {
          setExchangeRates(nbsResponse.data);
        }

        // Fetch AIK Banka rates
        const aikResponse = await axios.get("/.netlify/functions/aik-banka");
        if (aikResponse.status === 200) {
          setAikBankaRates(aikResponse.data);
        }

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCurrencyChange = (value) => {
    setSelectedCurrency(value);
    setShowResults(false); // Reset results when currency changes
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  return (
    <div className="app">
      <div className="background-overlay">
        <div
          className="bg-image"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="background-gradient"></div>
      </div>
      <h1>Kursna Lista</h1>
      <CurrencySelector
        selectedCurrency={selectedCurrency}
        onCurrencyChange={handleCurrencyChange}
        onShowResults={handleShowResults}
      />
      {loading ? (
        <p>Učitavanje...</p>
      ) : error ? (
        <p>Greška: {error}</p>
      ) : showResults && exchangeRates.length > 0 ? (
        <>
          {exchangeRates[0].date && (
            <p className="exchange-date">Datum: {exchangeRates[0].date}</p>
          )}

          <h2 className="bank-name">Narodna Banka Srbije</h2>
          <ExchangeRateTable
            exchangeRates={exchangeRates}
            selectedCurrency={selectedCurrency}
          />

          <h2 className="bank-name" style={{marginTop: "40px"}}>AIK Banka</h2>
          <ExchangeRateTable
            exchangeRates={aikBankaRates}
            selectedCurrency={selectedCurrency}
          />
        </>
      ) : null}
    </div>
  );
}
export default App;
