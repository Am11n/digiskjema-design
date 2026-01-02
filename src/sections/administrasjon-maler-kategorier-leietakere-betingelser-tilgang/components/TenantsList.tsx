import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Plus, Search, Edit, UserPlus, Ban } from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  status: 'active' | 'suspended';
  configuration: {
    branding: {
      logoUrl: string;
      primaryColor: string;
      secondaryColor: string;
    };
    language: {
      default: string;
      available: string[];
    };
    contact: {
      email: string;
      phone: string;
    };
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface TenantsListProps {
  tenants: Tenant[];
  onEdit: (tenantId: string) => void;
  onDelete: (tenantId: string) => void;
  onActivate: (tenantId: string) => void;
  onSuspend: (tenantId: string) => void;
  onCreate: () => void;
}

export function TenantsList({ tenants, onEdit, onDelete, onActivate, onSuspend, onCreate }: TenantsListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.subdomain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            Leietakere
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Håndter leietakere og konfigurasjoner
          </p>
        </div>
        
        <Button onClick={onCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Ny leietaker
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 dark:text-stone-500 w-4 h-4" />
          <Input
            placeholder="Søk i leietakere..."
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
            <div className="col-span-2">Subdomene</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Opprettet</div>
            <div className="col-span-2">Handlinger</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredTenants.length === 0 ? (
            <div className="text-center py-8 text-stone-500 dark:text-stone-400">
              Ingen leietakere funnet
            </div>
          ) : (
            filteredTenants.map((tenant) => (
              <div 
                key={tenant.id} 
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/50"
              >
                <div className="sm:col-span-4">
                  <div className="font-medium text-stone-900 dark:text-stone-100">
                    {tenant.name}
                  </div>
                  <div className="text-sm text-stone-500 dark:text-stone-400 sm:hidden">
                    Subdomene: {tenant.subdomain}
                  </div>
                </div>
                
                <div className="sm:col-span-2 sm:hidden">
                  <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Subdomene:</span>
                  <div className="text-sm text-stone-900 dark:text-stone-100">{tenant.subdomain}</div>
                </div>
                <div className="hidden sm:block sm:col-span-2">
                  <div className="text-sm text-stone-900 dark:text-stone-100">
                    {tenant.subdomain}
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <Badge 
                    variant={tenant.status === 'active' ? 'default' : 'destructive'}
                  >
                    {tenant.status}
                  </Badge>
                </div>
                
                <div className="sm:col-span-2">
                  <div className="text-sm text-stone-900 dark:text-stone-100">
                    {new Date(tenant.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="sm:col-span-2 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(tenant.id)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Rediger
                      </DropdownMenuItem>
                      {tenant.status === 'active' ? (
                        <DropdownMenuItem onClick={() => onSuspend(tenant.id)}>
                          <Ban className="w-4 h-4 mr-2" />
                          Suspender
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => onActivate(tenant.id)}>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Aktiver
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onDelete(tenant.id)}>
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