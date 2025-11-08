import type { Meta, StoryObj } from '@storybook/react'
import { MysticalBackground } from '@workspace/ui'

const meta = {
	title: 'Molecules/MysticalBackground',
	component: MysticalBackground,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Background místico animado reutilizável inspirado em constelações, astros e partículas cósmicas. Perfeito para adicionar atmosfera mística a cards, modais e containers sem sobrecarregar visualmente.',
			},
		},
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div className="min-h-[600px] flex items-center justify-center bg-background">
				<div className="relative w-full max-w-3xl h-96 rounded-2xl border border-border/40 bg-background overflow-hidden">
					<Story />
					{/* Conteúdo exemplo */}
					<div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
						<h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
							Background Místico
						</h2>
						<p className="text-muted-foreground max-w-md">
							Este é um exemplo de card com background animado. O efeito é sutil
							o suficiente para não competir com o conteúdo.
						</p>
					</div>
				</div>
			</div>
		),
	],
} satisfies Meta<typeof MysticalBackground>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Variante Stars (padrão) - Estrelas flutuantes com orbs sutis.
 * Ideal para a maioria dos cards e containers.
 */
export const Stars: Story = {
	args: {
		variant: 'stars',
		intensity: 'subtle',
	},
}

/**
 * Variante Stars com intensidade média.
 * Mais visível mas ainda balanceada.
 */
export const StarsMedium: Story = {
	args: {
		variant: 'stars',
		intensity: 'medium',
	},
}

/**
 * Variante Stars com intensidade forte.
 * Efeito mais dramático para destaques especiais.
 */
export const StarsStrong: Story = {
	args: {
		variant: 'stars',
		intensity: 'strong',
	},
}

/**
 * Variante Constellation - Constelação conectada com linhas.
 * Efeito geométrico sagrado, perfeito para conteúdo místico.
 */
export const Constellation: Story = {
	args: {
		variant: 'constellation',
		intensity: 'subtle',
	},
}

/**
 * Variante Constellation média.
 * Constelação mais visível mantendo sutileza.
 */
export const ConstellationMedium: Story = {
	args: {
		variant: 'constellation',
		intensity: 'medium',
	},
}

/**
 * Variante Orbs - Orbs flutuantes com blur.
 * Efeito etéreo e suave, ideal para backgrounds grandes.
 */
export const Orbs: Story = {
	args: {
		variant: 'orbs',
		intensity: 'subtle',
	},
}

/**
 * Variante Orbs média.
 * Orbs mais pronunciados para maior impacto visual.
 */
export const OrbsMedium: Story = {
	args: {
		variant: 'orbs',
		intensity: 'medium',
	},
}

/**
 * Variante Minimal - Apenas gradiente sutil.
 * Para quando você quer atmosfera sem elementos animados.
 */
export const Minimal: Story = {
	args: {
		variant: 'minimal',
		intensity: 'subtle',
	},
}

/**
 * Exemplo de uso em card de deck.
 * Demonstra aplicação real no design.
 */
export const DeckCard: Story = {
	args: {
		variant: 'stars',
		intensity: 'subtle',
	},
	decorators: [
		(Story) => (
			<div className="min-h-[600px] flex items-center justify-center bg-background p-8">
				<div className="relative w-full max-w-sm rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/10 overflow-hidden shadow-xl">
					<Story />
					{/* Conteúdo do card */}
					<div className="relative z-10 p-8 space-y-6">
						{/* Imagem placeholder */}
						<div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-purple-900/20 via-violet-900/20 to-indigo-900/20 border border-purple-500/20" />

						{/* Conteúdo */}
						<div className="space-y-3">
							<h3 className="text-2xl font-semibold">Rider-Waite Tarot</h3>
							<p className="text-sm text-muted-foreground">
								Tradição Golden Dawn • 78 cartas
							</p>
							<p className="text-sm text-muted-foreground/80 leading-relaxed">
								O baralho mais icônico e influente da história do Tarot moderno.
							</p>
						</div>

						{/* Stats */}
						<div className="flex items-center gap-6 pt-3 text-xs text-muted-foreground border-t border-border/30">
							<div className="flex items-center gap-1.5">
								<div className="size-1.5 rounded-full bg-purple-500/70" />
								<span className="font-medium">78</span>
								<span>cartas</span>
							</div>
							<div className="flex items-center gap-1.5">
								<div className="size-1.5 rounded-full bg-indigo-500/70" />
								<span className="font-medium">12</span>
								<span>tags</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		),
	],
}

/**
 * Exemplo de uso em modal ou página.
 * Background fullscreen com conteúdo centralizado.
 */
export const FullscreenModal: Story = {
	args: {
		variant: 'constellation',
		intensity: 'medium',
	},
	decorators: [
		(Story) => (
			<div className="fixed inset-0 bg-background">
				<Story />
				<div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
					<div className="max-w-2xl text-center space-y-6">
						<div className="inline-flex items-center justify-center size-20 rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 mb-4">
							<span className="text-4xl">✨</span>
						</div>
						<h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
							Portal Místico
						</h1>
						<p className="text-xl text-muted-foreground leading-relaxed">
							Bem-vindo ao espaço sagrado de sabedoria ancestral. Aqui, cada
							símbolo é uma porta para o inconsciente coletivo.
						</p>
					</div>
				</div>
			</div>
		),
	],
}
