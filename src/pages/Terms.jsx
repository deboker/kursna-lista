import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

function Terms() {
  return (
    <div className="app">
      <div className="legal-page">
        <div className="legal-header">
          <Link to="/" className="back-link">← Nazad na početnu</Link>
          <h1>Uslovi Korišćenja</h1>
        </div>

        <section className="legal-content">
          <p className="last-updated">Poslednje ažurirano: 1. novembar 2025.</p>

          <h2>1. Prihvatanje Uslova</h2>
          <p>
            Dobrodošli na Kursna Lista .live. Korišćenjem ovog sajta, prihvatate ove Uslove korišćenja
            u celosti. Ako se ne slažete sa bilo kojim delom ovih uslova, ne koristite naš sajt.
          </p>

          <h2>2. Opis Usluge</h2>
          <p>
            Kursna Lista .live pruža uporedni prikaz deviznih kurseva različitih banaka u Srbiji.
            Podaci se prikupljaju sa zvaničnih izvora (Narodna Banka Srbije i veb sajtovi komercijalnih
            banaka) i prikazuju se u informativne svrhe.
          </p>

          <h2>3. Korišćenje Sajta</h2>
          <h3>3.1 Dozvoljeno Korišćenje</h3>
          <p>Saglasni ste da ćete naš sajt koristiti samo u zakonite svrhe i na način koji:</p>
          <ul>
            <li>Ne krši prava drugih korisnika ili trećih strana</li>
            <li>Ne ometa ili narušava rad sajta</li>
            <li>Ne pokušava da dobije neovlašćeni pristup sajtu ili povezanim sistemima</li>
            <li>Ne distribuira viruse ili druge štetne kodove</li>
          </ul>

          <h3>3.2 Zabranjena Aktivnost</h3>
          <p>Zabranjeno je:</p>
          <ul>
            <li>Automatsko prikupljanje podataka (scraping) bez dozvole</li>
            <li>Reprodukovanje, kopiranje ili preprodaja bilo kog dela sajta</li>
            <li>Korišćenje sajta za nezakonite aktivnosti</li>
            <li>Narušavanje bezbednosti sajta</li>
            <li>Prikazivanje lažnih ili zavaravajućih informacija</li>
          </ul>

          <h2>4. Intelektualna Svojina</h2>
          <p>
            Sav sadržaj na ovom sajtu, uključujući tekst, grafiku, dizajn, kod i logotipe, je vlasništvo
            Kursna Lista .live ili njenih davatelja sadržaja i zaštićen je zakonima o intelektualnoj
            svojini. Nije dozvoljeno kopiranje, distribucija ili modifikacija sadržaja bez pismene dozvole.
          </p>

          <h2>5. Tačnost Informacija</h2>
          <p>
            Iako se trudimo da pružimo tačne i ažurne informacije, Kursna Lista .live ne garantuje
            potpunu tačnost, pouzdanost ili kompletnost prikazanih podataka. Devizni kursevi su
            informativnog karaktera i mogu se razlikovati od stvarnih kurseva banaka.
          </p>
          <p>
            <strong>Važno:</strong> Pre nego što izvršite bilo kakvu finansijsku transakciju, obavezno
            proverite zvanične kurseve direktno u banci ili na njihovom zvaničnom sajtu.
          </p>

          <h2>6. Linkovi ka Drugim Sajtovima</h2>
          <p>
            Naš sajt može sadržati linkove ka web sajtovima trećih strana (banke, finansijske institucije).
            Ne odgovaramo za sadržaj, politiku privatnosti ili prakse takvih sajtova. Linkovi se
            pružaju samo radi informisanja.
          </p>

          <h2>7. Odricanje Odgovornosti</h2>
          <p>
            Kursna Lista .live se pruža "kakva jeste" i "kako je dostupna", bez ikakvih garancija,
            eksplicitnih ili implicitnih. Ne garantujemo da će:
          </p>
          <ul>
            <li>Sajt biti stalno dostupan ili bez grešaka</li>
            <li>Podaci biti uvek tačni i ažurni</li>
            <li>Korišćenje sajta ispuniti vaša očekivanja</li>
            <li>Eventualne greške biti ispravljene</li>
          </ul>

          <h2>8. Ograničenje Odgovornosti</h2>
          <p>
            U najvećoj meri dozvoljenoj zakonom, Kursna Lista .live i njeni osnivači, zaposleni i
            partneri ne snose odgovornost za bilo kakvu direktnu, indirektnu, slučajnu ili posledičnu
            štetu koja proizlazi iz:
          </p>
          <ul>
            <li>Korišćenja ili nemogućnosti korišćenja sajta</li>
            <li>Netačnosti podataka prikazanih na sajtu</li>
            <li>Finansijskih odluka donetih na osnovu informacija sa sajta</li>
            <li>Neovlašćenog pristupa vašim podacima</li>
          </ul>

          <h2>9. Oglašavanje</h2>
          <p>
            Naš sajt prikazuje oglase putem Google AdSense-a. Ne kontrolišemo niti biramo oglase koji
            se prikazuju. Prikazivanje oglasa ne predstavlja podršku ili preporuku proizvoda ili usluga.
          </p>

          <h2>10. Izmene Uslova</h2>
          <p>
            Zadržavamo pravo da izmenimo ili ažuriramo ove Uslove korišćenja u bilo kom trenutku bez
            prethodne najave. Izmene stupaju na snagu odmah nakon objavljivanja na sajtu. Nastavak
            korišćenja sajta nakon promena podrazumeva prihvatanje novih uslova.
          </p>

          <h2>11. Prekid Usluge</h2>
          <p>
            Zadržavamo pravo da privremeno ili trajno obustavimo ili ograničimo pristup sajtu, bez
            prethodne najave, iz bilo kog razloga, uključujući održavanje, kršenje ovih uslova ili
            iz tehničkih razloga.
          </p>

          <h2>12. Primenljivo Pravo</h2>
          <p>
            Ovi Uslovi korišćenja se regulišu i tumače u skladu sa zakonima Republike Srbije. Bilo
            kakvi sporovi biće rešavani pred nadležnim sudovima u Srbiji.
          </p>

          <h2>13. Razdvojenost Odredbi</h2>
          <p>
            Ako bilo koja odredba ovih Uslova bude proglašena nevažećom ili neizvršivom, ostale
            odredbe ostaju na snazi.
          </p>

          <h2>14. Kontakt</h2>
          <p>
            Ako imate pitanja o ovim Uslovima korišćenja, možete nas kontaktirati na:{" "}
            <a href="mailto:kontakt@kursnalista.live">kontakt@kursnalista.live</a>
          </p>

          <h2>15. Celokupni Sporazum</h2>
          <p>
            Ovi Uslovi korišćenja, zajedno sa našom Politikom privatnosti, predstavljaju celokupni
            sporazum između vas i Kursna Lista .live u vezi sa korišćenjem ovog sajta.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Terms;
