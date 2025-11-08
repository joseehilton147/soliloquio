import type { Meta, StoryObj } from '@storybook/react'
import { FilterChip } from '@workspace/ui'
import { Layers, Star, Moon, Sparkles } from 'lucide-react'
import { useState } from 'react'

const meta = {
	title: 'Molecules/FilterChip',
	component: FilterChip,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Chip de filtro clicável e elegante para sistemas de filtragem. Suporta contadores, ícones, estados ativos/inativos e remoção. Ideal para filtros de busca, tags e categorias.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof FilterChip>

export default meta
type Story = StoryObj<typeof meta>

/**
 * FilterChip básico inativo
 */
export const Default: Story = {
	args: {
		label: 'Rider-Waite',
		active: false,
	},
}

/**
 * FilterChip ativo padrão com cor sólida
 */
export const Active: Story = {
	args: {
		label: 'Arcanos Maiores',
		active: true,
		variant: 'default',
	},
}

/**
 * FilterChip ativo místico com gradiente
 */
export const ActiveMystical: Story = {
	args: {
		label: 'Tarot de Marselha',
		active: true,
		variant: 'mystical',
	},
}

/**
 * FilterChip com contador
 */
export const WithCount: Story = {
	args: {
		label: 'Rider-Waite',
		count: 78,
		active: false,
	},
}

/**
 * FilterChip ativo com contador
 */
export const ActiveWithCount: Story = {
	args: {
		label: 'Arcanos Maiores',
		count: 22,
		active: true,
		variant: 'mystical',
	},
}

/**
 * FilterChip com ícone
 */
export const WithIcon: Story = {
	args: {
		label: 'Baralhos',
		icon: <Layers className="size-4" />,
		count: 5,
		active: false,
	},
}

/**
 * FilterChip ativo místico completo (ícone + count + remoção)
 */
export const MysticalComplete: Story = {
	args: {
		label: 'Rider-Waite',
		icon: <Layers className="size-4" />,
		count: 78,
		active: true,
		variant: 'mystical',
		onRemove: () => alert('Removido!'),
	},
}

/**
 * Exemplo interativo - clique para ativar/desativar
 */
export const Interactive: Story = {
	render: () => {
		const [active, setActive] = useState(false)

		return (
			<FilterChip
				label="Clique para ativar"
				icon={<Sparkles className="size-4" />}
				count={42}
				active={active}
				variant="mystical"
				onToggle={() => setActive(!active)}
				onRemove={() => setActive(false)}
			/>
		)
	},
}

/**
 * Grupo de filtros (exemplo de uso real)
 */
export const FilterGroup: Story = {
	render: () => {
		const [selected, setSelected] = useState<string | null>(null)

		const filters = [
			{ label: 'Rider-Waite', count: 78, icon: <Layers className="size-4" /> },
			{ label: 'Tarot de Marselha', count: 78, icon: <Layers className="size-4" /> },
			{ label: 'Thoth', count: 78, icon: <Layers className="size-4" /> },
			{
				label: 'Arcanos Maiores',
				count: 22,
				icon: <Star className="size-4" />,
			},
			{
				label: 'Arcanos Menores',
				count: 56,
				icon: <Moon className="size-4" />,
			},
		]

		return (
			<div className="space-y-4">
				<p className="text-sm text-muted-foreground">Filtrar por:</p>
				<div className="flex flex-wrap gap-2">
					{filters.map((filter) => (
						<FilterChip
							key={filter.label}
							label={filter.label}
							icon={filter.icon}
							count={filter.count}
							active={selected === filter.label}
							variant="mystical"
							onToggle={() => {
								setSelected(selected === filter.label ? null : filter.label)
							}}
							onRemove={() => setSelected(null)}
						/>
					))}
				</div>
				{selected && (
					<p className="text-sm text-muted-foreground">
						Filtro ativo: <strong>{selected}</strong>
					</p>
				)}
			</div>
		)
	},
}

/**
 * Comparação de variantes
 */
export const Variants: Story = {
	render: () => (
		<div className="space-y-6">
			<div className="space-y-2">
				<p className="text-sm font-medium">Variante Default</p>
				<div className="flex gap-2">
					<FilterChip label="Inativo" active={false} variant="default" />
					<FilterChip
						label="Ativo"
						active={true}
						variant="default"
						count={42}
					/>
				</div>
			</div>

			<div className="space-y-2">
				<p className="text-sm font-medium">Variante Mystical</p>
				<div className="flex gap-2">
					<FilterChip label="Inativo" active={false} variant="mystical" />
					<FilterChip
						label="Ativo"
						active={true}
						variant="mystical"
						count={42}
						icon={<Sparkles className="size-4" />}
					/>
				</div>
			</div>
		</div>
	),
}

/**
 * Estados diversos
 */
export const States: Story = {
	render: () => (
		<div className="flex flex-wrap gap-2">
			<FilterChip label="Simples" />
			<FilterChip label="Com Count" count={5} />
			<FilterChip label="Com Ícone" icon={<Star className="size-4" />} />
			<FilterChip
				label="Completo"
				icon={<Sparkles className="size-4" />}
				count={99}
			/>
			<FilterChip
				label="Ativo Simples"
				active={true}
				variant="mystical"
			/>
			<FilterChip
				label="Ativo Completo"
				active={true}
				variant="mystical"
				icon={<Layers className="size-4" />}
				count={78}
				onRemove={() => {}}
			/>
		</div>
	),
}
