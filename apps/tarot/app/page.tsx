'use client'

import { SacredEyeLogo } from '@workspace/ui'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function TarotHomePage() {
	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4">
			{/* Sacred Geometry Background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Animated circles */}
				<div className="absolute top-1/4 left-1/4 size-64 rounded-full border border-purple-500/10 animate-pulse" />
				<div className="absolute top-1/3 right-1/4 size-96 rounded-full border border-indigo-500/10 animate-pulse [animation-delay:1s]" />
				<div className="absolute bottom-1/4 left-1/3 size-48 rounded-full border border-violet-500/10 animate-pulse [animation-delay:2s]" />

				{/* Gradient orbs */}
				<div className="absolute top-20 right-20 size-96 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-20 size-96 bg-gradient-to-tr from-indigo-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-5xl mx-auto px-6 space-y-20">
				{/* Hero - Sacred Eye */}
				<div className="text-center space-y-12">
					{/* Sacred Eye Logo */}
					<SacredEyeLogo size="lg" />

					{/* Sacred Title */}
					<div className="space-y-4">
						<h1 className="text-6xl md:text-7xl font-bold tracking-tight">
							<span className="block bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
								Solilóquio
							</span>
						</h1>
						<p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
							Portal de Sabedoria Mística
						</p>
					</div>

					{/* Mystical Quote */}
					<div className="max-w-2xl mx-auto py-8 relative">
						<div className="absolute top-0 left-0 text-6xl text-purple-500/10 font-serif">"</div>
						<p className="text-lg md:text-xl text-foreground/90 font-light italic leading-relaxed px-8">
							Como acima, assim embaixo. Como dentro, assim fora.
						</p>
						<div className="absolute bottom-0 right-0 text-6xl text-purple-500/10 font-serif rotate-180">"</div>
						<p className="text-sm text-muted-foreground mt-4">— Tábua de Esmeralda</p>
					</div>
				</div>

				{/* Three Pillars - Sacred Triad */}
				<div className="grid md:grid-cols-3 gap-8 md:gap-12 items-stretch">
					{/* Pillar 1: Baralhos */}
					<Link
						href="/baralhos"
						className="group relative flex"
					>
						<div className="flex flex-col h-full w-full text-center space-y-6 p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/5 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 hover:-translate-y-2">
							{/* Sacred symbol */}
							<div className="relative inline-flex items-center justify-center">
								<div className="absolute size-20 animate-spin-slow [animation-duration:10s]">
									<Icon icon="lucide:circle" className="size-full text-purple-500/20" strokeWidth={0.5} />
								</div>
								<div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
									<Icon icon="game-icons:card-draw" className="size-8 text-purple-600 dark:text-purple-400" />
								</div>
							</div>

							<div className="space-y-2">
								<h3 className="text-2xl font-semibold group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 dark:group-hover:from-purple-400 dark:group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
									Baralhos
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									Explore tradições sagradas e oráculos ancestrais
								</p>
							</div>

							{/* Decorative dots */}
							<div className="flex items-center justify-center gap-2 mt-auto">
								<span className="size-1.5 rounded-full bg-purple-500/50" />
								<span className="size-1 rounded-full bg-purple-500/30" />
								<span className="size-0.5 rounded-full bg-purple-500/20" />
							</div>
						</div>
					</Link>

					{/* Pillar 2: Cartas */}
					<Link
						href="/cartas/arcanos"
						className="group relative flex"
					>
						<div className="flex flex-col h-full w-full text-center space-y-6 p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/5 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10 hover:border-violet-500/30 hover:-translate-y-2">
							{/* Sacred symbol */}
							<div className="relative inline-flex items-center justify-center">
								<div className="absolute size-20 animate-spin-slow [animation-duration:12s] [animation-direction:reverse]">
									<Icon icon="lucide:hexagon" className="size-full text-violet-500/20" strokeWidth={0.5} />
								</div>
								<div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
									<Icon icon="game-icons:card-random" className="size-8 text-violet-600 dark:text-violet-400" />
								</div>
							</div>

							<div className="space-y-2">
								<h3 className="text-2xl font-semibold group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-purple-600 dark:group-hover:from-violet-400 dark:group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
									Cartas
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									Desvende arcanos e símbolos do inconsciente coletivo
								</p>
							</div>

							{/* Decorative dots */}
							<div className="flex items-center justify-center gap-2 mt-auto">
								<span className="size-1.5 rounded-full bg-violet-500/50" />
								<span className="size-1 rounded-full bg-violet-500/30" />
								<span className="size-0.5 rounded-full bg-violet-500/20" />
							</div>
						</div>
					</Link>

					{/* Pillar 3: Jornada */}
					<div className="group relative flex">
						<div className="flex flex-col h-full w-full text-center space-y-6 p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/5 transition-all duration-500 cursor-default">
							{/* Sacred symbol */}
							<div className="relative inline-flex items-center justify-center">
								<div className="absolute size-20 animate-spin-slow [animation-duration:14s]">
									<Icon icon="lucide:triangle" className="size-full text-indigo-500/20" strokeWidth={0.5} />
								</div>
								<div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20">
									<Icon icon="game-icons:scroll-unfurled" className="size-8 text-indigo-600 dark:text-indigo-400 animate-pulse" />
								</div>
							</div>

							<div className="space-y-2">
								<h3 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
									Jornada
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									Registro pessoal da caminhada iniciática
								</p>
							</div>

							{/* Coming soon badge */}
							<div className="flex items-center justify-center mt-auto">
								<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20">
									<span className="size-1.5 rounded-full bg-indigo-500/70 animate-pulse" />
									<span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
										Em breve
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Sacred Path - Visual Divider */}
				<div className="relative py-12">
					<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
					<div className="relative flex items-center justify-center gap-8">
						<span className="size-2 rounded-full bg-purple-500/50" />
						<span className="size-3 rounded-full bg-purple-500/70" />
						<span className="size-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/50" />
						<span className="size-3 rounded-full bg-indigo-500/70" />
						<span className="size-2 rounded-full bg-indigo-500/50" />
					</div>
				</div>

				{/* Mystical Wisdom */}
				<div className="text-center space-y-8 pb-12">
					<div className="space-y-3">
						<p className="text-sm uppercase tracking-widest text-muted-foreground/60 font-light">
							Sabedoria Ancestral
						</p>
						<p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed max-w-3xl mx-auto">
							Este espaço sagrado preserva conhecimentos herméticos, símbolos esotéricos e ensinamentos místicos.
							Cada carta é uma porta para o inconsciente. Cada baralho, uma tradição viva.
						</p>
					</div>

					{/* Mystical symbols footer */}
					<div className="flex items-center justify-center gap-6 text-muted-foreground/30">
						<Icon icon="lucide:moon" className="size-5" strokeWidth={1} />
						<span className="size-1 rounded-full bg-current" />
						<Icon icon="lucide:star" className="size-5" strokeWidth={1} />
						<span className="size-1 rounded-full bg-current" />
						<Icon icon="lucide:eye" className="size-5" strokeWidth={1} />
						<span className="size-1 rounded-full bg-current" />
						<Icon icon="lucide:sparkles" className="size-5" strokeWidth={1} />
					</div>
				</div>
			</div>
		</div>
	)
}
