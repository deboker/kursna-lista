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
        // Mock data for now - replace with actual API call when backend is ready
        const mockData = [
          { bank: "AIK Banka", currency: "EUR", buyingRate: "117.00", sellingRate: "118.00" },
          { bank: "Banca Intesa", currency: "EUR", buyingRate: "117.10", sellingRate: "117.90" },
          { bank: "Raiffeisen Bank", currency: "EUR", buyingRate: "117.05", sellingRate: "117.95" },
        ];

        setExchangeRates(mockData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
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
          data-poster-url="https://uploads-ssl.webflow.com/61c05bcae017fc41529392f2/61f90728e329c6ff2d9553dd_pexels-pavel-danilyuk-5495790 (1)-poster-00001.jpg"
          data-video-urls="https://uploads-ssl.webflow.com/61c05bcae017fc41529392f2/61f90728e329c6ff2d9553dd_pexels-pavel-danilyuk-5495790 (1)-transcode.mp4,https://uploads-ssl.webflow.com/61c05bcae017fc41529392f2/61f90728e329c6ff2d9553dd_pexels-pavel-danilyuk-5495790 (1)-transcode.webm"
          data-autoplay="true"
          data-loop="true"
          data-wf-ignore="true"
          className="bg-video w-background-video w-background-video-atom"
        >
          <video
            id="05d6b23a-8463-b77b-0381-9e250e423f2b-video"
            autoPlay
            loop
            style={{
              backgroundImage:
                'url("https://uploads-ssl.webflow.com/61c05bcae017fc41529392f2/61f90728e329c6ff2d9553dd_pexels-pavel-danilyuk-5495790 (1)-poster-00001.jpg")',
            }}
            muted
            playsInline
            data-wf-ignore="true"
            data-object-fit="cover"
          >
            <source
              src="https://uploads-ssl.webflow.com/61c05bcae017fc41529392f2/61f90728e329c6ff2d9553dd_pexels-pavel-danilyuk-5495790 (1)-transcode.mp4"
              data-wf-ignore="true"
            />
            <source
              src="https://uploads-ssl.webflow.com/61c05bcae017fc41529392f2/61f90728e329c6ff2d9553dd_pexels-pavel-danilyuk-5495790 (1)-transcode.webm"
              data-wf-ignore="true"
            />
          </video>
        </div>
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
