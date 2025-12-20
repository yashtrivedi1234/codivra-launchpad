import { BarChart3, Zap, Palette, DollarSign, Layout, BookOpen, Briefcase, MessageSquare, Home } from 'lucide-react';

export interface HeaderLink {
  id: string;
  label: string;
  href: string;
  icon?: any;
}

export const headerLinks: HeaderLink[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: Home,
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    icon: Zap,
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    icon: Palette,
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: '/pricing',
    icon: DollarSign,
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    href: '/portfolio',
    icon: Layout,
  },
  {
    id: 'blog',
    label: 'Blog',
    href: '/blog',
    icon: BookOpen,
  },
  {
    id: 'careers',
    label: 'Careers',
    href: '/careers',
    icon: Briefcase,
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
    icon: MessageSquare,
  },
];
