'use client'

import { SacredEyeLogo } from '@workspace/ui'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function TarotHomePage() {
	// Gera partículas apenas no cliente para evitar hydration mismatch
	const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([])

	useEffect(() => {
		setParticles(
			Array.from({ length: 30 }).map(() => ({
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				delay: `${Math.random() * 5}s`,
				duration: `${10 + Math.random() * 10}s`,
			}))
		)
	}, [])

	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
			{/* ═══════════════════════════════════════════════════════
			    COSMIC NEBULA BACKGROUND - Vive e respira
			    ═══════════════════════════════════════════════════════ */}
			<div className="absolute inset-0 pointer-events-none">
				{/* Nebulosa cósmica de fundo */}
				<div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-indigo-950/10 to-background" />

				{/* Vórtex portal - círculos concêntricos girando */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<div className="absolute size-[800px] rounded-full border border-purple-500/5 animate-spin-slow [animation-duration:60s]" />
					<div className="absolute size-[700px] rounded-full border border-violet-500/10 animate-spin-slow [animation-duration:50s] [animation-direction:reverse]" />
					<div className="absolute size-[600px] rounded-full border border-indigo-500/10 animate-spin-slow [animation-duration:40s]" />
					<div className="absolute size-[500px] rounded-full border-2 border-purple-500/20 animate-spin-slow [animation-duration:30s] [animation-direction:reverse]" />
					<div className="absolute size-[400px] rounded-full border border-violet-500/15 animate-spin-slow [animation-duration:25s]" />
				</div>

				{/* Energia radiante pulsante */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-gradient-to-br from-purple-600/10 via-violet-600/5 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:4s]" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] bg-gradient-to-tl from-indigo-600/10 via-purple-600/5 to-transparent rounded-full blur-2xl animate-pulse [animation-duration:3s] [animation-delay:1s]" />

				{/* Partículas místicas flutuantes - Poeira estelar */}
				{particles.map((particle, i) => (
					<div
						key={i}
						className="absolute size-1 rounded-full bg-purple-400/30 animate-float"
						style={{
							left: particle.left,
							top: particle.top,
							animationDelay: particle.delay,
							animationDuration: particle.duration,
						}}
					/>
				))}

				{/* Símbolos esotéricos sutis - Pentagrama, Lua, Estrelas */}
				<div className="absolute top-20 right-20 opacity-5 animate-spin-slow [animation-duration:100s]">
					<Icon icon="game-icons:pentagram" className="size-32 text-purple-500" />
				</div>
				<div className="absolute bottom-32 left-24 opacity-5 animate-pulse [animation-duration:8s]">
					<Icon icon="lucide:moon" className="size-24 text-violet-500" />
				</div>
				<div className="absolute top-40 left-1/4 opacity-5 animate-spin-slow [animation-duration:80s] [animation-direction:reverse]">
					<Icon icon="lucide:star" className="size-20 text-indigo-500" />
				</div>
			</div>

			{/* ═══════════════════════════════════════════════════════
			    CONTEÚDO PRINCIPAL - Portal Místico
			    ═══════════════════════════════════════════════════════ */}
			<div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 space-y-24">

				{/* ═══ PORTAL CENTRAL - Logo + Título (INTOCADO) ═══ */}
				<div className="text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
					{/* Sacred Eye Logo com halo místico */}
					<div className="relative inline-block">
						{/* Halo pulsante */}
						<div className="absolute inset-0 -m-12 bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse [animation-duration:3s]" />
						<SacredEyeLogo size="lg" />
					</div>

					{/* Título Sagrado */}
					<div className="space-y-6">
						<h1 className="text-7xl md:text-8xl font-bold tracking-tight">
							<span className="block bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
								Solilóquio
							</span>
						</h1>
						<p className="text-2xl md:text-3xl text-purple-300/80 font-light tracking-[0.3em]">
							Portal de Sabedoria Mística
						</p>
					</div>

					{/* Quote Hermética - Redesenhada */}
					<div className="max-w-3xl mx-auto py-12 relative">
						{/* Ornamentos */}
						<div className="absolute top-0 left-0 text-7xl text-purple-500/20 font-serif leading-none">"</div>
						<div className="absolute bottom-0 right-0 text-7xl text-purple-500/20 font-serif leading-none rotate-180">"</div>

						{/* Linha decorativa superior */}
						<div className="flex items-center justify-center gap-3 mb-6">
							<div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/50" />
							<Icon icon="game-icons:crystal-ball" className="size-4 text-purple-500/50" />
							<div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/50" />
						</div>

						<p className="text-xl md:text-2xl text-purple-200/90 font-light italic leading-relaxed px-12">
							Como acima, assim embaixo.<br />
							Como dentro, assim fora.
						</p>

						{/* Linha decorativa inferior */}
						<div className="flex items-center justify-center gap-3 mt-6">
							<div className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500/50" />
							<Icon icon="game-icons:crystal-ball" className="size-4 text-violet-500/50" />
							<div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500/50" />
						</div>

						<p className="text-sm text-purple-400/60 mt-8 tracking-wider">
							— Tábua de Esmeralda
						</p>
					</div>
				</div>

				{/* ═══ TRILHA MÍSTICA - Caminho Sagrado ═══ */}
				<div className="relative py-8">
					{/* Linha de energia conectando os portais */}
					<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

					{/* Chakras de energia */}
					<div className="relative flex items-center justify-center gap-12">
						<span className="size-2 rounded-full bg-purple-400/60 animate-pulse [animation-duration:2s]" />
						<span className="size-3 rounded-full bg-violet-400/70 animate-pulse [animation-duration:2s] [animation-delay:0.3s]" />
						<span className="size-5 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/50 animate-pulse [animation-duration:2s] [animation-delay:0.6s]" />
						<span className="size-3 rounded-full bg-indigo-400/70 animate-pulse [animation-duration:2s] [animation-delay:0.9s]" />
						<span className="size-2 rounded-full bg-indigo-400/60 animate-pulse [animation-duration:2s] [animation-delay:1.2s]" />
					</div>
				</div>

				{/* ═══ TRÊS PORTAIS MÍSTICOS - Entrada para as dimensões ═══ */}
				<div className="grid md:grid-cols-3 gap-12 items-stretch">

					{/* PORTAL 1: Baralhos - Tradições Ciganas */}
					<Link
						href="/baralhos"
						className="group relative flex animate-in fade-in slide-in-from-bottom-12 duration-1000 [animation-delay:200ms]"
					>
						{/* Borda gradiente animada */}
						<div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 via-violet-600/50 to-indigo-600/50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-gradient-xy" />

						<div className="relative flex flex-col h-full w-full text-center space-y-8 p-10 rounded-3xl border-2 border-purple-500/20 bg-gradient-to-br from-purple-950/40 via-background/90 to-background/90 backdrop-blur-xl transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-2xl group-hover:shadow-purple-500/20 group-hover:-translate-y-3">

							{/* Vórtex do portal */}
							<div className="relative inline-flex items-center justify-center mx-auto">
								{/* Anéis girantes */}
								<div className="absolute size-28 rounded-full border-2 border-purple-500/20 animate-spin-slow [animation-duration:10s]" />
								<div className="absolute size-24 rounded-full border border-purple-500/30 animate-spin-slow [animation-duration:8s] [animation-direction:reverse]" />
								<div className="absolute size-20 rounded-full border border-purple-500/40 animate-spin-slow [animation-duration:6s]" />

								{/* Núcleo do portal */}
								<div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border-2 border-purple-500/50 shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/80 transition-all">
									<Icon icon="game-icons:card-draw" className="size-8 text-purple-300 group-hover:text-purple-100 transition-colors" />
								</div>
							</div>

							{/* Título e Descrição */}
							<div className="space-y-3">
								<h3 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent group-hover:from-purple-100 group-hover:to-indigo-100 transition-all">
									Baralhos
								</h3>
								<p className="text-sm text-purple-300/70 leading-relaxed group-hover:text-purple-200/80 transition-colors">
									Tradições ciganas e oráculos ancestrais.<br />
									Cada deck é uma porta para sabedoria antiga.
								</p>
							</div>

							{/* Runas decorativas */}
							<div className="flex items-center justify-center gap-3 mt-auto opacity-40 group-hover:opacity-60 transition-opacity">
								<Icon icon="game-icons:rune-stone" className="size-4 text-purple-400" />
								<span className="size-1 rounded-full bg-purple-400" />
								<Icon icon="game-icons:rune-stone" className="size-4 text-purple-400" />
							</div>
						</div>
					</Link>

					{/* PORTAL 2: Cartas - Arcanos Universais */}
					<Link
						href="/cartas/arcanos"
						className="group relative flex animate-in fade-in slide-in-from-bottom-12 duration-1000 [animation-delay:400ms]"
					>
						{/* Borda gradiente animada */}
						<div className="absolute -inset-1 bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-indigo-600/50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-gradient-xy" />

						<div className="relative flex flex-col h-full w-full text-center space-y-8 p-10 rounded-3xl border-2 border-violet-500/20 bg-gradient-to-br from-violet-950/40 via-background/90 to-background/90 backdrop-blur-xl transition-all duration-500 group-hover:border-violet-500/50 group-hover:shadow-2xl group-hover:shadow-violet-500/20 group-hover:-translate-y-3">

							{/* Vórtex do portal */}
							<div className="relative inline-flex items-center justify-center mx-auto">
								{/* Anéis girantes */}
								<div className="absolute size-28 rounded-full border-2 border-violet-500/20 animate-spin-slow [animation-duration:12s] [animation-direction:reverse]" />
								<div className="absolute size-24 rounded-full border border-violet-500/30 animate-spin-slow [animation-duration:10s]" />
								<div className="absolute size-20 rounded-full border border-violet-500/40 animate-spin-slow [animation-duration:8s] [animation-direction:reverse]" />

								{/* Núcleo do portal */}
								<div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600/30 to-purple-600/30 border-2 border-violet-500/50 shadow-lg shadow-violet-500/50 group-hover:shadow-violet-500/80 transition-all">
									<Icon icon="game-icons:card-random" className="size-8 text-violet-300 group-hover:text-violet-100 transition-colors" />
								</div>
							</div>

							{/* Título e Descrição */}
							<div className="space-y-3">
								<h3 className="text-3xl font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent group-hover:from-violet-100 group-hover:to-purple-100 transition-all">
									Cartas
								</h3>
								<p className="text-sm text-violet-300/70 leading-relaxed group-hover:text-violet-200/80 transition-colors">
									Arcanos maiores e menores revelados.<br />
									Símbolos do inconsciente coletivo universal.
								</p>
							</div>

							{/* Hexagrama decorativo */}
							<div className="flex items-center justify-center gap-3 mt-auto opacity-40 group-hover:opacity-60 transition-opacity">
								<Icon icon="lucide:hexagon" className="size-4 text-violet-400" />
								<span className="size-1 rounded-full bg-violet-400" />
								<Icon icon="lucide:hexagon" className="size-4 text-violet-400" />
							</div>
						</div>
					</Link>

					{/* PORTAL 3: Jornada - Caminho do Iniciado */}
					<div className="group relative flex animate-in fade-in slide-in-from-bottom-12 duration-1000 [animation-delay:600ms]">
						{/* Borda gradiente suave (não clicável) */}
						<div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/30 via-violet-600/30 to-purple-600/30 rounded-3xl blur opacity-50" />

						<div className="relative flex flex-col h-full w-full text-center space-y-8 p-10 rounded-3xl border-2 border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-background/90 to-background/90 backdrop-blur-xl cursor-default">

							{/* Vórtex do portal */}
							<div className="relative inline-flex items-center justify-center mx-auto">
								{/* Anéis girantes */}
								<div className="absolute size-28 rounded-full border-2 border-indigo-500/20 animate-spin-slow [animation-duration:14s]" />
								<div className="absolute size-24 rounded-full border border-indigo-500/30 animate-spin-slow [animation-duration:12s] [animation-direction:reverse]" />
								<div className="absolute size-20 rounded-full border border-indigo-500/40 animate-spin-slow [animation-duration:10s]" />

								{/* Núcleo do portal */}
								<div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600/30 to-violet-600/30 border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/30">
									<Icon icon="game-icons:scroll-unfurled" className="size-8 text-indigo-300 animate-pulse [animation-duration:3s]" />
								</div>
							</div>

							{/* Título e Descrição */}
							<div className="space-y-3">
								<h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
									Jornada
								</h3>
								<p className="text-sm text-indigo-300/70 leading-relaxed">
									Seu diário de aprendiz místico.<br />
									Registro da caminhada iniciática pessoal.
								</p>
							</div>

							{/* Badge "Em breve" */}
							<div className="flex items-center justify-center mt-auto">
								<div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600/20 to-violet-600/20 border border-indigo-500/30 backdrop-blur-sm">
									<span className="size-2 rounded-full bg-indigo-400/70 animate-pulse [animation-duration:2s]" />
									<span className="text-xs font-medium text-indigo-300/80 tracking-wider">
										EM BREVE
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* ═══ SABEDORIA ANCESTRAL - Footer Místico ═══ */}
				<div className="text-center space-y-10 pb-16 animate-in fade-in duration-1000 [animation-delay:800ms]">
					{/* Divider sagrado */}
					<div className="relative py-8">
						<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
						<div className="relative flex items-center justify-center gap-4">
							<Icon icon="game-icons:crystal-ball" className="size-5 text-purple-500/50" />
							<span className="size-1.5 rounded-full bg-purple-500/40" />
							<Icon icon="lucide:eye" className="size-6 text-violet-500/50" />
							<span className="size-1.5 rounded-full bg-violet-500/40" />
							<Icon icon="game-icons:crystal-ball" className="size-5 text-indigo-500/50" />
						</div>
					</div>

					{/* Texto místico */}
					<div className="space-y-4 max-w-4xl mx-auto">
						<p className="text-xs uppercase tracking-[0.3em] text-purple-400/60 font-light">
							Sabedoria Ancestral Cigana
						</p>
						<p className="text-lg md:text-xl text-purple-200/70 font-light leading-relaxed">
							Este portal preserva conhecimentos herméticos, símbolos esotéricos e tradições místicas.<br />
							Cada carta revela fragmentos do Akasha. Cada leitura, uma jornada interior.
						</p>
					</div>

					{/* Símbolos místicos finais */}
					<div className="flex items-center justify-center gap-8 text-purple-400/30">
						<Icon icon="lucide:moon" className="size-6 animate-pulse [animation-duration:4s]" />
						<span className="size-1 rounded-full bg-current" />
						<Icon icon="lucide:star" className="size-6 animate-pulse [animation-duration:4s] [animation-delay:1s]" />
						<span className="size-1 rounded-full bg-current" />
						<Icon icon="game-icons:pentagram" className="size-6 animate-pulse [animation-duration:4s] [animation-delay:2s]" />
						<span className="size-1 rounded-full bg-current" />
						<Icon icon="game-icons:crystal-ball" className="size-6 animate-pulse [animation-duration:4s] [animation-delay:3s]" />
					</div>
				</div>
			</div>
		</div>
	)
}
