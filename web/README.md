# Web Naplň Gym

## Nasaditelný výstup

Celý obsah složky `dist/` lze nahrát na statický hosting. Web nemá build krok ani runtime závislosti.

## Povinné doplnění před spuštěním

V `dist/assets/js/config.js` doplňte:

- `bookingUrl` – veřejná HTTPS adresa vložené rezervace Cal.com;
- `contactEmail` – firemní e-mail;
- `contactFormEndpoint` – AJAX endpoint kontaktního formuláře;
- `companyId` – IČO bez prefixu;
- `companyAddress` – sídlo;
- `founderPhoto` – cesta k founder fotografii, doporučený poměr 4:5.

Kontaktní formulář používá FormSubmit. Po prvním testovacím odeslání je nutné potvrdit aktivační e-mail doručený na `vitek@naplngym.cz`; další zprávy potom chodí přímo bez přesměrování návštěvníka. Rezervace používá Cal.com a na stránce se načte až po zvolení možnosti „Vybrat 30min termín“.

Před veřejným spuštěním doplňte IČO a sídlo do konfigurace a připojte v Cal.com používaný kalendář, aby se nabízené termíny nekryly s jinými událostmi.

## Lokální náhled

Spusťte jednoduchý statický server ve složce `dist/`. Přímé otevření `index.html` funguje také, ale server lépe simuluje skutečný hosting a správně obslouží adresář právní stránky.
