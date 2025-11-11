import { MysticalBreadcrumb, type BreadcrumbItem } from '@workspace/ui'
import { TiragensCustomCTA, TiragensHeroSection } from './components'
import { TarotTiragensTabs } from '../../src/components/tabs/tarot-tiragens-tabs'

/**
 * Página das Tiragens de Tarot
 *
 * Portal místico para todas as tiragens sagradas organizadas por categorias elementais.
 * Cada categoria representa um elemento (Ar, Água, Fogo, Terra, Espírito) e possui
 * seu próprio símbolo cigano associado.
 *
 * Design inspirado em:
 * - Baralho Cigano (Petit Lenormand)
 * - 4 Elementos + Espírito
 * - Símbolos místicos (Lua, Estrela, Chave, Cavaleiro, Livro)
 * - Visual imersivo similar a /cartas/arcanos
 *
 * Baseado no livro: "Guia para Leitura Intuitiva" - Stefani Caponi
 */
export default function TiragensHomePage() {
	const breadcrumbItems: BreadcrumbItem[] = [
		{ label: 'Início', href: '/' },
		{ label: 'Tiragens' },
	]

	return (
		<div className="space-y-12">
			{/* ═══════════════════════════════════════════════════════
			    BREADCRUMB MÍSTICO
			    ═══════════════════════════════════════════════════════ */}
			<MysticalBreadcrumb items={breadcrumbItems} showSparkles />

			{/* ═══════════════════════════════════════════════════════
			    HERO SECTION - Portal Místico Cigano
			    ═══════════════════════════════════════════════════════ */}
			<TiragensHeroSection />

			{/* ═══════════════════════════════════════════════════════
			    CATEGORIAS DE TIRAGENS - Tabs Místicas Modulares
			    ═══════════════════════════════════════════════════════ */}
			<TarotTiragensTabs />

			{/* ═══════════════════════════════════════════════════════
			    CTA - CRIE SUA PRÓPRIA TIRAGEM
			    ═══════════════════════════════════════════════════════ */}
			<div className="py-16 animate-in fade-in duration-1000 delay-700">
				<TiragensCustomCTA />
			</div>

			{/* ═══════════════════════════════════════════════════════
			    FOOTER MÍSTICO
			    ═══════════════════════════════════════════════════════ */}
			<div className="max-w-4xl mx-auto text-center space-y-6 pt-12 pb-16">
				{/* Ornamento místico */}
				<div className="flex items-center justify-center gap-6">
					<div className="h-px w-24 bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
					<div className="flex items-center gap-3">
						<div className="size-2 rounded-full bg-fuchsia-400/30 animate-pulse [animation-duration:3s]" />
						<div className="size-1.5 rounded-full bg-purple-400/30 animate-pulse [animation-duration:4s] [animation-delay:1s]" />
						<div className="size-2 rounded-full bg-violet-400/30 animate-pulse [animation-duration:3.5s] [animation-delay:0.5s]" />
					</div>
					<div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
				</div>

				{/* Citação final */}
				<div className="relative">
					<div className="absolute -left-4 top-0 text-5xl font-serif leading-none text-fuchsia-500/10">"</div>
					<div className="absolute -right-2 bottom-0 text-5xl font-serif leading-none rotate-180 text-fuchsia-500/10">"</div>
					<p className="text-base italic text-purple-300/70 leading-relaxed px-8 max-w-2xl mx-auto">
						Cada tiragem é uma conversa com o cosmos. Escolha aquela que fala à sua alma,
						pois o universo responde na linguagem do coração.
					</p>
				</div>

				{/* Crédito */}
				<p className="text-xs text-purple-400/40 tracking-wide">
					Baseado no "Guia para Leitura Intuitiva" por Stefani Caponi
				</p>

				{/* Símbolos finais */}
				<div className="flex items-center justify-center gap-8 pt-6 opacity-20">
					<div className="size-1 rounded-full bg-fuchsia-400 animate-pulse [animation-duration:5s]" />
					<div className="size-0.5 rounded-full bg-purple-400 animate-pulse [animation-duration:6s] [animation-delay:2s]" />
					<div className="size-1 rounded-full bg-violet-400 animate-pulse [animation-duration:5.5s] [animation-delay:1s]" />
					<div className="size-0.5 rounded-full bg-fuchsia-400 animate-pulse [animation-duration:6.5s] [animation-delay:3s]" />
					<div className="size-1 rounded-full bg-purple-400 animate-pulse [animation-duration:5s] [animation-delay:1.5s]" />
				</div>
			</div>
		</div>
	)
}
