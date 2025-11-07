'use client';

import * as React from 'react';
import { SidebarProvider, SidebarTrigger } from './sidebar';
import { AppSidebar, type AppSidebarProps } from './app-sidebar';
import { Separator } from '../atoms/separator';

export interface AppLayoutProps extends AppSidebarProps {
  children: React.ReactNode;
}

/**
 * Layout padrão com sidebar compartilhada
 * Usado em todos os apps do Solilóquio
 */
export function AppLayout({ children, ...sidebarProps }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar {...sidebarProps} />
      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-lg font-semibold">
            {sidebarProps.appTitle || 'Solilóquio'}
          </h1>
        </header>
        <div className="flex-1 p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
