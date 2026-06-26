/* =========================================================
   OZNAMY (pop-up okná)
   --------------------------------------------------------
   Tu pridávaš oznamy, ktoré sa zobrazia ako pop-up okno
   pri otvorení stránky. Zobrazí sa vždy ten prvý platný.

   Ako pridať nový oznam: skopíruj jeden blok { ... } a uprav.
     nadpis  – tučný nadpis okna
     text    – text oznamu (môže obsahovať <br> pre nový riadok)
     od / do – (nepovinné) dátum YYYY-MM-DD, dokedy sa zobrazuje
     tlacidlo– (nepovinné) odkaz, napr. na PDF alebo stránku

   Keď nechceš žiadny oznam, nechaj prázdne: window.OZNAMY = [];
   ========================================================= */

window.OZNAMY = [
  {
    "nadpis": "Zápis prvákov – prevzatie rozhodnutí (2026/2027)",
    "text": "Vážení rodičia budúcich prvákov,<br>radi by sme Vás informovali, že si môžete prevziať rozhodnutie riaditeľa školy o prijatí alebo neprijatí dieťaťa do ZŠ Vrútocká 58 v Bratislave na školský rok 2026/2027.<br><br>Rozhodnutie musia prevziať <strong>obaja zákonní zástupcovia</strong>, pričom nemusia prísť naraz – každý z nich ho môže prevziať v inom čase.<br><br>Prevzatie rozhodnutí bude prebiehať <strong>na vrátnici školy</strong> v týchto termínoch:<br>• 23. 6. 2026 (utorok): 8:00 – 16:00<br>• 24. 6. 2026 (streda): 8:00 – 12:00<br>• 26. 6. 2026 (piatok): 8:00 – 16:00<br><br><strong>Dôležité:</strong> Ak má zákonný zástupca aktivovanú elektronickú schránku na <a href=\"https://www.slovensko.sk\" target=\"_blank\">slovensko.sk</a>, nemusí prísť osobne – rozhodnutie sa považuje za doručené elektronicky.<br><br>S pozdravom<br>Mgr. Lukáš Srnka, riaditeľ školy",
    "od": "2026-06-01",
    "do": "2026-06-27"
  },
  {
    "nadpis": "Naša škola v projekte ERASMUS+",
    "text": "Sme hrdou súčasťou medzinárodného projektu <strong>ERASMUS+</strong>. Pozrite si naše projektové aktivity, výjazdy a spoluprácu so zahraničnými školami.",
    "tlacidlo": {
      "text": "Otvoriť projekt ERASMUS+ →",
      "odkaz": "https://sites.google.com/view/projektove-aktivity/2026"
    }
  }
];
