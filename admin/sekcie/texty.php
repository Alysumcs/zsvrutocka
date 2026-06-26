<?php
$stranky = zoznam_stranok();
$subor = $_GET['subor'] ?? '';
$obsah = $subor ? nacitaj_text_stranky($subor) : null;
?>
<h1>Texty stránok</h1>
<p class="lead">Vyber stránku a uprav jej text. Značky ako <code>&lt;p&gt;</code>, <code>&lt;h2&gt;</code> nechaj tak – meň len text.</p>

<form method="get" class="vyber">
  <input type="hidden" name="s" value="texty">
  <label>Stránka:
    <select name="subor" onchange="this.form.submit()">
      <option value="">— vyber stránku —</option>
      <?php foreach($stranky as $f=>$nazov): ?>
        <option value="<?=h($f)?>" <?=$subor===$f?'selected':''?>><?=h($nazov)?></option>
      <?php endforeach; ?>
    </select>
  </label>
</form>

<?php if($subor && $obsah !== null): ?>
<form method="post">
  <input type="hidden" name="token" value="<?=token()?>">
  <input type="hidden" name="subor" value="<?=h($subor)?>">
  <textarea name="obsah" class="kod" rows="22"><?=h($obsah)?></textarea>
  <p>
    <button type="submit" class="btn">Uložiť text</button>
    <a class="btn light" href="../stranky/<?=h($subor)?>" target="_blank">Zobraziť stránku</a>
  </p>
</form>
<?php elseif($subor): ?>
  <div class="flash">Túto stránku nie je možné upraviť cez admin.</div>
<?php endif; ?>
