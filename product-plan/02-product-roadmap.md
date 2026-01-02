# Product Roadmap: Digiskjema

## 1) Skjema (liste + fylle ut + innsending)

### Scope
Full funksjonalitet for skjemaopplevelse fra listevisning til innsending, inkludert tilgjengelighet, autentisering og innsendingsflyt. Dette omfatter både anonym og innlogget bruk med ID-porten/D-nummer.

### Epics
- **E1**: Skjemaoversikt og navigasjon
- **E2**: Skjemautfylling og interaksjon
- **E3**: Innsending og bekreftelse

### User stories (kort)
- Som bruker ønsker jeg å se tilgjengelige skjema i en oversikt slik at jeg enkelt finner det jeg trenger
- Som bruker ønsker jeg å fylle ut skjema med logisk flyt slik at jeg ikke gjør feil
- Som bruker ønsker jeg å sende inn skjema med bekreftelse slik at jeg vet det er mottatt
- Som bruker ønsker jeg tilgjengelige skjema slik at jeg kan bruke det med hjelpemiddel
- Som innbygger ønsker jeg innlogging via ID-porten slik at jeg får personlig behandling

### Definition of Done
- Skjemaoversikt er responsiv og tilgjengelig
- Skjema kan fylles ut uten tekniske feil
- Innsending bekreftes med kvittering
- WCAG 2.1 AA konformitet oppnådd
- ID-porten og D-nummer autentisering støttet
- Validering og feilmeldinger er tydelige

### Avhengigheter
- ID-porten integrasjon (REQ-B1-0019, REQ-B1-0026)
- Sak/arkivsystem (Elements) integrasjon (REQ-B1-0013)
- Multi-tenant arkitektur (REQ-B1-0010)
- Tilgjengelighet (REQ-B1-0007)

### Risikoer og mitigering
- **Risiko**: Lav tilgjengelighet for brukere med funksjonsvariasjoner
  - **Mitigering**: Tidlig testing med brukere, automatisert testing, WCAG testing
- **Risiko**: Tekniske feil ved innsending
  - **Mitigering**: Robust validering, backupmekanismer, feilhåndtering
- **Risiko**: Lang lastingstid
  - **Mitigering**: Optimalisert frontend, CDN, asynkron lasting

### MVP vs senere
- **MVP**: Grunnleggende skjemaoversikt, enkle skjema, innsending, ID-porten
- **Senere**: Avansert validering, tilpassede skjema, flere innloggingsmetoder

## 2) Skjemabygger (bygg, logikk, publisering)

### Scope
Fullverdig skjemabygger med mulighet for å opprette komplekse skjema med logikk, validering og publisering. Verktøyet skal støtte både enkle og avanserte skjema med betinget logikk og beregninger.

### Epics
- **E1**: Visuelt skjemabygger
- **E2**: Betinget logikk og validering
- **E3**: Publisering og versjonskontroll

### User stories (kort)
- Som skjemabygger ønsker jeg å dra og slippe felt slik at jeg enkelt bygger skjema
- Som skjemabygger ønsker jeg å legge til betinget logikk slik at felt kan skjules/vises dynamisk
- Som skjemabygger ønsker jeg å validere felt slik at bruker får gode feilmeldinger
- Som skjemabygger ønsker jeg å publisere skjema slik at brukere får tilgang
- Som skjemabygger ønsker jeg versjonskontroll slik at jeg kan gå tilbake til eldre versjoner

### Definition of Done
- Visuelt byggerverktøy er intuitivt og effektivt
- Betinget logikk fungerer som forventet
- Validering er fleksibel og tydelig
- Publisering er trygg og kontrollert
- Versjonskontroll lar deg håndtere endringer
- WCAG 2.1 AA oppfylt for byggerverktøy

### Avhengigheter
- Designsystem (REQ-B1-0003)
- Tilgjengelighet (REQ-B1-0007)
- Multi-tenant arkitektur (REQ-B1-0010)
- Data validering (REQ-B1-0033, REQ-B1-0034)

### Risikoer og mitigering
- **Risiko**: Kompleksitet i byggerverktøy
  - **Mitigering**: Gradvis innføring, brukertesting, enkel UI først
- **Risiko**: Ustabil logikk i skjema
  - **Mitigering**: Testrammeverk, validering av logikk, preview-modus
- **Risiko**: Uautorisert publisering
  - **Mitigering**: God tilgangskontroll, godkjenningsarbeid, revisjon

