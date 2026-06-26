<?php $clanky = nacitaj_data('aktuality.js') ?: []; ?>
<h1>Aktuality</h1>
<p class="lead">Pridaj novinku zo života školy. Nová sa zobrazí navrchu úvodnej stránky aj v sekcii Aktivity.</p>

<form method="post" enctype="multipart/form-data" class="pridaj-box">
  <input type="hidden" name="token" value="<?=token()?>">
  <h3>Pridať aktualitu</h3>
  <label>Nadpis<input type="text" name="nadpis" required placeholder="napr. Školský výlet do Tatier"></label>
  <label>Dátum<input type="date" name="datum" value="<?=date('Y-m-d')?>"></label>
  <label>Text (nový odsek = prázdny riadok)<textarea name="text" rows="6" required placeholder="Text článku…"></textarea></label>
  <label>Úvodná fotka (nepovinné)<input type="file" name="foto" accept="image/*"></label>
  <p><button type="submit" class="btn">Pridať aktualitu</button></p>
</form>

<h3 style="margin-top:34px">Posledné články (<?=count($clanky)?>)</h3>
<div class="zoznam-clankov">
  <?php foreach(array_slice($clanky,0,25) as $c): ?>
    <div class="clanok-riadok">
      <div>
        <strong><?=h($c['t'])?></strong>
        <span class="datum"><?=h($c['d'])?></span>
      </div>
      <form method="post" onsubmit="return confirm('Naozaj zmazať tento článok?')">
        <input type="hidden" name="token" value="<?=token()?>">
        <input type="hidden" name="akcia" value="zmazat">
        <input type="hidden" name="id" value="<?=h($c['id'])?>">
        <button class="btn mini cerveny" type="submit">Zmazať</button>
      </form>
    </div>
  <?php endforeach; ?>
</div>
