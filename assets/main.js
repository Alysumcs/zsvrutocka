/* =========================================================
   ZŠ Vrútocká 58 — spoločné funkcie stránky
   --------------------------------------------------------
   Tu sa nachádza MENU a PÄTIČKA pre celú stránku.
   Keď chceš pridať/premenovať položku menu, uprav zoznam
   "MENU" nižšie — zmena sa prejaví na všetkých stránkach.
   ========================================================= */

/* Koľko priečinkov hlboko je stránka (kvôli správnym cestám).
   index.html = 0, stranky/nieco.html = 1, galeria/... = 1  */
const HLBKA = (document.body.dataset.hlbka ? parseInt(document.body.dataset.hlbka) : 0);
const KOREN = HLBKA === 0 ? "" : "../".repeat(HLBKA);

/* ---- MENU stránky (uprav podľa potreby) ----
   nazov = text, odkaz = adresa, deti = rozbaľovacie podmenu */
const MENU = [
  { nazov:"Úvod", odkaz:"index.html", deti:[
      {nazov:"Zamestnanci školy", odkaz:"stranky/zamestnanci-skoly.html"},
      {nazov:"Učebný plán", odkaz:"stranky/ucebny-plan.html"},
  ]},
  { nazov:"O škole", odkaz:"stranky/o-skole.html", deti:[
      {nazov:"Školský podporný tím", odkaz:"stranky/skolsky-podporny-tim.html"},
      {nazov:"Školská jedáleň", odkaz:"stranky/skolska-jedalen.html"},
      {nazov:"Školská družina – ŠKD", odkaz:"stranky/skolska-druzina.html"},
      {nazov:"Organizácia školského roka", odkaz:"stranky/organizacia-skolskeho-roka.html"},
      {nazov:"Školský vzdelávací program", odkaz:"stranky/skolsky-vzdelavaci-program.html"},
      {nazov:"Školský poriadok", odkaz:"stranky/skolsky-poriadok.html"},
      {nazov:"Správa o v. v. činnosti", odkaz:"stranky/sprava-o-v-v-cinnosti.html"},
      {nazov:"Plán uplatňovania štandardov", odkaz:"stranky/plan-uplatnovania-standardov-dodrziavania-zakazu-segregacie.html"},
      {nazov:"Zápis prvákov", odkaz:"stranky/zapis-prvakov.html"},
      {nazov:"Pomôcky pre I. stupeň", odkaz:"stranky/pomocky-pre-i-stupen.html"},
      {nazov:"Rada školy", odkaz:"stranky/rada-skoly.html"},
      {nazov:"Prevencia a riešenie šikanovania", odkaz:"stranky/prevencia-a-riesenie-sikanovania.html"},
  ]},
  { nazov:"Aktivity", odkaz:"aktuality/index.html", deti:[
      {nazov:"Krúžková činnosť", odkaz:"stranky/kruzkova-cinnost.html"},
      {nazov:"Projekty", odkaz:"stranky/projekty.html"},
      {nazov:"Úspechy", odkaz:"stranky/uspechy.html"},
      {nazov:"Školský časopis", odkaz:"stranky/skolsky-casopis.html"},
  ]},
  { nazov:"Fotogaléria", odkaz:"galeria/index.html" },
  { nazov:"Dokumenty", odkaz:"stranky/dokumenty.html", deti:[
      {nazov:"Zverejňovanie", odkaz:"stranky/zverejnovanie.html"},
      {nazov:"Kolektívna zmluva", odkaz:"stranky/kolektivna-zmluva.html"},
      {nazov:"OZ Trnávka", odkaz:"stranky/oz-trnavka.html"},
      {nazov:"Darovanie 2% dane", odkaz:"stranky/darovanie-2-dane.html"},
      {nazov:"Formuláre rodičom", odkaz:"stranky/formulare-rodicom.html"},
      {nazov:"Stavebné práce", odkaz:"stranky/stavebne-prace.html"},
      {nazov:"Zverejňovanie dokumentov", odkaz:"stranky/zverejnovanie-dokumentov.html"},
      {nazov:"Súhrnná správa o zákazkách VO", odkaz:"stranky/suhrnna-sprava-o-zakazkach-vo.html"},
      {nazov:"Prehľad objednávok", odkaz:"stranky/prehlad-objednavok.html"},
      {nazov:"Ročný plán zákaziek", odkaz:"stranky/rocny-plan-zakaziek.html"},
      {nazov:"Informácie o spracovaní osobných údajov", odkaz:"stranky/informacie-o-spracovani-osobnych-udajov.html"},
  ]},
  { nazov:"Kontakt", odkaz:"stranky/kontakt.html" },
];

