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
        const response = await axios.get('/.netlify/functions/scrape');

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
          { bank: "AIK Banka", currency: "EUR", buyingRate: "117.00", sellingRate: "118.00" },
          { bank: "AIK Banka", currency: "USD", buyingRate: "106.50", sellingRate: "107.50" },
          { bank: "AIK Banka", currency: "GBP", buyingRate: "135.00", sellingRate: "136.50" },
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
