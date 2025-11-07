'use client';

import { AppLayout } from '@workspace/ui/components';
import { Home, Sparkles, BookOpen, Users } from 'lucide-react';

const portalNavItems = [
  {
    title: 'Início',
    href: '/',
    icon: Home,
  },
  {
    title: 'Tarot',
    href: 'http://localhost:3002',
    icon: Sparkles,
  },
  {
    title: 'Grimório',
    href: '/grimorio',
    icon: BookOpen,
    badge: 'Em breve',
  },
  {
    title: 'Estudos',
    href: '/estudos',
    icon: Users,
    badge: 'Em breve',
  },
];

export function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout
      appTitle="Solilóquio"
      appSubtitle="Portal Espiritual"
      navItems={portalNavItems}
    >
      {children}
    </AppLayout>
  );
}
