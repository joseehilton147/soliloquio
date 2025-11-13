'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'

/**
 * Seção de Referência aos Arcanos - Organismo
 *
 * Seção mística que conecta os Naipes com os Arcanos Maiores e Menores,
 * criando uma referência cruzada bidirecional entre as páginas.
 *
 * Características:
 * - Visual místico com gradientes violet/purple/indigo
 * - Símbolos esotéricos animados
 * - CTA para explorar Arcanos
 * - Ícones dos 2 tipos de Arcanos
 *
 * @example
 * ```tsx
 * <ArcanosReferenceSection />
 * ```
 */
export function ArcanosReferenceSection() {
	return (
		<div className="max-w-4xl mx-auto mt-12">
			<div className="relative overflow-hidden rounded-2xl border-2 border-violet-500/30 bg-gradient-to-br from-violet-950/40 via-purple-950/30 to-indigo-950/40 p-8 backdrop-blur-sm">
				{/* Fundo místico sutil */}
				<div className="absolute inset-0 pointer-events-none overflow-hidden">
					<div className="absolute inset-0 bg-gradient-radial from-violet-900/20 via-purple-950/10 to-transparent" />
					<div className="absolute top-1/2 right-8 -translate-y-1/2 size-[200px] bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-transparent rounded-full blur-2xl animate-pulse [animation-duration:3s]" />

					{/* Símbolos místicos dos Arcanos */}
					<div className="absolute top-4 right-4 opacity-5 animate-pulse [animation-duration:4s]">
						<Icon icon="game-icons:crystal-ball" className="size-16 text-violet-500" />
					</div>
					<div className="absolute bottom-4 left-4 opacity-5 animate-spin-slow [animation-duration:60s]">
						<Icon icon="lucide:moon" className="size-12 text-purple-500" />
					</div>
				</div>

				{/* Conteúdo */}
				<div className="relative z-10 text-center space-y-6">
					{/* Título */}
					<div className="flex items-center justify-center gap-3">
						<Icon icon="lucide:sparkles" className="size-6 text-violet-400/70" />
						<h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
							Explore os Arcanos do Tarô
						</h3>
						<Icon icon="lucide:sparkles" className="size-6 text-violet-400/70" />
					</div>

					{/* Descrição */}
					<p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto">
						Além dos 4 naipes, o Tarô possui{' '}
						<span className="text-violet-300 font-semibold">22 Arcanos Maiores</span> (a jornada do Louco) e{' '}
						<span className="text-indigo-300 font-semibold">56 Arcanos Menores</span> (onde estão os naipes).
						Descubra os grandes arquétipos e mistérios universais.
					</p>

					{/* Ícones dos Arcanos */}
					<div className="flex items-center justify-center gap-8 py-4">
						<div className="flex flex-col items-center gap-2">
							<div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
								<Icon icon="lucide:crown" className="size-6 text-violet-400" />
							</div>
							<span className="text-xs text-violet-300/80 font-medium">Maiores</span>
						</div>
						<div className="h-px w-12 bg-gradient-to-r from-violet-500/20 via-purple-500/40 to-indigo-500/20" />
						<div className="flex flex-col items-center gap-2">
							<div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20">
								<Icon icon="lucide:sparkles" className="size-6 text-indigo-400" />
							</div>
							<span className="text-xs text-indigo-300/80 font-medium">Menores</span>
						</div>
					</div>

					{/* CTA */}
					<Link
						href="/cartas/arcanos"
						className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-violet-500/30 transition-all hover:scale-105 group"
					>
						<span>Explorar os Arcanos Místicos</span>
						<Icon icon="lucide:arrow-right" className="size-4 group-hover:translate-x-1 transition-transform" />
					</Link>
				</div>
			</div>
		</div>
	)
}
