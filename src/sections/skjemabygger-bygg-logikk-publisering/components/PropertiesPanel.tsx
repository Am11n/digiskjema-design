import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  validation: string[];
}

interface PropertiesPanelProps {
  component: FormComponent | null;
  onUpdate: (componentId: string, updates: Partial<FormComponent>) => void;
  selectedComponentId: string | null;
}

export function PropertiesPanel({ component, onUpdate, selectedComponentId }: PropertiesPanelProps) {
  if (!component) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-stone-500 dark:text-stone-400">
            Velg et felt for å redigere egenskaper
          </p>
        </div>
      </div>
    );
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(component.id, { label: e.target.value });
  };

  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(component.id, { placeholder: e.target.value });
  };

  const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(component.id, { required: e.target.checked });
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="border-0 shadow-none flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-stone-900 dark:text-stone-100">
            Egenskaper
          </CardTitle>
          <Badge variant="outline" className="w-fit">
            {component.type}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="label">Etikett</Label>
            <Input
              id="label"
              value={component.label}
              onChange={handleLabelChange}
              placeholder="Feltetikett"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="placeholder">Plassholder</Label>
            <Input
              id="placeholder"
              value={component.placeholder || ''}
              onChange={handlePlaceholderChange}
              placeholder="Plassholdertekst"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="required"
              checked={component.required}
              onChange={handleRequiredChange}
              className="rounded border-stone-300 dark:border-stone-600"
            />
            <Label htmlFor="required">Obligatorisk felt</Label>
          </div>

          <div className="space-y-2">
            <Label>Validering</Label>
            <div className="space-y-2">
              {['required', 'email', 'minLength', 'maxLength', 'min', 'max'].map((validation) => (
                <div key={validation} className="flex items-center">
                  <input
                    type="checkbox"
                    id={validation}
                    disabled
                    className="rounded border-stone-300 dark:border-stone-600"
                  />
                  <Label htmlFor={validation} className="ml-2 text-sm">
                    {validation}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button variant="outline" className="w-full" disabled>
              Avanserte innstillinger
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}