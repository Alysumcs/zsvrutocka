<?php $oznamy = nacitaj_data('oznamy.js') ?: []; ?>
<h1>Oznamy (pop-up okná)</h1>
<p class="lead">Oznam sa zobrazí ako vyskakovacie okno na úvodnej stránke. Zobrazí sa prvý platný (podľa dátumu).</p>

<form method="post" id="ozForm">
  <input type="hidden" name="token" value="<?=token()?>">
  <div id="oznamy-zoznam">
    <?php
    $vsetky = $oznamy; $vsetky[] = ['nadpis'=>'','text'=>'','od'=>'','do'=>'']; // jeden prázdny na pridanie
    foreach($vsetky as $o):
      $tl = $o['tlacidlo'] ?? ['text'=>'','odkaz'=>''];
    ?>
    <div class="blok-oznam">
      <label>Nadpis<input type="text" name="nadpis[]" value="<?=h($o['nadpis']??'')?>" placeholder="napr. Riaditeľské voľno"></label>
      <label>Text<textarea name="text[]" rows="2" placeholder="Text oznamu"><?=h($o['text']??'')?></textarea></label>
      <div class="riadok">
        <label>Zobraziť od<input type="date" name="od[]" value="<?=h($o['od']??'')?>"></label>
        <label>Zobraziť do<input type="date" name="do[]" value="<?=h($o['do']??'')?>"></label>
      </div>
      <div class="riadok">
        <label>Tlačidlo – text<input type="text" name="tl_text[]" value="<?=h($tl['text']??'')?>" placeholder="napr. Viac info"></label>
        <label>Tlačidlo – odkaz<input type="text" name="tl_odkaz[]" value="<?=h($tl['odkaz']??'')?>" placeholder="napr. stranky/dokumenty.html"></label>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
  <p><button type="button" class="btn light" onclick="pridajOznam()">+ Pridať ďalší oznam</button></p>
  <p><button type="submit" class="btn">Uložiť oznamy</button></p>
  <p class="pozn">Tip: prázdny oznam (bez nadpisu) sa neuloží. Ak chceš oznam zmazať, vymaž jeho nadpis a ulož.</p>
</form>

<template id="sablona-oznam">
  <div class="blok-oznam">
    <label>Nadpis<input type="text" name="nadpis[]" placeholder="napr. Riaditeľské voľno"></label>
    <label>Text<textarea name="text[]" rows="2" placeholder="Text oznamu"></textarea></label>
    <div class="riadok"><label>Zobraziť od<input type="date" name="od[]"></label><label>Zobraziť do<input type="date" name="do[]"></label></div>
    <div class="riadok"><label>Tlačidlo – text<input type="text" name="tl_text[]"></label><label>Tlačidlo – odkaz<input type="text" name="tl_odkaz[]"></label></div>
  </div>
</template>
<script>
function pridajOznam(){
  var t=document.getElementById('sablona-oznam');
  document.getElementById('oznamy-zoznam').appendChild(t.content.cloneNode(true));
}
</script>
