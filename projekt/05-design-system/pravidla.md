# Design systém Naplň Gym V1

**Stav:** závazný pro první build

## Vizuální teze

Světlý, kontrastní a typograficky silný web, ve kterém lime „cesta“ prochází černými překážkami a vede člověka až dovnitř gymu. Fitness DNA se ukazuje přes rytmus, váhu, konstrukci a weight-stack detail, ne přes činky, svaly nebo stock sportovce.

## Barvy

- Canvas: `#F5F6F0`
- Čistá plocha: `#FFFFFF`
- Ink / černá: `#0B0D0C`
- Lime: `#C7FF2E`
- Lime tmavá pro focus/kontrast: `#8FB800`
- Neutrální text: `#5C615D`
- Jemná linka: `rgba(11, 13, 12, 0.14)`

Poměr zůstává přibližně 70 % světlá, 25 % černá, 5 % lime. Lime se používá na akci, vedení oka a výjimečné zvýraznění, ne jako plošné pozadí všeho.

## Typografie

- Nadpisy: výrazný geometrický sans serif, těsnější tracking, vysoká váha.
- Text: čistý čitelný sans serif, minimálně 16 px.
- Velikosti používají `clamp()`, aby reagovaly plynule bez překryvů.
- Řádky odstavců mají maximální délku přibližně 65 znaků.

## Logo

- Primární lockup obsahuje symbol a text „Naplň Gym“ v jednom nedělitelném assetu.
- Na světlých plochách se používá transparentní `napln-gym-logo.png`; symbol ani text se samostatně nepřekreslují.
- Samostatný dodaný symbol se používá jako favicon.
- Pro tmavé plochy je potřeba samostatná inverzní varianta; běžná černá verze se na černé pozadí nepokládá.

## Geometrie

- Malé karty: radius 12–16 px.
- Tlačítka: pill tvar s výškou minimálně 48 px.
- Velké strukturální bloky: ostré nebo jen lehce zaoblené.
- Stíny se používají minimálně; hierarchii vytváří kontrast, linka a plocha.

## Tlačítka

- Primární: černé pozadí, bílý text, lime kruh se šipkou; na tmavé ploše lime tlačítko s černým textem.
- Sekundární: průhledné pozadí, černý rámeček.
- Hover: krátký posun šipky a změna kontrastu, bez layout shiftu.
- Focus: dobře viditelný dvojitý lime/černý obrys.
- Disabled se nepoužívá jako falešná interakce; chybějící booking má vysvětlený stav.

## Motion

- Hero entrance: krátký stagger textu a vykreslení lime cesty.
- Sekce: jemný posun a opacity reveal.
- Systém: cesta a body reagují při vstupu do viewportu.
- Weight stack: progres podle skutečného scrollu.
- Délky primárně 180–700 ms; žádné pomalé animace blokující čtení.
- Při `prefers-reduced-motion: reduce` se přechody a scroll animace vypnou.

## Co se nepoužívá

- černo-červený hardcore fitness styl;
- lebky, plameny, bicepsy, stock bodybuilder;
- neon cyberpunk;
- fake dashboardy a grafy;
- generické SaaS karty a velké stíny;
- několik konkurenčních akcentních barev;
- motion na každé maličkosti.
