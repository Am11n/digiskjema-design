# Digdir Design System Integration

Dette produktet følger [designsystemet.no](https://www.designsystemet.no) (Digdir Design System) retningslinjer.

## Installasjon

Digdir Design System pakken er installert og aktivert:

- **Pakke**: `@digdir/designsystemet-css` (versjon 1.9.0)
- **Status**: ✅ Installert og aktivert i `src/index.css`

## Aktivering

Digdir Design System er aktivert i `src/index.css`:

```css
@import "@digdir/designsystemet-css";
```

De offisielle Digdir tokens vil nå overstyre fallback-verdiene automatisk.

## Fallback Tokens

Hvis Digdir Design System pakken ikke er installert, bruker komponentene fallback-verdier definert i `src/index.css`. Disse fallback-verdiene matcher Digdir Design System tokens så nært som mulig.

## Brukte Tokens

### Farger
- `--fds-blue-60`: Primær handling (#0066cc)
- `--fds-blue-70`: Primær hover (#00315d)
- `--fds-blue-50`: Primær lys (#e7f3fa)
- `--fds-green-60`: Suksess (#068400)
- `--fds-red-60`: Fare (#d8000c)
- `--fds-yellow-50`: Advarsel (#f2c402)
- `--fds-gray-50`: Bakgrunn (#f0f0f0)
- `--fds-gray-100`: Subtle (#f7f7f7)
- `--fds-gray-200`: Borders (#dbdbdc)
- `--fds-text-default`: Standard tekst (#1f2021)
- `--fds-text-subtle`: Subtle tekst (#717274)

### Typografi
- `--fds-font-family`: System font stack
- `--fds-font-size-xs` til `--fds-font-size-3xl`: Font størrelser
- `--fds-font-weight-regular`, `--fds-font-weight-medium`, `--fds-font-weight-bold`, `--fds-font-weight-extrabold`: Font weights

### Spacing
- `--fds-spacing-xxs` til `--fds-spacing-4xl`: Spacing verdier

### Border Radius
- `--fds-border-radius-sm` til `--fds-border-radius-full`: Border radius verdier

### Shadows
- `--fds-shadow-sm` til `--fds-shadow-xl`: Skygge verdier

## Oppdaterte Komponenter

Følgende komponenter er oppdatert til å bruke Digdir tokens:

### Shell Komponenter
- `src/shell/components/AppShell.tsx` - Fullstendig oppdatert med Digdir tokens
- `src/shell/components/UserMenu.tsx` - Oppdatert med Digdir tokens

### UI Komponenter (Design System)
- `src/components/ui/button.tsx` - Bruker Digdir farger og tokens
- `src/components/ui/card.tsx` - Oppdatert med Digdir tokens
- `src/components/ui/input.tsx` - Bruker Digdir border og focus tokens
- `src/components/ui/badge.tsx` - Oppdatert med Digdir farger
- `src/components/ui/label.tsx` - Bruker Digdir typografi tokens
- `src/components/ui/separator.tsx` - Bruker Digdir border tokens
- `src/components/ui/dropdown-menu.tsx` - Oppdatert med Digdir tokens

### Section Komponenter
- `src/sections/skjema-liste-fylle-ut-innsending/components/FormList.tsx` - Fullstendig oppdatert
- `src/sections/skjema-liste-fylle-ut-innsending/components/FormFill.tsx` - Oppdatert med Digdir tokens
- `src/sections/skjema-liste-fylle-ut-innsending/components/Receipt.tsx` - Oppdatert med Digdir tokens
- `src/sections/innsikt-analyser-tilgjengelighet-spr-k/components/InsightsDashboard.tsx` - Oppdatert med Digdir tokens

### Andre Komponenter
Flere andre komponenter bruker nå Digdir tokens via de oppdaterte UI-komponentene.

## Design System Filer

Design system-filene i `product/design-system/` er oppdatert til å dokumentere Digdir tokens:

- `colors.json`: Dokumenterer Digdir farge tokens
- `typography.json`: Dokumenterer Digdir typografi tokens

## Mer Informasjon

Se [designsystemet.no](https://www.designsystemet.no) for full dokumentasjon av alle tilgjengelige tokens og komponenter.
