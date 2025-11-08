import type { Meta, StoryObj } from '@storybook/react'
import { MysticalBreadcrumb } from '@workspace/ui'

const meta = {
	title: 'Molecules/MysticalBreadcrumb',
	component: MysticalBreadcrumb,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Sistema de navegação breadcrumb clean e elegante. Segue melhores práticas de UX com design horizontal, separadores sutis e hierarquia visual clara. O toque místico vem do gradiente na página atual e Sparkle opcional.',
			},
		},
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div className="min-h-[120px] flex items-start pt-8 bg-gradient-to-br from-background via-muted/10 to-background">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof MysticalBreadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Breadcrumb padrão com design clean e hierarquia clara.
 * Ícone Home no primeiro item, separadores ChevronRight sutis, última página destacada com gradiente.
 */
export const Default: Story = {
	args: {
		items: [
			{ label: 'Início', href: '/' },
			{ label: 'Cartas', href: '/cartas' },
			{ label: 'O Mago' },
		],
		showSparkles: true,
	},
}

/**
 * Breadcrumb sem o Sparkle místico na página atual.
 * Design ainda mais minimalista.
 */
export const WithoutSparkles: Story = {
	args: {
		items: [
			{ label: 'Início', href: '/' },
			{ label: 'Baralhos', href: '/decks' },
			{ label: 'Rider-Waite' },
		],
		showSparkles: false,
	},
}

/**
 * Breadcrumb com caminho curto (2 níveis).
 * Demonstra comportamento com navegação simples.
 */
export const ShortPath: Story = {
	args: {
		items: [{ label: 'Cartas', href: '/cartas' }, { label: 'O Louco' }],
		showSparkles: true,
	},
}

/**
 * Breadcrumb com caminho profundo (5 níveis).
 * Mostra como o componente escala com múltiplos níveis de navegação.
 */
export const DeepPath: Story = {
	args: {
		items: [
			{ label: 'Início', href: '/' },
			{ label: 'Baralhos', href: '/decks' },
			{ label: 'Rider-Waite', href: '/decks/rider-waite' },
			{ label: 'Arcanos Maiores', href: '/decks/rider-waite/major' },
			{ label: 'A Imperatriz' },
		],
		showSparkles: true,
	},
}

/**
 * Breadcrumb com apenas página atual (sem navegação).
 * Usado quando não há caminho para voltar.
 */
export const CurrentPageOnly: Story = {
	args: {
		items: [{ label: 'Página Atual' }],
		showSparkles: true,
	},
}

/**
 * Exemplo de uso em página de erro (404).
 * Demonstra estado de erro mantendo a navegação disponível.
 */
export const ErrorPage: Story = {
	args: {
		items: [
			{ label: 'Início', href: '/' },
			{ label: 'Cartas', href: '/cartas' },
			{ label: 'Não encontrada' },
		],
		showSparkles: true,
	},
}

/**
 * Breadcrumb para navegação em baralhos.
 * Exemplo prático de uso real no aplicativo.
 */
export const DeckNavigation: Story = {
	args: {
		items: [
			{ label: 'Início', href: '/' },
			{ label: 'Baralhos', href: '/decks' },
			{ label: 'Tarot de Marselha' },
		],
		showSparkles: true,
	},
}

/**
 * Breadcrumb para jornada espiritual.
 * Demonstra uso em seções de registro pessoal.
 */
export const JourneyNavigation: Story = {
	args: {
		items: [
			{ label: 'Início', href: '/' },
			{ label: 'Jornada', href: '/jornada' },
			{ label: 'Leituras', href: '/jornada/leituras' },
			{ label: 'Lua Cheia - Março 2025' },
		],
		showSparkles: true,
	},
}

/**
 * Demonstra o hover effect nos links.
 * Passe o mouse sobre os links para ver a transição de cor para purple.
 */
export const HoverEffect: Story = {
	args: {
		items: [
			{ label: 'Início', href: '/' },
			{ label: 'Cartas', href: '/cartas' },
			{ label: 'Arcanos Maiores', href: '/cartas/major' },
			{ label: 'O Mago' },
		],
		showSparkles: true,
	},
}