/* ---- KONTAKTNÉ ÚDAJE (uprav podľa potreby) ---- */
const KONTAKT = {
  nazov:"Základná škola Vrútocká 58",
  adresa:"Vrútocká 4538/58, 821 04 Bratislava",
  telefon:"02/432 937 22",
  email:"zsvrutocka@zsvrutocka.sk",
  facebook:"https://www.facebook.com/zsvrutocka58",
  edupage:"https://zsvrutocka58.edupage.org",
};

/* =========================================================
   Ďalej je už technika — netreba upravovať.
   ========================================================= */
function c(p){ return KOREN + p; }

function vykresliHlavicku(){
  const aktiv = document.body.dataset.aktiv || "";
  const polozky = MENU.map(m=>{
    const akt = (m.nazov===aktiv) ? " class=\"akt\"" : "";
    const sub = m.deti ? `<ul class="podmenu">${m.deti.map(d=>`<li><a href="${c(d.odkaz)}">${d.nazov}</a></li>`).join("")}</ul>` : "";
    const sip = m.deti ? " ⌄" : "";
    return `<li${akt}><a href="${c(m.odkaz)}">${m.nazov}${sip}</a>${sub}</li>`;
  }).join("");
  const html = `<header class="hlavicka"><div class="hlavicka-vnutro">
    <a class="logo" href="${c('index.html')}" aria-label="ZŠ Vrútocká 58 – domov"><img src="${c('assets/logo-light-v2.svg')}" alt="Základná škola Vrútocká 58"></a>
    <button class="hamburger" aria-label="Menu" onclick="document.querySelector('nav.menu').classList.toggle('otvorene')">☰</button>
    <nav class="menu"><ul>${polozky}</ul></nav>
  </div></header>`;
  document.body.insertAdjacentHTML("afterbegin", html);
}

function vykresliPaticku(){
  const odkazy = MENU.map(m=>`<li><a href="${c(m.odkaz)}">${m.nazov}</a></li>`).join("");
  const html = `<footer class="paticka">
  <svg class="paticka-trhanec" viewBox="0 0 1200 34" preserveAspectRatio="none" aria-hidden="true">
    <defs><filter id="trhFilter" x="-5%" y="-50%" width="110%" height="200%">
      <feTurbulence type="fractalNoise" baseFrequency="0.014 0.16" numOctaves="3" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="26"/>
    </filter></defs>
    <path d="M0,18 L1200,18 L1200,34 L0,34 Z" fill="#efe9da" filter="url(#trhFilter)"/>
  </svg>
  <div class="obal"><div class="paticka-mriezka">
    <div>
      <div class="logo-paticka"><img src="${c('assets/logo-dark-v2.svg')}" alt="Základná škola Vrútocká 58"></div>
      <p>${KONTAKT.adresa}</p>
      <p>📞 ${KONTAKT.telefon}<br>✉️ <a href="mailto:${KONTAKT.email}">${KONTAKT.email}</a></p>
      <div class="soc">
        <a href="${KONTAKT.facebook}" target="_blank" title="Facebook">f</a>
        <a href="${KONTAKT.edupage}" target="_blank" title="Edupage">E</a>
      </div>
    </div>
    <div><h4>Stránky</h4><ul>${odkazy}</ul></div>
    <div><h4>Rýchle odkazy</h4><ul>
      <li><a href="${KONTAKT.edupage}" target="_blank">Edupage</a></li>
      <li><a href="${c('stranky/darovanie-2-dane.html')}">Darovanie 2 % dane</a></li>
      <li><a href="${c('stranky/skolska-jedalen.html')}">Školská jedáleň</a></li>
      <li><a href="${c('galeria/index.html')}">Fotogaléria</a></li>
    </ul></div>
  </div>
  <div class="paticka-spodok">© ${new Date().getFullYear()} Základná škola Vrútocká 58, Bratislava &nbsp;·&nbsp;
    <a href="${c('stranky/ochrana-osobnych-udajov.html')}">Ochrana osobných údajov</a> &nbsp;·&nbsp;
    <a href="${c('stranky/zasady-pouzivania-suborov-cookie-eu.html')}">Zásady cookies</a></div>
  </div></footer>`;
  document.body.insertAdjacentHTML("beforeend", html);
}

