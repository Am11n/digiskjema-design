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
    <div style={{ position: 'relative' }}>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--fds-spacing-xs, 0.5rem)',
          padding: 'var(--fds-spacing-xs, 0.5rem)',
          borderRadius: 'var(--fds-border-radius-md, 0.375rem)',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--fds-gray-100, #f7f7f7)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        onClick={() => setOpen(!open)}
      >
        <span style={{
          width: '2rem',
          height: '2rem',
          borderRadius: 'var(--fds-border-radius-full, 9999px)',
          backgroundColor: 'var(--fds-blue-50, #e7f3fa)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--fds-blue-60, #0066cc)',
          fontWeight: 'var(--fds-font-weight-medium, 500)',
          fontSize: 'var(--fds-font-size-sm, 0.875rem)'
        }}>
          {user?.name?.charAt(0) || 'U'}
        </span>
        <span style={{
          fontSize: 'var(--fds-font-size-sm, 0.875rem)',
          color: 'var(--fds-text-default, #1f2021)',
          fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
        }} className="hidden md:inline">{user?.name || 'Brukernavn'}</span>
      </button>
      
      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          marginTop: 'var(--fds-spacing-xs, 0.5rem)',
          width: '12rem',
          backgroundColor: 'white',
          borderRadius: 'var(--fds-border-radius-md, 0.375rem)',
          boxShadow: 'var(--fds-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1))',
          padding: 'var(--fds-spacing-xs, 0.5rem) 0',
          zIndex: 50,
          border: '1px solid var(--fds-gray-200, #dbdbdc)'
        }}>
          <a 
            href="#" 
            style={{
              display: 'block',
              padding: 'var(--fds-spacing-xs, 0.5rem) var(--fds-spacing-m, 0.75rem)',
              fontSize: 'var(--fds-font-size-sm, 0.875rem)',
              color: 'var(--fds-text-default, #1f2021)',
              textDecoration: 'none',
              fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--fds-gray-100, #f7f7f7)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Profil
          </a>
          <a 
            href="#" 
            style={{
              display: 'block',
              padding: 'var(--fds-spacing-xs, 0.5rem) var(--fds-spacing-m, 0.75rem)',
              fontSize: 'var(--fds-font-size-sm, 0.875rem)',
              color: 'var(--fds-text-default, #1f2021)',
              textDecoration: 'none',
              fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--fds-gray-100, #f7f7f7)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Innstillinger
          </a>
          <a 
            href="#" 
            style={{
              display: 'block',
              padding: 'var(--fds-spacing-xs, 0.5rem) var(--fds-spacing-m, 0.75rem)',
              fontSize: 'var(--fds-font-size-sm, 0.875rem)',
              color: 'var(--fds-text-default, #1f2021)',
              textDecoration: 'none',
              fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--fds-gray-100, #f7f7f7)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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