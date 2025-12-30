'use client'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Providers } from './providers'

vi.mock('@tanstack/react-query', () => ({
	QueryClient: vi.fn().mockImplementation(() => ({})),
	QueryClientProvider: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('@trpc/client', () => ({
	httpBatchLink: vi.fn(),
}))

vi.mock('next-themes', () => ({
	ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('@/lib/trpc', () => ({
	trpc: {
		createClient: vi.fn().mockReturnValue({}),
		Provider: ({ children }: { children: React.ReactNode }) => children,
	},
}))

vi.mock('@/contexts/dock-settings-context', () => ({
	DockSettingsProvider: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('@/shared/components', () => ({
	PageLoadingIndicator: () => null,
}))

describe('Providers', () => {
	it('deve renderizar children corretamente', () => {
		render(
			<Providers>
				<div data-testid="child">Conteúdo filho</div>
			</Providers>,
		)

		expect(screen.getByTestId('child')).toBeInTheDocument()
		expect(screen.getByText('Conteúdo filho')).toBeInTheDocument()
	})

	it('deve envolver children com todos os providers', () => {
		const { container } = render(
			<Providers>
				<span>Test</span>
			</Providers>,
		)

		expect(container).toContainHTML('<span>Test</span>')
	})
})