/* ---- POP-UP OZNAM (iba na úvodnej stránke) ---- */
function zobrazOznam(){
  if(HLBKA!==0) return;                         // pop-up sa ukáže len na úvode
  if(typeof OZNAMY==="undefined" || !OZNAMY.length) return;
  const dnes = new Date().toISOString().slice(0,10);
  const platne = OZNAMY.filter(o=>{
    if(o.od && dnes < o.od) return false;
    if(o.do && dnes > o.do) return false;
    return true;
  });
  if(!platne.length) return;
  // Zobrazí oznamy jeden po druhom – po zatvorení jedného sa ukáže ďalší.
  let index = 0;
  function ukazDalsi(){
    if(index >= platne.length) return;
    const o = platne[index++];
    const tlacidlo = o.tlacidlo ? `<a class="btn btn-hlavny" href="${o.tlacidlo.odkaz}" ${o.tlacidlo.odkaz.startsWith('http')?'target="_blank"':''}>${o.tlacidlo.text}</a>` : "";
    const html = `<div class="oznam-prekrytie aktiv" id="oznamPrekrytie">
      <div class="oznam-okno">
        <div class="oznam-pasik"><span>📢 Oznam</span><button type="button" class="oznam-zavri">×</button></div>
        <div class="oznam-telo"><h3>${o.nadpis}</h3><p>${o.text}</p>${tlacidlo}</div>
      </div></div>`;
    document.body.insertAdjacentHTML("beforeend", html);
    const prekrytie = document.getElementById("oznamPrekrytie");
    function zavri(){ prekrytie.remove(); ukazDalsi(); }
    prekrytie.querySelector(".oznam-zavri").addEventListener("click", zavri);
    prekrytie.addEventListener("click", e=>{ if(e.target.id==="oznamPrekrytie") zavri(); });
  }
  ukazDalsi();
}

/* ---- Scroll-reveal: prvky s triedou "odhal" sa objavia pri scrollovaní ---- */
function scrollOdhal(){
  const prvky=document.querySelectorAll(".odhal");
  if(!prvky.length) return;
  if(!("IntersectionObserver" in window)){ prvky.forEach(p=>p.classList.add("vidno")); return; }
  const io=new IntersectionObserver((zoznam)=>{
    zoznam.forEach(z=>{ if(z.isIntersecting){ z.target.classList.add("vidno"); io.unobserve(z.target); } });
  },{threshold:.12});
  prvky.forEach(p=>io.observe(p));
}

/* ---- Trávnatý zvlnený predel do hlavičky podstránky ---- */
function pridajTravu(){
  const h=document.querySelector(".stranka-hlava");
  if(!h || h.querySelector(".trava")) return;
  h.insertAdjacentHTML("beforeend",
    '<svg class="trava" viewBox="0 0 1440 130" preserveAspectRatio="none" aria-hidden="true">'
    +'<path fill="#34b36a" d="M0,70 C180,20 360,20 540,55 C760,98 920,30 1140,55 C1280,72 1380,60 1440,48 L1440,130 L0,130 Z"></path>'
    +'<path fill="#23934f" opacity=".55" d="M0,95 C220,60 420,100 640,90 C880,78 1060,110 1280,92 C1360,86 1410,84 1440,82 L1440,130 L0,130 Z"></path>'
    +'</svg>');
}

