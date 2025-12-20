export interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export const footerSections: FooterSection[] = [
  {
    id: 'quick-links',
    title: 'Quick Links',
    links: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'services', label: 'Services', href: '/services' },
      { id: 'about', label: 'About Us', href: '/about' },
      { id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
    ],
  },
  {
    id: 'resources',
    title: 'Resources',
    links: [
      { id: 'blog', label: 'Blog', href: '/blog' },
      { id: 'pricing', label: 'Pricing', href: '/pricing' },
      { id: 'careers', label: 'Careers', href: '/careers' },
      { id: 'contact', label: 'Contact', href: '/contact' },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 'about', label: 'About', href: '/about' },
      { id: 'privacy', label: 'Privacy Policy', href: '#' },
      { id: 'terms', label: 'Terms of Service', href: '#' },
      { id: 'contact', label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    links: [
      { id: 'privacy', label: 'Privacy Policy', href: '#' },
      { id: 'terms', label: 'Terms of Service', href: '#' },
      { id: 'cookies', label: 'Cookie Policy', href: '#' },
      { id: 'disclaimer', label: 'Disclaimer', href: '#' },
    ],
  },
];

export const footerBottomLinks = [
  { id: 'status', label: 'Status', href: '#' },
  { id: 'security', label: 'Security', href: '#' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export const footerCopyright = '© 2025 Codivra Solutions. All rights reserved.';
export const footerBrandName = 'Codivra Solutions';
export const footerBrandDescription = 'Professional web solutions and digital services for your business success.';
