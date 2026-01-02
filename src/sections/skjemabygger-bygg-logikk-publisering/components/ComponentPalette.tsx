import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';

interface ComponentLibraryItem {
  type: string;
  name: string;
  category: string;
  icon: string;
}

interface ComponentPaletteProps {
  components: ComponentLibraryItem[];
  onAdd: (component: any) => void;
}

export function ComponentPalette({ components, onAdd }: ComponentPaletteProps) {
  const inputComponents = components.filter(comp => comp.category === 'input');
  const layoutComponents = components.filter(comp => comp.category === 'layout');

  const handleAddComponent = (component: ComponentLibraryItem) => {
    const newComponent = {
      id: `comp-${Date.now()}`,
      type: component.type as any,
      label: component.name,
      required: false,
      validation: [],
      position: 0
    };
    onAdd(newComponent);
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="border-0 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-stone-900 dark:text-stone-100">
            Felttyper
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {inputComponents.map((comp) => (
            <Button
              key={comp.type}
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleAddComponent(comp)}
            >
              <Plus className="w-4 h-4 mr-2" />
              {comp.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Separator className="my-4" />

      <Card className="border-0 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-stone-900 dark:text-stone-100">
            Layout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {layoutComponents.map((comp) => (
            <Button
              key={comp.type}
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleAddComponent(comp)}
            >
              <Plus className="w-4 h-4 mr-2" />
              {comp.name}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}