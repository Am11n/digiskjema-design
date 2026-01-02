import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/EmptyState';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Filter } from 'lucide-react';

interface FormSummary {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  requiresLogin: boolean;
  status: 'draft' | 'published' | 'archived';
  targetAudience: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  deadline: string | null;
  estimatedTime: number;
  hasAttachments: boolean;
  requiresPayment: boolean;
}

interface FormCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  order: number;
}

interface UserContext {
  id: string | null;
  name: string | null;
  email: string | null;
  authProvider: 'idporten' | 'dnumber' | null;
  externalId: string | null;
  roles: string[];
  profile: Record<string, unknown>;
  preferences: {
    language: string;
    notifications: boolean;
    emailUpdates: boolean;
  };
}

interface FormListProps {
  forms: FormSummary[];
  categories: FormCategory[];
  onOpen: (formId: string) => void;
  onFilterChange: (filters: { category?: string; search?: string }) => void;
  currentUser: UserContext;
}

export function FormList({ forms, categories, onOpen, onFilterChange, currentUser }: FormListProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredForms = useMemo(() => {
    return forms.filter(form => {
      const matchesSearch = form.title.toLowerCase().includes(search.toLowerCase()) || 
                           form.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || form.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [forms, search, selectedCategory]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ category: selectedCategory, search: value });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onFilterChange({ category: value, search });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 dark:text-stone-500 w-4 h-4" />
          <Input
            placeholder="Søk i skjema..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-48 justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : "Alle kategorier"}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleCategoryChange('')}>
              Alle kategorier
            </DropdownMenuItem>
            {categories.map(category => (
              <DropdownMenuItem 
                key={category.id} 
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredForms.length === 0 ? (
        <EmptyState type="spec" />
      ) : (
        <div className="grid gap-4">
          {filteredForms.map(form => (
            <Card key={form.id} className="border-stone-200 dark:border-stone-700 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-stone-900 dark:text-stone-100">
                      {form.title}
                    </CardTitle>
                    <p className="text-stone-600 dark:text-stone-400 mt-1 text-sm">
                      {form.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant={form.requiresLogin ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {form.requiresLogin ? "Krever innlogging" : "Anonym"}
                    </Badge>
                    <Badge 
                      variant="outline"
                      className="text-xs border-stone-300 dark:border-stone-600"
                    >
                      {form.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2 text-xs text-stone-500 dark:text-stone-400">
                  <span>{form.estimatedTime} min</span>
                  {form.deadline && <span>Frist: {new Date(form.deadline).toLocaleDateString()}</span>}
                </div>
              </CardHeader>
              
              <CardContent className="pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-500 dark:text-stone-400">
                    {categories.find(c => c.id === form.categoryId)?.name}
                  </span>
                  
                  <Button 
                    onClick={() => onOpen(form.id)}
                    variant={form.requiresLogin && !currentUser.id ? "outline" : "default"}
                  >
                    {form.requiresLogin && !currentUser.id ? "Logg inn" : "Åpne"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}