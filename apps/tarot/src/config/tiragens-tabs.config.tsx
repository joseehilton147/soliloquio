import { Icon } from '@iconify/react'
import { cn } from '@workspace/ui/lib/utils'
import type { MysticalTabItem } from '@workspace/ui'
import { ALL_CATEGORIES } from '@/features/tiragens'

/**
 * Configuração de cores por elemento
 */
const ELEMENT_COLORS = {
	air: {
		active: 'bg-slate-500/20 border-slate-400/60 text-slate-200',
		inactive: 'border-slate-500/20 text-slate-400/60 hover:border-slate-400/40 hover:text-slate-300/80',
		glow: 'rgba(148, 163, 184, 0.4)',
		gradient: 'from-slate-400 to-gray-400',
	},
	water: {
		active: 'bg-blue-500/20 border-blue-400/60 text-blue-200',
		inactive: 'border-blue-500/20 text-blue-400/60 hover:border-blue-400/40 hover:text-blue-300/80',
		glow: 'rgba(96, 165, 250, 0.4)',
		gradient: 'from-blue-400 to-cyan-400',
	},
	fire: {
		active: 'bg-red-500/20 border-red-400/60 text-red-200',
		inactive: 'border-red-500/20 text-red-400/60 hover:border-red-400/40 hover:text-red-300/80',
		glow: 'rgba(248, 113, 113, 0.4)',
		gradient: 'from-red-400 to-orange-400',
	},
	earth: {
		active: 'bg-amber-500/20 border-amber-400/60 text-amber-200',
		inactive: 'border-amber-500/20 text-amber-400/60 hover:border-amber-400/40 hover:text-amber-300/80',
		glow: 'rgba(251, 191, 36, 0.4)',
		gradient: 'from-amber-400 to-yellow-400',
	},
	spirit: {
		active: 'bg-purple-500/20 border-purple-400/60 text-purple-200',
		inactive: 'border-purple-500/20 text-purple-400/60 hover:border-purple-400/40 hover:text-purple-300/80',
		glow: 'rgba(192, 132, 252, 0.4)',
		gradient: 'from-purple-400 to-violet-400',
	},
} as const

const ELEMENT_ICONS = {
	air: 'mdi:weather-windy',
	water: 'mdi:water',
	fire: 'mdi:fire',
	earth: 'mdi:mountain',
	spirit: 'game-icons:magic-swirl',
} as const

/**
 * Configuração de tabs para Tiragens
 *
 * Converte categorias em tabs com estilização específica de tarot.
 */
export const TIRAGENS_TABS_CONFIG: MysticalTabItem<string>[] = ALL_CATEGORIES.map((category) => ({
	id: category.id,
	label: category.name,
	icon: ELEMENT_ICONS[category.element as keyof typeof ELEMENT_ICONS],
	count: category.spreads.length,
	renderTab: ({ item, isActive, onClick }) => {
		const colors = ELEMENT_COLORS[category.element as keyof typeof ELEMENT_COLORS]

		return (
			<button
				key={item.id}
				onClick={onClick}
				className={cn(
					'group relative flex flex-col items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-500',
					'hover:scale-105 hover:shadow-lg',
					isActive ? colors.active : colors.inactive
				)}
				style={{
					boxShadow: isActive
						? `0 0 30px ${colors.glow}, 0 8px 16px rgba(0,0,0,0.4), inset 0 0 20px ${colors.glow}`
						: '0 4px 12px rgba(0,0,0,0.3)',
				}}
			>
				{/* Glow pulsante quando ativo */}
				{isActive && (
					<div
						className="absolute inset-0 -m-2 rounded-xl blur-xl animate-pulse [animation-duration:3s] pointer-events-none"
						style={{
							background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
						}}
					/>
				)}

				{/* Ícone do elemento */}
				<div className="relative">
					<Icon
						icon={item.icon!}
						className={cn('size-10 transition-all duration-500', isActive && 'scale-110 rotate-12')}
						style={{
							filter: isActive ? `drop-shadow(0 0 10px ${colors.glow})` : 'none',
						}}
					/>
				</div>

				{/* Nome da categoria */}
				<div className="relative text-center space-y-1">
					<h3
						className={cn(
							'text-base font-bold tracking-wide transition-all duration-300',
							isActive && `bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`
						)}
						style={{
							filter: isActive ? `drop-shadow(0 0 8px ${colors.glow})` : 'none',
						}}
					>
						{item.label}
					</h3>
					<p className="text-xs opacity-70 tracking-wider">
						{item.count} {item.count === 1 ? 'tiragem' : 'tiragens'}
					</p>
				</div>

				{/* Símbolo místico */}
				<div
					className={cn(
						'absolute -top-2 -right-2 opacity-0 transition-opacity duration-500',
						isActive && 'opacity-100'
					)}
				>
					<Icon
						icon={category.mysticalSymbol}
						className="size-6 text-white/40"
						style={{
							filter: `drop-shadow(0 0 8px ${colors.glow})`,
						}}
					/>
				</div>

				{/* Borda interna brilhante quando ativo */}
				{isActive && (
					<div
						className="absolute inset-0 rounded-xl pointer-events-none"
						style={{
							boxShadow: `inset 0 0 20px ${colors.glow}`,
						}}
					/>
				)}
			</button>
		)
	},
}))

/**
 * Subtítulo dinâmico baseado na tab ativa
 */
export function getTiragemTabSubtitle(activeTab: string) {
	const category = ALL_CATEGORIES.find((cat) => cat.id === activeTab)
	if (!category) return null

	const colors = ELEMENT_COLORS[category.element]

	return (
		<>
			<p className="text-sm text-white/40 font-light">Explorando portal:</p>
			<div
				className={cn(
					'px-4 py-1.5 rounded-full bg-gradient-to-r bg-clip-text text-transparent font-bold',
					colors.gradient
				)}
				style={{
					filter: `drop-shadow(0 0 8px ${colors.glow})`,
				}}
			>
				{category.name}
			</div>
		</>
	)
}
