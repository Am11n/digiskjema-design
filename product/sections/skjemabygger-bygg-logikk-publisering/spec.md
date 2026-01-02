# Skjemabygger - Spesifikasjon

## 1. Overview

Skjemabyggeren gir administratorer og skjemaredaktører mulighet til å opprette, redigere og publisere skjema uten teknisk kunnskap. Løsningen støtter både enkle og komplekse skjema med logikk, validering og betingede felt. Brukergrensesnittet er intuitivt med dra-og-slipp-funksjonalitet og visuell redigering.

## 2. Primærbruker (admin/editor) og tilgang

### Skjemaredaktør
- Har rettigheter til å opprette og redigere skjema
- Kan legge til og fjerne felt, logikk og validering
- Kan forhåndsvise og teste skjema før publisering
- Har tilgang til versjonshistorikk

### Systemadministrator
- Har full tilgang til alle skjema og funksjoner
- Kan håndtere brukerrettigheter og tilgangsnivåer
- Kan overstyre publisering og versjonskontroll
- Har tilgang til avanserte konfigurasjonsinnstillinger

### Tilgangskontroll
- Innlogging kreves for all redigering
- Rettigheter styres per skjema eller skjemakategori
- Skjema kan være tilgjengelig for spesifikke brukere eller roller

## 3. User flows

### Opprette nytt skjema fra blank/mal
- Bruker velger "Nytt skjema" fra hovedmenyen
- System viser valg mellom "Start fra bunnen av" eller "Bruk mal"
- Hvis mal valgt: Bruker velger fra tilgjengelige maler
- Hvis blankt: System oppretter tomt skjema med standardinnstillinger
- Skjema åpnes i byggermodus med tomt canvas

### Legge til komponenter (felt, grupper, vedlegg, signering)
- Bruker velger komponent fra komponentbibliotek (venstre panel)
- Komponenten vises som forhåndsvisning ved dra og slipp til canvas
- Egenskaper for komponenten vises i høyre panel
- Bruker fyller inn nødvendige egenskaper (spørsmål, hjelpetekst, validering)
- Komponenten legges til i skjemastruktur

### Endre rekkefølge (drag/drop beskrevet)
- Bruker klikker og holder inne en komponent i canvas
- Komponenten kan flyttes opp eller ned i skjemaet ved å dra den
- Plassering vises med horisontal linje for hvor komponenten vil bli plassert
- Når sluppet, oppdateres rekkefølgen umiddelbart
- Endring reflekteres i canvas og strukturvisning

### Validering (påkrevd, format, intervall)
- Bruker velger felt og går til valideringsinnstillinger
- System viser valg for valideringstype (påkrevd, e-postformat, tallintervall osv.)
- Bruker konfigurerer valideringsregler i lesbart format
- System viser forhåndsvisning av feilmelding
- Validering testes i forhåndsvisningsmodus

### Betinget logikk (vis/skjul, beregning, enable/disable)
- Bruker velger felt og går til logikkinnstillinger
- System viser meny for å legge til betingelse
- Bruker velger triggerfelt og betingelse (f.eks. "hvis spørsmål A = ja")
- Bruker velger handling (vis/skjul/fjern felt, sett verdi, aktiver/deaktiver felt)
- System viser logikken i lesbart format: "Hvis [felt] [betingelse] så [handling]"
- Logikk testes i forhåndsvisningsmodus

### Forhåndsvis
- Bruker klikker "Forhåndsvis" fra verktøylinjen
- System åpner skjema i lesemodus i ny fane eller sidepanel
- Alle logikk og validering aktiveres i forhåndsvisning
- Bruker kan utfylle skjema som sluttbruker for testing
- Tilbakeknapp sender bruker til byggermodus

### Versjonering (draft/published)
- System viser nåværende versjon og status (kladd/publisert)
- Når endringer lagres, opprettes ny kladd-versjon
- Bruker kan se endringshistorikk og sammenligne versjoner
- Gamle versjoner er tilgjengelige for gjenoppretting
- Publisering oppretter ny publisert versjon og arkiverer tidligere

### Publisering (miljø, gyldighet, språk)
- Bruker velger "Publiser" fra verktøylinjen
- System viser bekreftelsesdialog med detaljer om publisering
- Bruker kan velge gyldighetsdato og -periode
- Bruker kan velge hvilke språk som skal være tilgjengelige
- System publiserer skjema og gjør det tilgjengelig for sluttbrukere
- Publisering logger tidspunkt, bruker og versjonsnummer

## 4. UI requirements

### 3-panel builder (komponentbibliotek, canvas, properties)
- Venstre panel: Komponentbibliotek med kategoriserte felttyper
- Midtseksjon: Canvas med dra-og-slipp-redigering og visuell struktur
- Høyre panel: Egenskaper og innstillinger for valgt komponent
- Paneler kan sammenfoldes for mer canvas-plass

### Toolbar (undo/redo, preview, publish)
- Verktøylinje øverst med standardhandlinger
- Undo/redo-knapper for angre/gjøre om endringer
- Forhåndsvisningsknapp for testing av skjema
- Publiser-knapp for å gjøre skjema tilgjengelig
- Lagre-knapp for å lagre kladd

### Logikk-editor (lesbar, ikke "kodeaktig")
- Visuell logikkeditor med lesbare setninger
- Ikke-kodedreven konfigurasjon med menyer og valg
- Klar visning av betingelser og handlinger
- Mulighet for å legge til flere betingelser i samme regel

### Klare tomtilstander
- Tom canvas viser hjelpende instruksjoner og malvalg
- Tomt komponentbibliotek vises ikke, men er tilgjengelig
- Tom egenskapsvisning med informasjon om å velge komponent
- Velkomstskjerm med nylige skjema og opprettningsalternativer

## 5. States + Accessibility

### Loading states
- Lasteindikator ved lasting av skjema og bibliotek
- Skeletons ved lasting av komponenter
- Klare meldinger ved handlinger

### Error states
- Klare feilmeldinger ved feil i logikk eller validering
- Visuell markering av feilende komponenter
- Hjelpetekster for feilretting

### Accessibility
- Tastaturnavigasjon støttet for alle funksjoner
- Skjermleserstøtte for alle elementer
- Fokusindikatorer for alle interaktive elementer
- ARIA-attributter for komplekse komponenter
- Kontrast i henhold til WCAG 2.1 AA

## 6. Out of scope

- Avansert kodedreven logikk eller scripting
- Dynamisk datakobling til eksterne API-er i sanntid
- Workflow og arbeidsflyt mellom flere godkjennere
- PDF-generering og eksportfunksjoner
- Avansert rapportering og analyser av skjemadata