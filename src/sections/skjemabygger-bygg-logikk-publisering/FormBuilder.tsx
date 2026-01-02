import { FormBuilder as FormBuilderComponent } from './components/FormBuilder';

// Sample data directly in the component
const sampleData = {
  schema: {
    id: "schema-001",
    name: "Kontakt oss skjema",
    description: "Enkelt skjema for å kontakte oss",
    version: "1.0.0",
    status: "published" as const,
    createdAt: "2025-11-15T09:30:00.000Z",
    updatedAt: "2025-12-01T14:22:00.000Z",
    publishedAt: "2025-12-01T14:22:00.000Z",
    components: [
      {
        id: "comp-001",
        type: "text",
        label: "Fullt navn",
        required: true,
        placeholder: "Skriv inn ditt fulle navn",
        validation: ["required"],
        position: 0
      },
      {
        id: "comp-002",
        type: "email",
        label: "E-postadresse",
        required: true,
        placeholder: "eksempel@domene.no",
        validation: ["required", "email"],
        position: 1
      },
      {
        id: "comp-003",
        type: "textarea",
        label: "Melding",
        required: true,
        placeholder: "Skriv din melding her...",
        validation: ["required", "minLength:10"],
        position: 2
      }
    ]
  },
  library: [
    {
      type: "text",
      name: "Tekstfelt",
      category: "input" as const,
      icon: "text",
      properties: {
        label: { type: "string", required: true },
        placeholder: { type: "string", required: false },
        required: { type: "boolean", required: false, default: false }
      }
    },
    {
      type: "email",
      name: "E-postfelt",
      category: "input" as const,
      icon: "email",
      properties: {
        label: { type: "string", required: true },
        placeholder: { type: "string", required: false },
        required: { type: "boolean", required: false, default: false }
      }
    },
    {
      type: "number",
      name: "Tallfelt",
      category: "input" as const,
      icon: "number",
      properties: {
        label: { type: "string", required: true },
        placeholder: { type: "string", required: false },
        required: { type: "boolean", required: false, default: false },
        min: { type: "number", required: false },
        max: { type: "number", required: false }
      }
    },
    {
      type: "date",
      name: "Dato",
      category: "input" as const,
      icon: "calendar",
      properties: {
        label: { type: "string", required: true },
        required: { type: "boolean", required: false, default: false }
      }
    },
    {
      type: "textarea",
      name: "Tekstområde",
      category: "input" as const,
      icon: "textarea",
      properties: {
        label: { type: "string", required: true },
        placeholder: { type: "string", required: false },
        required: { type: "boolean", required: false, default: false },
        rows: { type: "number", required: false, default: 4 }
      }
    },
    {
      type: "select",
      name: "Nedtrekksliste",
      category: "input" as const,
      icon: "select",
      properties: {
        label: { type: "string", required: true },
        required: { type: "boolean", required: false, default: false },
        options: { 
          type: "array", 
          items: {
            value: { type: "string" },
            label: { type: "string" }
          },
          required: true 
        }
      }
    },
    {
      type: "checkbox",
      name: "Avkrysningsboks",
      category: "input" as const,
      icon: "checkbox",
      properties: {
        label: { type: "string", required: true },
        required: { type: "boolean", required: false, default: false }
      }
    },
    {
      type: "file",
      name: "Filopplasting",
      category: "input" as const,
      icon: "upload",
      properties: {
        label: { type: "string", required: true },
        required: { type: "boolean", required: false, default: false },
        accept: { type: "string", required: false }
      }
    },
    {
      type: "group",
      name: "Gruppe",
      category: "layout" as const,
      icon: "folder",
      properties: {
        label: { type: "string", required: true },
        description: { type: "string", required: false }
      }
    },
    {
      type: "repeater",
      name: "Gjentakende gruppe",
      category: "layout" as const,
      icon: "repeat",
      properties: {
        label: { type: "string", required: true },
        minItems: { type: "number", required: false, default: 0 },
        maxItems: { type: "number", required: false }
      }
    }
  ]
};

export function FormBuilder() {
  const { schema, library } = sampleData;

  const handleAdd = (component: any) => {
    console.log('Adding component:', component);
  };

  const handleSelect = (componentId: string) => {
    console.log('Selecting component:', componentId);
  };

  const handleUpdate = (componentId: string, updates: any) => {
    console.log('Updating component:', componentId, updates);
  };

  const handleReorder = (sourceIndex: number, destinationIndex: number) => {
    console.log('Reordering components:', sourceIndex, destinationIndex);
  };

  const handlePreview = (schema: any) => {
    console.log('Previewing schema:', schema);
  };

  const handlePublish = (schemaId: string) => {
    console.log('Publishing schema:', schemaId);
  };

  return (
    <div className="h-screen flex flex-col">
      <FormBuilderComponent
        schema={schema}
        library={library}
        onAdd={handleAdd}
        onSelect={handleSelect}
        onUpdate={handleUpdate}
        onReorder={handleReorder}
        onPreview={handlePreview}
        onPublish={handlePublish}
      />
    </div>
  );
}

export default FormBuilder;