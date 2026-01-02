import { TenantsList as TenantsListComponent } from './components/TenantsList';

// Sample data directly in the component
const sampleData = [
  {
    id: "tenant-001",
    name: "Oslo kommune",
    subdomain: "oslo",
    status: "active" as const,
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
    status: "active" as const,
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
  },
  {
    id: "tenant-003",
    name: "Trondheim kommune",
    subdomain: "trondheim",
    status: "active" as const,
    configuration: {
      branding: {
        logoUrl: "https://example.com/trondheim-logo.png",
        primaryColor: "#006633",
        secondaryColor: "#e6e6e6"
      },
      language: {
        default: "nb",
        available: ["nb", "en"]
      },
      contact: {
        email: "postmottak@trondheim.kommune.no",
        phone: "+47 73 55 73 55"
      }
    },
    createdAt: "2025-03-10T11:30:00.000Z",
    updatedAt: "2025-10-10T09:30:00.000Z",
    createdBy: "admin-001"
  },
  {
    id: "tenant-004",
    name: "Stavanger kommune",
    subdomain: "stavanger",
    status: "suspended" as const,
    configuration: {
      branding: {
        logoUrl: "https://example.com/stavanger-logo.png",
        primaryColor: "#e52038",
        secondaryColor: "#f0f0f0"
      },
      language: {
        default: "nb",
        available: ["nb", "en"]
      },
      contact: {
        email: "post@stavanger.kommune.no",
        phone: "+47 51 50 70 00"
      }
    },
    createdAt: "2025-04-05T12:45:00.000Z",
    updatedAt: "2025-09-15T14:20:00.000Z",
    createdBy: "admin-003"
  }
];

export function TenantsList() {
  const tenants = sampleData;

  const handleEdit = (tenantId: string) => {
    console.log('Editing tenant:', tenantId);
  };

  const handleDelete = (tenantId: string) => {
    console.log('Deleting tenant:', tenantId);
  };

  const handleActivate = (tenantId: string) => {
    console.log('Activating tenant:', tenantId);
  };

  const handleSuspend = (tenantId: string) => {
    console.log('Suspending tenant:', tenantId);
  };

  const handleCreate = () => {
    console.log('Creating new tenant');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <TenantsListComponent
        tenants={tenants}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onActivate={handleActivate}
        onSuspend={handleSuspend}
        onCreate={handleCreate}
      />
    </div>
  );
}

export default TenantsList;