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
import raiffeisenLogo from "./assets/Raiffeisen-Bank-logo.svg";
import unicreditLogo from "./assets/unicredit-bank-logo.webp";
import yettelLogo from "./assets/yettel-bank-logo.svg";

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
  const [unicreditBankRates, setUnicreditBankRates] = useState([]);
  const [yettelBankRates, setYettelBankRates] = useState([]);
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
          fetchBank(
            "/.netlify/functions/unicredit-bank",
            setUnicreditBankRates,
            "UniCredit Bank"
          ),
          fetchBank(
            "/.netlify/functions/yettel-bank",
            setYettelBankRates,
            "Yettel Bank"
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
      <h1>
        Kursna Lista <span className="live-text">.live</span>
      </h1>
      <h2>Uporedite devizne kurseve banaka u Srbiji na jednom mestu</h2>

      {/* About Section */}
      <section id="about" className="about-section">
        <h3>O Kursnoj Listi</h3>
        <p>
          Kursna Lista .live vam omogućava da na jednom mestu uporedite devizne kurseve svih
          vodećih banaka u Srbiji. Naša platforma ažurira kurseve u realnom vremenu kako biste
          uvek imali najnovije informacije o cenama valuta.
        </p>
        <p>
          Bez obzira da li planirate putovanje, međunarodnu transakciju ili jednostavno želite
          da pratite tržište valuta, naša aplikacija vam pruža transparentne i tačne podatke
          za donošenje najboljih finansijskih odluka.
        </p>
      </section>

      <div className="app-container">
        {/* Main Content */}
        <div className="main-content">
          <CurrencySelector
            selectedCurrency={selectedCurrency}
            onCurrencyChange={handleCurrencyChange}
            onShowResults={handleShowResults}
            loading={loading}
            error={error}
          />
          {!loading && !error && (
            <>
              {showResults && exchangeRates.length > 0 && (
                <>
                  {/* Introduction */}
                  <div className="content-intro">
                    <h3>Uporedite Kurseve Svih Banaka</h3>
                    <p>
                      Ispod možete videti devizne kurseve za sve banke u Srbiji. Kursevi se
                      prikazuju za srednji, kupovni i prodajni kurs. Zeleno označeni kursevi
                      pokazuju najbolje opcije za kupovinu ili prodaju valute.
                    </p>
                  </div>

                  {exchangeRates[0].date && (
                    <p className="exchange-date">
                      Datum:{" "}
                      {exchangeRates[0].date.split("-").reverse().join(".")}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://www.unicreditbank.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={unicreditLogo}
                        alt="UniCredit Bank logo"
                        className="bank-logo"
                      />
                      UniCredit Bank
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={unicreditBankRates}
                    selectedCurrency={selectedCurrency}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
                  />

                  <h2 className="bank-name" style={{ marginTop: "40px" }}>
                    <a
                      href="https://www.yettelbank.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bank-link"
                    >
                      <img
                        src={yettelLogo}
                        alt="Yettel Bank logo"
                        className="bank-logo"
                      />
                      Yettel Bank
                    </a>
                  </h2>
                  <ExchangeRateTable
                    exchangeRates={yettelBankRates}
                    selectedCurrency={selectedCurrency}
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
                      "UniCredit Bank": unicreditBankRates,
                      "Yettel Bank": yettelBankRates,
                    }}
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
                "UniCredit Bank": unicreditBankRates,
                "Yettel Bank": yettelBankRates,
              }}
            />
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <h2>Često Postavljana Pitanja</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h4>Kada se ažuriraju kursevi?</h4>
            <p>
              Kursevi se ažuriraju svakodnevno prema zvaničnim kursnim listama banaka. Narodna
              Banka Srbije objavljuje svoj kurs radnim danima do 15 časova, dok komercijalne
              banke mogu ažurirati svoje kurseve više puta dnevno.
            </p>
          </div>
          <div className="faq-item">
            <h4>Šta je razlika između srednjeg, kupovnog i prodajnog kursa?</h4>
            <p>
              <strong>Srednji kurs</strong> je referentni kurs koji objavljuje Narodna Banka
              Srbije. <strong>Kupovni kurs</strong> je kurs po kome banka kupuje devize od vas.
              <strong>Prodajni kurs</strong> je kurs po kome banka prodaje devize vama. Razlika
              između kupovnog i prodajnog kursa je marža banke.
            </p>
          </div>
          <div className="faq-item">
            <h4>Kako da odaberem najbolju banku za menjanje valute?</h4>
            <p>
              Ako prodajete devize (npr. EUR) i želite dinare, tražite <strong>najviši kupovni
              kurs</strong>. Ako kupujete devize (npr. EUR) sa dinarima, tražite <strong>najniži
              prodajni kurs</strong>. Zeleno označeni kursevi u tabelama označavaju najbolje opcije.
            </p>
          </div>
          <div className="faq-item">
            <h4>Da li su kursevi isti u svim filijama banke?</h4>
            <p>
              Generalno da, ali neke banke mogu imati drugačije kurseve na šalterima ili u
              menjačnicama. Uvek proverite kurs na licu mesta pre transakcije ili koristite
              online kanale gde je kurs zagarantovan.
            </p>
          </div>
          <div className="faq-item">
            <h4>Koje valute mogu da menjam u Srbiji?</h4>
            <p>
              Većina banaka nudi razmenu najčešćih svetskih valuta: EUR, USD, CHF, GBP. Neke
              banke takođe nude i druge valute kao što su AUD, CAD, DKK, SEK, NOK, RUB, JPY,
              itd. Dostupnost zavisi od banke.
            </p>
          </div>
          <div className="faq-item">
            <h4>Da li mogu da menjam novac bez da imam račun u banci?</h4>
            <p>
              Da, sve banke u Srbiji omogućavaju menjanje valute bez potrebe da budete klijent
              te banke. Potrebna vam je samo lična karta ili pasoš.
            </p>
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="education-section">
        <h2>Kako Funkcionišu Devizni Kursevi?</h2>
        <div className="education-content">
          <div className="education-item">
            <h4>Šta Utiče na Devizne Kurseve?</h4>
            <p>
              Devizni kursevi se menjaju pod uticajem različitih faktora: ekonomska situacija
              u zemlji, kamatne stope, inflacija, politička stabilnost, trgovinski bilans i
              globalni ekonomski trendovi. Narodna Banka Srbije prati sve ove faktore kako bi
              održala stabilnost dinara.
            </p>
          </div>
          <div className="education-item">
            <h4>Uloga Narodne Banke Srbije</h4>
            <p>
              Narodna Banka Srbije objavljuje zvanični srednji kurs dinara prema drugim valutama.
              Ovaj kurs služi kao referenca za komercijalne banke koje na osnovu njega formiraju
              svoje kupovne i prodajne kurseve. NBS može intervenisati na deviznom tržištu kako
              bi stabilizovala kurs dinara.
            </p>
          </div>
          <div className="education-item">
            <h4>Kada Je Najbolje Vreme za Menjanje Valute?</h4>
            <p>
              Ne postoji univerzalni odgovor, ali evo nekoliko saveta: pratite trendove tokom
              nekoliko dana ili nedelja, izbegavajte menjanje na aerodromima (često imaju lošije
              kurseve), razmislite o korišćenju online bankarstva gde su kursevi često povoljniji,
              i vodite računa o provizijama koje mogu značajno uticati na konačan iznos.
            </p>
          </div>
          <div className="education-item">
            <h4>Saveti za Štednju Pri Menjanju Valute</h4>
            <p>
              Uporedite kurseve nekoliko banaka pre nego što odlučite gde da menjate, izbegavajte
              hitne transakcije kada nemate vremena da tražite najbolju ponudu, menjajte veće
              iznose odjednom jer neki kursevi imaju minimalnu proviziju, i pazite na skrivene
              troškove - ponekad "bez provizije" zapravo znači lošiji kurs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Kursna Lista .live</h4>
            <p>
              Vaš pouzdan partner za uporedbu deviznih kurseva svih banaka u Srbiji.
              Precizno, transparentno, ažurno.
            </p>
          </div>
          <div className="footer-section">
            <h4>Informacije</h4>
            <ul>
              <li><a href="#about">O nama</a></li>
              <li><a href="#faq">Često pitanja</a></li>
              <li><a href="#contact">Kontakt</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Pravne Informacije</h4>
            <ul>
              <li><a href="#privacy">Politika privatnosti</a></li>
              <li><a href="#terms">Uslovi korišćenja</a></li>
              <li><a href="#disclaimer">Odricanje odgovornosti</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Izvori Podataka</h4>
            <p>
              Podaci o kursevima se preuzimaju direktno sa zvaničnih veb sajtova Narodne
              Banke Srbije i komercijalnih banaka.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Kursna Lista .live. Sva prava zadržana.</p>
          <p className="disclaimer-text">
            Napomena: Kursevi su informativnog karaktera. Uvek proverite zvanične kurseve na
            licu mesta ili na veb sajtu banke pre obavljanja transakcije.
          </p>
        </div>
      </footer>
    </div>
  );
}
export default App;
