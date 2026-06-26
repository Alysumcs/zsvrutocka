<?php
$g = nacitaj_data('galerie.js') ?: [];
$roky = array_keys($g);
?>
<h1>Fotogalérie</h1>
<p class="lead">Vytvor novú galériu (udalosť) v rámci školského roka a nahraj do nej fotky.</p>

<form method="post" enctype="multipart/form-data" class="pridaj-box">
  <input type="hidden" name="token" value="<?=token()?>">
  <h3>Pridať galériu</h3>
  <div class="riadok">
    <label>Školský rok (existujúci)
      <select name="rok">
        <option value="">— vyber —</option>
        <?php foreach($roky as $r): ?><option value="<?=h($r)?>"><?=h($r)?></option><?php endforeach; ?>
      </select>
    </label>
    <label>alebo nový rok<input type="text" name="rok_novy" placeholder="napr. 2026/2027"></label>
  </div>
  <label>Názov galérie / udalosti<input type="text" name="nazov" required placeholder="napr. Karneval 2026"></label>
  <label>Fotky (môžeš vybrať viac naraz)<input type="file" name="fotky[]" accept="image/*" multiple required></label>
  <p><button type="submit" class="btn">Vytvoriť galériu a nahrať fotky</button></p>
  <p class="pozn">Fotky sa uložia do priečinka <code>fotky-admin/</code> a hneď sa zobrazia vo Fotogalérii.</p>
</form>

<h3 style="margin-top:34px">Existujúce galérie</h3>
<?php foreach($g as $rok=>$evs): ?>
  <details class="rok-det">
    <summary><strong><?=h($rok)?></strong> — <?=count($evs)?> udalostí</summary>
    <ul>
      <?php foreach($evs as $e): ?>
        <li><?=h($e['t'])?> <span class="datum"><?=count($e['f'])?> fotiek</span></li>
      <?php endforeach; ?>
    </ul>
  </details>
<?php endforeach; ?>
