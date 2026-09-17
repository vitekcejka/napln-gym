# Web Naplň Gym

## Nasaditelný výstup

Celý obsah složky `dist/` lze nahrát na statický hosting. Web nemá build krok ani runtime závislosti.

## Povinné doplnění před spuštěním

V `dist/assets/js/config.js` doplňte:

- `bookingUrl` – veřejná HTTPS adresa vložitelného scheduleru;
- `contactEmail` – firemní e-mail;
- `companyId` – IČO bez prefixu;
- `companyAddress` – sídlo;
- `founderPhoto` – cesta k founder fotografii, doporučený poměr 4:5.

Finální logo nahraďte v obou HTML souborech nebo ponechte současnou geometrickou V1 značku. Po volbě scheduleru zkontrolujte text stránky Ochrana osobních údajů a jeho cookie chování.

## Lokální náhled

Spusťte jednoduchý statický server ve složce `dist/`. Přímé otevření `index.html` funguje také, ale server lépe simuluje skutečný hosting a správně obslouží adresář právní stránky.