/* ---- Počítadlo čísel (štatistiky) ---- */
function pocitadlo(){
  const cisla=document.querySelectorAll(".cislo[data-cislo]");
  if(!cisla.length) return;
  const anim=(el)=>{
    const ciel=parseInt(el.dataset.cislo,10), suf=el.dataset.suf||"", t=900;
    const start=performance.now();
    const krok=(now)=>{
      let p=Math.min((now-start)/t,1);
      p=1-Math.pow(1-p,3); // spomalenie
      el.innerHTML=Math.round(ciel*p)+suf;
      if(p<1) requestAnimationFrame(krok);
    };
    requestAnimationFrame(krok);
  };
  if(!("IntersectionObserver" in window)){ cisla.forEach(c=>c.innerHTML=c.dataset.cislo+(c.dataset.suf||"")); return; }
  const io=new IntersectionObserver((z)=>{z.forEach(x=>{if(x.isIntersecting){anim(x.target);io.unobserve(x.target);}});},{threshold:.5});
  cisla.forEach(c=>io.observe(c));
}

/* ---- SVG ikony k nadpisom podstránok ---- */
const ICONS={
  school:'<path d="M12 3 1 9l11 6 9-4.91V17h2V9zM5 13.18v3.32L12 20l7-3.5v-3.32L12 17z"/>',
  people:'<path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
  book:'<path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-7 2h2v6l-1-.75L11 10zm7 16H6V4h3v8l2-1.5L13 12V4h5z"/>',
  food:'<path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>',
  heart:'<path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18z"/>',
  calendar:'<path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V8h14z"/>',
  document:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm2 16H6V4h7v5h5z"/>',
  pencil:'<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"/>',
  bag:'<path d="M7 4V2h10v2h1a3 3 0 0 1 3 3v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a3 3 0 0 1 3-3zm2 0h6V3H9zm-3 6h12V9H6z"/>',
  shield:'<path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5z"/>',
  palette:'<path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67a.5.5 0 0 1 .39-.83H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zM6.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>',
  globe:'<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.93 6h-2.95a15.7 15.7 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14a8 8 0 0 1 0-4h3.38a16.6 16.6 0 0 0 0 4zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A8 8 0 0 1 5.08 16zm2.95-8H5.08a8 8 0 0 1 4.33-3.56A15.7 15.7 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66a14.8 14.8 0 0 1 0-4h4.68a14.8 14.8 0 0 1 0 4zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8 8 0 0 1-4.33 3.56zM16.36 14a16.6 16.6 0 0 0 0-4h3.38a8 8 0 0 1 0 4z"/>',
  trophy:'<path d="M19 5h-2V3H7v2H5a2 2 0 0 0-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 16.9V19H7v2h10v-2h-4v-2.1a5.01 5.01 0 0 0 3.61-3.96A5.01 5.01 0 0 0 21 8V7a2 2 0 0 0-2-2zM5 8V7h2v3.82A3.01 3.01 0 0 1 5 8zm14 0a3.01 3.01 0 0 1-2 2.82V7h2z"/>',
  news:'<path d="M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14H5v-2h6zm0-4H5v-2h6zm0-4H5V7h6zm8 8h-6v-2h6zm0-4h-6v-2h6zm0-4h-6V7h6z"/>',
  folder:'<path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z"/>',
  lock:'<path d="M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9zm3 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>',
  pin:'<path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>',
  camera:'<path d="M9 2 7.17 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.17L15 2zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>'
};
const SLUG2ICON={
  "o-skole":"school","zamestnanci-skoly":"people","ucebny-plan":"book","skolsky-podporny-tim":"people",
  "skolska-jedalen":"food","skolska-druzina":"heart","organizacia-skolskeho-roka":"calendar",
  "skolsky-vzdelavaci-program":"book","skolsky-poriadok":"document","sprava-o-v-v-cinnosti":"document",
  "plan-uplatnovania-standardov-dodrziavania-zakazu-segregacie":"document","zapis-prvakov":"pencil",
  "pomocky-pre-i-stupen":"bag","rada-skoly":"people","prevencia-a-riesenie-sikanovania":"shield",
  "kruzkova-cinnost":"palette","projekty":"globe","uspechy":"trophy","skolsky-casopis":"news",
  "dokumenty":"folder","zverejnovanie":"document","kolektivna-zmluva":"document","oz-trnavka":"heart",
  "darovanie-2-dane":"heart","formulare-rodicom":"pencil","stavebne-prace":"document",
  "zverejnovanie-dokumentov":"folder","suhrnna-sprava-o-zakazkach-vo":"document",
  "prehlad-objednavok":"document","rocny-plan-zakaziek":"calendar",
  "informacie-o-spracovani-osobnych-udajov":"lock","kontakt":"pin"
};
function pridajIkonu(){
  const h=document.querySelector(".stranka-hlava h1");
  if(!h) return;
  const path=location.pathname; let name=null;
  if(path.indexOf("/galeria/")>=0) name="camera";
  else if(path.indexOf("/aktuality/")>=0) name="news";
  else { const sub=(path.split("/").pop()||"").replace(".html",""); name=SLUG2ICON[sub]; }
  if(!name || !ICONS[name]) return;
  var text=h.innerHTML.replace(/^\s*\p{Extended_Pictographic}+\s*/u,"");
  h.innerHTML='<span class="hlava-ikona"><svg viewBox="0 0 24 24">'+ICONS[name]+'</svg></span><span>'+text+'</span>';
  // dekoratívna grafika vpravo v hlavičke podstránky
  var hl=document.querySelector(".stranka-hlava");
  if(hl && !hl.querySelector(".hlava-grafika")){
    hl.insertAdjacentHTML("beforeend",
      '<div class="hlava-grafika" aria-hidden="true">'
      +'<span class="hg-kruh k1"></span><span class="hg-kruh k2"></span><span class="hg-kruh k3"></span>'
      +'<svg class="hg-ikona" viewBox="0 0 24 24">'+ICONS[name]+'</svg></div>');
  }
}

