/**
 * Page Index - Central export point for all pages
 * Allows easy imports from @/pages
 */

// Admin Pages
export { default as AdminDashboard } from './admin/AdminDashboard';
export { default as AdminServices } from './admin/AdminServices';
export { default as AdminAbout } from './admin/AdminAbout';
export { default as AdminPricing } from './admin/AdminPricing';
export { default as AdminPortfolio } from './admin/AdminPortfolio';
export { default as AdminBlog } from './admin/AdminBlog';
export { default as AdminCareers } from './admin/AdminCareers';
export { default as AdminContact } from './admin/AdminContact';

// Website Pages
export { default as Index } from './Index.tsx';
export { default as Services } from './Services.tsx';
export { default as About } from './About.tsx';
export { default as Pricing } from './Pricing.tsx';
export { default as Portfolio } from './Portfolio.tsx';
export { default as Blog } from './Blog.tsx';
export { default as Careers } from './Careers.tsx';
export { default as Contact } from './Contact.tsx';

// Auth Pages
export { default as AdminLogin } from './AdminLogin';

// Error Pages
export { default as NotFound } from './NotFound';

/**
 * Type definitions for pages
 */
export type AdminPageName = 
  | 'AdminDashboard'
  | 'AdminServices'
  | 'AdminAbout'
  | 'AdminPricing'
  | 'AdminPortfolio'
  | 'AdminBlog'
  | 'AdminCareers'
  | 'AdminContact';

export type WebsitePageName = 
  | 'Index'
  | 'Services'
  | 'About'
  | 'Pricing'
  | 'Portfolio'
  | 'Blog'
  | 'Careers'
  | 'Contact';

export type PageName = AdminPageName | WebsitePageName | 'AdminLogin' | 'NotFound';
