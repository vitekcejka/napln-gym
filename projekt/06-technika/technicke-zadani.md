# Technické zadání V1

**Stav:** schváleno pro build

## Stack

- Čisté statické HTML, CSS a JavaScript bez frameworku a runtime závislostí.
- Nasaditelný výstup: `web/dist/`.
- Důvod: rychlost, nulové licenční náklady, snadné nasazení na běžný hosting a nízká údržba.

## Funkce

- responzivní single page;
- sticky navigace a mobilní menu;
- plynulé scrollování bez nutnosti měnit URL hash;
- nativní přístupný FAQ accordion;
- lehké animace přes CSS + IntersectionObserver;
- scroll progress ve tvaru weight stacku;
- konfigurovatelný booking embed;
- jednoduchá stránka Ochrana osobních údajů.

## Integrace a data

- Jediná plánovaná integrace je externí scheduling služba.
- Žádná vlastní databáze, formulář, CRM, webhook, n8n, platba, chat, mapa ani social feed.
- Žádná analytika, Meta Pixel ani reklamní tracking ve V1.
- Cookie lišta se nepřidává, dokud skutečně použitý scheduler neprokáže její potřebu.

## Kvalita

- moderní Chrome, Safari, Firefox a Edge včetně mobilních variant;
- základní klávesnicová přístupnost, focus states, kontrast a touch targets;
- respektování `prefers-reduced-motion`;
- sémantická struktura nadpisů a základní metadata;
- lokální assety a minimum externích požadavků;
- žádné nefunkční nebo falešné odkazy.

## Konfigurace před spuštěním

Ve `assets/js/config.js` doplnit booking URL a firemní e-mail. V HTML nahradit firemní placeholdery a vložit finální logo a founder fotografii. Právní stránku zkontrolovat podle vybraného scheduleru.

