# Data Model: Digiskjema

## Domener og entiteter

### Hoveddomener
- **Tenancy**: Tenant, TenantConfiguration
- **Skjema**: Form, FormVersion, FormTemplate, FormCategory
- **Bruk**: FormSubmission, FormData, FormSession
- **Sikkerhet**: User, Role, Permission, AccessControl
- **Administrasjon**: Category, Template, AuditLog
- **Innsikt**: Analytics, UsageStatistics

### Nøkkelentiteter
- Tenant (leietaker/kommune)
- Form (skjema)
- FormVersion (skjemaversjon)
- FormSubmission (skjemainnsending)
- User (bruker)
- Role (rolle)
- Permission (tillatelse)
- AuditLog (revisjonslogg)
- Category (kategori)
- Template (mal)

## ERD i tekstform (tabell/relasjoner)

### Tenant
- tenantId (PK, UUID)
- name (string)
- subdomain (string)
- configuration (JSON)
- status (enum: active, suspended, deleted)
- createdDate (timestamp)
- updatedDate (timestamp)
- createdBy (string)
- updatedBy (string)

### User
- userId (PK, UUID)
- tenantId (FK, UUID)
- email (string)
- name (string)
- externalId (string) - for ID-porten/D-nummer
- authProvider (enum: idporten, dnumber, local)
- roles (array of strings)
- status (enum: active, inactive, suspended)
- createdDate (timestamp)
- updatedDate (timestamp)
- createdBy (string)
- updatedBy (string)

### Role
- roleId (PK, UUID)
- tenantId (FK, UUID)
- name (string)
- description (string)
- permissions (array of strings)
- scope (enum: tenant, form, global)
- createdDate (timestamp)
- updatedDate (timestamp)
- createdBy (string)
- updatedBy (string)

### Form
- formId (PK, UUID)
- tenantId (FK, UUID)
- name (string)
- description (string)
- categoryId (FK, UUID)
- templateId (FK, UUID, nullable)
- status (enum: draft, test, published, archived)
- configuration (JSON)
- createdDate (timestamp)
- updatedDate (timestamp)
- publishedDate (timestamp, nullable)
- createdBy (string)
- updatedBy (string)

### FormVersion
- versionId (PK, UUID)
- formId (FK, UUID)
- versionNumber (integer)
- configuration (JSON)
- createdDate (timestamp)
- createdBy (string)
- isPublished (boolean)

### FormSubmission
- submissionId (PK, UUID)
- formId (FK, UUID)
- tenantId (FK, UUID)
- userId (FK, UUID, nullable) - null for anonyme innsendinger
- formData (JSON)
- status (enum: received, processed, archived)
- submittedDate (timestamp)
- processedDate (timestamp, nullable)

### Category
- categoryId (PK, UUID)
- tenantId (FK, UUID)
- name (string)
- description (string)
- sortOrder (integer)
- visibility (enum: public, internal, private)
- createdDate (timestamp)
- updatedDate (timestamp)
- createdBy (string)
- updatedBy (string)

### Template
- templateId (PK, UUID)
- tenantId (FK, UUID, nullable) - null for globale maler
- name (string)
- description (string)
- configuration (JSON)
- isGlobal (boolean)
- createdDate (timestamp)
- updatedDate (timestamp)
- createdBy (string)
- updatedBy (string)

### AuditLog
- logId (PK, UUID)
- tenantId (FK, UUID)
- userId (FK, UUID, nullable)
- action (string)
- entityType (string)
- entityId (string)
- oldValues (JSON, nullable)
- newValues (JSON, nullable)
- ipAddress (string)
- userAgent (string)
- timestamp (timestamp)

## Nøkkelrelasjoner og kardinalitet

- **Tenant - User**: One-to-Many (1:M) - En tenant kan ha mange brukere
- **Tenant - Form**: One-to-Many (1:M) - En tenant kan ha mange skjema
- **Tenant - Category**: One-to-Many (1:M) - En tenant kan ha mange kategorier
- **Tenant - Template**: One-to-Many (1:M) - En tenant kan ha mange maler (pluss globale)
- **User - Role**: Many-to-Many (M:N) via UserRole eller roller i brukerobjekt
- **Form - FormVersion**: One-to-Many (1:M) - Et skjema kan ha mange versjoner
- **Form - FormSubmission**: One-to-Many (1:M) - Et skjema kan ha mange innsendinger
- **Form - Category**: Many-to-One (M:1) - Mange skjema tilhører én kategori
- **Form - Template**: Many-to-One (M:1) - Mange skjema kan baseres på én mal
- **User - AuditLog**: One-to-Many (1:M) - En bruker kan ha mange loggføringer
- **Tenant - AuditLog**: One-to-Many (1:M) - En tenant kan ha mange loggføringer

## Multitenancy-modell (tenantId hvor relevant)

Alle relevante entiteter inkluderer `tenantId` felt for å sikre dataisolering:

