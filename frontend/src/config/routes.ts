/**
 * Route Configuration - Integrates Sidebar with React Router
 * Links sidebar navigation to actual routes
 */

import {
  AdminDashboard,
  AdminServices,
  AdminAbout,
  AdminPricing,
  AdminPortfolio,
  AdminBlog,
  AdminCareers,
  AdminContact,
  Index,
  Services,
  About,
  Pricing,
  Portfolio,
  Blog,
  Careers,
  Contact,
  AdminLogin,
  NotFound,
} from '@/pages';

export interface RouteConfig {
  path: string;
  label: string;
  component: React.ComponentType<any>;
  context: 'admin' | 'website';
  sidebar?: boolean;
  auth?: boolean;
}

/**
 * Admin Routes Configuration
 */
export const adminRoutes: RouteConfig[] = [
  {
    path: '/admin/dashboard',
    label: 'Dashboard',
    component: AdminDashboard,
    context: 'admin',
    sidebar: true,
    auth: true,
  },
  {
    path: '/admin/services',
    label: 'Services',
    component: AdminServices,
    context: 'admin',
    sidebar: true,
    auth: true,
  },
  {
    path: '/admin/about',
    label: 'About',
    component: AdminAbout,
    context: 'admin',
    sidebar: true,
    auth: true,
  },
  {
    path: '/admin/pricing',
    label: 'Pricing',
    component: AdminPricing,
    context: 'admin',
    sidebar: true,
    auth: true,
  },
  {
    path: '/admin/portfolio',
    label: 'Portfolio',
    component: AdminPortfolio,
    context: 'admin',
    sidebar: true,
    auth: true,
  },
  {
    path: '/admin/blog',
    label: 'Blog',
    component: AdminBlog,
    context: 'admin',
    sidebar: true,
    auth: true,
  },
  {
    path: '/admin/careers',
    label: 'Careers',
    component: AdminCareers,
    context: 'admin',
    sidebar: true,
    auth: true,
  },
  {
    path: '/admin/contact',
    label: 'Contact',
    component: AdminContact,
    context: 'admin',
    sidebar: true,
    auth: true,
  },
  {
    path: '/admin/login',
    label: 'Login',
    component: AdminLogin,
    context: 'admin',
    sidebar: false,
    auth: false,
  },
];

/**
 * Website Routes Configuration
 */
export const websiteRoutes: RouteConfig[] = [
  {
    path: '/',
    label: 'Home',
    component: Index,
    context: 'website',
    sidebar: true,
  },
  {
    path: '/services',
    label: 'Services',
    component: Services,
    context: 'website',
    sidebar: true,
  },
  {
    path: '/about',
    label: 'About',
    component: About,
    context: 'website',
    sidebar: true,
  },
  {
    path: '/pricing',
    label: 'Pricing',
    component: Pricing,
    context: 'website',
    sidebar: true,
  },
  {
    path: '/portfolio',
    label: 'Portfolio',
    component: Portfolio,
    context: 'website',
    sidebar: true,
  },
  {
    path: '/blog',
    label: 'Blog',
    component: Blog,
    context: 'website',
    sidebar: true,
  },
  {
    path: '/careers',
    label: 'Careers',
    component: Careers,
    context: 'website',
    sidebar: true,
  },
  {
    path: '/contact',
    label: 'Contact',
    component: Contact,
    context: 'website',
    sidebar: true,
  },
];

/**
 * All Routes Combined
 */
export const allRoutes = [...adminRoutes, ...websiteRoutes];

/**
 * Get route config by path
 */
export const getRouteConfig = (path: string): RouteConfig | undefined => {
  return allRoutes.find((route) => route.path === path);
};

/**
 * Get all routes for a context
 */
export const getRoutesByContext = (context: 'admin' | 'website'): RouteConfig[] => {
  return allRoutes.filter((route) => route.context === context);
};

/**
 * Get routes with sidebar enabled
 */
export const getSidebarRoutes = (): RouteConfig[] => {
  return allRoutes.filter((route) => route.sidebar !== false);
};

/**
 * Get auth protected routes
 */
export const getProtectedRoutes = (): RouteConfig[] => {
  return allRoutes.filter((route) => route.auth === true);
};
