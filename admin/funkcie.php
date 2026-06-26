<?php
require_once __DIR__ . '/config.php';
session_start();

/* ---------- Prihlásenie ---------- */
function je_prihlaseny(){ return !empty($_SESSION['admin_ok']); }
function vyzaduj_prihlasenie(){
    if(!je_prihlaseny()){ header('Location: index.php'); exit; }
}
function token(){
    if(empty($_SESSION['token'])) $_SESSION['token'] = bin2hex(random_bytes(16));
    return $_SESSION['token'];
}
function over_token(){
    if(empty($_POST['token']) || !hash_equals($_SESSION['token'] ?? '', $_POST['token'])){
        die('Neplatná požiadavka (obnovte stránku).');
    }
}

/* ---------- Čítanie / zápis dátových .js súborov ----------
   Súbory vyzerajú ako:  window.NAZOV = {...};
   Z nich vyberieme JSON medzi prvým '=' a posledným ';'.     */
function nacitaj_data($subor){
    $p = DATA . '/' . $subor;
    if(!is_file($p)) return null;
    $s = file_get_contents($p);
    // odstráň komentáre /* */ a // …, aby sme nezachytili '=' v komentári
    $s = preg_replace('#/\*.*?\*/#s', '', $s);
    $s = preg_replace('#^\s*//.*$#m', '', $s);
    if(preg_match('/window\.[A-Za-z_]+\s*=\s*([\s\S]*);\s*$/', $s, $m)){
        return json_decode(trim($m[1]), true);
    }
    return null;
}
function zapis_data($subor, $nazovPremennej, $hodnota, $popis = ''){
    $p = DATA . '/' . $subor;
    $json = json_encode($hodnota, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    $obsah = "/* " . $popis . " (upravené v admine) */\nwindow." . $nazovPremennej . " = " . $json . ";\n";
    return file_put_contents($p, $obsah) !== false;
}

/* ---------- Texty podstránok (medzi značkami v .html) ---------- */
function zoznam_stranok(){
    $out = [];
    foreach(glob(STRANKY . '/*.html') as $f){
        $obsah = file_get_contents($f);
        if(strpos($obsah, 'http-equiv="refresh"') !== false) continue; // preskoč presmerovania
        if(strpos($obsah, 'ZAČIATOK OBSAHU') === false) continue;
        $nazov = '';
        if(preg_match('/<title>(.*?)<\/title>/su', $obsah, $m)) $nazov = trim(str_replace('– ZŠ Vrútocká 58','',$m[1]));
        $out[basename($f)] = $nazov ?: basename($f);
    }
    asort($out);
    return $out;
}
function nacitaj_text_stranky($subor){
    $p = STRANKY . '/' . basename($subor);
    if(!is_file($p)) return null;
    $s = file_get_contents($p);
    if(preg_match('/ZAČIATOK OBSAHU[^\n]*-->(.*?)<!--\s*KONIEC OBSAHU/su', $s, $m)) return trim($m[1]);
    return '';
}
function zapis_text_stranky($subor, $novy){
    $p = STRANKY . '/' . basename($subor);
    if(!is_file($p)) return false;
    $s = file_get_contents($p);
    $s = preg_replace_callback('/(ZAČIATOK OBSAHU[^\n]*-->)(.*?)(<!--\s*KONIEC OBSAHU)/su',
        function($m) use ($novy){ return $m[1] . "\n" . $novy . "\n" . $m[3]; }, $s, 1);
    return file_put_contents($p, $s) !== false;
}

/* ---------- Nahrávanie obrázkov ---------- */
function uloz_obrazok($file, $podpriecinok){
    $cieldir = FOTKY_ADMIN . '/' . $podpriecinok;
    if(!is_dir($cieldir)) @mkdir($cieldir, 0775, true);
    $pripona = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if(!in_array($pripona, ['jpg','jpeg','png','webp','gif'])) return null;
    $meno = preg_replace('/[^a-zA-Z0-9_\-]/', '_', pathinfo($file['name'], PATHINFO_FILENAME));
    $meno = $meno . '_' . substr(md5($file['name'].microtime()),0,6) . '.' . $pripona;
    if(move_uploaded_file($file['tmp_name'], $cieldir . '/' . $meno)) return $meno;
    return null;
}

function flash($t=null){
    if($t !== null){ $_SESSION['flash'] = $t; return; }
    if(!empty($_SESSION['flash'])){ $m = $_SESSION['flash']; unset($_SESSION['flash']); return $m; }
    return '';
}
function h($s){ return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
