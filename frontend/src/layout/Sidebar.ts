import { BarChart3, Zap, Palette, DollarSign, Layout, BookOpen, Briefcase, MessageSquare, Home } from 'lucide-react';

/**
 * Page File References
 * Links to actual component files
 */

// Admin Pages
// - src/pages/admin/AdminDashboard.tsx
// - src/pages/admin/AdminServices.tsx
// - src/pages/admin/AdminAbout.tsx
// - src/pages/admin/AdminPricing.tsx
// - src/pages/admin/AdminPortfolio.tsx
// - src/pages/admin/AdminBlog.tsx
// - src/pages/admin/AdminCareers.tsx
// - src/pages/admin/AdminContact.tsx

// Website Pages
// - src/pages/Index.tsx (Home)
// - src/pages/Services.tsx
// - src/pages/About.tsx
// - src/pages/Pricing.tsx
// - src/pages/Portfolio.tsx
// - src/pages/Blog.tsx
// - src/pages/Careers.tsx
// - src/pages/Contact.tsx

export interface SidebarItem {
  id: string;
  label: string;
  path: string;
  icon: any;
  badge?: string;
  description?: string;
  componentPath?: string; // Reference to actual component file
}

// Admin Sidebar Items
export const adminSidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: BarChart3,
    description: 'View analytics and statistics',
    componentPath: 'src/pages/admin/AdminDashboard.tsx',
  },
  {
    id: 'services',
    label: 'Services',
    path: '/admin/services',
    icon: Zap,
    description: 'Manage services content',
    componentPath: 'src/pages/admin/AdminServices.tsx',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    path: '/admin/portfolio',
    icon: Layout,
    description: 'Manage portfolio items',
    componentPath: 'src/pages/admin/AdminPortfolio.tsx',
  },
  {
    id: 'blog',
    label: 'Blog',
    path: '/admin/blog',
    icon: BookOpen,
    description: 'Manage blog posts',
    componentPath: 'src/pages/admin/AdminBlog.tsx',
  },
  {
    id: 'careers',
    label: 'Careers',
    path: '/admin/careers',
    icon: Briefcase,
    description: 'Manage job openings',
    componentPath: 'src/pages/admin/AdminCareers.tsx',
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/admin/contact',
    icon: MessageSquare,
    description: 'View contact submissions',
    componentPath: 'src/pages/admin/AdminContact.tsx',
  },
];

// Main Website Sidebar (for mobile/drawer menu)
export const websiteSidebarItems: SidebarItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: Home,
    description: 'Back to home page',
    componentPath: 'src/pages/Index.tsx',
  },
  {
    id: 'services',
    label: 'Services',
    path: '/services',
    icon: Zap,
    description: 'Our services and solutions',
    componentPath: 'src/pages/Services.tsx',
  },
  {
    id: 'about',
    label: 'About',
    path: '/about',
    icon: Palette,
    description: 'Learn about us',
    componentPath: 'src/pages/About.tsx',
  },
  {
    id: 'pricing',
    label: 'Pricing',
    path: '/pricing',
    icon: DollarSign,
    description: 'Check our pricing',
    componentPath: 'src/pages/Pricing.tsx',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    path: '/portfolio',
    icon: Layout,
    description: 'View our work',
    componentPath: 'src/pages/Portfolio.tsx',
  },
  {
    id: 'blog',
    label: 'Blog',
    path: '/blog',
    icon: BookOpen,
    description: 'Read our articles',
    componentPath: 'src/pages/Blog.tsx',
  },
  {
    id: 'careers',
    label: 'Careers',
    path: '/careers',
    icon: Briefcase,
    description: 'Join our team',
    componentPath: 'src/pages/Careers.tsx',
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    icon: MessageSquare,
    description: 'Get in touch',
    componentPath: 'src/pages/Contact.tsx',
  },
];

// Get sidebar items based on context
export const getSidebarItems = (context: 'admin' | 'website' = 'website'): SidebarItem[] => {
  return context === 'admin' ? adminSidebarItems : websiteSidebarItems
};

// Quick actions or additional sidebar sections
export interface SidebarSection {
  id: string;
  title: string;
  items: SidebarItem[];
}

export const adminSidebarSections: SidebarSection[] = [
  {
    id: 'main',
    title: 'Main',
    items: adminSidebarItems,
  },
];

export const websiteSidebarSections: SidebarSection[] = [
  {
    id: 'main',
    title: 'Navigation',
    items: websiteSidebarItems,
  },
];

/**
 * Page File Mapping
 * Maps routes to component files for reference
 */
export const pageFileMapping = {
  // Admin Pages
  '/admin/dashboard': 'src/pages/admin/AdminDashboard.tsx',
  '/admin/services': 'src/pages/admin/AdminServices.tsx',
  '/admin/about': 'src/pages/admin/AdminAbout.tsx',
  '/admin/pricing': 'src/pages/admin/AdminPricing.tsx',
  '/admin/portfolio': 'src/pages/admin/AdminPortfolio.tsx',
  '/admin/blog': 'src/pages/admin/AdminBlog.tsx',
  '/admin/careers': 'src/pages/admin/AdminCareers.tsx',
  '/admin/contact': 'src/pages/admin/AdminContact.tsx',
  
  // Website Pages
  '/': 'src/pages/Index.tsx',
  '/services': 'src/pages/Services.tsx',
  '/about': 'src/pages/About.tsx',
  '/pricing': 'src/pages/Pricing.tsx',
  '/portfolio': 'src/pages/Portfolio.tsx',
  '/blog': 'src/pages/Blog.tsx',
  '/careers': 'src/pages/Careers.tsx',
  '/contact': 'src/pages/Contact.tsx',
} as const;

/**
 * Get component path for a given route
 */
export const getComponentPath = (route: string): string | undefined => {
  return pageFileMapping[route as keyof typeof pageFileMapping];
};
