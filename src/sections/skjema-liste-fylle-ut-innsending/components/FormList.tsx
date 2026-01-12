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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-xl, 1.5rem)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-m, 0.75rem)' }} className="sm:flex-row">
        <div style={{ position: 'relative', flex: 1 }}>
          <Search style={{
            position: 'absolute',
            left: 'var(--fds-spacing-s, 0.5rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--fds-text-subtle, #717274)',
            width: '1rem',
            height: '1rem'
          }} />
          <Input
            placeholder="Søk i skjema..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
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
            <Card 
              key={form.id} 
              style={{
                borderColor: 'var(--fds-gray-200, #dbdbdc)',
                transition: 'box-shadow 200ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--fds-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--fds-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05))';
              }}
            >
              <CardHeader style={{ paddingBottom: 'var(--fds-spacing-s, 0.5rem)' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--fds-spacing-xs, 0.5rem)',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between'
                }} className="sm:flex-row sm:items-start sm:justify-between">
                  <div style={{ flex: 1 }}>
                    <CardTitle style={{
                      fontSize: 'var(--fds-font-size-lg, 1.125rem)',
                      color: 'var(--fds-text-default, #1f2021)',
                      marginBottom: 'var(--fds-spacing-xxs, 0.25rem)'
                    }}>
                      {form.title}
                    </CardTitle>
                    <p style={{
                      color: 'var(--fds-text-subtle, #717274)',
                      marginTop: 'var(--fds-spacing-xxs, 0.25rem)',
                      fontSize: 'var(--fds-font-size-sm, 0.875rem)'
                    }}>
                      {form.description}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--fds-spacing-xs, 0.5rem)' }}>
                    <Badge 
                      variant={form.requiresLogin ? "default" : "secondary"}
                    >
                      {form.requiresLogin ? "Krever innlogging" : "Anonym"}
                    </Badge>
                    <Badge variant="outline">
                      {form.status}
                    </Badge>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--fds-spacing-xs, 0.5rem)',
                  marginTop: 'var(--fds-spacing-xs, 0.5rem)',
                  fontSize: 'var(--fds-font-size-xs, 0.75rem)',
                  color: 'var(--fds-text-subtle, #717274)'
                }}>
                  <span>{form.estimatedTime} min</span>
                  {form.deadline && <span>Frist: {new Date(form.deadline).toLocaleDateString()}</span>}
                </div>
              </CardHeader>
              
              <CardContent style={{ paddingBottom: 'var(--fds-spacing-m, 0.75rem)' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                    color: 'var(--fds-text-subtle, #717274)'
                  }}>
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