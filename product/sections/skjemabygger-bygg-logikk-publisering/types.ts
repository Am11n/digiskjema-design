/**
 * TypeScript types for the Skjemabygger section
 */

// Core form schema types
export interface IFormComponent {
  id: string;
  type: IComponentType;
  label: string;
  required: boolean;
  placeholder?: string;
  validation: string[];
  position: number;
  options?: Array<{ value: string; label: string }>;
  conditional?: {
    field: string;
    condition: string;
    value: string;
    action: string;
  };
  calculated?: {
    formula: string;
    dependsOn: string[];
  };
  repeaterConfig?: {
    minItems: number;
    maxItems: number;
    fields: Array<{
      id: string;
      type: IComponentType;
      label: string;
    }>;
  };
}

export type IComponentType = 
  | 'text' 
  | 'email' 
  | 'number' 
  | 'date' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'file' 
  | 'group' 
  | 'repeater';

export interface IFormSchema {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  components: IFormComponent[];
  logicRules?: ILogicRule[];
  calculationRules?: ICalculationRule[];
}

// Component library types
export interface IComponentLibraryItem {
  type: IComponentType;
  name: string;
  category: 'input' | 'layout';
  icon: string;
  properties: Record<string, {
    type: string;
    required: boolean;
    default?: any;
    items?: any;
  }>;
}

// Rule types
export interface IValidationRule {
  id: string;
  name: string;
  type: 'validation';
  category: 'required' | 'format' | 'length' | 'range';
  expression: string;
  errorMessage: string;
  parameters?: string[];
}

export interface ILogicRule {
  id: string;
  type: 'visibility';
  triggerField: string;
  condition: {
    field: string;
    operator: string;
    value: string;
  };
  action: {
    targetField: string;
    type: string;
  };
}

export interface ICalculationRule {
  id: string;
  type: 'calculation';
  targetField: string;
  formula: string;
  dependsOn: string[];
}

// Publish information
export interface IPublishInfo {
  schemaId: string;
  versions: Array<{
    version: string;
    status: 'draft' | 'published';
    publishedAt: string | null;
    publishedBy: string | null;
    changelog: string;
  }>;
}

// Props interfaces
export interface IFormBuilderProps {
  schema: IFormSchema;
  library: IComponentLibraryItem[];
  onAdd: (component: IFormComponent) => void;
  onSelect: (componentId: string) => void;
  onUpdate: (componentId: string, updates: Partial<IFormComponent>) => void;
  onReorder: (sourceIndex: number, destinationIndex: number) => void;
  onPreview: (schema: IFormSchema) => void;
  onPublish: (schemaId: string) => void;
}