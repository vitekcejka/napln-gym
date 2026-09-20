# Deník rozhodnutí

Tento dokument brání tomu, abychom se opakovaně vraceli ke stejným otázkám bez nového důvodu.

| Datum | Oblast | Rozhodnutí | Důvod | Dopad | Stav |
|---|---|---|---|---|---|
| 2026-09-17 | Proces | Nejdříve zadání, struktura a jednotná pravidla; implementace až poté | Minimalizovat předělávání a získat použitelnou první verzi | `web/` zůstává zatím prázdný | schváleno |
| 2026-09-17 | Struktura souborů | Oddělit nasaditelný web od projektové dokumentace a podkladů | Čisté nasazení a snadná orientace | Web bude pouze ve `web/` | schváleno |
| 2026-09-17 | Stack V1 | Čisté statické HTML, CSS a JavaScript | Nejnižší provozní složitost, nulové runtime závislosti, snadný hosting | Nasaditelný výstup bude v `web/dist/` | schváleno |
| 2026-09-17 | Hosting | Build zůstává lokální; hosting a doménu řeší owner | Výslovně uvedeno v briefu | Nevytváří se ani nepublikuje externí Site | schváleno |
| 2026-09-17 | Chybějící podklady | Build pokračuje s jasně označenými a centrálně vyměnitelnými placeholdery | Brief dovoluje placeholder a nechce zbytečné blokování | Před produkcí dodat logo, foto, booking URL, e-mail, IČO a sídlo | schváleno |
| 2026-09-18 | Logo a favicon | Použít dodaný společný PNG lockup s odstraněným bílým pozadím; u faviconu ponechat bílý zaoblený čtverec a odstranit pouze vnější černé okolí | Jde o oficiální assety dodané zadavatelem | Původní skládané logo v headeru a na právní stránce je nahrazené; tmavý footer čeká na vhodnou inverzní variantu nebo samostatné rozhodnutí | schváleno |
| 2026-09-18 | PC header | Nad 78px navigaci přidat 34px lime pilotní announcement, který po scrollu zajede; kombinovaný lockup vizuálně výškově srovnat s CTA | Pilotní nabídka je vidět okamžitě a header zůstává po scrollu kompaktní | PC-1 je uzavřený; mobilní header se bude řešit samostatně | schváleno |
| 2026-09-18 | Hero headline | Nahradit původní headline textem „Prázdný gym nevydělává. Pojďme ho naplnit.“ | Kratší a údernější formulace rychleji pojmenuje problém i zamýšlený výsledek | Nové znění je společným obsahovým základem pro PC i telefon | schváleno |
| 2026-09-20 | Pilotní kapacita | Ve všech textech pracovat se dvěma pilotními gymy místo jednoho | Aktuální nabídka má dvě otevřená místa | Announcement, hero, pilotní sekce i projektové podklady používají stejný počet | schváleno |
| 2026-09-20 | Hero ticker | Použít černé pozadí, bílé texty a lime oddělovače | Pás se výrazněji oddělí od světlého hero a zachová brandovou lime jako akcent | Konstrukce a plynulost tickeru zůstávají beze změny | schváleno |