- Form, FormSubmission, Category, Template, User, Role, AuditLog
- TenantId brukes som del av indekser for hurtig filtrering
- Databasenivå tilgangskontroll ved bruk av RLS (Row Level Security) eller applikasjonsnivå filtrering
- API-kall må alltid inneholde gyldig tenant-kontekst

## RBAC-modell (roller, permissions, scope)

### Roller
- **SystemAdministrator**: Full tilgang til systemet, opprettelse av tenants
- **TenantAdministrator**: Full tilgang til tenant, brukerhåndtering
- **FormDesigner**: Opprette og redigere skjema, publisere skjema
- **Saksbehandler**: Se og behandle innsendinger
- **ReadOnlyUser**: Se skjema og statistikk, men ikke endre

### Permissions
- **tenant:create**, **tenant:read**, **tenant:update**, **tenant:delete**
- **form:create**, **form:read**, **form:update**, **form:delete**
- **submission:read**, **submission:process**, **submission:archive**
- **user:create**, **user:read**, **user:update**, **user:delete**
- **role:assign**, **role:manage**
- **audit:read**, **configuration:manage**

### Scope
- **Global**: Gjelder for hele systemet (f.eks. SystemAdministrator)
- **Tenant**: Gjelder for en spesifikk tenant
- **Form**: Gjelder for et spesifikt skjema

## Audit logging felter (createdBy, updatedBy, osv.)

Alle entiteter som støtter endring har følgende felt:
- **createdBy**: Brukeridentifikator for den som opprettet
- **updatedBy**: Brukeridentifikator for den som sist oppdaterte
- **createdDate**: Tidspunkt for opprettelse
- **updatedDate**: Tidspunkt for siste oppdatering
- **version**: Versjonsnummer for sporing av endringer

AuditLog entitet har følgende felt:
- **userId**: Hvem utførte handlingen
- **action**: Hva ble gjort (CREATE, UPDATE, DELETE, READ)
- **entityType**: Hvilken type entitet ble påvirket
- **entityId**: Unik ID for den påvirkede entiteten
- **oldValues**: Verdier før endring (for UPDATE/DELETE)
- **newValues**: Verdier etter endring (for CREATE/UPDATE)
- **ipAddress**: IP-adresse fra hvilken handlingen ble utført
- **userAgent**: Informasjon om klientbrukeragent

## Datakontrakter (TypeScript interfaces eller JSON schema skisse)

### Tenant
```typescript
interface Tenant {
  tenantId: string;
  name: string;
  subdomain: string;
  configuration: Record<string, any>;
  status: 'active' | 'suspended' | 'deleted';
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
  updatedBy: string;
}
```

### Form
```typescript
interface Form {
  formId: string;
  tenantId: string;
  name: string;
  description: string;
  categoryId: string;
  templateId?: string;
  status: 'draft' | 'test' | 'published' | 'archived';
  configuration: FormConfiguration;
  createdDate: Date;
  updatedDate: Date;
  publishedDate?: Date;
  createdBy: string;
  updatedBy: string;
}
```

### FormConfiguration
```typescript
interface FormConfiguration {
  title: string;
  description: string;
  fields: FormField[];
  logic: ConditionalLogic[];
  validation: ValidationRule[];
  layout: LayoutConfiguration;
  accessibility: AccessibilitySettings;
  languages: LanguageConfiguration[];
}
```

### FormSubmission
```typescript
interface FormSubmission {
  submissionId: string;
  formId: string;
  tenantId: string;
  userId?: string;
  formData: Record<string, any>;
  status: 'received' | 'processed' | 'archived';
  submittedDate: Date;
  processedDate?: Date;
}
```

### User
```typescript
interface User {
  userId: string;
  tenantId: string;
  email: string;
  name: string;
  externalId?: string;
  authProvider: 'idporten' | 'dnumber' | 'local';
  roles: string[];
  status: 'active' | 'inactive' | 'suspended';
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
  updatedBy: string;
}
```

## Indekseringsbehov og søkefelter

### Nøkkelindekser
- **tenantId** på alle entiteter som er tenant-spesifikke (clustered index)
- **userId** på FormSubmission for hurtig brukeroppslag
- **formId** på FormSubmission for hurtig skjemaoppslag
- **createdDate** på FormSubmission for dato-basert filtrering
- **status** på FormSubmission for statusfiltrering
- **email** på User for hurtig brukeroppslag (unikt)
- **subdomain** på Tenant for hurtig tenant-identifikasjon (unikt)

### Søkeindekser
- **name** på Form med fulltekstindeks for søk i skjemanavn
- **description** på Form med fulltekstindeks
- **name** på Category med fulltekstindeks
- **name** på Template med fulltekstindeks

### Sammensatte indekser
- **(tenantId, status)** på Form for hurtig oppslag av skjema etter tenant og status
- **(tenantId, createdDate)** på FormSubmission for tidslinjevisning per tenant
- **(tenantId, userId, createdDate)** på AuditLog for brukeraktivitet per tenant
- **(formId, status, submittedDate)** på FormSubmission for skjemastatistikk