import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencySelector from "./components/CurrencySelector";
import ExchangeRateTable from "./components/ExchangeRateTable";
import CurrencyConverter from "./components/CurrencyConverter";
import "./index.css";
import backgroundImage from "./assets/7405151_3647208.jpg";
import nbsLogo from "./assets/narodna-banka-logo.svg";
import aikLogo from "./assets/aik-banka-logo.png";
import intesaLogo from "./assets/BANCA_INTESA_White-logo.webp";
import addikoLogo from "./assets/addiko-bank-logo.png";
import adriaticLogo from "./assets/Adriatic-banka-logo.png";
import altaLogo from "./assets/alta-banka-logo.png";
import apiLogo from "./assets/api-banka-logo.svg";
import postanskaLogo from "./assets/postanska-stedionica-logo.svg";
import ersteLogo from "./assets/erte-bank-logo.svg";
import nlbLogo from "./assets/nlb-komercialna-logo.svg";
import otpLogo from "./assets/otp-banka-logo.svg";
import procreditLogo from "./assets/procredit-bank-logo.svg";
import raiffeisenLogo from "./assets/Raiffeisen-Bank-logo.png";

function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [aikBankaRates, setAikBankaRates] = useState([]);
  const [bancaIntesaRates, setBancaIntesaRates] = useState([]);
  const [addikoBankRates, setAddikoBankRates] = useState([]);
  const [adriaticBankRates, setAdriaticBankRates] = useState([]);
  const [altaBankaRates, setAltaBankaRates] = useState([]);
  const [apiBankaRates, setApiBankaRates] = useState([]);
  const [postanskaRates, setPostanskaRates] = useState([]);
  const [ersteBankRates, setErsteBankRates] = useState([]);
  const [nlbKomercijalnaRates, setNlbKomercijalnaRates] = useState([]);
  const [otpBankaRates, setOtpBankaRates] = useState([]);
  const [procreditBankRates, setProcreditBankRates] = useState([]);
  const [raiffeisenBankRates, setRaiffeisenBankRates] = useState([]);
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
          fetchBank(
            "/.netlify/functions/aik-banka",
            setAikBankaRates,
            "AIK Banka"
          ),
          fetchBank(
            "/.netlify/functions/banca-intesa",
            setBancaIntesaRates,
            "Banca Intesa"
          ),
          fetchBank(
            "/.netlify/functions/addiko-bank",
            setAddikoBankRates,
            "Addiko Bank"
          ),
          fetchBank(
            "/.netlify/functions/adriatic-bank",
            setAdriaticBankRates,
            "Adriatic Bank"
          ),
          fetchBank(
            "/.netlify/functions/alta-banka",
            setAltaBankaRates,
            "Alta Banka"
          ),
          fetchBank(
            "/.netlify/functions/api-banka",
            setApiBankaRates,
            "API Banka"
          ),
          fetchBank(
            "/.netlify/functions/postanska-stedionica",
            setPostanskaRates,
            "Poštanska štedionica"
          ),
          fetchBank(
            "/.netlify/functions/erste-bank",
            setErsteBankRates,
            "Erste Bank"
          ),
          fetchBank(
            "/.netlify/functions/nlb-komercijalna",
            setNlbKomercijalnaRates,
            "NLB Komercijalna Banka"
          ),
          fetchBank(
            "/.netlify/functions/otp-banka",
            setOtpBankaRates,
            "OTP Banka"
          ),
          fetchBank(
            "/.netlify/functions/procredit-bank",
            setProcreditBankRates,
            "ProCredit Bank"
          ),
          fetchBank(
            "/.netlify/functions/raiffeisen-bank",
            setRaiffeisenBankRates,
            "Raiffeisen Bank"
          ),
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
      <h2>
        Uporedite devizne kurseve banaka i menjačnica u Srbiji na jednom mestu
      </h2>

      <div className="app-container">
        {/* Left Sidebar - Ads */}
        <div className="left-sidebar">
          <h3>Reklamni prostor</h3>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <CurrencySelector
            selectedCurrency={selectedCurrency}
            onCurrencyChange={handleCurrencyChange}
            onShowResults={handleShowResults}
          />
          {loading ? (
            <p className="loading-message">⏳ Učitavanje...</p>
          ) : error ? (
            <p className="error-message">❌ Greška: {error}</p>
          ) : (
            <>
              {showResults && exchangeRates.length > 0 && (
                <>
                  {exchangeRates[0].date && (
                    <p className="exchange-date">
                      Datum: {exchangeRates[0].date}
                    </p>
                  )}

                  <h2 className="bank-name">
                    <a
                      href="https://www.nbs.rs/sr_RS/indeks/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={nbsLogo}
                        alt="Narodna Banka Srbije logo"
                        className="bank-logo"
                      />
                      Narodna Banka Srbije
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={exchangeRates}
                    selectedCurrency={selectedCurrency}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://www.aikbank.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={aikLogo}
                        alt="AIK Banka logo"
                        className="bank-logo"
                      />
                      AIK Banka
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={aikBankaRates}
                    selectedCurrency={selectedCurrency}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://www.bancaintesa.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={intesaLogo}
                        alt="Banca Intesa logo"
                        className="bank-logo"
                      />
                      Banca Intesa
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={bancaIntesaRates}
                    selectedCurrency={selectedCurrency}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://www.addiko.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={addikoLogo}
                        alt="Addiko Bank logo"
                        className="bank-logo"
                      />
                      Addiko Bank
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={addikoBankRates}
                    selectedCurrency={selectedCurrency}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://adriaticbank.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={adriaticLogo}
                        alt="Adriatic Bank logo"
                        className="bank-logo"
                      />
                      Adriatic Bank
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={adriaticBankRates}
                    selectedCurrency={selectedCurrency}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://altabanka.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={altaLogo}
                        alt="Alta Banka logo"
                        className="bank-logo"
                      />
                      Alta Banka
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={altaBankaRates}
                    selectedCurrency={selectedCurrency}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://www.apibank.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={apiLogo}
                        alt="API Banka logo"
                        className="bank-logo"
                      />
                      API Banka
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={apiBankaRates}
                    selectedCurrency={selectedCurrency}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://www.erstebank.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={ersteLogo}
                        alt="Erste Bank logo"
                        className="bank-logo"
                      />
                      Erste Bank
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={ersteBankRates}
                    selectedCurrency={selectedCurrency}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://www.posted.co.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={postanskaLogo}
                        alt="Poštanska štedionica logo"
                        className="bank-logo"
                      />
                      Poštanska štedionica
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={postanskaRates}
                    selectedCurrency={selectedCurrency}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://www.nlbkb.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={nlbLogo}
                        alt="NLB Komercijalna Banka logo"
                        className="bank-logo"
                      />
                      NLB Komercijalna Banka
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={nlbKomercijalnaRates}
                    selectedCurrency={selectedCurrency}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://www.otpbanka.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={otpLogo}
                        alt="OTP Banka logo"
                        className="bank-logo"
                      />
                      OTP Banka
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={otpBankaRates}
                    selectedCurrency={selectedCurrency}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://www.procreditbank.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={procreditLogo}
                        alt="ProCredit Bank logo"
                        className="bank-logo"
                      />
                      ProCredit Bank
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={procreditBankRates}
                    selectedCurrency={selectedCurrency}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://www.raiffeisenbank.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={raiffeisenLogo}
                        alt="Raiffeisen Bank logo"
                        className="bank-logo"
                      />
                      Raiffeisen Bank
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={raiffeisenBankRates}
                    selectedCurrency={selectedCurrency}
                  />
                </>
              )}
            </>
          )}
        </div>

        {/* Right Sidebar - Calculator */}
        <div className="right-sidebar">
          {exchangeRates.length > 0 && (
            <CurrencyConverter
              allBankRates={{
                "Narodna Banka Srbije": exchangeRates,
                "AIK Banka": aikBankaRates,
                "Banca Intesa": bancaIntesaRates,
                "Addiko Bank": addikoBankRates,
                "Adriatic Bank": adriaticBankRates,
                "Alta Banka": altaBankaRates,
                "API Banka": apiBankaRates,
                "Erste Bank": ersteBankRates,
                "Poštanska štedionica": postanskaRates,
                "NLB Komercijalna Banka": nlbKomercijalnaRates,
                "OTP Banka": otpBankaRates,
                "ProCredit Bank": procreditBankRates,
                "Raiffeisen Bank": raiffeisenBankRates,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
