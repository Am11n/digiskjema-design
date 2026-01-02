import type { DragEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FormComponent {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

interface CanvasProps {
  components: FormComponent[];
  selectedComponentId: string | null;
  onSelect: (componentId: string) => void;
  onReorder: (sourceIndex: number, destinationIndex: number) => void;
}

export function Canvas({ components, selectedComponentId, onSelect }: CanvasProps) {
  const renderComponent = (comp: FormComponent) => {
    const isSelected = selectedComponentId === comp.id;
    
    const baseClasses = `p-4 rounded-lg border-2 transition-colors ${
      isSelected 
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
        : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800'
    }`;

    switch (comp.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <div className={baseClasses} onClick={() => onSelect(comp.id)}>
            <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {comp.label} {comp.required && <span className="text-red-500">*</span>}
            </Label>
            <Input 
              placeholder={comp.placeholder} 
              className="mt-1"
              readOnly
            />
          </div>
        );
      case 'textarea':
        return (
          <div className={baseClasses} onClick={() => onSelect(comp.id)}>
            <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {comp.label} {comp.required && <span className="text-red-500">*</span>}
            </Label>
            <textarea
              placeholder={comp.placeholder}
              className="w-full rounded-md border px-3 py-2 text-sm border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 mt-1"
              readOnly
            />
          </div>
        );
      case 'select':
        return (
          <div className={baseClasses} onClick={() => onSelect(comp.id)}>
            <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {comp.label} {comp.required && <span className="text-red-500">*</span>}
            </Label>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 mt-1"
              disabled
            >
              <option value="">{comp.placeholder}</option>
              {comp.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      case 'checkbox':
        return (
          <div className={baseClasses} onClick={() => onSelect(comp.id)}>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 rounded border-stone-300 dark:border-stone-600"
                disabled
              />
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                {comp.label} {comp.required && <span className="text-red-500">*</span>}
              </Label>
            </div>
          </div>
        );
      case 'group':
        return (
          <div className={baseClasses} onClick={() => onSelect(comp.id)}>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                {comp.label}
              </Label>
              <Badge variant="outline" className="text-xs">
                Gruppe
              </Badge>
            </div>
            <div className="space-y-2">
              <Input placeholder="Felt i gruppe" className="mt-1" readOnly />
              <Input placeholder="Annet felt" className="mt-1" readOnly />
            </div>
          </div>
        );
      case 'repeater':
        return (
          <div className={baseClasses} onClick={() => onSelect(comp.id)}>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                {comp.label}
              </Label>
              <Badge variant="outline" className="text-xs">
                Gjentakende
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="p-2 border rounded bg-stone-50 dark:bg-stone-700">
                <Input placeholder="Gjentakende felt" className="mt-1" readOnly />
              </div>
              <Button variant="outline" size="sm" className="w-full" disabled>
                + Legg til ny rad
              </Button>
            </div>
          </div>
        );
      default:
        return (
          <div className={baseClasses} onClick={() => onSelect(comp.id)}>
            <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {comp.label}
            </Label>
            <div className="mt-1 text-sm text-stone-500 dark:text-stone-400 italic">
              Ukjent felttype: {comp.type}
            </div>
          </div>
        );
    }
  };

  if (components.length === 0) {
    return (
      <Card className="border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-lg p-8 text-center">
        <CardContent>
          <p className="text-stone-500 dark:text-stone-400">
            Trekk og slipp komponenter her fra biblioteket til venstre
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {components.map((comp) => (
        <div key={comp.id}>
          {renderComponent(comp)}
        </div>
      ))}
    </div>
  );
}