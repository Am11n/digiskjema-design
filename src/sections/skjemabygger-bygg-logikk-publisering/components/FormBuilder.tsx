import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ComponentPalette } from './ComponentPalette';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { Undo2, Redo2, Eye, Upload } from 'lucide-react';

interface FormComponent {
  id: string;
  type: string;
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
      type: string;
      label: string;
    }>;
  };
}

interface FormSchema {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  components: FormComponent[];
  logicRules?: any[];
  calculationRules?: any[];
}

interface ComponentLibraryItem {
  type: string;
  name: string;
  category: string;
  icon: string;
  properties: Record<string, any>;
}

interface FormBuilderProps {
  schema: FormSchema;
  library: ComponentLibraryItem[];
  onAdd: (component: FormComponent) => void;
  onSelect: (componentId: string) => void;
  onUpdate: (componentId: string, updates: Partial<FormComponent>) => void;
  onReorder: (sourceIndex: number, destinationIndex: number) => void;
  onPreview: (schema: FormSchema) => void;
  onPublish: (schemaId: string) => void;
}

export function FormBuilder({ 
  schema, 
  library, 
  onAdd, 
  onSelect, 
  onUpdate, 
  onReorder, 
  onPreview, 
  onPublish 
}: FormBuilderProps) {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  
  const selectedComponent = schema.components.find((comp: FormComponent) => comp.id === selectedComponentId);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            {schema.name}
          </h1>
          <span className="text-sm text-stone-500 dark:text-stone-400">
            Versjon {schema.version}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Undo2 className="w-4 h-4 mr-2" />
            Angre
          </Button>
          <Button variant="outline" size="sm">
            <Redo2 className="w-4 h-4 mr-2" />
            Gjør om
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline" size="sm" onClick={() => onPreview(schema)}>
            <Eye className="w-4 h-4 mr-2" />
            Forhåndsvis
          </Button>
          <Button size="sm" onClick={() => onPublish(schema.id)}>
            <Upload className="w-4 h-4 mr-2" />
            Publiser
          </Button>
        </div>
      </div>

      {/* 3-panel layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Component Palette - Left Panel */}
        <div className="w-64 border-r border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 hidden md:block">
          <ComponentPalette 
            components={library} 
            onAdd={onAdd} 
          />
        </div>

        {/* Canvas - Center Panel */}
        <div className="flex-1 overflow-auto p-6 bg-stone-100/30 dark:bg-stone-950/30">
          <Card className="max-w-2xl mx-auto shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-stone-900 dark:text-stone-100">
                {schema.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Canvas 
                components={schema.components} 
                selectedComponentId={selectedComponentId}
                onSelect={onSelect}
                onReorder={onReorder}
              />
            </CardContent>
          </Card>
        </div>

        {/* Properties Panel - Right Panel */}
        <div className="w-80 border-l border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hidden lg:block">
          <PropertiesPanel 
            component={selectedComponent || null}
            onUpdate={onUpdate}
            selectedComponentId={selectedComponentId}
          />
        </div>
      </div>
    </div>
  );
}