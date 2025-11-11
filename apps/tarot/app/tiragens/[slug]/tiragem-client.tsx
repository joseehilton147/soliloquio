'use client'

/**
 * Tiragem Page Client Component
 *
 * Componente cliente para renderizar página individual de tiragem.
 * Contém interatividade, estados e efeitos visuais.
 */

import { Icon } from '@iconify/react'
import type { TarotSpread } from '@workspace/core/tarot'
import { PageHeader } from '@workspace/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { SpreadCanvas } from '../../../src/components/tiragens/spread-canvas'

interface TiragemPageClientProps {
	spread: TarotSpread
}

export function TiragemPageClient({ spread }: TiragemPageClientProps) {
	// Partículas místicas
	const [particles, setParticles] = useState<
		Array<{ left: string; top: string; delay: string; duration: string }>
	>([])

	useEffect(() => {
		setParticles(
			Array.from({ length: 10 }).map(() => ({
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				delay: `${Math.random() * 5}s`,
				duration: `${15 + Math.random() * 15}s`,
			})),
		)
	}, [])

	/**
	 * Mapeia categoria para cor temática
	 */
	const getCategoryColor = () => {
		const colorMap = {
			quick: 'green',
			insight: 'blue',
			relationship: 'pink',
			decision: 'amber',
			deep: 'purple',
			custom: 'gray',
		}
		return colorMap[spread.category]
	}

	const categoryColor = getCategoryColor()

	return (
		<div className="relative min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-b from-background via-background to-purple-950/10">
			{/* ═══════════════════════════════════════════════════════
			    COSMIC BACKGROUND
			    ═══════════════════════════════════════════════════════ */}
			<div className="fixed inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-indigo-950/5 to-transparent" />

				<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<div className="absolute size-[400px] rounded-full border border-purple-500/5 animate-spin-slow [animation-duration:50s]" />
				</div>

				{particles.map((particle, i) => (
					<div
						key={i}
						className="absolute size-1 rounded-full bg-purple-400/15 animate-float"
						style={{
							left: particle.left,
							top: particle.top,
							animationDelay: particle.delay,
							animationDuration: particle.duration,
						}}
					/>
				))}
			</div>

			{/* ═══════════════════════════════════════════════════════
			    CONTEÚDO PRINCIPAL
			    ═══════════════════════════════════════════════════════ */}
			<div className="relative z-10">
				{/* Back button */}
				<div className="max-w-7xl mx-auto px-6 pt-8">
					<Link
						href="/tiragens"
						className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 transition-colors"
					>
						<Icon icon="lucide:arrow-left" className="size-4" />
						<span>Voltar para Tiragens</span>
					</Link>
				</div>

				{spread.icon ? (
					<PageHeader
						title={spread.name}
						description={spread.description}
						icon={spread.icon}
					/>
				) : (
					<PageHeader
						title={spread.name}
						description={spread.description}
						icon="game-icons:perspective-dice-six-faces-random"
					/>
				)}

				<div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
					{/* ═══ METADADOS DA TIRAGEM ═══ */}
					<div className="flex flex-wrap items-center justify-center gap-6 text-sm">
						{/* Número de Cartas */}
						<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-950/40 border border-purple-500/30">
							<Icon icon="game-icons:card-random" className="size-5 text-purple-400" />
							<span className="text-purple-200">{spread.cardCount} cartas</span>
						</div>

						{/* Tempo Estimado */}
						{spread.estimatedTime && (
							<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-950/40 border border-purple-500/30">
								<Icon icon="lucide:clock" className="size-5 text-purple-400" />
								<span className="text-purple-200">~{spread.estimatedTime} minutos</span>
							</div>
						)}

						{/* Dificuldade */}
						{spread.difficulty && (
							<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-950/40 border border-purple-500/30">
								<Icon icon="lucide:star" className="size-5 text-purple-400" />
								<div className="flex items-center gap-1">
									{Array.from({ length: spread.difficulty }).map((_, i) => (
										<Icon
											key={i}
											icon="lucide:star"
											className="size-3 text-purple-400 fill-purple-400"
										/>
									))}
									{Array.from({ length: 5 - spread.difficulty }).map((_, i) => (
										<Icon key={`empty-${i}`} icon="lucide:star" className="size-3 text-purple-500/20" />
									))}
								</div>
							</div>
						)}

						{/* Fonte */}
						{spread.source && (
							<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-950/40 border border-purple-500/30">
								<Icon icon="lucide:book-open" className="size-5 text-purple-400" />
								<span className="text-purple-200/80">{spread.source}</span>
							</div>
						)}
					</div>

					{/* ═══ QUANDO USAR ═══ */}
					<div className="max-w-3xl mx-auto space-y-4 p-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-violet-950/20 to-indigo-950/30">
						<div className="flex items-center gap-2">
							<Icon icon="lucide:lightbulb" className="size-5 text-amber-400" />
							<h3 className="text-lg font-semibold text-purple-100">Quando Usar</h3>
						</div>
						<p className="text-purple-200/90 leading-relaxed">{spread.whenToUse}</p>
					</div>

					{/* ═══ CANVAS VISUAL DA TIRAGEM ═══ */}
					<div className="space-y-6 animate-in fade-in duration-1000">
						<div className="text-center space-y-2">
							<h2 className="text-2xl font-bold text-purple-100">Layout Visual</h2>
							<p className="text-sm text-purple-300/70">
								Cada posição tem um significado específico na leitura
							</p>
						</div>

						<SpreadCanvas
							spread={spread}
							mode="preview"
							showNumbers
							showConnections
							className="max-w-4xl mx-auto"
						/>
					</div>

					{/* ═══ POSIÇÕES DETALHADAS ═══ */}
					<div className="space-y-6">
						<div className="text-center space-y-2">
							<h2 className="text-2xl font-bold text-purple-100">Posições e Significados</h2>
							<p className="text-sm text-purple-300/70">
								Entenda o que cada carta revela em sua posição
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
							{spread.positions.map((position) => (
								<div
									key={position.id}
									className="group p-5 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-950/40 via-violet-950/30 to-indigo-950/40 hover:border-purple-500/40 hover:from-purple-950/60 hover:via-violet-950/50 hover:to-indigo-950/60 transition-all duration-300"
								>
									{/* Header: Número + Label */}
									<div className="flex items-center gap-3 mb-3">
										<div className="flex-shrink-0 size-8 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center text-sm font-bold text-white shadow-lg">
											{position.order}
										</div>
										<h4 className="text-base font-semibold text-purple-100 group-hover:text-purple-50 transition-colors">
											{position.label}
										</h4>
										{position.emphasis && (
											<Icon icon="lucide:sparkles" className="size-4 text-purple-400/60" />
										)}
									</div>

									{/* Descrição */}
									<p className="text-sm text-purple-300/80 leading-relaxed pl-11">
										{position.description}
									</p>

									{/* Conexões (se houver) */}
									{position.connectedTo && position.connectedTo.length > 0 && (
										<div className="mt-3 pl-11 flex items-center gap-2">
											<Icon icon="lucide:git-branch" className="size-3 text-purple-500/50" />
											<span className="text-xs text-purple-400/60">
												Conecta com: {position.connectedTo.map((id) => {
													const connected = spread.positions.find((p) => p.id === id)
													return connected?.label
												}).join(', ')}
											</span>
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					{/* ═══ CALL TO ACTION - COMEÇAR LEITURA ═══ */}
					<div className="max-w-2xl mx-auto space-y-6 py-8">
						<div className="text-center space-y-3">
							<h2 className="text-3xl font-bold bg-gradient-to-r from-purple-200 via-violet-200 to-indigo-200 bg-clip-text text-transparent">
								Pronto para Consultar?
							</h2>
							<p className="text-sm text-purple-300/70">
								Prepare-se internamente, formule sua pergunta e deixe o universo responder.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
							{/* Botão Principal - Iniciar Leitura */}
							<Link
								href={`/tiragens/${spread.slug}/leitura`}
								className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
							>
								<Icon icon="lucide:play" className="size-5 group-hover:scale-110 transition-transform" />
								<span>Iniciar Leitura</span>
							</Link>

							{/* Botão Secundário - Ver Exemplo */}
							<button
								type="button"
								className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-purple-500/40 hover:border-purple-500/60 text-purple-200 hover:bg-purple-500/5 font-medium transition-all duration-300"
							>
								<Icon icon="lucide:book-open" className="size-5" />
								<span>Ver Exemplo de Leitura</span>
							</button>
						</div>
					</div>

					{/* ═══ TAGS (se houver) ═══ */}
					{spread.tags && spread.tags.length > 0 && (
						<div className="flex flex-wrap items-center justify-center gap-2 pt-8">
							{spread.tags.map((tag) => (
								<span
									key={tag}
									className="px-3 py-1 rounded-full text-xs font-medium bg-purple-950/50 border border-purple-500/20 text-purple-300/80"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
