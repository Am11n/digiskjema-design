# Data Model

## Entities

### Tenant
Representerer en kommune eller organisasjon som leietaker av systemet. Inneholder konfigurasjon og metadata for tenant-spesifikke innstillinger.

### User
Representerer en bruker i systemet, enten en innbygger som fyller ut skjema eller en kommunal ansatt som administrerer systemet. Kan være autentisert via ID-porten, D-nummer eller lokal autentisering.

### Form
Representerer et skjema som kan opprettes, redigeres og publiseres. Inneholder skjemakonfigurasjon, metadata og versjonering.

### FormVersion
Representerer en versjon av et skjema. Holder styr på endringer og historikk for skjemaoppsett.

### FormSubmission
Representerer en innsendt skjemabesvarelse. Inneholder utfylt data, metadata og statusinformasjon.

### Category
Representerer kategorier for organisering av skjema. Brukes til å gruppere relaterte skjema for bedre navigasjon og søk.

### Template
Representerer gjenbrukbare maler for skjema. Kan være globale maler eller tenant-spesifikke maler som basis for nye skjema.

### Role
Representerer roller som definerer tillatelser og tilgangsnivåer for brukere i systemet.

### AuditLog
Representerer revisjonslogger som holder styr på alle handlinger og endringer i systemet for sikkerhet og compliance.

## Relationships

- Tenant has many Users
- Tenant has many Forms
- Tenant has many Categories
- Tenant has many Templates
- User has many Roles
- Form has many FormVersions
- Form has many FormSubmissions
- Form belongs to Category
- Form belongs to Template
- User has many AuditLogs
- Tenant has many AuditLogs