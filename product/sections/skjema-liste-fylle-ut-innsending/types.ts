/**
 * TypeScript types for the Skjema section
 */

// Core data interfaces
export interface IFormSummary {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  requiresLogin: boolean;
  status: 'draft' | 'published' | 'archived';
  targetAudience: string;
  language: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deadline: string | null; // ISO date string or null
  estimatedTime: number; // in minutes
  hasAttachments: boolean;
  requiresPayment: boolean;
}

export interface IFormCategory {
  id: string;
  name: string;
  description: string;
  color: string; // hex color
  order: number;
}

export interface ISubmission {
  id: string;
  formId: string;
  userId: string | null;
  status: 'draft' | 'submitted' | 'failed';
  submittedAt: string | null; // ISO date string or null
  referenceNumber: string | null;
  progress: number; // 0-100
  lastModified: string; // ISO date string
  formData: Record<string, unknown>;
  attachments: string[]; // array of attachment IDs
}

export interface IAttachment {
  id: string;
  submissionId: string;
  fileName: string;
  fileType: string; // MIME type
  fileSize: number; // in bytes
  uploadedAt: string; // ISO date string
  uploadedBy: string;
  status: 'pending' | 'verified' | 'rejected';
  description: string;
}

export interface IUserProfile {
  phone?: string;
  address?: string;
}

export interface IUserPreferences {
  language: string;
  notifications: boolean;
  emailUpdates: boolean;
}

export interface IUserContext {
  id: string | null;
  name: string | null;
  email: string | null;
  authProvider: 'idporten' | 'dnumber' | null;
  externalId: string | null;
  roles: string[];
  profile: IUserProfile;
  preferences: IUserPreferences;
}

// UI component props interfaces
export interface IFormListProps {
  forms: IFormSummary[];
  categories: IFormCategory[];
  onOpen: (formId: string) => void;
  onFilterChange: (filters: { category?: string; search?: string }) => void;
  currentUser: IUserContext;
}

export interface IFormFillProps {
  form: IFormSummary;
  submission?: ISubmission;
  onSaveDraft: (formData: Record<string, unknown>) => void;
  onSubmit: (formData: Record<string, unknown>, attachments?: IAttachment[]) => void;
  onValidate: (formData: Record<string, unknown>) => { isValid: boolean; errors?: Record<string, string> };
  currentUser: IUserContext;
}

export interface IReceiptProps {
  submission: ISubmission;
  onDownloadPdf: (submissionId: string) => void;
  onBackToList: () => void;
}