/* ---- Navigácia: priehľadná hore, biela po scrolle ---- */
function scrollHlavicka(){
  const h=document.querySelector(".hlavicka");
  if(!h) return;
  const prepni=()=>{ h.classList.toggle("pevna", window.scrollY>80); };
  prepni();
  window.addEventListener("scroll", prepni, {passive:true});
}

/* ---- GDPR cookie lišta ---- */
function gdprLista(){
  try{ if(localStorage.getItem("gdpr-suhlas")) return; }catch(e){ return; }
  const html=`<div class="gdpr" id="gdpr" role="dialog" aria-label="Súbory cookie">
    <div class="gdpr-text"><strong>Súbory cookie.</strong> Táto stránka používa iba nevyhnutné cookie potrebné na jej fungovanie.
      Viac v <a href="${c('stranky/zasady-pouzivania-suborov-cookie-eu.html')}">zásadách cookies</a>
      a <a href="${c('stranky/ochrana-osobnych-udajov.html')}">ochrane osobných údajov</a>.</div>
    <div class="gdpr-btns">
      <button class="btn btn-druhy" onclick="gdprVolba('odmietnute')">Odmietnuť</button>
      <button class="btn btn-hlavny" onclick="gdprVolba('prijate')">Prijať</button>
    </div></div>`;
  document.body.insertAdjacentHTML("beforeend", html);
}
window.gdprVolba=function(v){
  try{ localStorage.setItem("gdpr-suhlas",v); }catch(e){}
  const el=document.getElementById("gdpr"); if(el) el.remove();
};

document.addEventListener("DOMContentLoaded",()=>{
  vykresliHlavicku();
  vykresliPaticku();
  pridajIkonu();
  zobrazOznam();
  scrollOdhal();
  pocitadlo();
  scrollHlavicka();
  gdprLista();
});
