# Product Vision: Digiskjema

## 1) Produktbeskrivelse

Digiskjema er en digital skjemaplattform for norske kommuner som gjør det mulig å opprette, administrere og håndtere digitale skjemaer for kommunikasjon med innbyggere og virksomheter. Plattformen tilbyr et fullverdig skjemabyggerverktøy med funksjoner for design, publisering, innsending og behandling av skjema. Løsningen støtter både enkelte kommuner og felles drift for flere kommuner gjennom en multi-tenant arkitektur.

## 2) Primære brukergrupper

- **Sluttbruker (Innbygger/virksomhet)**: Personer og organisasjoner som fyller ut og sender inn skjemaer via plattformen. De trenger en intuitiv, tilgjengelig og enkel opplevelse.

- **Saksbehandler/administrator**: Kommunale ansatte som behandler skjema, administrerer skjemaene og konfigurerer systeminnstillinger. De trenger effektive verktøy for behandling og oversikt over oppgaver.

- **Skjemabygger (Form designer)**: Kommunale ansatte som designer og oppretter nye skjemaer. De trenger et kraftig men intuitivt verktøy for å bygge komplekse skjemaer med logikk og validering.

## 3) Kjerneproblemer som løses

- **Kompleks skjemahåndtering**: Gjør det enkelt for kommuner å opprette og håndtere digitale skjemaer uten avansert teknisk kompetanse
- **Manglende tilgjengelighet**: Sikrer at alle skjema er tilgjengelige for brukere med ulike behov og funksjonsvariasjoner
- **Manuell prosesshåndtering**: Automatiserer innsending, behandling og arkivering av skjema
- **Manglende integrasjon**: Gir mulighet for kobling mot eksisterende kommunale systemer
- **Sikkerhet og personvern**: Sikrer beskyttelse av personopplysninger og sikker overføring
- **Multi-tenant behov**: Gir mulighet for både enkeltkommunale og felles driftsmodeller
- **Ulike innsendingskanaler**: Støtter ulike måter å sende inn skjema på (ID-porten, anonymt, etc.)

## 4) Målbare suksesskriterier

- 90% av kommunene i Norge bruker plattformen innen 3 år etter lansering
- 95% WCAG 2.1 AA konformitetsnivå for alle skjema og brukergrensesnitt
- 80% reduksjon i tid fra skjemakreering til publisering sammenlignet med nåværende metoder
- 99.5% oppetid i produksjon (SLA)
- Mindre enn 2 sekunders gjennomsnittlig responstid for skjemavisning
- 95% av skjemautfyllingene fullføres uten tekniske feil
- 75% av kommunene oppretter minst 10 skjema per måned
- Maks 1 time oppetid ved feil eller oppdatering
- Mindre enn 1% av innsendingene går tapt
- 90% brukertilfredshet (målt via spørreundersøkelser)

## 5) Ikke-mål / avgrensninger

- **Fagsystemutvikling**: Plattformen er ikke et fagsystem, men et grensesnitt mot eksisterende fagsystemer
- **Skjemaarkivering**: Ikke primært et arkivsystem, men integrerer med eksisterende sakarkivsystemer
- **Full funksjonalitet for alle fagsystemer**: Ikke alle fagsystemer kan integreres fullt ut, men gir grunnleggende funksjonalitet
- **Personlig konsulenttjeneste**: Ikke et konsulentverktøy for kompleks forretningslogikk, men et selvbetjeningsverktøy
- **Utenlandsk drift**: Løsningen skal være tilgjengelig for norske kommuner, ikke internasjonal markedsføring
- **Avansert AI-logikk**: Ikke inneholder avansert kunstig intelligens, men grunnleggende automatisering og logikk

## 6) Krav som styrer alt

- **Digdir Designsystemet**: Alle grensesnitt og komponenter må følge Digdir Designsystemet standarder og retningslinjer
- **UU/WCAG**: Må oppfylle WCAG 2.1 AA krav og være fullt tilgjengelig for brukere med funksjonsvariasjoner
- **Sikkerhet**: Må oppfylle alle sikkerhetskrav fra Digdir og norske myndigheter, inkludert ISMS sertifisering
- **Logging/audit**: Må ha full logging og revisjonsfunksjonalitet for alle handlinger og tilganger
- **Tenant-støtte**: Må støtte både enkeltkommunale og multi-tenant modeller med full dataisolering
- **ID-porten integrasjon**: Må støtte innlogging via ID-porten og relaterte autentiseringsmekanismer
- **Elements integrasjon**: Må kunne integrere med Elements (sak/arkivsystemer) for arkivering og behandling
- **API-first design**: Må tilby komplette API-er for integrasjon med tredjeparts systemer
- **Norsk språk**: Må være på norsk bokmål og nynorsk, med grunnlag for fremtidig flerspråklighet
- **GDPR-kompatibilitet**: Må være fullt GDPR-kompatibelt med riktig håndtering av personopplysninger