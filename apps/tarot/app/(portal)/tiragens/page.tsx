import { MysticalBreadcrumb, type BreadcrumbItem } from '@workspace/ui'
import { TiragensHeroSection, TiragensLearningPath } from './components'
import { TarotTiragensTabs } from '@/components/tabs/tarot-tiragens-tabs'

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
			    JORNADA DE APRENDIZADO - 3 Níveis de Evolução
			    ═══════════════════════════════════════════════════════ */}
			<div className="py-16 pb-24 animate-in fade-in duration-1000 delay-700">
				<TiragensLearningPath />
			</div>
		</div>
	)
}
