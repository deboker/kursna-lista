import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      <div className="legal-page">
        <div className="legal-header">
          <Link to="/" className="back-link">← Nazad na početnu</Link>
          <h1>Kontakt</h1>
        </div>

        <section className="legal-content">
          <h2>Kontaktirajte Nas</h2>
          <p>
            Dobrodošli na Kursna Lista .live! Cenimo vaše mišljenje i otvoreni smo za sva pitanja,
            sugestije ili povratne informacije koje želite da podelite sa nama.
          </p>

          <div className="contact-section">
            <h3>Email</h3>
            <p>
              Za opšta pitanja, sugestije ili tehničku podršku, možete nas kontaktirati putem email-a:
            </p>
            <p className="contact-info">
              <strong>Email:</strong> <a href="mailto:kontakt@kursnalista.live">kontakt@kursnalista.live</a>
            </p>
          </div>

          <div className="contact-section">
            <h3>Tehnička Podrška</h3>
            <p>
              Ukoliko naiđete na tehnički problem ili grešku na sajtu, molimo vas da nam to prijavite
              kako bismo mogli da brzo rešimo problem. U prijavi navedite:
            </p>
            <ul>
              <li>Opis problema</li>
              <li>Pretraživač koji koristite (Chrome, Firefox, Safari, itd.)</li>
              <li>Uređaj koji koristite (računar, telefon, tablet)</li>
              <li>Vreme kada se problem dogodio</li>
            </ul>
          </div>

          <div className="contact-section">
            <h3>Sugestije i Povratne Informacije</h3>
            <p>
              Vaše mišljenje je za nas veoma važno. Ako imate ideju kako da unapredimo našu uslugu,
              dodamo novu funkcionalnost ili poboljšamo korisničko iskustvo, slobodno nam se javite.
            </p>
          </div>

          <div className="contact-section">
            <h3>Партнерство i Saradnja</h3>
            <p>
              Zainteresovani ste za poslovnu saradnju ili partnerstvo? Kontaktirajte nas na gorenavedenu
              email adresu i rado ćemo razmotriti vašu ponudu.
            </p>
          </div>

          <div className="contact-section">
            <h3>Radno Vreme</h3>
            <p>
              Odgovaramo na sve upite radnim danima od 9:00 do 17:00 časova. Trudimo se da na sve
              poruke odgovorimo u roku od 24-48 sati.
            </p>
          </div>

          <div className="contact-section">
            <h3>Često Postavljana Pitanja</h3>
            <p>
              Pre nego što nas kontaktirate, preporučujemo da pogledate našu <Link to="/">FAQ sekciju</Link> na
              početnoj stranici gde možete pronaći odgovore na najčešća pitanja.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
