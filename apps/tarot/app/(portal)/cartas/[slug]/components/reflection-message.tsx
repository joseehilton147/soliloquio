'use client'

import { Icon } from '@iconify/react'
import { cn } from '@workspace/ui/lib/utils'

interface ReflectionMessageProps {
	message: string
	className?: string
}

/**
 * Componente ReflectionMessage - Mensagem Introspectiva
 *
 * Exibe a pergunta de reflexão da carta com design místico e proeminente.
 * Representa o chamado à introspecção e sabedoria interior.
 *
 * Design inspirado em:
 * - Coruja: Símbolo de sabedoria, visão noturna (insight profundo)
 * - Cores âmbar/dourado: Luz da consciência, iluminação interior
 * - Bordas ornamentadas: Sacralidade da reflexão
 *
 * @param message - Pergunta introspectiva da carta
 * @param className - Classes Tailwind adicionais
 */
export function ReflectionMessage({ message, className }: ReflectionMessageProps) {
	return (
		<div
			className={cn(
				// Container principal
				'relative overflow-hidden',
				'rounded-2xl border-2',
				// Gradientes místicos (âmbar/dourado)
				'border-amber-500/40 bg-gradient-to-br from-amber-50/90 via-yellow-50/80 to-orange-50/90',
				'dark:border-amber-500/30 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-orange-950/40',
				// Sombras para profundidade
				'shadow-xl shadow-amber-500/20 dark:shadow-amber-500/10',
				// Padding e espaçamento
				'p-8',
				// Transições suaves
				'transition-all duration-500',
				// Hover effect - leve glow
				'hover:shadow-2xl hover:shadow-amber-500/30 dark:hover:shadow-amber-500/20',
				'hover:border-amber-500/60 dark:hover:border-amber-500/40',
				className
			)}
		>
			{/* Background Pattern - Estrelas sutis */}
			<div className="absolute inset-0 opacity-5 dark:opacity-10">
				<div
					className="h-full w-full"
					style={{
						backgroundImage: `radial-gradient(circle at 25% 25%, rgba(251, 191, 36, 0.3) 0%, transparent 50%),
						                   radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)`,
					}}
				/>
			</div>

			{/* Conteúdo */}
			<div className="relative flex items-start gap-6">
				{/* Ícone da Coruja - Símbolo de Sabedoria */}
				<div className="shrink-0">
					<div
						className={cn(
							// Container do ícone
							'flex size-16 items-center justify-center',
							'rounded-full',
							// Gradiente de fundo
							'bg-gradient-to-br from-amber-500 to-orange-600',
							'dark:from-amber-600 dark:to-orange-700',
							// Sombra e glow
							'shadow-lg shadow-amber-500/40',
							// Animação de pulsação suave
							'animate-pulse-slow'
						)}
					>
						<Icon
							icon="ph:owl-duotone"
							className="size-9 text-white drop-shadow-md"
						/>
					</div>
				</div>

				{/* Mensagem de Reflexão */}
				<div className="flex-1 space-y-3">
					{/* Título */}
					<div className="flex items-center gap-2">
						<h3
							className={cn(
								'text-lg font-semibold uppercase tracking-wider',
								'bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700',
								'dark:from-amber-400 dark:via-orange-400 dark:to-amber-400',
								'bg-clip-text text-transparent'
							)}
						>
							Para Refletir
						</h3>
						<Icon
							icon="lucide:sparkles"
							className="size-4 text-amber-600 dark:text-amber-400 animate-pulse"
						/>
					</div>

					{/* Linha decorativa */}
					<div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

					{/* Pergunta introspectiva */}
					<blockquote
						className={cn(
							'relative',
							'text-lg leading-relaxed',
							'text-gray-900 dark:text-gray-100',
							'font-medium italic',
							// Aspas decorativas via pseudo-elementos simuladas com texto
							'before:content-[\'"\'] after:content-[\'"\']',
							'before:text-3xl after:text-3xl',
							'before:text-amber-500/60 after:text-amber-500/60',
							'before:mr-1 after:ml-1',
							'before:leading-none after:leading-none'
						)}
					>
						{message}
					</blockquote>

					{/* Linha decorativa inferior */}
					<div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

					{/* Instrução sutil */}
					<p className="text-xs text-amber-700/80 dark:text-amber-400/80 flex items-center gap-1.5">
						<Icon icon="lucide:heart" className="size-3.5" />
						<span>
							Pare, respire fundo, e permita que esta pergunta ressoe em seu coração.
						</span>
					</p>
				</div>
			</div>

			{/* Cantos decorativos - Top Left */}
			<div className="absolute top-0 left-0 w-16 h-16 opacity-20 dark:opacity-30">
				<div className="absolute top-3 left-3 w-8 h-px bg-amber-500" />
				<div className="absolute top-3 left-3 w-px h-8 bg-amber-500" />
			</div>

			{/* Cantos decorativos - Top Right */}
			<div className="absolute top-0 right-0 w-16 h-16 opacity-20 dark:opacity-30">
				<div className="absolute top-3 right-3 w-8 h-px bg-amber-500" />
				<div className="absolute top-3 right-3 w-px h-8 bg-amber-500" />
			</div>

			{/* Cantos decorativos - Bottom Left */}
			<div className="absolute bottom-0 left-0 w-16 h-16 opacity-20 dark:opacity-30">
				<div className="absolute bottom-3 left-3 w-8 h-px bg-amber-500" />
				<div className="absolute bottom-3 left-3 w-px h-8 bg-amber-500" />
			</div>

			{/* Cantos decorativos - Bottom Right */}
			<div className="absolute bottom-0 right-0 w-16 h-16 opacity-20 dark:opacity-30">
				<div className="absolute bottom-3 right-3 w-8 h-px bg-amber-500" />
				<div className="absolute bottom-3 right-3 w-px h-8 bg-amber-500" />
			</div>
		</div>
	)
}

// CSS adicional necessário em tailwind.config (se ainda não existir):
// Animation: pulse-slow
// Adicionar em theme.extend.animation:
// 'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
