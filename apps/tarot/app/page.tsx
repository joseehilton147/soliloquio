'use client'

import { Icon } from '@iconify/react'
import { SacredEyeLogo } from '@workspace/ui'
import Link from 'next/link'
import { useState } from 'react'

export default function TarotHomePage() {
	const [particles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>(() =>
		Array.from({ length: 15 }).map(() => ({
			left: `${Math.random() * 100}%`,
			top: `${Math.random() * 100}%`,
			delay: `${Math.random() * 5}s`,
			duration: `${15 + Math.random() * 15}s`,
		})),
	)

	return (
		<div className="relative min-h-screen flex flex-col items-center overflow-x-hidden bg-gradient-to-b from-background via-background to-purple-950/10">
			<div className="fixed inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-indigo-950/5 to-transparent" />

				<div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<div className="absolute size-[600px] rounded-full border border-purple-500/5 animate-spin-slow [animation-duration:80s]" />
					<div className="absolute size-[400px] rounded-full border border-violet-500/8 animate-spin-slow [animation-duration:60s] [animation-direction:reverse]" />
				</div>

				<div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] bg-gradient-to-br from-purple-600/5 via-violet-600/3 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:8s]" />

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

			<div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16 space-y-24">

				<div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
					<div className="relative inline-block">
						<div className="absolute inset-0 -m-8 bg-gradient-to-br from-purple-500/10 via-violet-500/8 to-indigo-500/10 rounded-full blur-2xl animate-pulse [animation-duration:5s]" />
						<SacredEyeLogo size="lg" />
					</div>

					<div className="space-y-3">
						<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
							<span
								className="block bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent"
								style={{
									filter: 'drop-shadow(0 0 25px rgba(168, 85, 247, 0.5)) drop-shadow(0 0 50px rgba(139, 92, 246, 0.3))',
								}}
							>
								Solilóquio
							</span>
						</h1>
						<p className="text-base sm:text-lg text-purple-300/60 font-light italic tracking-wide">
							<span className="text-purple-200/80">solus</span> (sozinho) + <span className="text-purple-200/80">loqui</span> (falar)
						</p>
					</div>
				</div>

				<div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-1000 [animation-delay:200ms]">
					<div className="flex items-center justify-center gap-3">
						<div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/30" />
						<Icon icon="lucide:sparkles" className="size-3 text-purple-500/40" />
						<div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/30" />
					</div>

					<div className="text-center space-y-4">
						<p className="text-xl sm:text-2xl md:text-3xl text-purple-100/90 leading-relaxed font-light">
							Um diálogo consigo mesmo.<br />
							A arte milenar de se conhecer pela conversa interior.
						</p>

						<p className="text-base sm:text-lg text-purple-300/70 leading-relaxed">
							Maquiavel escreveu solilóquios para explorar os dilemas da alma.
							Aqui, você fará o mesmo - com as cartas como espelho do inconsciente.
						</p>
					</div>
				</div>

				<div className="space-y-12 animate-in fade-in duration-1000 [animation-delay:400ms]">
					<h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-200 via-violet-200 to-indigo-200 bg-clip-text text-transparent">
						A Jornada do Autoconhecimento
					</h2>

					<div className="space-y-8">
						<div className="group p-6 rounded-xl border border-purple-500/15 bg-purple-950/20 backdrop-blur-sm hover:border-purple-500/30 hover:bg-purple-950/30 transition-all duration-300">
							<div className="flex items-start gap-4">
								<div className="flex-shrink-0 mt-1">
									<div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30">
										<Icon icon="lucide:eye" className="size-5 text-purple-300/80" />
									</div>
								</div>
								<div className="space-y-2">
									<h3 className="text-lg sm:text-xl font-semibold text-purple-200">I. O Chamado Interior</h3>
									<p className="text-sm sm:text-base text-purple-300/70 leading-relaxed">
										Toda jornada começa com uma pergunta silenciosa. Um desejo de se compreender.
										As cartas são o espelho que reflete o que já vive dentro de você.
									</p>
								</div>
							</div>
						</div>

						<div className="group p-6 rounded-xl border border-violet-500/15 bg-violet-950/20 backdrop-blur-sm hover:border-violet-500/30 hover:bg-violet-950/30 transition-all duration-300">
							<div className="flex items-start gap-4">
								<div className="flex-shrink-0 mt-1">
									<div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/30">
										<Icon icon="lucide:messages-square" className="size-5 text-violet-300/80" />
									</div>
								</div>
								<div className="space-y-2">
									<h3 className="text-lg sm:text-xl font-semibold text-violet-200">II. O Diálogo Sagrado</h3>
									<p className="text-sm sm:text-base text-violet-300/70 leading-relaxed">
										No silêncio, você fala consigo. As cartas respondem não com palavras alheias,
										mas com símbolos que despertam sua própria sabedoria adormecida.
									</p>
								</div>
							</div>
						</div>

						<div className="group p-6 rounded-xl border border-indigo-500/15 bg-indigo-950/20 backdrop-blur-sm hover:border-indigo-500/30 hover:bg-indigo-950/30 transition-all duration-300">
							<div className="flex items-start gap-4">
								<div className="flex-shrink-0 mt-1">
									<div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/30">
										<Icon icon="lucide:sparkles" className="size-5 text-indigo-300/80" />
									</div>
								</div>
								<div className="space-y-2">
									<h3 className="text-lg sm:text-xl font-semibold text-indigo-200">III. A Revelação</h3>
									<p className="text-sm sm:text-base text-indigo-300/70 leading-relaxed">
										Ao fim, você não encontra respostas prontas, mas clareza sobre suas próprias perguntas.
										O solilóquio revela não o futuro, mas quem você é agora.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="max-w-2xl mx-auto py-8 relative animate-in fade-in duration-1000 [animation-delay:600ms]">
					<div className="absolute -top-4 left-4 text-5xl text-purple-500/10 font-serif leading-none">"</div>
					<div className="absolute -bottom-4 right-4 text-5xl text-purple-500/10 font-serif leading-none rotate-180">"</div>

					<div className="flex items-center justify-center gap-2 mb-4">
						<div className="h-px w-10 bg-gradient-to-r from-transparent to-purple-500/20" />
						<Icon icon="lucide:scroll" className="size-3 text-purple-500/30" />
						<div className="h-px w-10 bg-gradient-to-l from-transparent to-purple-500/20" />
					</div>

					<p className="text-base sm:text-lg md:text-xl text-purple-200/90 font-light italic leading-relaxed text-center px-6">
						Quando a noite cai e estou sozinho,<br />
						despo a roupa do dia e visto as roupas reais.<br />
						Entro no mundo dos antigos e dialogo com eles.
					</p>

					<p className="text-xs sm:text-sm text-purple-400/50 mt-6 text-center tracking-wide">
						— Nicolau Maquiavel (1513)
					</p>
				</div>

				<div className="text-center space-y-6 animate-in fade-in duration-1000 [animation-delay:800ms]">
					<div className="space-y-3">
						<h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-200 via-violet-200 to-indigo-200 bg-clip-text text-transparent">
							Comece seu Solilóquio
						</h2>
						<p className="text-sm sm:text-base text-purple-300/60">
							Entre no portal. Deixe as cartas guiarem sua conversa interior.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link
							href="/baralhos"
							className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600/80 to-indigo-600/80 hover:from-purple-600 hover:to-indigo-600 text-white font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
						>
							<Icon icon="lucide:sparkles" className="size-4 group-hover:rotate-180 transition-transform duration-500" />
							<span>Explorar Baralhos</span>
						</Link>

						<Link
							href="/cartas/arcanos"
							className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-purple-500/40 hover:border-purple-500/60 text-purple-200 hover:bg-purple-500/5 font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105"
						>
							<Icon icon="lucide:book-open" className="size-4" />
							<span>Conhecer os Arcanos</span>
						</Link>
					</div>
				</div>

				<div className="text-center space-y-4 pt-12 pb-8 animate-in fade-in duration-1000 [animation-delay:1000ms]">
					<div className="flex items-center justify-center gap-4 text-purple-400/20">
						<Icon icon="lucide:moon" className="size-4 animate-pulse [animation-duration:5s]" />
						<span className="size-0.5 rounded-full bg-current" />
						<Icon icon="lucide:star" className="size-4 animate-pulse [animation-duration:5s] [animation-delay:1.5s]" />
						<span className="size-0.5 rounded-full bg-current" />
						<Icon icon="lucide:sparkles" className="size-4 animate-pulse [animation-duration:5s] [animation-delay:3s]" />
					</div>
					<p className="text-xs text-purple-400/40 tracking-wider">
						Como dentro, assim fora
					</p>
				</div>
			</div>
		</div>
	)
}
