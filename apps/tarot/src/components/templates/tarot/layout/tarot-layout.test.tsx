'use client'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { TarotLayout } from './tarot-layout'

vi.mock('@/shared/components', () => ({
	MysticalLayout: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="mystical-layout">{children}</div>
	),
}))

describe('TarotLayout', () => {
	it('deve renderizar children corretamente', () => {
		render(
			<TarotLayout>
				<div data-testid="child">Conteúdo filho</div>
			</TarotLayout>,
		)

		expect(screen.getByTestId('child')).toBeInTheDocument()
		expect(screen.getByText('Conteúdo filho')).toBeInTheDocument()
	})

	it('deve usar MysticalLayout como base', () => {
		render(
			<TarotLayout>
				<span>Teste</span>
			</TarotLayout>,
		)

		expect(screen.getByTestId('mystical-layout')).toBeInTheDocument()
	})
})
