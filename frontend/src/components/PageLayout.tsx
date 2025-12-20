import React from 'react';
import Sidebar from '@/components/Sidebar';

interface PageLayoutProps {
  children: React.ReactNode;
  context?: 'admin' | 'website';
  showSidebar?: boolean;
}

/**
 * PageLayout Component
 * Wraps pages with consistent Sidebar and layout structure
 * 
 * Usage:
 * <PageLayout context="admin">
 *   <YourPageContent />
 * </PageLayout>
 */
const PageLayout = ({ children, context = 'website', showSidebar = true }: PageLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      {showSidebar && <Sidebar context={context} />}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
