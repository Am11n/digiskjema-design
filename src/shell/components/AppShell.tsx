import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import UserMenu from './UserMenu';

type AppShellProps = {
  children: React.ReactNode;
  navigationItems?: {
    label: string;
    href: string;
    isActive?: boolean;
  }[];
  user?: {
    name: string;
  };
  onNavigate?: () => void;
  onLogout?: () => void;
} & Record<string, any>;

function AppShell({ children, navigationItems = [], user, onNavigate, onLogout, ...otherProps }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Use navigation items from props if available, otherwise fallback to default
  const navItems = navigationItems && navigationItems.length > 0 
    ? navigationItems.map((item, index) => ({
        id: item.label.toLowerCase().replace(/\s+/g, '-'),
        label: item.label,
        path: item.href,
        isActive: item.isActive
      }))
    : [
        { id: 'skjema', label: 'Skjema', path: '/sections/skjema', isActive: false },
        { id: 'bygg-skjema', label: 'Bygg skjema', path: '/sections/bygg-skjema', isActive: false },
        { id: 'malmaker', label: 'Malmaker', path: '/sections/malmaker', isActive: false },
        { id: 'kategorier', label: 'Kategorier', path: '/sections/kategorier', isActive: false },
        { id: 'leietakarar', label: 'Leietakarar', path: '/sections/leietakarar', isActive: false },
        { id: 'betingelser', label: 'Betingelser', path: '/sections/betingelser', isActive: false },
        { id: 'analyser', label: 'Analyser', path: '/sections/analyser', isActive: false },
        { id: 'sprak', label: 'Språk', path: '/sections/sprak', isActive: false },
        { id: 'tilgjenge', label: 'Tilgjenge', path: '/sections/tilgjenge', isActive: false },
        { id: 'admin', label: 'Admin', path: '/sections/admin', isActive: false },
      ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white bg-opacity-95 backdrop-blur border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 p-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-bold text-blue-600">{user?.name || 'Digiskjema'}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <UserMenu user={user} onLogout={onLogout} />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-white bg-opacity-95 backdrop-blur border-r border-gray-200 z-40 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <nav className="p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`flex items-center w-full p-3 rounded-lg text-sm transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600 font-medium transform translate-x-1'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-8 lg:ml-0">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
export default AppShell