import { AdminOverview as AdminOverviewComponent } from './components/AdminOverview';

// Sample data directly in the component
const sampleData = {
  templates: [
    {
      id: "tmpl-001",
      name: "Standard søknad",
      description: "Mal for enkeltsøknader med personopplysninger",
      type: "application",
      status: "active",
      createdAt: "2025-11-15T09:30:00.000Z",
      updatedAt: "2025-12-01T14:22:00.000Z",
      createdBy: "admin-001"
    },
    {
      id: "tmpl-002",
      name: "Anmeldelse",
      description: "Mal for anmeldelser og rapportering",
      type: "report",
      status: "active",
      createdAt: "2025-10-20T11:15:00.000Z",
      updatedAt: "2025-11-25T16:45:00.000Z",
      createdBy: "admin-002"
    }
  ],
  categories: [
    {
      id: "cat-001",
      name: "Barnehage",
      description: "Søknader og meldinger knyttet til barnehageplasser",
      color: "#3B82F6",
      order: 1,
      parentId: null
    },
    {
      id: "cat-002",
      name: "Folkeregister",
      description: "Adresseendringer og andre folkeregistermeldinger",
      color: "#10B981",
      order: 2,
      parentId: null
    }
  ],
  tenants: [
    {
      id: "tenant-001",
      name: "Oslo kommune",
      subdomain: "oslo",
      status: "active",
      configuration: {
        branding: {
          logoUrl: "https://example.com/oslo-logo.png",
          primaryColor: "#0062ba",
          secondaryColor: "#f0f0f0"
        },
        language: {
          default: "nb",
          available: ["nb", "en"]
        },
        contact: {
          email: "info@oslo.kommune.no",
          phone: "+47 22 11 10 00"
        }
      },
      createdAt: "2025-01-15T09:00:00.000Z",
      updatedAt: "2025-12-01T14:22:00.000Z",
      createdBy: "admin-001"
    },
    {
      id: "tenant-002",
      name: "Bergen kommune",
      subdomain: "bergen",
      status: "active",
      configuration: {
        branding: {
          logoUrl: "https://example.com/bergen-logo.png",
          primaryColor: "#007bc0",
          secondaryColor: "#f5f5f5"
        },
        language: {
          default: "nb",
          available: ["nb", "en", "nn"]
        },
        contact: {
          email: "post@bergen.kommune.no",
          phone: "+47 55 55 10 00"
        }
      },
      createdAt: "2025-02-20T10:15:00.000Z",
      updatedAt: "2025-11-25T16:45:00.000Z",
      createdBy: "admin-002"
    }
  ],
  roles: [
    {
      id: "role-001",
      name: "Systemadministrator",
      description: "Full tilgang til alle funksjoner i systemet",
      level: "system",
      permissions: [
        "system:manage_tenants",
        "system:manage_users",
        "system:manage_roles",
        "system:manage_templates"
      ],
      createdAt: "2025-01-15T09:00:00.000Z",
      updatedAt: "2025-01-15T09:00:00.000Z",
      createdBy: "admin-001"
    },
    {
      id: "role-002",
      name: "Leietakaradministrator",
      description: "Administratorrettigheter for en spesifikk leietaker",
      level: "tenant",
      permissions: [
        "tenant:manage_forms",
        "tenant:manage_templates",
        "tenant:manage_categories"
      ],
      createdAt: "2025-01-15T09:00:00.000Z",
      updatedAt: "2025-01-15T09:00:00.000Z",
      createdBy: "admin-001"
    }
  ]
};

export function AdminOverview() {
  const { templates, categories, tenants, roles } = sampleData;

  const handleNavigate = (section: string) => {
    console.log('Navigating to section:', section);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <AdminOverviewComponent
        templates={templates}
        categories={categories}
        tenants={tenants}
        roles={roles}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default AdminOverview;