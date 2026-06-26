<?php
require_once __DIR__ . '/funkcie.php';

/* ---------- Odhlásenie ---------- */
if(isset($_GET['odhlasit'])){ session_destroy(); header('Location: index.php'); exit; }

/* ---------- Prihlásenie ---------- */
if(!je_prihlaseny()){
    $chyba = '';
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if(($_POST['heslo'] ?? '') === ADMIN_HESLO){ $_SESSION['admin_ok'] = true; header('Location: index.php'); exit; }
        $chyba = 'Nesprávne heslo.';
    }
    ?><!DOCTYPE html><html lang="sk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Prihlásenie · Admin ZŠ Vrútocká 58</title><link rel="stylesheet" href="admin.css"></head>
    <body class="login-body"><form class="login" method="post">
      <h1>Administrácia</h1><p class="sub">ZŠ Vrútocká 58</p>
      <?php if($chyba): ?><div class="chyba"><?=h($chyba)?></div><?php endif; ?>
      <input type="password" name="heslo" placeholder="Heslo" autofocus required>
      <button class="btn" type="submit">Prihlásiť sa</button>
    </form></body></html><?php
    exit;
}

$sekcia = $_GET['s'] ?? 'prehlad';
$povolene = ['prehlad','texty','oznamy','aktuality','galerie'];
if(!in_array($sekcia, $povolene, true)) $sekcia = 'prehlad';

/* =========================================================
   SPRACOVANIE FORMULÁROV
   ========================================================= */

/* --- Oznamy --- */
if($sekcia === 'oznamy' && $_SERVER['REQUEST_METHOD']==='POST'){
    over_token();
    $out = [];
    $n = $_POST['nadpis'] ?? [];
    for($i=0;$i<count($n);$i++){
        $nadpis = trim($n[$i]);
        if($nadpis === '') continue;
        $o = ['nadpis'=>$nadpis, 'text'=>trim($_POST['text'][$i] ?? '')];
        if(!empty($_POST['od'][$i])) $o['od'] = $_POST['od'][$i];
        if(!empty($_POST['do'][$i])) $o['do'] = $_POST['do'][$i];
        if(!empty($_POST['tl_text'][$i]) && !empty($_POST['tl_odkaz'][$i]))
            $o['tlacidlo'] = ['text'=>trim($_POST['tl_text'][$i]), 'odkaz'=>trim($_POST['tl_odkaz'][$i])];
        $out[] = $o;
    }
    zapis_data('oznamy.js','OZNAMY',$out,'Oznamy / pop-up okná');
    flash('Oznamy boli uložené.');
    header('Location: index.php?s=oznamy'); exit;
}

/* --- Texty stránok --- */
if($sekcia === 'texty' && $_SERVER['REQUEST_METHOD']==='POST'){
    over_token();
    zapis_text_stranky($_POST['subor'], $_POST['obsah']);
    flash('Text stránky bol uložený.');
    header('Location: index.php?s=texty&subor=' . urlencode($_POST['subor'])); exit;
}

/* --- Aktuality --- */
if($sekcia === 'aktuality' && $_SERVER['REQUEST_METHOD']==='POST'){
    over_token();
    $clanky = nacitaj_data('aktuality.js') ?: [];
    if(($_POST['akcia'] ?? '') === 'zmazat'){
        $id = $_POST['id'];
        $clanky = array_values(array_filter($clanky, fn($c)=> (string)$c['id'] !== (string)$id));
        flash('Článok bol zmazaný.');
    } else {
        $img = '';
        if(!empty($_FILES['foto']['name'])){
            $meno = uloz_obrazok($_FILES['foto'], 'aktuality');
            if($meno) $img = '/fotky-admin/aktuality/' . $meno;
        }
        $text = trim($_POST['text']);
        $html = '';
        foreach(preg_split('/\n\s*\n/', $text) as $od){ $od=trim($od); if($od!=='') $html .= '<p>'.nl2br(h($od)).'</p>'; }
        array_unshift($clanky, [
            'id' => time(),
            't'  => trim($_POST['nadpis']),
            'd'  => $_POST['datum'] ?: date('Y-m-d'),
            'e'  => mb_substr(strip_tags($html),0,160),
            'img'=> $img,
            'c'  => $html
        ]);
        flash('Aktualita bola pridaná.');
    }
    zapis_data('aktuality.js','AKTUALITY',$clanky,'Aktuality');
    // prepočítaj najnovsie (8)
    $light = array_map(fn($c)=>['id'=>$c['id'],'t'=>$c['t'],'d'=>$c['d'],'e'=>mb_substr($c['e'],0,150),'img'=>$c['img']], array_slice($clanky,0,8));
    zapis_data('najnovsie.js','NAJNOVSIE',$light,'Najnovšie aktivity');
    header('Location: index.php?s=aktuality'); exit;
}

