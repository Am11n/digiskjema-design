import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  path: string;
}

function MainNav() {
  const location = useLocation();
  const navItems: NavItem[] = [
    { id: 'skjema', label: 'Skjema', path: '/sections/skjema' },
    { id: 'bygg-skjema', label: 'Bygg skjema', path: '/sections/bygg-skjema' },
    { id: 'malmaker', label: 'Malmaker', path: '/sections/malmaker' },
    { id: 'kategorier', label: 'Kategorier', path: '/sections/kategorier' },
    { id: 'leietakarar', label: 'Leietakarar', path: '/sections/leietakarar' },
    { id: 'betingelser', label: 'Betingelser', path: '/sections/betingelser' },
    { id: 'analyser', label: 'Analyser', path: '/sections/analyser' },
    { id: 'sprak', label: 'Språk', path: '/sections/sprak' },
    { id: 'tilgjenge', label: 'Tilgjenge', path: '/sections/tilgjenge' },
    { id: 'admin', label: 'Admin', path: '/sections/admin' },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
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
  );
}
export default MainNav