'use client'

import { AppLayout } from '@workspace/ui/components'
import { Sparkles, Home, BookOpen } from 'lucide-react'

const tarotNavItems = [
	{
		title: 'Início',
		href: '/',
		icon: Home,
	},
	{
		title: 'Todas as Cartas',
		href: '/cartas',
		icon: Sparkles,
	},
	{
		title: 'Portal',
		href: 'http://localhost:3000',
		icon: BookOpen,
	},
]

export function TarotLayout({ children }: { children: React.ReactNode }) {
	return (
		<AppLayout appTitle="Tarot" appSubtitle="Arcanos Maiores" navItems={tarotNavItems}>
			{children}
		</AppLayout>
	)
}
