<?php
/* =========================================================
   NASTAVENIA ADMINISTRÁCIE
   --------------------------------------------------------
   1) Zmeň heslo nižšie (ADMIN_HESLO) na svoje vlastné.
   2) Súbor nahraj na hosting do priečinka  /admin/.
   Admin potom otvoríš na adrese  tvojadomena.sk/admin/
   ========================================================= */

// >>> SEM NAPÍŠ SVOJE HESLO <<<
define('ADMIN_HESLO', 'vrutocka2026');

// (nepovinné) prihlasovacie meno – kľudne nechaj
define('ADMIN_MENO', 'admin');

// Cesty (netreba meniť)
define('KOREN', dirname(__DIR__));          // koreň webu (nova-stranka)
define('DATA',  KOREN . '/data');           // dátové súbory
define('STRANKY', KOREN . '/stranky');      // podstránky
define('FOTKY_ADMIN', KOREN . '/fotky-admin'); // sem sa nahrávajú nové fotky

date_default_timezone_set('Europe/Bratislava');
