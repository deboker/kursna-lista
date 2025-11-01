import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      <div className="legal-page">
        <div className="legal-header">
          <Link to="/" className="back-link">← Nazad na početnu</Link>
          <h1>Politika Privatnosti</h1>
        </div>

        <section className="legal-content">
          <p className="last-updated">Poslednje ažurirano: 1. novembar 2025.</p>

          <h2>1. Uvod</h2>
          <p>
            Kursna Lista .live ("mi", "nas", "naša") poštuje privatnost svojih korisnika i posvećen
            je zaštiti ličnih podataka. Ova Politika privatnosti objašnjava kako prikupljamo,
            koristimo, čuvamo i delimo informacije kada koristite našu web stranicu.
          </p>

          <h2>2. Koje Podatke Prikupljamo</h2>
          <h3>2.1 Automatski Prikupljeni Podaci</h3>
          <p>
            Kada posetite našu web stranicu, automatski prikupljamo određene informacije o vašem
            uređaju, uključujući:
          </p>
          <ul>
            <li>IP adresu</li>
            <li>Tip i verziju pretraživača</li>
            <li>Operativni sistem</li>
            <li>Stranicu sa koje ste stigli na naš sajt</li>
            <li>Vreme i datum posete</li>
            <li>Stranice koje ste posetili na našem sajtu</li>
          </ul>

          <h3>2.2 Google Analytics</h3>
          <p>
            Koristimo Google Analytics za analizu korišćenja našeg sajta. Google Analytics koristi
            kolačiće (cookies) da bi prikupio podatke o tome kako korisnici koriste naš sajt. Ovi
            podaci se koriste za poboljšanje funkcionalnosti i korisničkog iskustva.
          </p>

          <h3>2.3 Google AdSense</h3>
          <p>
            Na našem sajtu se prikazuju oglasi putem Google AdSense-a. Google može koristiti kolačiće
            i web beacon tehnologiju za prikazivanje relevantnih oglasa. Za više informacija o tome
            kako Google koristi podatke, posetite{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>.
          </p>

          <h2>3. Kako Koristimo Prikupljene Podatke</h2>
          <p>Prikupljene podatke koristimo za sledeće svrhe:</p>
          <ul>
            <li>Pružanje i održavanje naše web stranice</li>
            <li>Poboljšanje i personalizacija korisničkog iskustva</li>
            <li>Analiza načina korišćenja sajta</li>
            <li>Prikazivanje relevantnih oglasa</li>
            <li>Otkrivanje i sprečavanje zloupotrebe</li>
          </ul>

          <h2>4. Kolačići (Cookies)</h2>
          <p>
            Naš sajt koristi kolačiće za poboljšanje funkcionalnosti i pružanje bolje korisničke
            usluge. Kolačići su male tekstualne datoteke koje se čuvaju na vašem uređaju. Možete
            podesiti svoj pretraživač da odbije kolačiće, ali to može uticati na funkcionalnost sajta.
          </p>

          <h3>Vrste kolačića koje koristimo:</h3>
          <ul>
            <li><strong>Neophodni kolačići:</strong> Omogućavaju osnovne funkcije sajta</li>
            <li><strong>Analitički kolačići:</strong> Pomažu nam da razumemo kako korisnici koriste sajt</li>
            <li><strong>Oglašivački kolačići:</strong> Koriste se za prikazivanje relevantnih oglasa</li>
          </ul>

          <h2>5. Deljenje Podataka sa Trećim Stranama</h2>
          <p>
            Ne prodajemo, ne razmenjujemo niti iznajmljujemo vaše lične podatke trećim stranama.
            Podatke možemo deliti samo sa:
          </p>
          <ul>
            <li>Pružaocima usluga (Google Analytics, Google AdSense) u svrhu pružanja usluga</li>
            <li>Zakonskim organima kada je to zakonom propisano</li>
          </ul>

          <h2>6. Bezbednost Podataka</h2>
          <p>
            Preduzimamo razumne mere da zaštitimo podatke od neovlašćenog pristupa, izmene,
            otkrivanja ili uništenja. Međutim, nijedan prenos podataka preko interneta nije
            100% siguran.
          </p>

          <h2>7. Vaša Prava</h2>
          <p>U skladu sa zakonima o zaštiti podataka, imate pravo da:</p>
          <ul>
            <li>Zatražite pristup vašim ličnim podacima</li>
            <li>Zatražite ispravku netačnih podataka</li>
            <li>Zatražite brisanje vaših podataka</li>
            <li>Povučete saglasnost za obradu podataka</li>
            <li>Prigovorite na obradu vaših podataka</li>
          </ul>

          <h2>8. Linkovi ka Drugim Sajtovima</h2>
          <p>
            Naš sajt može sadržati linkove ka drugim web sajtovima. Ne odgovaramo za prakse
            privatnosti ili sadržaj takvih sajtova. Preporučujemo da pročitate politike privatnosti
            svih sajtova koje posetite.
          </p>

          <h2>9. Deca</h2>
          <p>
            Naš sajt nije namenjen deci mlađoj od 16 godina. Svesno ne prikupljamo lične podatke
            od dece.
          </p>

          <h2>10. Promene u Politici Privatnosti</h2>
          <p>
            Zadržavamo pravo da ažuriramo ovu Politiku privatnosti s vremena na vreme. Sve izmene
            će biti objavljene na ovoj stranici sa ažuriranim datumom. Preporučujemo da periodično
            proveravate ovu stranicu za eventualne promene.
          </p>

          <h2>11. Kontakt</h2>
          <p>
            Ako imate pitanja o ovoj Politici privatnosti ili načinu na koji obrađujemo vaše podatke,
            možete nas kontaktirati na:{" "}
            <a href="mailto:kontakt@kursnalista.live">kontakt@kursnalista.live</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Privacy;
