<?php
$oz = nacitaj_data('oznamy.js') ?: [];
$ak = nacitaj_data('aktuality.js') ?: [];
$ga = nacitaj_data('galerie.js') ?: [];
$pocetFotiek = 0; foreach($ga as $evs){ foreach($evs as $e){ $pocetFotiek += count($e['f'] ?? []); } }
$stranky = zoznam_stranok();
?>
<h1>Prehľad</h1>
<p class="lead">Vitaj v administrácii. Vľavo si vyber, čo chceš upraviť.</p>
<div class="karty">
  <div class="karta"><div class="cislo"><?=count($stranky)?></div><div>upraviteľných stránok</div></div>
  <div class="karta"><div class="cislo"><?=count($oz)?></div><div>aktívnych oznamov</div></div>
  <div class="karta"><div class="cislo"><?=count($ak)?></div><div>článkov / aktualít</div></div>
  <div class="karta"><div class="cislo"><?=$pocetFotiek?></div><div>fotiek v galériách</div></div>
</div>
<div class="info-blok">
  <h3>Ako to funguje</h3>
  <ul>
    <li><strong>Texty stránok</strong> – uprav text na ktorejkoľvek podstránke.</li>
    <li><strong>Oznamy</strong> – pridaj vyskakovacie okno (pop-up) s dátumom od–do.</li>
    <li><strong>Aktuality</strong> – pridaj novinku zo života školy aj s fotkou.</li>
    <li><strong>Galérie</strong> – vytvor novú galériu a nahraj do nej fotky.</li>
  </ul>
  <p class="pozn">Zmeny sa prejavia okamžite na webe. Heslo zmeníš v súbore <code>admin/config.php</code>.</p>
</div>
