import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { getSidebarItems, adminSidebarItems, websiteSidebarItems } from '@/layout/Sidebar';

interface SidebarProps {
  context?: 'admin' | 'website';
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ context = 'website', isOpen = true, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(isOpen);

  const items = getSidebarItems(context);
  const isAdmin = context === 'admin';

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileOpen(false);
    onClose?.();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-6 right-6 z-40 md:hidden p-3 rounded-full icon-gradient-blue text-white shadow-lg hover:shadow-xl transition-all"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-[#0a0a0a] border-r border-black/5 dark:border-white/5 flex flex-col transition-all duration-300 z-40 overflow-hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="icon-gradient-blue p-2 rounded-lg">
                <Menu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-black dark:text-white">
                  {isAdmin ? 'Admin' : 'Menu'}
                </h2>
                <p className="text-xs text-black/50 dark:text-white/50 font-medium">
                  {isAdmin ? 'Management' : 'Navigation'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-black dark:text-white" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {items.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 group ${
                  active
                    ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 font-medium'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${active ? 'text-blue-600 dark:text-blue-400' : 'group-hover:text-black dark:group-hover:text-white'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.label}</p>
                  {item.description && (
                    <p className="text-xs opacity-70 mt-0.5">{item.description}</p>
                  )}
                </div>
                {item.badge && (
                  <span className="text-xs bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-2 py-1 rounded-full font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="p-6 border-t border-black/5 dark:border-white/5">
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-900/40">
            <p className="text-xs font-bold text-black/60 dark:text-white/60 uppercase tracking-wide mb-1">
              {isAdmin ? 'Admin Panel' : 'Website'}
            </p>
            <p className="text-xs text-black/50 dark:text-white/50 font-medium">
              {isAdmin
                ? 'Manage your content and settings'
                : 'Explore our services and solutions'}
            </p>
          </div>
        </div>
      </aside>

      {/* Style */}
      <style>{`
        .icon-gradient-blue {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      `}</style>
    </>
  );
};

export default Sidebar;
