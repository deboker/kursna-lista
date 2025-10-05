import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencySelector from "./components/CurrencySelector";
import ExchangeRateTable from "./components/ExchangeRateTable";
import CurrencyConverter from "./components/CurrencyConverter";
import "./index.css";
import backgroundImage from "./assets/cd260a30-11d9-4634-bb33-ab81da4094c0.jpg";

function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [aikBankaRates, setAikBankaRates] = useState([]);
  const [bancaIntesaRates, setBancaIntesaRates] = useState([]);
  const [addikoBankRates, setAddikoBankRates] = useState([]);
  const [adriaticBankRates, setAdriaticBankRates] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all banks in parallel with individual error handling
        const fetchBank = async (url, setter, bankName) => {
          try {
            const response = await axios.get(url);
            if (response.status === 200) {
              setter(response.data);
            }
          } catch (err) {
            console.error(`Error fetching ${bankName}:`, err.message);
          }
        };

        await Promise.all([
          fetchBank("/.netlify/functions/scrape", setExchangeRates, "NBS"),
          fetchBank("/.netlify/functions/aik-banka", setAikBankaRates, "AIK Banka"),
          fetchBank("/.netlify/functions/banca-intesa", setBancaIntesaRates, "Banca Intesa"),
          fetchBank("/.netlify/functions/addiko-bank", setAddikoBankRates, "Addiko Bank"),
          fetchBank("/.netlify/functions/adriatic-bank", setAdriaticBankRates, "Adriatic Bank")
        ]);

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
      ) : (
        <>
          {/* Currency Converter */}
          {exchangeRates.length > 0 && (
            <CurrencyConverter allRates={exchangeRates} />
          )}

          {showResults && exchangeRates.length > 0 && (
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

          <h2 className="bank-name" style={{marginTop: "40px"}}>Banca Intesa</h2>
          <ExchangeRateTable
            exchangeRates={bancaIntesaRates}
            selectedCurrency={selectedCurrency}
          />

          <h2 className="bank-name" style={{marginTop: "40px"}}>Addiko Bank</h2>
          <ExchangeRateTable
            exchangeRates={addikoBankRates}
            selectedCurrency={selectedCurrency}
          />

          <h2 className="bank-name" style={{marginTop: "40px"}}>Adriatic Bank</h2>
          <ExchangeRateTable
            exchangeRates={adriaticBankRates}
            selectedCurrency={selectedCurrency}
          />
            </>
          )}
        </>
      )}
    </div>
  );
}
export default App;
