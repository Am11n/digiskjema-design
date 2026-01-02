import { TemplatesList as TemplatesListComponent } from './components/TemplatesList';

// Sample data directly in the component
const sampleData = [
  {
    id: "tmpl-001",
    name: "Standard søknad",
    description: "Mal for enkeltsøknader med personopplysninger",
    type: "application",
    status: "active" as const,
    createdAt: "2025-11-15T09:30:00.000Z",
    updatedAt: "2025-12-01T14:22:00.000Z",
    createdBy: "admin-001",
    fields: [
      {
        id: "field-001",
        type: "text",
        label: "Fullt navn",
        required: true,
        validation: ["required"]
      },
      {
        id: "field-002",
        type: "email",
        label: "E-postadresse",
        required: true,
        validation: ["required", "email"]
      }
    ]
  },
  {
    id: "tmpl-002",
    name: "Anmeldelse",
    description: "Mal for anmeldelser og rapportering",
    type: "report",
    status: "active" as const,
    createdAt: "2025-10-20T11:15:00.000Z",
    updatedAt: "2025-11-25T16:45:00.000Z",
    createdBy: "admin-002",
    fields: [
      {
        id: "field-003",
        type: "textarea",
        label: "Beskrivelse",
        required: true,
        validation: ["required", "minLength:10"]
      },
      {
        id: "field-004",
        type: "date",
        label: "Dato for hendelse",
        required: true,
        validation: ["required", "date"]
      }
    ]
  },
  {
    id: "tmpl-003",
    name: "Klage",
    description: "Mal for klager på tjenester",
    type: "appeal",
    status: "active" as const,
    createdAt: "2025-09-05T13:45:00.000Z",
    updatedAt: "2025-12-10T10:30:00.000Z",
    createdBy: "admin-003",
    fields: [
      {
        id: "field-005",
        type: "select",
        label: "Klasse",
        required: true,
        options: [
          { "value": "service", "label": "Service" },
          { "value": "response", "label": "Respons" },
          { "value": "other", "label": "Annet" }
        ],
        validation: ["required"]
      }
    ]
  },
  {
    id: "tmpl-004",
    name: "Tilbakemelding",
    description: "Mal for brukertilbakemeldinger",
    type: "feedback",
    status: "active" as const,
    createdAt: "2025-12-01T08:20:00.000Z",
    updatedAt: "2025-12-15T15:10:00.000Z",
    createdBy: "admin-001",
    fields: [
      {
        id: "field-006",
        type: "number",
        label: "Tilfredshet (1-5)",
        required: true,
        validation: ["required", "min:1", "max:5"]
      }
    ]
  },
  {
    id: "tmpl-005",
    name: "Bestilling",
    description: "Mal for bestillinger av tjenester",
    type: "order",
    status: "archived" as const,
    createdAt: "2025-11-10T12:30:00.000Z",
    updatedAt: "2025-11-30T09:45:00.000Z",
    createdBy: "admin-002",
    fields: [
      {
        id: "field-007",
        type: "text",
        label: "Tjeneste",
        required: true,
        validation: ["required"]
      },
      {
        id: "field-008",
        type: "date",
        label: "Ønsket dato",
        required: true,
        validation: ["required", "date"]
      }
    ]
  },
  {
    id: "tmpl-006",
    name: "Registrering",
    description: "Mal for registrering av ny bruker",
    type: "registration",
    status: "active" as const,
    createdAt: "2025-12-15T14:00:00.000Z",
    updatedAt: "2025-12-15T14:00:00.000Z",
    createdBy: "admin-003",
    fields: [
      {
        id: "field-009",
        type: "text",
        label: "Firmanavn",
        required: true,
        validation: ["required"]
      },
      {
        id: "field-010",
        type: "text",
        label: "Organisasjonsnummer",
        required: true,
        validation: ["required", "orgNumber"]
      }
    ]
  }
];

export function TemplatesList() {
  const templates = sampleData;

  const handleEdit = (templateId: string) => {
    console.log('Editing template:', templateId);
  };

  const handleDelete = (templateId: string) => {
    console.log('Deleting template:', templateId);
  };

  const handleArchive = (templateId: string) => {
    console.log('Archiving template:', templateId);
  };

  const handleCreate = () => {
    console.log('Creating new template');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <TemplatesListComponent
        templates={templates}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onArchive={handleArchive}
        onCreate={handleCreate}
      />
    </div>
  );
}

export default TemplatesList;