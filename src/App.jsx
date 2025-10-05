import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencySelector from "./components/CurrencySelector";
import ExchangeRateTable from "./components/ExchangeRateTable";
import "./index.css";

function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState({
    from: "RSD",
    to: "EUR",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/.netlify/functions/scrape");

        if (response.status === 200) {
          setExchangeRates(response.data);
          setLoading(false);
        } else {
          setError("Failed to fetch data");
          setLoading(false);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        // Fallback to mock data if API fails
        const mockData = [
          {
            bank: "AIK Banka",
            currency: "EUR",
            buyingRate: "117.00",
            sellingRate: "118.00",
          },
          {
            bank: "AIK Banka",
            currency: "USD",
            buyingRate: "106.50",
            sellingRate: "107.50",
          },
          {
            bank: "AIK Banka",
            currency: "GBP",
            buyingRate: "135.00",
            sellingRate: "136.50",
          },
        ];
        setExchangeRates(mockData);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCurrencyPair]);

  const handleCurrencyChange = (from, to) => {
    setSelectedCurrencyPair({ from, to });
  };

  return (
    <div className="app">
      <div className="background-overlay">
        <div className="background-gradient"></div>
        <div
          className="bg-image"
          style={{
            backgroundImage: 'url("cd260a30-11d9-4634-bb33-ab81da4094c0.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        ></div>
      </div>
      <h1>Exchange Rate Tracker</h1>
      <CurrencySelector
        selectedCurrencyPair={selectedCurrencyPair}
        onCurrencyChange={handleCurrencyChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ExchangeRateTable exchangeRates={exchangeRates} />
      )}
    </div>
  );
}
export default App;