### MVP vs senere
- **MVP**: Grunnleggende felttyper, enkel publisering, preview
- **Senere**: Avansert logikk, maler, tilpassede felt, arbeidsgang

## 3) Administrasjon (maler, kategorier, leietakere, betingelser, tilgang)

### Scope
Administrasjonsfunksjonalitet for håndtering av maler, kategorier, leietakere (kommuner), betingelser og tilgangsstyring. Dette inkluderer både systemadministrasjon og skjemastyring.

### Epics
- **E1**: Leietaker (kommune) administrasjon
- **E2**: Maler og kategorier
- **E3**: Tilgangsstyring og roller

### User stories (kort)
- Som administrator ønsker jeg å opprette nye kommuner slik at de får egen tilgang
- Som administrator ønsker jeg å administrere maler slik at de kan gjenbrukes
- Som administrator ønsker jeg å sette opp kategorier slik at skjema kan organiseres
- Som administrator ønsker jeg å gi rettigheter til brukere slik at de får riktig tilgang
- Som administrator ønsker jeg å overvåke bruken slik at jeg får innsikt

### Definition of Done
- Leietakeroppsett er automatisert og trygt
- Maler og kategorier kan håndteres effektivt
- Tilgangsstyring følger best practice
- Roller og rettigheter er fleksible og sikre
- Logging og revisjon er fullstendig

### Avhengigheter
- Multi-tenant arkitektur (REQ-B1-0010)
- Tilgangskontroll (REQ-B1-0009)
- Logging/audit (REQ-B1-0050, REQ-B1-0051)
- Sikkerhet (REQ-B1-0054-REQ-B1-0060)

### Risikoer og mitigering
- **Risiko**: Feil tilgangsstyring
  - **Mitigering**: God testing, revisjonslogging, godkjenningsarbeid
- **Risiko**: Datalekkasje mellom leietakere
  - **Mitigering**: Robust dataisolering, sikkerhetsgjennomgang, testing
- **Risiko**: Uoversiktlig administrasjon
  - **Mitigering**: Intuitivt UI, dokumentasjon, trening

### MVP vs senere
- **MVP**: Grunnleggende leietakeroppsett, enkle maler, basistilgang
- **Senere**: Avansert tilgangskontroll, malbibliotek, betingelser

## 4) Innsikt (analyser, tilgjengelighet, språk)

### Scope
Analyseverktøy for å forstå bruksmønstre, tilgjengelighet og språkbruk. Dette inkluderer både bruksstatistikk og tilgjengelighetsanalyser.

### Epics
- **E1**: Bruksanalyser og statistikk
- **E2**: Tilgjengelighet overvåkning
- **E3**: Språk og oversettelser

### User stories (kort)
- Som administrator ønsker jeg å se bruksstatistikk slik at jeg forstår bruksmønstre
- Som administrator ønsker jeg å overvåke tilgjengelighet slik at jeg sikrer WCAG etterlevelse
- Som administrator ønsker jeg å håndtere oversettelser slik at skjema er tilgjengelig på flere språk
- Som administrator ønsker jeg å se feilstatistikk slik at jeg kan forbedre skjema
- Som administrator ønsker jeg å analysere utfyllingsflyt slik at jeg kan forbedre brukeropplevelse

### Definition of Done
- Analyseverktøy gir meningsfylt innsikt
- Tilgjengelighet overvåkes kontinuerlig
- Språkstøtte fungerer som forventet
- Data er anonymisert i samsvar med personvern
- Rapporter er tilgjengelige og forståelige

### Avhengigheter
- Logging/observability (REQ-B1-0050-REQ-B1-0053)
- Tilgjengelighet (REQ-B1-0007)
- Flerspråk (REQ-B1-0006, REQ-B1-0008)
- Personvern (REQ-B1-0083-REQ-B1-0087)

### Risikoer og mitigering
- **Risiko**: Personopplysningsbrudd i analyser
  - **Mitigering**: Anonymisering, GDPR-samsvar, begrenset tilgang
- **Risiko**: Ubrukbare analyser
  - **Mitigering**: Kvalitetssikring, brukertesting, relevant informasjon
- **Risiko**: Manglende tilgjengelighet
  - **Mitigering**: Automatisert testing, overvåkning, brukertesting

### MVP vs senere
- **MVP**: Grunnleggende bruksstatistikk, tilgjengelighetstesting
- **Senere**: Avanserte analyser, automatisert tilgjengelighetsovervåkning, flerspråklig støtte