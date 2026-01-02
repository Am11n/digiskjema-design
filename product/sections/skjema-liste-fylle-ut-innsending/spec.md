# Skjema - Spesifikasjon

## Overview

Skjema-seksjonen gir brukere mulighet til å søke, finne, fylle ut og sende inn skjema. Løsningen støtter både anonym og innlogget tilgang med ID-porten/D-nummer, og sikrer tilgjengelighet og enkel utfylling med autosave og validering.

## User Flows

- Se skjema-liste (søk, filter, kategori)
- Åpne skjema (info, krav, frister)
- Fylle ut (autosave, validering, vedlegg)
- Innlogging ved behov (ID-porten)
- Forhåndsvis/sammendrag
- Innsending
- Kvittering (referansenummer, kopi/PDF, status)
- Fortsett senere (utkast)

## UI Requirements

- Listevisning (tabell desktop, kort mobil)
- Tydelige statusmerker (utkast, sendt, feilet, krever innlogging)
- Stegindikator i utfylling
- Fokus, feilmeldinger, hjelpetekst
- Bruk mønstre/komponenter som passer Digdir Designsystemet

## Configuration

- shell: true