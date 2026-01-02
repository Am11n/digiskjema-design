import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, Building2, Users, Shield } from 'lucide-react';

interface AdminOverviewProps {
  templates: any[];
  categories: any[];
  tenants: any[];
  roles: any[];
  onNavigate: (section: string) => void;
}

export function AdminOverview({ templates, categories, tenants, roles, onNavigate }: AdminOverviewProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          Administrasjon
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mt-2">
          Håndter systeminnstillinger, leietakere og brukerrettigheter
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Templates Card */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-stone-200 dark:border-stone-700"
              onClick={() => onNavigate('templates')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Folder className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg text-stone-900 dark:text-stone-100">
                Maler
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
              Håndter skjemamaler
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {templates.length} maler
            </p>
          </CardContent>
        </Card>

        {/* Categories Card */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-stone-200 dark:border-stone-700"
              onClick={() => onNavigate('categories')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <Folder className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg text-stone-900 dark:text-stone-100">
                Kategorier
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
              Organiser skjema i kategorier
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {categories.length} kategorier
            </p>
          </CardContent>
        </Card>

        {/* Tenants Card */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-stone-200 dark:border-stone-700"
              onClick={() => onNavigate('tenants')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-lg text-stone-900 dark:text-stone-100">
                Leietakere
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
              Administrer leietakere og konfigurasjoner
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {tenants.length} leietakere
            </p>
          </CardContent>
        </Card>

        {/* Access Control Card */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-stone-200 dark:border-stone-700"
              onClick={() => onNavigate('access')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-lg text-stone-900 dark:text-stone-100">
                Tilgangsstyring
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
              Håndter roller og rettigheter
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {roles.length} roller
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-stone-50 dark:bg-stone-800/50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
          Hurtighandlinger
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => onNavigate('templates')}>
            Ny mal
          </Button>
          <Button variant="outline" onClick={() => onNavigate('tenants')}>
            Ny leietaker
          </Button>
          <Button variant="outline" onClick={() => onNavigate('access')}>
            Ny rolle
          </Button>
        </div>
      </div>
    </div>
  );
}