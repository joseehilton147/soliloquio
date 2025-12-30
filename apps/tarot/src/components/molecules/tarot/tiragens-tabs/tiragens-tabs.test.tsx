'use client'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { TarotTiragensTabs } from './tiragens-tabs'

vi.mock('@workspace/ui', () => ({
	MysticalTabs: ({
		children,
		title,
		defaultTab,
	}: {
		children: (activeTab: string) => React.ReactNode
		title: string
		defaultTab: string
	}) => (
		<div data-testid="mystical-tabs">
			<h2>{title}</h2>
			{children(defaultTab)}
		</div>
	),
}))

vi.mock('@/app/(portal)/tiragens/components', () => ({
	TiragemCategoryPortalCard: ({ category }: { category: { id: string; name: string } }) => (
		<div data-testid="tiragem-card">{category.name}</div>
	),
}))

vi.mock('@/features/tiragens', () => ({
	ALL_CATEGORIES: [
		{ id: 'quick', name: 'Quick', element: 'fire' },
		{ id: 'insight', name: 'Insight', element: 'water' },
	],
}))

vi.mock('@/config/tiragens-tabs.config', () => ({
	TIRAGENS_TABS_CONFIG: [
		{ id: 'quick', label: 'Quick' },
		{ id: 'insight', label: 'Insight' },
	],
	getTiragemTabSubtitle: (tab: string) => `Subtitle for ${tab}`,
}))

describe('TarotTiragensTabs', () => {
	it('deve renderizar o título corretamente', () => {
		render(<TarotTiragensTabs />)

		expect(screen.getByText('Escolha Seu Portal Elemental')).toBeInTheDocument()
	})

	it('deve renderizar o card da categoria ativa', () => {
		render(<TarotTiragensTabs />)

		expect(screen.getByTestId('tiragem-card')).toBeInTheDocument()
		expect(screen.getByText('Quick')).toBeInTheDocument()
	})

	it('deve usar MysticalTabs como base', () => {
		render(<TarotTiragensTabs />)

		expect(screen.getByTestId('mystical-tabs')).toBeInTheDocument()
	})
})
