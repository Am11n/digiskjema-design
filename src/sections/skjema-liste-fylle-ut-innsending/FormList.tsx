import { FormList as FormListComponent } from './components/FormList';

// Sample data directly in the component
const sampleData = {
  forms: [
    {
      id: "skjema-001",
      title: "Søknad om barnehageplass",
      description: "Søk om plass i barnehage for barn mellom 1-6 år",
      categoryId: "barnehage",
      requiresLogin: true,
      status: "published" as const,
      targetAudience: "Familier med barn",
      language: "nb",
      createdAt: "2025-11-15T09:30:00.000Z",
      updatedAt: "2025-12-01T14:22:00.000Z",
      deadline: "2026-04-30T23:59:59.000Z",
      estimatedTime: 15,
      hasAttachments: true,
      requiresPayment: false
    },
    {
      id: "skjema-002",
      title: "Melde fra om flytting",
      description: "Melde adresseendring til Folkeregisteret",
      categoryId: "folkeregister",
      requiresLogin: true,
      status: "published" as const,
      targetAudience: "Privatpersoner",
      language: "nb",
      createdAt: "2025-10-20T11:15:00.000Z",
      updatedAt: "2025-11-25T16:45:00.000Z",
      deadline: null,
      estimatedTime: 5,
      hasAttachments: false,
      requiresPayment: false
    },
    {
      id: "skjema-003",
      title: "Søknad om byggetillatelse",
      description: "Søk om tillatelse til bygging eller ombygging",
      categoryId: "bygging",
      requiresLogin: true,
      status: "published" as const,
      targetAudience: "Eiere og byggherrer",
      language: "nb",
      createdAt: "2025-09-05T13:45:00.000Z",
      updatedAt: "2025-12-10T10:30:00.000Z",
      deadline: "2026-03-31T23:59:59.000Z",
      estimatedTime: 45,
      hasAttachments: true,
      requiresPayment: true
    },
    {
      id: "skjema-004",
      title: "Søknad om stipend",
      description: "Stipendsøknad for studenter og forskere",
      categoryId: "utdanning",
      requiresLogin: true,
      status: "published" as const,
      targetAudience: "Studenter",
      language: "nb",
      createdAt: "2025-12-01T08:20:00.000Z",
      updatedAt: "2025-12-15T15:10:00.000Z",
      deadline: "2026-02-15T23:59:59.000Z",
      estimatedTime: 30,
      hasAttachments: true,
      requiresPayment: false
    },
    {
      id: "skjema-005",
      title: "Klage på eksamensresultat",
      description: "Klage på karakter eller eksamensvurdering",
      categoryId: "utdanning",
      requiresLogin: true,
      status: "published" as const,
      targetAudience: "Studenter",
      language: "nb",
      createdAt: "2025-11-10T12:30:00.000Z",
      updatedAt: "2025-11-30T09:45:00.000Z",
      deadline: "2026-01-31T23:59:59.000Z",
      estimatedTime: 20,
      hasAttachments: true,
      requiresPayment: false
    },
    {
      id: "skjema-006",
      title: "Bestill skattemelding",
      description: "Bestill ekstra eksemplar av skattemelding",
      categoryId: "skatt",
      requiresLogin: true,
      status: "draft" as const,
      targetAudience: "Privatpersoner",
      language: "nb",
      createdAt: "2025-12-15T14:00:00.000Z",
      updatedAt: "2025-12-15T14:00:00.000Z",
      deadline: null,
      estimatedTime: 3,
      hasAttachments: false,
      requiresPayment: false
    },
    {
      id: "skjema-007",
      title: "Søknad om midler til idrettslag",
      description: "Søk om økonomisk støtte til idrettsaktiviteter",
      categoryId: "idrett",
      requiresLogin: false,
      status: "published" as const,
      targetAudience: "Idrettslag og foreninger",
      language: "nb",
      createdAt: "2025-08-20T16:15:00.000Z",
      updatedAt: "2025-12-05T11:20:00.000Z",
      deadline: "2026-03-15T23:59:59.000Z",
      estimatedTime: 25,
      hasAttachments: true,
      requiresPayment: false
    },
    {
      id: "skjema-008",
      title: "Anmeldelse av vold",
      description: "Anmeld voldshandlinger til politiet",
      categoryId: "trygghet",
      requiresLogin: false,
      status: "published" as const,
      targetAudience: "Offre og vitner",
      language: "nb",
      createdAt: "2025-10-01T10:00:00.000Z",
      updatedAt: "2025-11-20T13:30:00.000Z",
      deadline: null,
      estimatedTime: 35,
      hasAttachments: true,
      requiresPayment: false
    }
  ],
  categories: [
    {
      id: "barnehage",
      name: "Barnehage",
      description: "Søknader og meldinger knyttet til barnehageplasser",
      color: "#3B82F6",
      order: 1
    },
    {
      id: "folkeregister",
      name: "Folkeregister",
      description: "Adresseendringer og andre folkeregistermeldinger",
      color: "#10B981",
      order: 2
    },
    {
      id: "bygging",
      name: "Bygging",
      description: "Byggetillatelser og byggemeldinger",
      color: "#F59E0B",
      order: 3
    },
    {
      id: "utdanning",
      name: "Utdanning",
      description: "Søknader og klager knyttet til utdanning",
      color: "#8B5CF6",
      order: 4
    },
    {
      id: "skatt",
      name: "Skatt",
      description: "Skatteknyttede skjema og bestillinger",
      color: "#EF4444",
      order: 5
    }
  ],
  user: {
    authenticatedUser: {
      id: "user-001",
      name: "Kari Nordmann",
      email: "kari.nordmann@example.com",
      authProvider: "idporten" as const,
      externalId: "12345678901",
      roles: ["user"],
      profile: {
        phone: "+47 12345678",
        address: "Hovedgata 12, 0123 Oslo"
      },
      preferences: {
        language: "nb",
        notifications: true,
        emailUpdates: true
      }
    }
  }
};

export function FormList() {
  const { forms, categories, user } = sampleData;

  const handleOpen = (formId: string) => {
    console.log('Opening form:', formId);
    // In a real app, this would navigate to the form fill page
  };

  const handleFilterChange = (filters: { category?: string; search?: string }) => {
    console.log('Filtering with:', filters);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
        Skjemaoversikt
      </h1>
      
      <FormListComponent
        forms={forms}
        categories={categories}
        onOpen={handleOpen}
        onFilterChange={handleFilterChange}
        currentUser={user.authenticatedUser}
      />
    </div>
  );
}

export default FormList;