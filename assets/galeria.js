/* =========================================================
   Fotogaléria — vykreslenie rokov, udalostí a lightboxu.
   Netreba upravovať. Dáta sú v súbore data/galerie.js
   ========================================================= */

/* ODKIAĽ SA NAČÍTAVAJÚ FOTKY:
   - Teraz sa fotky načítavajú zo starého webu (live adresa) — funguje hneď.
   - Keď spustíš zmenšovanie fotiek (skript optimalizovat-fotky.py),
     vzniknú priečinky "fotky" a "fotky-male" priamo pri stránke.
     Vtedy prepni obe hodnoty nižšie na lokálne:
        const MEDIA_ZAKLAD = "fotky/";
        const THUMB_ZAKLAD = "fotky-male/";                       */
const MEDIA_ZAKLAD = "https://zsvrutocka.sk/";   // veľké fotky (prezeranie)
const THUMB_ZAKLAD = "https://zsvrutocka.sk/";   // malé náhľady (mriežka)

// fotky nahrané cez admin sú v priečinku "fotky-admin" priamo pri stránke
function urlFoto(base, file){
  if(base.indexOf("fotky-admin")===0) return "/" + base + "/" + file;
  return MEDIA_ZAKLAD + base + "/" + file;
}
function urlThumb(base, file){
  if(base.indexOf("fotky-admin")===0) return "/" + base + "/" + file;
  return THUMB_ZAKLAD + base + "/" + file;
}

let LB = { files:[], base:"", i:0, nazov:"" };

function vykresliGaleriu(){
  const wrap = document.getElementById("galeria");
  if(!wrap || typeof GALERIE==="undefined") return;
  let html="";
  Object.keys(GALERIE).forEach((rok, idx)=>{
    const evs = GALERIE[rok];
    const pocetFotiek = evs.reduce((s,e)=>s+e.f.length,0);
    const otvor = idx===0 ? " otvoreny" : "";
    const udalosti = evs.map((e,ei)=>{
      const thumb = e.f.length ? urlThumb(e.b, e.f[0]) : "";
      return `<div class="udalost" onclick="otvorUdalost('${rok.replace('/','-')}',${ei})">
        <div class="nahlad"><img loading="lazy" src="${thumb}" alt="${e.t}"></div>
        <div class="nazov"><span>${pekny(e.t)}</span><span class="cislo">${e.f.length} foto</span></div>
      </div>`;
    }).join("");
    html += `<div class="rok-blok${otvor}" id="rok-${rok.replace('/','-')}">
      <div class="rok-hlava" onclick="this.parentNode.classList.toggle('otvoreny')">
        <span>Školský rok ${rok}</span>
        <span class="pocet">${evs.length} udalostí · ${pocetFotiek} fotiek <span class="sip">▾</span></span>
      </div>
      <div class="rok-obsah"><div class="udalosti">${udalosti}</div></div>
    </div>`;
  });
  wrap.innerHTML = html;
}

function pekny(t){
  // skrášli názov udalosti zo slugu (ngg)
  t = t.replace(/oto-galeria-skolsky-rok-\d{4}-\d{4}-?\d*/i,"Fotky").replace(/-/g," ").trim();
  if(!t) t="Fotky";
  return t.charAt(0).toUpperCase()+t.slice(1);
}

function otvorUdalost(rokId, ei){
  const rok = rokId.replace("-","/");
  const e = GALERIE[rok][ei];
  LB = { files:e.f, base:e.b, i:0, nazov:pekny(e.t) };
  document.getElementById("lightbox").classList.add("aktiv");
  document.body.style.overflow="hidden";
  ukazFoto();
}
function ukazFoto(){
  document.getElementById("lbObr").src = urlFoto(LB.base, LB.files[LB.i]);
  document.getElementById("lbNazov").textContent = LB.nazov;
  document.getElementById("lbPocitadlo").textContent = (LB.i+1)+" / "+LB.files.length;
}
function dalsia(k){ LB.i=(LB.i+k+LB.files.length)%LB.files.length; ukazFoto(); }
function zavriLB(){ document.getElementById("lightbox").classList.remove("aktiv"); document.body.style.overflow=""; }

document.addEventListener("DOMContentLoaded",()=>{
  vykresliGaleriu();
  document.addEventListener("keydown",e=>{
    if(!document.getElementById("lightbox")?.classList.contains("aktiv"))return;
    if(e.key==="Escape")zavriLB();
    if(e.key==="ArrowRight")dalsia(1);
    if(e.key==="ArrowLeft")dalsia(-1);
  });
});
