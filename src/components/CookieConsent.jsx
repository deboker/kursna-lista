import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/rejected cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Show popup after a short delay for better UX
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    // Enable analytics and ads if needed
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
    // Disable analytics and ads
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-popup">
        <div className="cookie-consent-header">
          <h3>🍪 Kolačići (Cookies)</h3>
        </div>
        <div className="cookie-consent-body">
          <p>
            Koristimo kolačiće da bismo poboljšali vaše iskustvo na našem sajtu.
            Kolačići nam pomažu da analiziramo kako koristite sajt i da vam prikažemo
            relevantne oglase putem Google AdSense.
          </p>
          <p>
            Prihvatanjem kolačića, dozvoljavate nam da koristimo Google Analytics
            za analizu poseta i Google AdSense za prikazivanje oglasa. Više informacija
            možete pronaći u našoj{" "}
            <Link to="/politika-privatnosti" onClick={() => setIsVisible(false)}>
              Politici privatnosti
            </Link>.
          </p>
          <div className="cookie-types">
            <div className="cookie-type">
              <strong>Neophodni:</strong> Omogućavaju osnovne funkcije sajta
            </div>
            <div className="cookie-type">
              <strong>Analitički:</strong> Google Analytics za analizu korišćenja
            </div>
            <div className="cookie-type">
              <strong>Oglašivački:</strong> Google AdSense za prikazivanje oglasa
            </div>
          </div>
        </div>
        <div className="cookie-consent-actions">
          <button className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
            Prihvatam
          </button>
          <button className="cookie-btn cookie-btn-reject" onClick={handleReject}>
            Odbijam
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
