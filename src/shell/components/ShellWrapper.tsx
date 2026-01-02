import React from 'react';
import { default as AppShell } from './AppShell';

type ShellWrapperProps = {
  children: React.ReactNode;
} & Record<string, any>;

function ShellWrapper({ children, ...props }: ShellWrapperProps) {
  // Extract known AppShell props and filter out React-specific props
  const { key, ref, children: childrenProp, navigationItems, user, onNavigate, onLogout, ...otherProps } = props;
  
  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={onNavigate}
      onLogout={onLogout}
      {...otherProps}
    >
      {children}
    </AppShell>
  );
}

export default ShellWrapper