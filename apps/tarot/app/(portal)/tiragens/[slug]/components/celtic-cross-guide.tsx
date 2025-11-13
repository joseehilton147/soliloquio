'use client'

import { Icon } from '@iconify/react'
import { useState } from 'react'

/**
 * Guia Visual para Tiragem Cruz Celta (10 cartas)
 *
 * Componente educativo que ensina como interpretar cada
 * posição da tiragem mais completa e profunda do tarot.
 *
 * Estrutura:
 * - Cruz Menor (1-2): Situação presente + Cruzamento
 * - Cruz Maior (3-6): Consciência, Passado, Fundação, Futuro
 * - Cajado (7-10): Consulente, Entorno, Esperanças/Medos, Desfecho
 *
 * Design: Tabs interativas, cards organizados por seção
 */

export function CelticCrossGuide() {
	const [activeTab, setActiveTab] = useState<'minor' | 'major' | 'staff'>('minor')

	const sections = {
		minor: {
			title: 'Cruz Menor',
			subtitle: 'O Centro da Questão',
			emoji: '✨',
			color: 'text-cyan-300',
			bgColor: 'from-cyan-950/40 to-cyan-900/20',
			borderColor: 'border-cyan-500/30',
			icon: 'lucide:crosshair',
			description: 'As duas primeiras cartas formam o núcleo da leitura, revelando a situação atual e o que a atravessa.',
			positions: [
				{
					number: 1,
					title: 'O Presente / A Situação',
					icon: 'lucide:circle-dot',
					description: 'A essência do que você está vivendo agora',
					details: [
						'Representa o coração da questão no momento presente',
						'Mostra as energias dominantes em sua vida atual',
						'Indica onde você se encontra nesta jornada',
						'É a carta central - todas as outras giram em torno dela',
					],
				},
				{
					number: 2,
					title: 'O Cruzamento / Obstáculo',
					icon: 'lucide:x',
					description: 'Influências que cruzam seu caminho',
					details: [
						'Pode ser um desafio, mas também uma força que interage',
						'Cruza (horizontal) a carta 1, mostrando tensão ou apoio',
						'Não é necessariamente negativo - pode ser um catalisador',
						'Revela o que você precisa enfrentar ou integrar',
					],
				},
			],
		},
		major: {
			title: 'Cruz Maior',
			subtitle: 'O Contexto Completo',
			emoji: '🌟',
			color: 'text-violet-300',
			bgColor: 'from-violet-950/40 to-violet-900/20',
			borderColor: 'border-violet-500/30',
			icon: 'lucide:compass',
			description: 'Quatro cartas que circundam o centro, revelando passado, consciência, fundação e futuro próximo.',
			positions: [
				{
					number: 3,
					title: 'Coroa / Consciência',
					icon: 'lucide:crown',
					description: 'O melhor resultado possível',
					details: [
						'Acima da cruz menor - representa seu objetivo consciente',
						'Mostra o potencial máximo da situação',
						'Indica onde você quer chegar',
						'Revela suas aspirações e intenções declaradas',
					],
				},
				{
					number: 4,
					title: 'Passado Recente',
					icon: 'lucide:rewind',
					description: 'Eventos que levaram ao presente',
					details: [
						'À esquerda da cruz - o que ficou para trás',
						'Mostra as raízes da situação atual',
						'Pode indicar padrões ou lições do passado',
						'Revela o que está deixando sua vida',
					],
				},
				{
					number: 5,
					title: 'Fundação / Base',
					icon: 'lucide:anchor',
					description: 'A raiz profunda da questão',
					details: [
						'Abaixo da cruz - as motivações subconscientes',
						'Revela o que sustenta ou fundamenta a situação',
						'Pode mostrar medos, desejos ou crenças profundas',
						'Indica causas subjacentes que você pode não perceber',
					],
				},
				{
					number: 6,
					title: 'Futuro Próximo',
					icon: 'lucide:fast-forward',
					description: 'O que está chegando',
					details: [
						'À direita da cruz - o que está se aproximando',
						'Mostra eventos ou energias no horizonte (próximos 6 meses)',
						'Indica a consequência natural da situação atual',
						'Revela para onde a situação está evoluindo',
					],
				},
			],
		},
		staff: {
			title: 'O Cajado',
			subtitle: 'Você e o Desfecho',
			emoji: '🔮',
			color: 'text-purple-300',
			bgColor: 'from-purple-950/40 to-purple-900/20',
			borderColor: 'border-purple-500/30',
			icon: 'lucide:wand-2',
			description: 'Quatro cartas verticais à direita que revelam você, seu ambiente, seus medos/esperanças e o resultado final.',
			positions: [
				{
					number: 7,
					title: 'Você / O Consulente',
					icon: 'lucide:user',
					description: 'Sua atitude e auto-percepção',
					details: [
						'Base do cajado - como você se vê nesta situação',
						'Revela seu estado emocional e psicológico',
						'Mostra os recursos internos que você traz',
						'Indica seu papel e responsabilidade na questão',
					],
				},
				{
					number: 8,
					title: 'Ambiente / Fatores Externos',
					icon: 'lucide:users',
					description: 'O que te cerca',
					details: [
						'Pessoas, condições e forças ao seu redor',
						'Como outros veem a situação',
						'Fatores externos que influenciam mas não controlam',
						'O contexto social, familiar ou profissional',
					],
				},
				{
					number: 9,
					title: 'Esperanças e Medos',
					icon: 'lucide:heart',
					description: 'Suas expectativas secretas',
					details: [
						'Desejos não expressos ou medos escondidos',
						'O que você secretamente espera ou teme',
						'Pode revelar resistências internas',
						'Mostra onde você precisa de coragem ou honestidade',
					],
				},
				{
					number: 10,
					title: 'Desfecho / Resultado Final',
					icon: 'lucide:flag',
					description: 'A culminação da jornada',
					details: [
						'Topo do cajado - o resultado mais provável',
						'Síntese de todas as energias das outras cartas',
						'Não é imutável - depende de suas ações',
						'Mostra para onde tudo está convergindo',
					],
				},
			],
		},
	}

	const readingTips = [
		{
			icon: 'lucide:layers',
			title: 'Leia em Camadas',
			text: 'Primeiro a Cruz Menor (1-2), depois a Cruz Maior (3-6), por último o Cajado (7-10)',
		},
		{
			icon: 'lucide:link',
			title: 'Conecte as Cartas',
			text: 'Veja como cartas opostas dialogam: 4 (passado) com 6 (futuro), 3 (consciência) com 5 (fundação)',
		},
		{
			icon: 'lucide:compass',
			title: 'O Centro é a Chave',
			text: 'Sempre volte às cartas 1 e 2 - elas são o coração de tudo',
		},
		{
			icon: 'lucide:book-open',
			title: 'Leitura Narrativa',
			text: 'Conte uma história: de onde você veio (4), onde está (1-2), para onde vai (6-10)',
		},
	]

	const currentSection = sections[activeTab]

	return (
		<div className="space-y-12 py-8">
			{/* Header */}
			<div className="text-center space-y-4 max-w-3xl mx-auto">
				<div className="flex items-center justify-center gap-3">
					<div className="h-px w-16 bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />
					<Icon
						icon="lucide:crosshair"
						className="size-8 text-purple-400/60"
						style={{ filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.6))' }}
					/>
					<div className="h-px w-16 bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />
				</div>

				<h2 className="text-3xl font-serif font-bold text-violet-200">
					Como Interpretar as 10 Posições
				</h2>
				<p className="text-base text-violet-300/70 leading-relaxed">
					A Cruz Celta é uma jornada completa através do passado, presente, futuro e tudo que os conecta.
					Explore cada seção para entender profundamente cada posição.
				</p>
			</div>

			{/* Tabs de Navegação */}
			<div className="max-w-2xl mx-auto">
				<div className="flex gap-2 p-2 rounded-xl bg-black/40 border border-violet-500/20">
					{(Object.keys(sections) as Array<keyof typeof sections>).map((key) => {
						const section = sections[key]
						const isActive = activeTab === key
						return (
							<button
								key={key}
								type="button"
								onClick={() => setActiveTab(key)}
								className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
									isActive
										? 'bg-gradient-to-br from-violet-600/30 to-purple-600/20 text-white border-2 border-violet-500/50'
										: 'text-violet-300/60 hover:text-violet-200 hover:bg-white/5'
								}`}
							>
								<div className="flex items-center justify-center gap-2">
									<Icon icon={section.icon} className="size-5" />
									<span>{section.title}</span>
								</div>
							</button>
						)
					})}
				</div>
			</div>

			{/* Conteúdo da Seção Ativa */}
			<div className="max-w-6xl mx-auto">
				{/* Header da Seção */}
				<div className="text-center mb-8 space-y-2">
					<h3 className={`text-2xl font-serif font-bold ${currentSection.color}`}>
						{currentSection.emoji} {currentSection.title}
					</h3>
					<p className="text-lg text-violet-300/60">{currentSection.subtitle}</p>
					<p className="text-sm text-violet-300/70 max-w-2xl mx-auto leading-relaxed">
						{currentSection.description}
					</p>
				</div>

				{/* Grid de Posições */}
				<div className="grid md:grid-cols-2 gap-6">
					{currentSection.positions.map((position) => (
						<div key={position.number} className="group">
							<div
								className={`relative h-full rounded-xl border-2 ${currentSection.borderColor} bg-gradient-to-br ${currentSection.bgColor} backdrop-blur-sm transition-all duration-500 hover:scale-105 shadow-lg overflow-hidden`}
							>
								{/* Header do Card */}
								<div className="p-6 border-b border-white/5">
									<div className="flex items-start gap-4">
										{/* Número */}
										<div
											className={`shrink-0 size-12 rounded-full border-2 flex items-center justify-center text-xl font-bold ${currentSection.color}`}
											style={{
												borderColor: 'currentColor',
												boxShadow: '0 0 20px currentColor',
												background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)',
											}}
										>
											{position.number}
										</div>

										{/* Título */}
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-1">
												<Icon icon={position.icon} className={`size-5 ${currentSection.color}`} />
												<h4 className={`text-lg font-bold ${currentSection.color}`}>{position.title}</h4>
											</div>
											<p className="text-sm text-violet-300/60">{position.description}</p>
										</div>
									</div>
								</div>

								{/* Conteúdo */}
								<div className="p-6">
									<ul className="space-y-3">
										{position.details.map((detail, i) => (
											<li key={i} className="flex items-start gap-2 text-sm">
												<Icon icon="lucide:circle" className={`size-3 mt-1 shrink-0 ${currentSection.color}`} />
												<span className="text-violet-100/80 leading-relaxed">{detail}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Dicas de Leitura */}
			<div className="max-w-4xl mx-auto">
				<div className="relative rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-950/40 to-purple-900/20 backdrop-blur-sm p-8">
					<div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 bg-black">
						<div className="flex items-center gap-2">
							<Icon icon="lucide:book-open" className="size-5 text-purple-400" />
							<h3 className="text-lg font-bold text-purple-200">Dicas de Leitura</h3>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-6 mt-4">
						{readingTips.map((tip, i) => (
							<div key={i} className="flex items-start gap-3 group/tip">
								<Icon
									icon={tip.icon}
									className="size-6 text-purple-400/70 mt-0.5 shrink-0 group-hover/tip:text-purple-300 transition-colors"
								/>
								<div>
									<h4 className="text-sm font-semibold text-violet-200 mb-1">{tip.title}</h4>
									<p className="text-sm text-violet-300/70 leading-relaxed">{tip.text}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Diagrama Visual Simplificado */}
			<div className="max-w-2xl mx-auto">
				<div className="rounded-xl border-2 border-violet-500/30 bg-gradient-to-br from-violet-950/40 to-violet-900/20 backdrop-blur-sm p-8">
					<h3 className="text-center text-lg font-bold text-violet-200 mb-6 flex items-center justify-center gap-2">
						<Icon icon="lucide:layout" className="size-5" />
						Estrutura Visual da Cruz
					</h3>

					<div className="text-center space-y-2 font-mono text-sm text-violet-300/80">
						<div className="flex items-center justify-center gap-8">
							<div className="text-cyan-300">3 Coroa</div>
							<div className="text-purple-300">10 Desfecho</div>
						</div>
						<div className="text-violet-400/40">|</div>
						<div className="flex items-center justify-center gap-4">
							<div className="text-violet-300">4 Pass</div>
							<div className="text-cyan-300">[1+2]</div>
							<div className="text-violet-300">6 Fut</div>
							<div className="text-purple-300">9 Esper</div>
						</div>
						<div className="text-violet-400/40">|</div>
						<div className="flex items-center justify-center gap-8">
							<div className="text-violet-300">5 Fund</div>
							<div className="text-purple-300">8 Entor</div>
						</div>
						<div className="text-violet-400/40">|</div>
						<div className="text-center">
							<div className="text-purple-300">7 Você</div>
						</div>
					</div>

					<p className="text-xs text-violet-400/60 text-center mt-6 italic">
						Centro (1+2) → Cruz Maior (3,4,5,6) → Cajado Vertical (7,8,9,10)
					</p>
				</div>
			</div>
		</div>
	)
}
