import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

function Disclaimer() {
  return (
    <div className="app">
      <div className="legal-page">
        <div className="legal-header">
          <Link to="/" className="back-link">← Nazad na početnu</Link>
          <h1>Odricanje Odgovornosti</h1>
        </div>

        <section className="legal-content">
          <p className="last-updated">Poslednje ažurirano: 1. novembar 2025.</p>

          <h2>1. Opšte Odricanje</h2>
          <p>
            Informacije prikazane na Kursna Lista .live web sajtu služe isključivo u informativne
            svrhe. Iako ulažemo maksimalan napor da pružimo tačne i ažurne podatke, ne možemo
            garantovati potpunu tačnost, pouzdanost ili kompletnost prikazanih informacija.
          </p>

          <h2>2. Devizni Kursevi</h2>
          <h3>2.1 Informativni Karakter</h3>
          <p>
            Svi devizni kursevi prikazani na našem sajtu su <strong>isključivo informativnog karaktera</strong>.
            Ovi kursevi se automatski prikupljaju sa zvaničnih izvora (Narodna Banka Srbije i
            veb sajtova komercijalnih banaka), ali mogu biti:
          </p>
          <ul>
            <li>Zastareli ili neažurni u trenutku pregleda</li>
            <li>Nepotpuni ili netačni zbog tehničkih problema</li>
            <li>Različiti od stvarnih kurseva koje banke primenjuju u datom trenutku</li>
          </ul>

          <h3>2.2 Obaveza Provere</h3>
          <p>
            <strong>Pre bilo kakve finansijske transakcije</strong>, obavezno proverite zvanične
            kurseve direktno u banci, na njihovom zvaničnom sajtu ili pozivom njihove korisničke
            službe. Kursevi se mogu razlikovati:
          </p>
          <ul>
            <li>Između različitih filijala iste banke</li>
            <li>Između šalterskih i online kurseva</li>
            <li>U zavisnosti od vremena transakcije</li>
            <li>Za različite tipove transakcija (gotovina, bezgotovinsko plaćanje)</li>
          </ul>

          <h2>3. Odgovornost za Finansijske Odluke</h2>
          <p>
            Kursna Lista .live <strong>ne snosi nikakvu odgovornost</strong> za finansijske odluke
            donete na osnovu informacija prikazanih na sajtu. Svaka odluka o razmeni valute,
            investiranju ili drugim finansijskim transakcijama je isključivo vaša odgovornost.
          </p>

          <h3>Posebna Upozorenja:</h3>
          <ul>
            <li>Ne pružamo finansijske savete niti investicione preporuke</li>
            <li>Nismo registrovana finansijska institucija ili banka</li>
            <li>Ne garantujemo profitabilnost bilo kakve transakcije</li>
            <li>Ne odgovaramo za gubitak novca ili propuštenu dobit</li>
          </ul>

          <h2>4. Tehnička Dostupnost</h2>
          <p>
            Trudimo se da naš sajt bude stalno dostupan, međutim ne garantujemo:
          </p>
          <ul>
            <li>Neprekidnu dostupnost sajta</li>
            <li>Odsustvo tehničkih problema ili grešaka</li>
            <li>Zaštitu od hakerskih napada ili neovlašćenog pristupa</li>
            <li>Pravovremenost ažuriranja podataka</li>
          </ul>
          <p>
            Sajt može biti privremeno nedostupan zbog održavanja, tehničkih problema ili drugih
            razloga van naše kontrole.
          </p>

          <h2>5. Izvori Podataka</h2>
          <p>
            Podaci o deviznim kursevima se prikupljaju sa sledećih izvora:
          </p>
          <ul>
            <li>Narodna Banka Srbije (zvanični sajt)</li>
            <li>Zvanični web sajtovi komercijalnih banaka u Srbiji</li>
          </ul>
          <p>
            Ne odgovaramo za tačnost podataka objavljenih na izvornim sajtovima niti za eventualne
            greške u procesu prikupljanja podataka.
          </p>

          <h2>6. Linkovi ka Drugim Sajtovima</h2>
          <p>
            Naš sajt sadrži linkove ka web sajtovima banaka i drugih trećih strana. Ovi linkovi
            se pružaju radi pogodnosti i ne predstavljaju:
          </p>
          <ul>
            <li>Preporuku ili podršku za te sajtove</li>
            <li>Garanciju za tačnost njihovog sadržaja</li>
            <li>Našu odgovornost za njihove usluge ili proizvode</li>
          </ul>
          <p>
            Ne kontrolišemo niti preuzimamo odgovornost za sadržaj, politiku privatnosti ili prakse
            spoljnih sajtova.
          </p>

          <h2>7. Oglašavanje</h2>
          <p>
            Naš sajt prikazuje oglase putem Google AdSense servisa. Prikazivanje oglasa ne predstavlja:
          </p>
          <ul>
            <li>Preporuku ili podršku za oglašene proizvode ili usluge</li>
            <li>Garanciju kvaliteta ili pouzdanosti oglašivača</li>
            <li>Našu odgovornost za proizvode ili usluge trećih strana</li>
          </ul>
          <p>
            Sve transakcije sa oglašivačima su isključivo između vas i oglašivača. Ne odgovaramo
            za bilo kakve gubitke ili štete nastale korišćenjem oglašenih proizvoda ili usluga.
          </p>

          <h2>8. Ograničenja Odgovornosti</h2>
          <p>
            U najvećoj meri dozvoljenoj zakonom, Kursna Lista .live, njeni osnivači, zaposleni,
            partneri i davaoci sadržaja ne snose odgovornost za:
          </p>
          <ul>
            <li>Bilo kakvu direktnu, indirektnu, slučajnu ili posledičnu štetu</li>
            <li>Gubitak profita, prihoda ili podataka</li>
            <li>Prekid poslovanja</li>
            <li>Finansijske gubitke nastale na osnovu informacija sa sajta</li>
            <li>Nemoguć nost pristupa sajtu ili korišćenja servisa</li>
            <li>Greške, propuste ili netačnosti u sadržaju</li>
          </ul>

          <h2>9. Pravni Savet</h2>
          <p>
            Sadržaj na ovom sajtu ne predstavlja pravni, finansijski, poreski ili drugi profesionalni
            savet. Za specifična pitanja i situacije, preporučujemo da konsultujete kvalifikovanog
            stručnjaka.
          </p>

          <h2>10. Izmene Sadržaja</h2>
          <p>
            Zadržavamo pravo da u bilo kom trenutku izmenimo, ažuriramo ili uklonimo bilo koji sadržaj
            sa sajta bez prethodne najave. Ne garantujemo da će određeni sadržaj ili funkcionalnost
            biti stalno dostupni.
          </p>

          <h2>11. Prava Trećih Strana</h2>
          <p>
            Logotipi, nazivi i zaštitni znaci banaka prikazani na sajtu su vlasništvo odgovarajućih
            banaka i koriste se isključivo u svrhu identifikacije. Njihova upotreba ne podrazumeva
            podršku, sponzorstvo ili partnerstvo sa navedenim institucijama.
          </p>

          <h2>12. Valutne Razlike</h2>
          <p>
            Razlike u prikazanim kursevima između različitih banaka mogu nastati zbog:
          </p>
          <ul>
            <li>Različitog vremena ažuriranja</li>
            <li>Različitih poslovnih politika banaka</li>
            <li>Tehničkih problema u prikupljanju podataka</li>
            <li>Specifičnih uslova koje banke primenjuju</li>
          </ul>
          <p>
            Ne garantujemo da su razlike u kursevima prikazane tačno ili potpuno.
          </p>

          <h2>13. Primenljivo Zakonodavstvo</h2>
          <p>
            Ovo Odricanje odgovornosti se tumači u skladu sa zakonima Republike Srbije. Bilo kakvi
            sporovi biće rešavani pred nadležnim sudovima u Srbiji.
          </p>

          <h2>14. Izmene Odricanja</h2>
          <p>
            Zadržavamo pravo da izmenimo ovo Odricanje odgovornosti u bilo kom trenutku. Izmene
            stupaju na snagu odmah nakon objavljivanja na sajtu. Preporučujemo da periodično
            proveravate ovu stranicu.
          </p>

          <h2>15. Kontakt</h2>
          <p>
            Ako imate pitanja o ovom Odricanju odgovornosti, možete nas kontaktirati na:{" "}
            <a href="mailto:kontakt@kursnalista.live">kontakt@kursnalista.live</a>
          </p>

          <div className="disclaimer-box">
            <h3>⚠️ Važno Upozorenje</h3>
            <p>
              <strong>KORIŠĆENJEM OVOG SAJTA PRIHVATATE DA:</strong>
            </p>
            <ul>
              <li>Razumete da su svi podaci informativnog karaktera</li>
              <li>Prihvatate punu odgovornost za svoje finansijske odluke</li>
              <li>Nećete držati Kursna Lista .live odgovornim za bilo kakve gubitke</li>
              <li>Ćete pre transakcija proveravati zvanične izvore</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Disclaimer;
