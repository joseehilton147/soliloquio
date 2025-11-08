'use client'

import { cn } from '../../lib/utils'

export interface MysticalBackgroundProps {
	variant?: 'stars' | 'constellation' | 'orbs' | 'minimal'
	intensity?: 'subtle' | 'medium' | 'strong'
	className?: string
}

/**
 * Background místico animado para cards e containers
 * Inspirado em constelações, astros e partículas cósmicas
 */
export function MysticalBackground({
	variant = 'stars',
	intensity = 'subtle',
	className,
}: MysticalBackgroundProps) {
	const intensityConfig = {
		subtle: {
			starOpacity: 'opacity-20',
			orbOpacity: 'opacity-5',
			starCount: 12,
			orbCount: 2,
		},
		medium: {
			starOpacity: 'opacity-30',
			orbOpacity: 'opacity-10',
			starCount: 20,
			orbCount: 3,
		},
		strong: {
			starOpacity: 'opacity-40',
			orbOpacity: 'opacity-15',
			starCount: 30,
			orbCount: 4,
		},
	}

	const config = intensityConfig[intensity]

	// Gerar posições aleatórias mas fixas para as estrelas
	const stars = Array.from({ length: config.starCount }, (_, i) => ({
		id: i,
		x: (i * 37 + 13) % 100, // Distribuição pseudo-aleatória
		y: (i * 53 + 29) % 100,
		size: ((i * 7) % 3) + 1, // Tamanhos variados (1-3)
		delay: (i * 0.3) % 3, // Delays variados
	}))

	if (variant === 'stars') {
		return (
			<div
				className={cn(
					'absolute inset-0 overflow-hidden pointer-events-none',
					className,
				)}
			>
				{/* Estrelas flutuantes */}
				{stars.map((star) => (
					<div
						key={star.id}
						className={cn(
							'absolute rounded-full bg-purple-500 animate-pulse',
							config.starOpacity,
						)}
						style={{
							left: `${star.x}%`,
							top: `${star.y}%`,
							width: `${star.size}px`,
							height: `${star.size}px`,
							animationDelay: `${star.delay}s`,
							animationDuration: '3s',
						}}
					/>
				))}

				{/* Gradient orbs sutis */}
				<div
					className={cn(
						'absolute top-0 right-0 size-64 bg-gradient-to-br from-purple-500 to-transparent rounded-full blur-3xl',
						config.orbOpacity,
					)}
				/>
				<div
					className={cn(
						'absolute bottom-0 left-0 size-64 bg-gradient-to-tr from-indigo-500 to-transparent rounded-full blur-3xl',
						config.orbOpacity,
					)}
				/>
			</div>
		)
	}

	if (variant === 'constellation') {
		// Pontos de constelação conectados
		const constellationPoints = [
			{ x: 15, y: 20 },
			{ x: 30, y: 15 },
			{ x: 45, y: 25 },
			{ x: 70, y: 30 },
			{ x: 85, y: 20 },
			{ x: 60, y: 70 },
			{ x: 40, y: 75 },
			{ x: 20, y: 65 },
		]

		return (
			<div
				className={cn(
					'absolute inset-0 overflow-hidden pointer-events-none',
					className,
				)}
			>
				{/* SVG para linhas de constelação */}
				<svg
					className="absolute inset-0 size-full"
					xmlns="http://www.w3.org/2000/svg"
				>
					{/* Linhas conectando pontos */}
					<g className="stroke-purple-500/10" strokeWidth="0.5">
						<line x1="15%" y1="20%" x2="30%" y2="15%" />
						<line x1="30%" y1="15%" x2="45%" y2="25%" />
						<line x1="45%" y1="25%" x2="70%" y2="30%" />
						<line x1="70%" y1="30%" x2="85%" y2="20%" />
						<line x1="85%" y1="20%" x2="60%" y2="70%" />
						<line x1="60%" y1="70%" x2="40%" y2="75%" />
						<line x1="40%" y1="75%" x2="20%" y2="65%" />
						<line x1="20%" y1="65%" x2="15%" y2="20%" />
					</g>
				</svg>

				{/* Pontos da constelação */}
				{constellationPoints.map((point, i) => (
					<div
						key={i}
						className={cn(
							'absolute size-1.5 rounded-full bg-purple-500 animate-pulse',
							config.starOpacity,
						)}
						style={{
							left: `${point.x}%`,
							top: `${point.y}%`,
							animationDelay: `${i * 0.2}s`,
						}}
					/>
				))}

				{/* Orb central */}
				<div
					className={cn(
						'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-transparent rounded-full blur-3xl',
						config.orbOpacity,
					)}
				/>
			</div>
		)
	}

	if (variant === 'orbs') {
		return (
			<div
				className={cn(
					'absolute inset-0 overflow-hidden pointer-events-none',
					className,
				)}
			>
				{/* Múltiplos orbs flutuantes */}
				<div
					className={cn(
						'absolute top-1/4 right-1/4 size-48 bg-gradient-to-br from-purple-500 to-transparent rounded-full blur-2xl animate-pulse',
						config.orbOpacity,
					)}
					style={{ animationDuration: '4s' }}
				/>
				<div
					className={cn(
						'absolute bottom-1/3 left-1/4 size-64 bg-gradient-to-tr from-indigo-500 to-transparent rounded-full blur-2xl animate-pulse',
						config.orbOpacity,
					)}
					style={{ animationDuration: '5s', animationDelay: '1s' }}
				/>
				<div
					className={cn(
						'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-80 bg-gradient-to-br from-violet-500 to-transparent rounded-full blur-3xl animate-pulse',
						config.orbOpacity,
					)}
					style={{ animationDuration: '6s', animationDelay: '2s' }}
				/>
			</div>
		)
	}

	// Minimal - apenas gradient sutil
	return (
		<div
			className={cn(
				'absolute inset-0 overflow-hidden pointer-events-none',
				className,
			)}
		>
			<div
				className={cn(
					'absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5',
				)}
			/>
		</div>
	)
}