/* --- Galérie --- */
if($sekcia === 'galerie' && $_SERVER['REQUEST_METHOD']==='POST'){
    over_token();
    $g = nacitaj_data('galerie.js') ?: [];
    $rok = trim($_POST['rok_novy'] ?: ($_POST['rok'] ?? ''));
    $nazov = trim($_POST['nazov']);
    if($rok && $nazov){
        $slug = preg_replace('/[^a-z0-9]+/','-', strtolower(iconv('UTF-8','ASCII//TRANSLIT', $nazov))) . '-' . substr(md5($nazov.time()),0,5);
        $subory = [];
        if(!empty($_FILES['fotky']['name'][0])){
            foreach($_FILES['fotky']['name'] as $i=>$nm){
                if(!$nm) continue;
                $f = ['name'=>$nm,'tmp_name'=>$_FILES['fotky']['tmp_name'][$i]];
                $ulo = uloz_obrazok($f, $slug);
                if($ulo) $subory[] = $ulo;
            }
        }
        if($subory){
            if(!isset($g[$rok])) $g = array_merge([$rok=>[]], $g); // nový rok navrch
            array_unshift($g[$rok], ['t'=>$nazov, 'b'=>'fotky-admin/'.$slug, 'f'=>$subory]);
            flash('Galéria „'.$nazov.'" bola pridaná ('.count($subory).' fotiek).');
        } else { flash('Nepodarilo sa nahrať žiadne fotky.'); }
    } else { flash('Vyplň školský rok aj názov galérie.'); }
    zapis_data('galerie.js','GALERIE',$g,'Fotogaléria');
    header('Location: index.php?s=galerie'); exit;
}

/* =========================================================
   ZOBRAZENIE
   ========================================================= */
?><!DOCTYPE html><html lang="sk"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Administrácia · ZŠ Vrútocká 58</title><link rel="stylesheet" href="admin.css">
</head><body>
<header class="topbar">
  <strong>Administrácia – ZŠ Vrútocká 58</strong>
  <a class="odhlas" href="?odhlasit=1">Odhlásiť sa →</a>
</header>
<div class="wrap">
  <nav class="bocne">
    <a href="?s=prehlad"  class="<?=$sekcia==='prehlad'?'akt':''?>">📋 Prehľad</a>
    <a href="?s=texty"    class="<?=$sekcia==='texty'?'akt':''?>">📝 Texty stránok</a>
    <a href="?s=oznamy"   class="<?=$sekcia==='oznamy'?'akt':''?>">📢 Oznamy (pop-up)</a>
    <a href="?s=aktuality" class="<?=$sekcia==='aktuality'?'akt':''?>">📰 Aktuality</a>
    <a href="?s=galerie"  class="<?=$sekcia==='galerie'?'akt':''?>">📷 Galérie</a>
    <a href="../index.html" target="_blank" class="vonku">🌐 Zobraziť web</a>
  </nav>
  <main class="obsah">
    <?php if($f = flash()): ?><div class="flash"><?=h($f)?></div><?php endif; ?>
    <?php include __DIR__ . "/sekcie/{$sekcia}.php"; ?>
  </main>
</div>
</body></html>
