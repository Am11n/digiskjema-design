/**
 * TypeScript types for the Administrasjon section
 */

// Template types
export interface ITemplateField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  validation: string[];
  options?: Array<{ value: string; label: string }>;
}

export interface ITemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'active' | 'archived' | 'draft';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  fields: ITemplateField[];
}

// Category types
export interface ICategory {
  id: string;
  name: string;
  description: string;
  color: string;
  order: number;
  parentId: string | null;
}

// Tenant types
export interface ITenantBranding {
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface ITenantLanguage {
  default: string;
  available: string[];
}

export interface ITenantContact {
  email: string;
  phone: string;
}

export interface ITenantConfiguration {
  branding: ITenantBranding;
  language: ITenantLanguage;
  contact: ITenantContact;
}

export interface ITenant {
  id: string;
  name: string;
  subdomain: string;
  status: 'active' | 'suspended';
  configuration: ITenantConfiguration;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Terms types
export interface ITerms {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'draft' | 'archived';
  content: string;
  appliesTo: 'all_forms' | 'forms_with_personal_data' | 'application_forms' | 'report_forms';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Permission and role types
export interface IPermission {
  id: string;
  name: string;
  description: string;
  scope: 'system' | 'tenant' | 'form';
}

export interface IRole {
  id: string;
  name: string;
  description: string;
  level: 'system' | 'tenant' | 'form';
  permissions: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Props interfaces
export interface IAdminOverviewProps {
  templates: ITemplate[];
  categories: ICategory[];
  tenants: ITenant[];
  terms: ITerms[];
  roles: IRole[];
  onNavigate: (section: string) => void;
}

export interface ITemplatesListProps {
  templates: ITemplate[];
  onEdit: (templateId: string) => void;
  onDelete: (templateId: string) => void;
  onArchive: (templateId: string) => void;
  onCreate: () => void;
}

export interface ICategoriesListProps {
  categories: ICategory[];
  onEdit: (categoryId: string) => void;
  onDelete: (categoryId: string) => void;
  onReorder: (sourceId: string, targetId: string) => void;
  onCreate: () => void;
}

export interface ITenantsListProps {
  tenants: ITenant[];
  onEdit: (tenantId: string) => void;
  onDelete: (tenantId: string) => void;
  onActivate: (tenantId: string) => void;
  onSuspend: (tenantId: string) => void;
  onCreate: () => void;
}

export interface ITermsListProps {
  terms: ITerms[];
  onEdit: (termId: string) => void;
  onDelete: (termId: string) => void;
  onActivate: (termId: string) => void;
  onArchive: (termId: string) => void;
  onCreate: () => void;
}

export interface IRolesListProps {
  roles: IRole[];
  onEdit: (roleId: string) => void;
  onDelete: (roleId: string) => void;
  onCreate: () => void;
}