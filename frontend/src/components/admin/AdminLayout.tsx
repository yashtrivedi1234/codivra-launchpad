import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Zap,
  Palette,
  DollarSign,
  Layout,
  BookOpen,
  Briefcase,
  MessageSquare,
  LogOut,
  Bell,
  Activity,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ReactNode } from "react";
import AdminNotifications from "./AdminNotifications";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const adminPages = [
    { name: "Dashboard", path: "/admin/dashboard", icon: BarChart3 },
    { name: "Services", path: "/admin/services", icon: Zap },
    { name: "Team", path: "/admin/team", icon: BarChart3 },
    { name: "Portfolio", path: "/admin/portfolio", icon: Layout },
    { name: "Blog", path: "/admin/blog", icon: BookOpen },
    { name: "Careers", path: "/admin/careers", icon: Briefcase },
    { name: "Contact", path: "/admin/contact", icon: MessageSquare },
  ];



  const email = typeof window !== "undefined" ? window.localStorage.getItem("admin_email") : null;

  const getInitials = (email: string | null) => {
    if (!email) return "AD";
    const parts = email.split("@")[0].split(".");
    return parts.map((p) => p[0].toUpperCase()).join("").slice(0, 2);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("admin_token");
    window.localStorage.removeItem("admin_email");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          font-family: 'Outfit', sans-serif;
        }
        
        .mono {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .dark .glass-effect {
          background: rgba(20, 20, 20, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .icon-gradient-blue {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      `}</style>

      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-black/5 dark:border-white/5 w-full">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 icon-gradient-blue rounded-xl blur-sm opacity-60"></div>
                <div className="relative icon-gradient-blue p-2.5 rounded-xl">
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black dark:text-white tracking-tight">
                  Command Center
                </h1>
                <p className="text-sm text-black/50 dark:text-white/50 font-medium">
                  Analytics & Management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-black/5 dark:bg-white/5">
                <Calendar className="w-4 h-4 text-black/60 dark:text-white/60" />
                <span className="text-sm font-medium text-black/70 dark:text-white/70">
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <AdminNotifications />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-semibold text-black dark:text-white">
                        {email || "Admin"}
                      </p>
                      <p className="text-xs text-black/50 dark:text-white/50 font-medium">
                        Administrator
                      </p>
                    </div>
                    <Avatar className="h-11 w-11 border-2 border-black/10 dark:border-white/10">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`}
                        alt="Admin"
                      />
                      <AvatarFallback className="icon-gradient-blue text-white font-bold text-sm">
                        {getInitials(email)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex flex-col space-y-1">
                    <span className="text-sm font-semibold">{email || "Admin User"}</span>
                    <span className="text-xs text-muted-foreground font-medium">
                      Administrator Account
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span className="font-medium">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 border-r border-black/5 dark:border-white/5 bg-white dark:bg-[#141414] flex-col">
          <div className="p-6 border-b border-black/5 dark:border-white/5">
            <h2 className="text-sm font-bold text-black/60 dark:text-white/60 uppercase tracking-wider mb-4">
              Navigation
            </h2>
            <nav className="space-y-2">
              {adminPages.map((page) => {
                const IconComponent = page.icon;
                const isActive = window.location.pathname === page.path;
                return (
                  <button
                    key={page.path}
                    onClick={() => navigate(page.path)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium text-sm ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold"
                        : "hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {page.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            <h3 className="text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-wider mb-3">
              Quick Links
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="#"
                className="block px-3 py-2 rounded-lg text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Documentation
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-lg text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Support
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-lg text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Settings
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1 overflow-y-auto">{children}</div>

          {/* Footer */}
          <footer className="border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#141414] mt-auto">
            <div className="container mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-4">About</h4>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    Manage your website content and applications efficiently.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-4">Pages</h4>
                  <ul className="space-y-2 text-sm text-black/60 dark:text-white/60">
                    <li>
                      <button onClick={() => navigate("/admin/dashboard")} className="hover:text-blue-600 dark:hover:text-blue-400">
                        Dashboard
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigate("/admin/services")} className="hover:text-blue-600 dark:hover:text-blue-400">
                        Services
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigate("/admin/portfolio")} className="hover:text-blue-600 dark:hover:text-blue-400">
                        Portfolio
                      </button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-4">Management</h4>
                  <ul className="space-y-2 text-sm text-black/60 dark:text-white/60">
                    <li>
                      <button onClick={() => navigate("/admin/careers")} className="hover:text-blue-600 dark:hover:text-blue-400">
                        Careers
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigate("/admin/blog")} className="hover:text-blue-600 dark:hover:text-blue-400">
                        Blog
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigate("/admin/contact")} className="hover:text-blue-600 dark:hover:text-blue-400">
                        Contact
                      </button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-black/60 dark:text-white/60">
                    <li>
                      <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-black/5 dark:border-white/5 pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black/60 dark:text-white/60">
                    © 2025 Codivra Admin. All rights reserved.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="text-sm text-black/60 dark:text-white/60 hover:text-blue-600 dark:hover:text-blue-400">
                      Privacy
                    </a>
                    <a href="#" className="text-sm text-black/60 dark:text-white/60 hover:text-blue-600 dark:hover:text-blue-400">
                      Terms
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
