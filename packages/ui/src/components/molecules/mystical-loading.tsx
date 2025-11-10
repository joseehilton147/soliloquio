'use client'

import { Icon } from '@iconify/react'

import { cn } from '../../lib/utils'

export interface MysticalLoadingProps {
	/**
	 * Variant do loading
	 * - inline: Loading pequeno para uso inline (padrão)
	 * - fullscreen: Loading centralizado ocupando tela inteira
	 * - overlay: Loading como overlay sobre conteúdo existente
	 */
	variant?: 'inline' | 'fullscreen' | 'overlay'
	/**
	 * Tamanho do ícone
	 * - sm: 32px
	 * - md: 48px (padrão)
	 * - lg: 64px
	 * - xl: 96px
	 */
	size?: 'sm' | 'md' | 'lg' | 'xl'
	/**
	 * Classe adicional para customização
	 */
	className?: string
}

/**
 * MysticalLoading - Molécula de Loading
 * Loading místico com logo animado usando identidade visual do projeto
 *
 * Design Atômico:
 * - Usa ícone Sparkles (Lucide)
 * - Animações místicas: orbit, pulse, glow
 * - Totalmente modular e reutilizável
 *
 * @example
 * // Inline (dentro de componente)
 * <MysticalLoading variant="inline" size="sm" />
 *
 * // Fullscreen (tela de carregamento)
 * <MysticalLoading variant="fullscreen" size="xl" />
 *
 * // Overlay (sobre conteúdo)
 * <MysticalLoading variant="overlay" size="lg" />
 */
export function MysticalLoading({
	variant = 'inline',
	size = 'md',
	className,
}: MysticalLoadingProps) {
	// Mapeamento de tamanhos
	const sizeMap = {
		sm: 'size-8',
		md: 'size-12',
		lg: 'size-16',
		xl: 'size-24',
	}

	const iconSizeMap = {
		sm: 'size-4',
		md: 'size-6',
		lg: 'size-8',
		xl: 'size-12',
	}

	const orbitIconSizeMap = {
		sm: 'size-2',
		md: 'size-3',
		lg: 'size-4',
		xl: 'size-6',
	}

	// Logo místico animado
	const mysticalIcon = (
		<div className={cn('relative', sizeMap[size])}>
			{/* Glow effect externo */}
			<div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-indigo-500/20 blur-xl animate-pulse" />

			{/* Órbita animada */}
			<div className="absolute inset-0 animate-spin [animation-duration:3s]">
				{/* Sparkle orbitante superior */}
				<Icon
					icon="lucide:sparkles"
					className={cn(
						'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-500 animate-pulse',
						orbitIconSizeMap[size],
					)}
				/>
				{/* Sparkle orbitante inferior */}
				<Icon
					icon="lucide:sparkles"
					className={cn(
						'absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-indigo-500 animate-pulse [animation-delay:0.5s]',
						orbitIconSizeMap[size],
					)}
				/>
			</div>

			{/* Sparkle central brilhante */}
			<div className="absolute inset-0 flex items-center justify-center">
				<Icon
					icon="lucide:sparkles"
					className={cn(
						'text-purple-600 dark:text-purple-400 animate-pulse [animation-duration:2s]',
						iconSizeMap[size],
					)}
					strokeWidth={2}
				/>
			</div>
		</div>
	)

	// Variant: inline (uso dentro de componentes)
	if (variant === 'inline') {
		return <div className={cn('flex items-center justify-center', className)}>{mysticalIcon}</div>
	}

	// Variant: fullscreen (tela inteira)
	if (variant === 'fullscreen') {
		return (
			<div
				className={cn(
					'fixed inset-0 z-50 flex items-center justify-center bg-background',
					className,
				)}
			>
				<div className="flex flex-col items-center gap-6">
					{mysticalIcon}
					{/* Orbs místicos de fundo */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<div className="absolute top-1/4 left-1/4 size-96 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
						<div className="absolute bottom-1/4 right-1/4 size-96 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
					</div>
				</div>
			</div>
		)
	}

	// Variant: overlay (sobre conteúdo existente)
	if (variant === 'overlay') {
		return (
			<div
				className={cn(
					'absolute inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm',
					className,
				)}
			>
				{mysticalIcon}
			</div>
		)
	}

	return null
}
