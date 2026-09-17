# Deník rozhodnutí

Tento dokument brání tomu, abychom se opakovaně vraceli ke stejným otázkám bez nového důvodu.

| Datum | Oblast | Rozhodnutí | Důvod | Dopad | Stav |
|---|---|---|---|---|---|
| 2026-09-17 | Proces | Nejdříve zadání, struktura a jednotná pravidla; implementace až poté | Minimalizovat předělávání a získat použitelnou první verzi | `web/` zůstává zatím prázdný | schváleno |
| 2026-09-17 | Struktura souborů | Oddělit nasaditelný web od projektové dokumentace a podkladů | Čisté nasazení a snadná orientace | Web bude pouze ve `web/` | schváleno |
| 2026-09-17 | Stack V1 | Čisté statické HTML, CSS a JavaScript | Nejnižší provozní složitost, nulové runtime závislosti, snadný hosting | Nasaditelný výstup bude v `web/dist/` | schváleno |
| 2026-09-17 | Hosting | Build zůstává lokální; hosting a doménu řeší owner | Výslovně uvedeno v briefu | Nevytváří se ani nepublikuje externí Site | schváleno |
| 2026-09-17 | Chybějící podklady | Build pokračuje s jasně označenými a centrálně vyměnitelnými placeholdery | Brief dovoluje placeholder a nechce zbytečné blokování | Před produkcí dodat logo, foto, booking URL, e-mail, IČO a sídlo | schváleno |
