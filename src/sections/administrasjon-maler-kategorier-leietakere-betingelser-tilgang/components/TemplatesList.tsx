import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Plus, Search, Edit, Archive, Trash2 } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'active' | 'archived' | 'draft';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface TemplatesListProps {
  templates: Template[];
  onEdit: (templateId: string) => void;
  onDelete: (templateId: string) => void;
  onArchive: (templateId: string) => void;
  onCreate: () => void;
}

export function TemplatesList({ templates, onEdit, onDelete, onArchive, onCreate }: TemplatesListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            Skjemamaler
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Håndter gjenbrukbare skjemamaler
          </p>
        </div>
        
        <Button onClick={onCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Ny mal
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 dark:text-stone-500 w-4 h-4" />
          <Input
            placeholder="Søk i maler..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card className="border-stone-200 dark:border-stone-700">
        <CardHeader className="hidden sm:block">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-stone-500 dark:text-stone-400">
            <div className="col-span-4">Navn</div>
            <div className="col-span-3">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Opprettet</div>
            <div className="col-span-1">Handlinger</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-8 text-stone-500 dark:text-stone-400">
              Ingen maler funnet
            </div>
          ) : (
            filteredTemplates.map((template) => (
              <div 
                key={template.id} 
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/50"
              >
                <div className="sm:col-span-4">
                  <div className="font-medium text-stone-900 dark:text-stone-100">
                    {template.name}
                  </div>
                  <div className="text-sm text-stone-500 dark:text-stone-400 sm:hidden">
                    {template.description}
                  </div>
                </div>
                
                <div className="sm:col-span-3 sm:hidden">
                  <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Type:</span>
                  <div className="text-sm text-stone-900 dark:text-stone-100">{template.type}</div>
                </div>
                <div className="hidden sm:block sm:col-span-3">
                  <div className="text-sm text-stone-900 dark:text-stone-100">
                    {template.type}
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <Badge 
                    variant={template.status === 'active' ? 'default' : 
                           template.status === 'archived' ? 'secondary' : 'outline'}
                  >
                    {template.status}
                  </Badge>
                </div>
                
                <div className="sm:col-span-2">
                  <div className="text-sm text-stone-900 dark:text-stone-100">
                    {new Date(template.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="sm:col-span-1 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(template.id)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Rediger
                      </DropdownMenuItem>
                      {template.status !== 'archived' ? (
                        <DropdownMenuItem onClick={() => onArchive(template.id)}>
                          <Archive className="w-4 h-4 mr-2" />
                          Arkiver
                        </DropdownMenuItem>
                      ) : null}
                      <DropdownMenuItem onClick={() => onDelete(template.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Slett
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}