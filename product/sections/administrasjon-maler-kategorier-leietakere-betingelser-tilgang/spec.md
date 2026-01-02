# Administrasjon - Spesifikasjon

## 1. Overview

Administrasjonsseksjonen gir systemadministratorer og leietakaradministratorer mulighet til å håndtere maler, kategorier, leietakere (kommuner), betingelser og tilgangsstyring. Løsningen gir sentral kontroll over systeminnstillinger og brukerrettigheter på tvers av systemet.

## 2. Primærbruker (admin/editor) og tilgang

### Systemadministrator
- Har full tilgang til alle funksjoner i administrasjonspanelet
- Kan opprette og konfigurere nye leietakere (kommuner)
- Kan håndtere globale innstillinger og systemkonfigurasjoner
- Har tilgang til alle logger og overvåkningsdata

### Leietakaradministrator
- Har tilgang til å administrere innstillinger for sin leietaker (kommune)
- Kan håndtere maler, kategorier og betingelser for sin leietaker
- Har tilgang til tilgangsstyring for sine områder
- Kan ikke påvirke andre leietakere eller globale innstillinger

### Tilgangskontroll
- Innlogging kreves for all administrasjon
- Rettigheter styres per rolle og leietaker
- Skjermet tilgang til sensitive funksjoner

## 3. User flows

### Administrere maler (liste, opprette, redigere, arkivere)
- Bruker navigerer til "Maler" i administrasjonspanelet
- System viser liste over eksisterende maler med søk og filtrering
- Bruker kan opprette ny mal ved å klikke "Ny mal"-knapp
- Bruker fyller ut malinformasjon og konfigurerer innstillinger
- Bruker kan redigere eksisterende mal ved å klikke redigeringsikon
- Bruker kan arkivere mal ved å velge fra handlingsmeny og bekrefte

### Administrere kategorier (opprette, sortere, slå sammen)
- Bruker navigerer til "Kategorier" i administrasjonspanelet
- System viser hierarkisk liste over eksisterende kategorier
- Bruker kan opprette ny kategori ved å klikke "Ny kategori"-knapp
- Bruker kan endre rekkefølge ved dra og slipp eller opp/ned-piler
- Bruker kan slå sammen kategorier ved å velge fra handlingsmeny
- System spør om bekreftelse før sammenslåing med mulige konsekvenser

### Leietakere/kommuner (opprette, konfigurere profil, språk, branding-peker)
- Bruker navigerer til "Leietakere" i administrasjonspanelet
- System viser liste over eksisterende leietakere
- Bruker kan opprette ny leietaker ved å klikke "Ny leietaker"-knapp
- Bruker fyller ut leietakerinformasjon (navn, kontakt, konfigurasjon)
- Bruker kan konfigurere språkinnstillinger og språkpreferanser
- Bruker kan angi peker til egen branding og designsystem
- Bruker kan aktivere/deaktivere leietaker

### Betingelser (vilkår per skjema/tenant)
- Bruker navigerer til "Betingelser" i administrasjonspanelet
- System viser liste over eksisterende betingelser
- Bruker kan opprette ny betingelse ved å klikke "Ny betingelse"-knapp
- Bruker velger type betingelse (skjema-spesifikk eller leietaker-spesifikk)
- Bruker konfigurerer betingelsesregler i lesbart format
- Bruker kan knytte betingelser til spesifikke skjema eller leietakere
- System viser oversikt over hvilke betingelser som er aktivert

### Tilgangsstyring (roller, rettigheter per område)
- Bruker navigerer til "Tilgangsstyring" i administrasjonspanelet
- System viser liste over eksisterende roller og brukere
- Bruker kan opprette ny rolle ved å klikke "Ny rolle"-knapp
- Bruker konfigurerer rettigheter for rollen (lese, skrive, slette)
- Bruker kan tildele roller til brukere
- Bruker kan knytte rettigheter til spesifikke områder eller skjema
- System logger alle endringer i tilgangsstyring

## 4. UI requirements

### Admin-oversikt med underseksjoner
- Oversiktsside med kortbasert navigasjon til underseksjoner
- Kortene viser antall elementer og siste aktivitet
- Klar visning av hvilken seksjon som er aktiv
- Hurtigtilgang til vanlige handlinger

### Tabell-visning med bulk actions
- Responsive tabeller med søk og filtrering
- Kolonner kan sorteres ved å klikke på overskrifter
- Velge enkeltelementer eller alle med sjekkboks
- Bulk-handlinger tilgjengelig fra handlingsmeny
- Paginering for store datasett

### Bekreftelsesdialoger for destruktive handlinger
- Modalvindu med tydelig advarsel for sletting og arkivering
- Oversikt over konsekvenser av handlingen
- Knapp for å bekrefte eller avbryte
- Tilbakemelding etter utført handling

### Klare tomtilstander
- Tomme lister viser hjelpende meldinger og opprettelsesknapp
- Filtre viser melding om ingen treff
- Søk uten treff viser forslag til alternative søk
- Velkomstområde for nye administratorer

## 5. States + Accessibility

### Loading states
- Lasteindikator ved lasting av data
- Skeletons ved lasting av lister
- Klare meldinger ved handlinger

### Error states
- Klare feilmeldinger ved feil i handlinger
- Visuell markering av feilende felt
- Hjelpetekster for feilretting

### Accessibility
- Tastaturnavigasjon støttet for alle funksjoner
- Skjermleserstøtte for alle elementer
- Fokusindikatorer for alle interaktive elementer
- ARIA-attributter for komplekse komponenter
- Kontrast i henhold til WCAG 2.1 AA

## 6. Out of scope

- Avansert brukerprofilering og analyser
- Ekstern API-integrasjon for tilgangsstyring
- Automatisert tilgangsrevurdering og justering
- Avansert logganalyse og rapportering
- Integrasjon med eksterne identitetsleverandører