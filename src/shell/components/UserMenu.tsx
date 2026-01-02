import React, { useState } from 'react';

interface UserMenuProps {
  user?: {
    name: string;
  };
  onLogout?: () => void;
}

function UserMenu({ user, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
          {user?.name?.charAt(0) || 'U'}
        </span>
        <span className="hidden md:inline">{user?.name || 'Brukernavn'}</span>
      </button>
      
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Innstillinger</a>
          <a 
            href="#" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              onLogout?.();
            }}
          >
            Logg ut
          </a>
        </div>
      )}
    </div>
  );
}
export default UserMenu