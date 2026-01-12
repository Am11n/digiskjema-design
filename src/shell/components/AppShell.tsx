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
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--fds-gray-50, #f0f0f0)' }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--fds-gray-200, #dbdbdc)'
      }}>
        <div style={{
          padding: 'var(--fds-spacing-l, 1rem) var(--fds-spacing-xl, 1.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              style={{
                display: 'block',
                marginRight: 'var(--fds-spacing-m, 0.75rem)',
                padding: 'var(--fds-spacing-xs, 0.5rem)',
                borderRadius: 'var(--fds-border-radius-md, 0.375rem)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--fds-gray-100, #f7f7f7)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 style={{
              fontSize: 'var(--fds-font-size-xl, 1.25rem)',
              fontWeight: 'var(--fds-font-weight-bold, 700)',
              color: 'var(--fds-blue-60, #0066cc)',
              fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
            }}>{user?.name || 'Digiskjema'}</h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--fds-spacing-m, 0.75rem)' }}>
            <UserMenu user={user} onLogout={onLogout} />
          </div>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <aside 
          style={{
            position: 'fixed',
            top: '4rem',
            left: 0,
            height: 'calc(100vh - 4rem)',
            width: '18rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRight: '1px solid var(--fds-gray-200, #dbdbdc)',
            zIndex: 40,
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 300ms ease-in-out'
          }}
          className="lg:sticky lg:translate-x-0"
        >
          <nav style={{ padding: 'var(--fds-spacing-m, 0.75rem)' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-xxs, 0.25rem)' }}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: 'var(--fds-spacing-s, 0.5rem) var(--fds-spacing-m, 0.75rem)',
                      borderRadius: 'var(--fds-border-radius-lg, 0.5rem)',
                      fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                      textDecoration: 'none',
                      color: isActive(item.path) ? 'var(--fds-blue-60, #0066cc)' : 'var(--fds-text-default, #1f2021)',
                      fontWeight: isActive(item.path) ? 'var(--fds-font-weight-medium, 500)' : 'var(--fds-font-weight-regular, 400)',
                      backgroundColor: isActive(item.path) ? 'var(--fds-blue-50, #e7f3fa)' : 'transparent',
                      borderLeft: isActive(item.path) ? '4px solid var(--fds-blue-60, #0066cc)' : 'none',
                      transform: isActive(item.path) ? 'translateX(4px)' : 'none',
                      transition: 'all 200ms ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(item.path)) {
                        e.currentTarget.style.backgroundColor = 'var(--fds-gray-100, #f7f7f7)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.path)) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
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
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 30
            }}
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: 'var(--fds-spacing-2xl, 2rem)',
          marginLeft: 0
        }} className="lg:ml-0">
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
export default AppShell