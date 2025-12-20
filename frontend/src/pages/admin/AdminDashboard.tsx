import { useNavigate } from "react-router-dom";
import {
  useGetJobApplicationsQuery,
  useDeleteJobApplicationMutation,
  useAdminListPagesQuery,
  useAdminUpsertPageSectionMutation,
  useAdminDeletePageSectionMutation,
  PageSection,
  useGetTeamQuery,
  useGetServicesQuery,
  useGetPortfolioQuery,
  useGetBlogQuery,
  useAdminListContactsQuery,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Briefcase,
  FileText,
  Plus,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  ChevronRight,
  Edit3,
  Mail,
  Phone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetJobApplicationsQuery();
  const [deleteApplication, { isLoading: isDeleting }] =
    useDeleteJobApplicationMutation();
  const {
    data: pagesData,
    isLoading: isLoadingPages,
    refetch: refetchPages,
  } = useAdminListPagesQuery();
  const [upsertPage] = useAdminUpsertPageSectionMutation();
  const [deletePageSection, { isLoading: isDeletingSection }] =
    useAdminDeletePageSectionMutation();
  const { toast } = useToast();
  const [editing, setEditing] = useState<{
    id?: string;
    page: string;
    key: string;
    data: string;
  } | null>(null);
  const { data: teamData, isLoading: isLoadingTeam } = useGetTeamQuery();
  const { data: servicesData, isLoading: isLoadingServices } = useGetServicesQuery();
  const { data: portfolioData, isLoading: isLoadingPortfolio } = useGetPortfolioQuery();
  const { data: blogData, isLoading: isLoadingBlog } = useGetBlogQuery();
  const { data: contactsData, isLoading: isLoadingContacts } = useAdminListContactsQuery();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this application?")) return;

    try {
      await deleteApplication(id).unwrap();
      toast({
        title: "Deleted",
        description: "The application has been removed.",
      });
      refetch();
    } catch (error) {
      console.error("Failed to delete application:", error);
      toast({
        title: "Delete failed",
        description: "Could not delete application. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Dynamic data for charts
  // Applications Trend: group job applications by month and count approved (if available)
  const applicationData = (() => {
    if (!data?.items) return [];
    const byMonth = {};
    data.items.forEach(app => {
      if (!app.created_at) return;
      const date = new Date(app.created_at);
      const month = date.toLocaleString('default', { month: 'short' });
      if (!byMonth[month]) byMonth[month] = { month, applications: 0, approved: 0 };
      byMonth[month].applications += 1;
      if (app.status === 'approved') byMonth[month].approved += 1;
    });
    // Sort by month order (Jan, Feb, ...)
    const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return monthOrder
      .map(m => byMonth[m] || { month: m, applications: 0, approved: 0 })
      .slice(0, 6); // last 6 months
  })();

  // Page Views: use contacts as a proxy for engagement (group by day of week)
  const pageViewsData = (() => {
    if (!contactsData?.items) return [];
    const byDay = {};
    contactsData.items.forEach(msg => {
      if (!msg.created_at) return;
      const date = new Date(msg.created_at);
      const day = date.toLocaleString('en-US', { weekday: 'short' });
      if (!byDay[day]) byDay[day] = { date: day, views: 0, users: 0 };
      byDay[day].views += 1;
      byDay[day].users += 1; // treat each contact as a user
    });
    const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    return days.map(d => byDay[d] || { date: d, views: 0, users: 0 });
  })();

  return (
    <AdminLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          font-family: 'Outfit', sans-serif;
        }
        
        .mono {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .stat-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%);
          border: 1px solid rgba(0,0,0,0.06);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .dark .stat-card {
          background: linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(15,15,15,0.85) 100%);
          border: 1px solid rgba(255,255,255,0.08);
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border-color: rgba(0,0,0,0.12);
        }
        
        .dark .stat-card:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          border-color: rgba(255,255,255,0.12);
        }
        
        .icon-gradient-blue {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .icon-gradient-green {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }
        
        .icon-gradient-orange {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .icon-gradient-purple {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
        
        .section-card {
          background: white;
          border: 1px solid rgba(0,0,0,0.06);
          transition: all 0.3s ease;
        }
        
        .dark .section-card {
          background: #141414;
          border: 1px solid rgba(255,255,255,0.08);
        }
        
        .section-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        
        .dark .section-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .stagger-1 { animation-delay: 0.1s; opacity: 0; }
        .stagger-2 { animation-delay: 0.2s; opacity: 0; }
        .stagger-3 { animation-delay: 0.3s; opacity: 0; }
        .stagger-4 { animation-delay: 0.4s; opacity: 0; }
        
        .pulse-subtle {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .trend-up {
          color: #10b981;
          font-weight: 600;
        }
        
        .metric-value {
          font-weight: 700;
          letter-spacing: -0.03em;
        }
      `}</style>

      <div className="p-6 md:p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Applications */}
          <div className="stat-card rounded-2xl p-6 animate-fade-in-up stagger-1">
            <div className="flex items-start justify-between mb-4">
              <div className="icon-gradient-blue p-3 rounded-xl">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-black/60 dark:text-white/60 uppercase tracking-wide">
                Applications
              </p>
              <p className="text-4xl metric-value text-black dark:text-white">
                {data?.items?.length || 0}
              </p>
              <p className="text-xs trend-up flex items-center gap-1">
                <span>↑ 12%</span>
                <span className="text-black/40 dark:text-white/40 font-normal">vs last month</span>
              </p>
            </div>
          </div>

          {/* Team Members */}
          <div className="stat-card rounded-2xl p-6 animate-fade-in-up stagger-2">
            <div className="flex items-start justify-between mb-4">
              <div className="icon-gradient-green p-3 rounded-xl">
                <Users className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-black/60 dark:text-white/60 uppercase tracking-wide">
                Team Members
              </p>
              <p className="text-4xl metric-value text-black dark:text-white">
                {isLoadingTeam ? "..." : teamData?.items?.length || 0}
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="stat-card rounded-2xl p-6 animate-fade-in-up stagger-3">
            <div className="flex items-start justify-between mb-4">
              <div className="icon-gradient-orange p-3 rounded-xl">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-black/60 dark:text-white/60 uppercase tracking-wide">
                Services
              </p>
              <p className="text-4xl metric-value text-black dark:text-white">
                {isLoadingServices ? "..." : servicesData?.items?.length || 0}
              </p>
            </div>
          </div>

          {/* Portfolio */}
          <div className="stat-card rounded-2xl p-6 animate-fade-in-up stagger-4">
            <div className="flex items-start justify-between mb-4">
              <div className="icon-gradient-blue p-3 rounded-xl">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-black/60 dark:text-white/60 uppercase tracking-wide">
                Portfolio
              </p>
              <p className="text-4xl metric-value text-black dark:text-white">
                {isLoadingPortfolio ? "..." : portfolioData?.items?.length || 0}
              </p>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="stat-card rounded-2xl p-6 animate-fade-in-up stagger-1">
            <div className="flex items-start justify-between mb-4">
              <div className="icon-gradient-purple p-3 rounded-xl">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-black/60 dark:text-white/60 uppercase tracking-wide">
                Blog Posts
              </p>
              <p className="text-4xl metric-value text-black dark:text-white">
                {isLoadingBlog ? "..." : blogData?.items?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications Chart */}
          <div className="section-card rounded-2xl p-6 animate-fade-in-up">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-black dark:text-white">
                  Applications Trend
                </h3>
                <div className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5">
                  <span className="text-xs font-semibold text-black/70 dark:text-white/70 mono">
                    6M
                  </span>
                </div>
              </div>
              <p className="text-sm text-black/50 dark:text-white/50 font-medium">
                Last 6 months performance overview
              </p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(0,0,0,0.3)"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                />
                <YAxis 
                  stroke="rgba(0,0,0,0.3)"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "12px",
                    padding: "12px",
                    fontWeight: 500,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 600 }} />
                <Bar dataKey="applications" fill="url(#blueGradient)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="approved" fill="url(#greenGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#11998e" />
                    <stop offset="100%" stopColor="#38ef7d" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Page Views Chart */}
          <div className="section-card rounded-2xl p-6 animate-fade-in-up">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-black dark:text-white">
                  Engagement Metrics
                </h3>
                <div className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5">
                  <span className="text-xs font-semibold text-black/70 dark:text-white/70 mono">
                    7D
                  </span>
                </div>
              </div>
              <p className="text-sm text-black/50 dark:text-white/50 font-medium">
                Weekly views and user activity
              </p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={pageViewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(0,0,0,0.3)"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                />
                <YAxis 
                  stroke="rgba(0,0,0,0.3)"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "12px",
                    padding: "12px",
                    fontWeight: 500,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 600 }} />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#f093fb"
                  strokeWidth={3}
                  dot={{ fill: "#f093fb", r: 5, strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#4facfe"
                  strokeWidth={3}
                  dot={{ fill: "#4facfe", r: 5, strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Applications Table */}
        <section className="section-card rounded-2xl p-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="icon-gradient-blue p-2.5 rounded-xl">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-black dark:text-white">
                  Job Applications
                </h2>
                <p className="text-sm text-black/50 dark:text-white/50 font-medium">
                  Review and manage career applications
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 font-medium"
            >
              <Clock className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-3 border-black/10 dark:border-white/10 border-t-black dark:border-t-white"></div>
                <p className="text-sm text-black/50 dark:text-white/50 font-medium">
                  Loading applications...
                </p>
              </div>
            </div>
          )}
          
          {isError && (
            <div className="p-6 bg-red-50 dark:bg-red-950/20 border-2 border-red-100 dark:border-red-900/30 rounded-xl">
              <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                Failed to load applications. Please ensure you are logged in and the backend is running.
              </p>
            </div>
          )}

          {!isLoading && !isError && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black/5 dark:border-white/5">
                    <th className="py-4 px-4 text-left text-xs font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-bold text-black/70 dark:text-white/70 uppercase tracking-wider hidden md:table-cell">
                      Contact
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-bold text-black/70 dark:text-white/70 uppercase tracking-wider hidden lg:table-cell">
                      Submitted
                    </th>
                    <th className="py-4 px-4 text-right text-xs font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.items?.length ? (
                    data.items.map((app, index) => (
                      <tr
                        key={app._id}
                        className="border-b border-black/5 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                        style={{ 
                          animation: 'fadeInUp 0.4s ease-out forwards',
                          animationDelay: `${index * 0.05}s`,
                          opacity: 0
                        }}
                      >
                        <td className="py-4 px-4">
                          <span className="font-semibold text-black dark:text-white">
                            {app.job_title}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border border-black/10 dark:border-white/10">
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${app.name}`}
                              />
                              <AvatarFallback className="text-xs font-bold bg-black/5 dark:bg-white/5">
                                {app.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-black dark:text-white">
                              {app.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 hidden md:table-cell">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                              <Mail className="w-3.5 h-3.5" />
                              <span className="mono text-xs">{app.email}</span>
                            </div>
                            {app.phone && (
                              <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                                <Phone className="w-3.5 h-3.5" />
                                <span className="mono text-xs">{app.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 hidden lg:table-cell">
                          <span className="text-sm text-black/60 dark:text-white/60 font-medium">
                            {app.created_at
                              ? new Date(app.created_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })
                              : "—"}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isDeleting}
                            onClick={() => handleDelete(app._id)}
                            className="hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-black/40 dark:text-white/40 font-medium"
                      >
                        No applications submitted yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Pages Management */}
        <section className="section-card rounded-2xl p-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="icon-gradient-green p-2.5 rounded-xl">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-black dark:text-white">
                  Content Management
                </h2>
                <p className="text-sm text-black/50 dark:text-white/50 font-medium">
                  Manage page sections and configurations
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() =>
                setEditing({
                  page: "home",
                  key: "hero",
                  data: JSON.stringify(
                    {
                      title:
                        "Build Your Digital Future with <span class=\"text-gradient\">Codivra Solution</span>",
                      subtitle:
                        "We craft innovative web solutions, custom software, and digital strategies that drive business growth.",
                      badge: "Transforming Ideas into Digital Excellence",
                    },
                    null,
                    2
                  ),
                })
              }
              className="icon-gradient-green border-0 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Section
            </Button>
          </div>

          {isLoadingPages && (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-3 border-black/10 dark:border-white/10 border-t-black dark:border-t-white"></div>
                <p className="text-sm text-black/50 dark:text-white/50 font-medium">
                  Loading content...
                </p>
              </div>
            </div>
          )}

          {!isLoadingPages && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black/5 dark:border-white/5">
                    <th className="py-4 px-4 text-left text-xs font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">
                      Page
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">
                      Section Key
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-bold text-black/70 dark:text-white/70 uppercase tracking-wider hidden md:table-cell">
                      Last Updated
                    </th>
                    <th className="py-4 px-4 text-right text-xs font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pagesData?.sections?.length ? (
                    pagesData.sections.map((section: PageSection, index) => (
                      <tr
                        key={section._id}
                        className="border-b border-black/5 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                        style={{ 
                          animation: 'fadeInUp 0.4s ease-out forwards',
                          animationDelay: `${index * 0.05}s`,
                          opacity: 0
                        }}
                      >
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 font-semibold text-sm text-black dark:text-white">
                            {section.page}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="mono text-sm font-medium text-black/80 dark:text-white/80">
                            {section.key}
                          </span>
                        </td>
                        <td className="py-4 px-4 hidden md:table-cell">
                          <span className="text-sm text-black/60 dark:text-white/60 font-medium">
                            {section.updated_at
                              ? new Date(section.updated_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })
                              : "—"}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setEditing({
                                  id: section._id,
                                  page: section.page,
                                  key: section.key,
                                  data: JSON.stringify(
                                    section.data ?? {},
                                    null,
                                    2
                                  ),
                                })
                              }
                              className="border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 font-medium"
                            >
                              <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={isDeletingSection}
                              onClick={async () => {
                                if (!window.confirm("Delete this section?")) return;
                                try {
                                  await deletePageSection(section._id).unwrap();
                                  toast({
                                    title: "Deleted",
                                    description: "Section has been removed.",
                                  });
                                  refetchPages();
                                } catch (error) {
                                  console.error("Failed to delete section:", error);
                                  toast({
                                    title: "Delete failed",
                                    description: "Could not delete section.",
                                    variant: "destructive",
                                  });
                                }
                              }}
                              className="hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-12 text-center text-black/40 dark:text-white/40 font-medium"
                      >
                        No page sections configured yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Recent Data Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Recent Job Applications */}
          <div className="section-card rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 text-black dark:text-white">Recent Job Applications</h3>
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {(data?.items || []).slice(0, 5).map(app => (
                <li key={app._id} className="py-2 flex flex-col">
                  <span className="font-semibold text-black dark:text-white">{app.name}</span>
                  <span className="text-xs text-black/50 dark:text-white/50">{app.job_title}</span>
                </li>
              ))}
              {(!data?.items || data.items.length === 0) && <li className="py-2 text-black/40 dark:text-white/40">No applications</li>}
            </ul>
          </div>
          {/* Recent Contact Messages */}
          <div className="section-card rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 text-black dark:text-white">Recent Contacts</h3>
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {(contactsData?.items || []).slice(0, 5).map(msg => (
                <li key={msg._id} className="py-2 flex flex-col">
                  <span className="font-semibold text-black dark:text-white">{msg.name}</span>
                  <span className="text-xs text-black/50 dark:text-white/50">{msg.email}</span>
                </li>
              ))}
              {(!contactsData?.items || contactsData.items.length === 0) && <li className="py-2 text-black/40 dark:text-white/40">No messages</li>}
            </ul>
          </div>
          {/* Recent Blog Posts */}
          <div className="section-card rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 text-black dark:text-white">Recent Blog Posts</h3>
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {(blogData?.items || []).slice(0, 5).map(post => (
                <li key={post._id} className="py-2 flex flex-col">
                  <span className="font-semibold text-black dark:text-white">{post.title}</span>
                  <span className="text-xs text-black/50 dark:text-white/50">{post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</span>
                </li>
              ))}
              {(!blogData?.items || blogData.items.length === 0) && <li className="py-2 text-black/40 dark:text-white/40">No blog posts</li>}
            </ul>
          </div>
          {/* Recent Portfolio Items */}
          <div className="section-card rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 text-black dark:text-white">Recent Portfolio</h3>
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {(portfolioData?.items || []).slice(0, 5).map(item => (
                <li key={item._id} className="py-2 flex flex-col">
                  <span className="font-semibold text-black dark:text-white">{item.title}</span>
                  <span className="text-xs text-black/50 dark:text-white/50">{item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}</span>
                </li>
              ))}
              {(!portfolioData?.items || portfolioData.items.length === 0) && <li className="py-2 text-black/40 dark:text-white/40">No portfolio items</li>}
            </ul>
          </div>
          {/* Recent Team Members */}
          <div className="section-card rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 text-black dark:text-white">Recent Team Members</h3>
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {(teamData?.items || []).slice(0, 5).map(member => (
                <li key={member._id} className="py-2 flex flex-col">
                  <span className="font-semibold text-black dark:text-white">{member.name}</span>
                  <span className="text-xs text-black/50 dark:text-white/50">{member.role}</span>
                </li>
              ))}
              {(!teamData?.items || teamData.items.length === 0) && <li className="py-2 text-black/40 dark:text-white/40">No team members</li>}
            </ul>
          </div>
        </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="section-card rounded-2xl max-w-3xl w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            style={{
              animation: 'fadeInUp 0.3s ease-out'
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  {editing.id ? "Edit Section" : "Create New Section"}
                </h3>
                <p className="text-sm text-black/50 dark:text-white/50 font-medium mt-1">
                  Configure page content and metadata
                </p>
              </div>
              <button
                onClick={() => setEditing(null)}
                className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <span className="text-2xl text-black/40 dark:text-white/40">×</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black/70 dark:text-white/70 uppercase tracking-wide mb-2">
                  Page Name
                </label>
                <input
                  className="w-full h-11 px-4 rounded-xl border-2 border-black/10 dark:border-white/10 bg-white dark:bg-black text-sm font-medium text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                  value={editing.page}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      page: e.target.value,
                    } as any)
                  }
                  placeholder="home"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black/70 dark:text-white/70 uppercase tracking-wide mb-2">
                  Section Key
                </label>
                <input
                  className="w-full h-11 px-4 rounded-xl border-2 border-black/10 dark:border-white/10 bg-white dark:bg-black text-sm font-medium text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors mono"
                  value={editing.key}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      key: e.target.value,
                    } as any)
                  }
                  placeholder="hero"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black/70 dark:text-white/70 uppercase tracking-wide mb-2">
                JSON Configuration
              </label>
              <textarea
                className="w-full h-80 p-4 rounded-xl border-2 border-black/10 dark:border-white/10 bg-white dark:bg-black text-xs mono text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors resize-none"
                value={editing.data}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    data: e.target.value,
                  } as any)
                }
                placeholder='{\n  "title": "Your content here"\n}'
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t-2 border-black/5 dark:border-white/5">
              <Button
                variant="outline"
                onClick={() => setEditing(null)}
                className="border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 font-semibold px-6"
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  try {
                    const parsed = JSON.parse(editing.data);
                    await upsertPage({
                      page: editing.page,
                      key: editing.key,
                      data: parsed,
                    }).unwrap();
                    toast({
                      title: "Saved Successfully",
                      description: "Section content has been updated.",
                    });
                    setEditing(null);
                    refetchPages();
                  } catch (error: any) {
                    console.error("Failed to save section:", error);
                    toast({
                      title: "Save Failed",
                      description:
                        error?.message || "Please check your JSON syntax.",
                      variant: "destructive",
                    });
                  }
                }}
                className="icon-gradient-green border-0 text-white font-semibold hover:opacity-90 transition-opacity px-6"
              >
                <ChevronRight className="w-4 h-4 mr-1" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;