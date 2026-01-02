import React from 'react';
import { default as AppShell } from './components/AppShell';

type ShellPreviewProps = {
  children: React.ReactNode;
} & Record<string, any>;

function ShellPreview({ children, ...props }: ShellPreviewProps) {
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {children}
      </div>
    </AppShell>
  );
}
export default ShellPreview