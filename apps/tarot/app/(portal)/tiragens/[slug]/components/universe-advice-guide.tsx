'use client'

import { Icon } from '@iconify/react'

/**
 * Guia Visual para Tiragem Conselho do Universo (3 cartas)
 *
 * Componente educativo e místico que ensina como interpretar
 * a tiragem de 3 cartas em formato triangular.
 *
 * Estrutura: 2 cartas na base (Onde Focar + Ação a Tomar)
 *           + 1 carta no topo (Conselho Central)
 *
 * Design: Cards coloridos, layout triangular, tipografia clara
 */

export function UniverseAdviceGuide() {
	const positions = [
		{
			number: 1,
			title: 'Onde Focar Sua Energia',
			emoji: '🎯',
			color: 'text-cyan-300',
			bgColor: 'from-cyan-950/40 to-cyan-900/20',
			borderColor: 'border-cyan-500/30 hover:border-cyan-400/60',
			icon: 'lucide:target',
			description: 'O que merece sua atenção e energia agora',
			details: [
				'Identifica áreas onde você deve concentrar esforços',
				'Aponta recursos, pessoas ou situações favoráveis',
				'Mostra oportunidades que não devem ser desperdiçadas',
				'Revela caminhos que trazem clareza e progresso',
			],
			questions: [
				'O que esta carta está me pedindo para priorizar?',
				'Onde devo investir meu tempo e atenção?',
				'Qual aspecto da situação está pedindo meu foco?',
			],
		},
		{
			number: 2,
			title: 'Ação a Tomar',
			emoji: '⚡',
			color: 'text-orange-300',
			bgColor: 'from-orange-950/40 to-orange-900/20',
			borderColor: 'border-orange-500/30 hover:border-orange-400/60',
			icon: 'lucide:zap',
			description: 'A ação concreta e prática que você deve tomar',
			details: [
				'Revela o passo concreto que transformará intenção em realidade',
				'Mostra como colocar sua energia em movimento produtivo',
				'Indica a ação que alinha você com o fluxo universal',
				'Aponta o que fazer para manifestar o resultado desejado',
			],
			questions: [
				'Que ação prática esta carta está me pedindo?',
				'Como posso transformar meu foco em movimento?',
				'Qual o primeiro passo concreto a dar?',
			],
		},
		{
			number: 3,
			title: 'Conselho do Universo',
			emoji: '✨',
			color: 'text-violet-300',
			bgColor: 'from-violet-950/40 to-violet-900/20',
			borderColor: 'border-violet-500/30 hover:border-violet-400/60',
			icon: 'lucide:sparkles',
			description: 'A sabedoria central que integra foco e ação',
			details: [
				'A mensagem mais importante do universo para você agora',
				'Integra onde focar e que ação tomar em sabedoria única',
				'Oferece a perspectiva superior que ilumina o caminho',
				'Revela como manifestar seus objetivos com fluidez',
			],
			questions: [
				'Qual é a mensagem central do universo?',
				'Como posso integrar foco e ação de forma harmoniosa?',
				'Qual sabedoria maior está guiando meu caminho?',
			],
		},
	]

	const readingTips = [
		{
			icon: 'lucide:triangle',
			title: 'Leia em Formato Triangular',
			text: 'Comece pelas duas da base (1 e 2), depois suba para o topo (3)',
		},
		{
			icon: 'lucide:link',
			title: 'Conecte as Mensagens',
			text: 'A carta 3 integra e equilibra as orientações das cartas 1 e 2',
		},
		{
			icon: 'lucide:lightbulb',
			title: 'Busque o Equilíbrio',
			text: 'O conselho geralmente mostra como balancear foco e cautela',
		},
		{
			icon: 'lucide:heart',
			title: 'Confie na Intuição',
			text: 'Observe qual carta ressoa mais forte - ela tem uma mensagem especial',
		},
	]

	return (
		<div className="space-y-12 py-8">
			{/* Header */}
			<div className="text-center space-y-4 max-w-3xl mx-auto">
				<div className="flex items-center justify-center gap-3">
					<div className="h-px w-16 bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />
					<Icon
						icon="lucide:compass"
						className="size-8 text-blue-400/60"
						style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))' }}
					/>
					<div className="h-px w-16 bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />
				</div>

				<h2 className="text-3xl font-serif font-bold text-violet-200">
					Como Interpretar as Três Cartas
				</h2>
				<p className="text-base text-violet-300/70 leading-relaxed">
					Esta tiragem triangular oferece orientação completa: onde focar, o que evitar, e a sabedoria que une tudo.
				</p>
			</div>

			{/* Layout Triangular das Posições */}
			<div className="max-w-4xl mx-auto">
				{/* Carta do Topo - Conselho (3) */}
				<div className="flex justify-center mb-8">
					<div className="w-full max-w-md">
						{renderPositionCard(positions[2]!)}
					</div>
				</div>

				{/* Cartas da Base - Foco (1) e Evitar (2) */}
				<div className="grid md:grid-cols-2 gap-6">
					{renderPositionCard(positions[0]!)}
					{renderPositionCard(positions[1]!)}
				</div>

				{/* Linhas Conectoras (visual) */}
				<div className="flex justify-center mt-4 mb-8 opacity-30">
					<div className="flex items-center gap-2">
						<div className="size-2 rounded-full bg-cyan-400" />
						<div className="h-px w-16 bg-linear-to-r from-cyan-400 via-violet-400 to-violet-400" />
						<div className="size-3 rounded-full bg-violet-400" />
						<div className="h-px w-16 bg-linear-to-r from-violet-400 via-orange-400 to-orange-400" />
						<div className="size-2 rounded-full bg-orange-400" />
					</div>
				</div>
			</div>

			{/* Dicas de Leitura */}
			<div className="max-w-4xl mx-auto">
				<div className="relative rounded-xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-sm p-8">
					<div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 bg-black">
						<div className="flex items-center gap-2">
							<Icon icon="lucide:book-open" className="size-5 text-blue-400" />
							<h3 className="text-lg font-bold text-blue-200">Dicas de Leitura</h3>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-6 mt-4">
						{readingTips.map((tip, i) => (
							<div key={i} className="flex items-start gap-3 group/tip">
								<Icon
									icon={tip.icon}
									className="size-6 text-blue-400/70 mt-0.5 shrink-0 group-hover/tip:text-blue-300 transition-colors"
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

			{/* Exemplo de Interpretação */}
			<div className="max-w-3xl mx-auto">
				<div className="rounded-xl border-2 border-violet-500/30 bg-gradient-to-br from-violet-950/40 to-violet-900/20 backdrop-blur-sm p-8">
					<div className="flex items-start gap-4 mb-4">
						<Icon icon="lucide:lightbulb" className="size-6 text-amber-400 mt-1 shrink-0" />
						<div>
							<h3 className="text-lg font-bold text-violet-200 mb-2">
								Exemplo de Interpretação em Conjunto
							</h3>
							<div className="space-y-3 text-sm text-violet-200/80 leading-relaxed">
								<p>
									<span className="font-semibold text-cyan-300">Carta 1 (Foco):</span> O Sol - concentre-se em
									expressar sua verdade autêntica
								</p>
								<p>
									<span className="font-semibold text-orange-300">Carta 2 (Ação):</span> 7 de Espadas - tome a
									ação de se retirar de situações que não servem mais
								</p>
								<p>
									<span className="font-semibold text-violet-300">Carta 3 (Conselho):</span> A Estrela - confie
									em sua luz interior, mantenha esperança realista
								</p>
								<div className="pt-3 mt-3 border-t border-violet-500/20">
									<p className="italic text-violet-300/60">
										<Icon icon="lucide:quote" className="inline size-4 mr-1" />
										Leitura integrada: Seja autêntico (Sol), retire-se estrategicamente do que não ressoa (7 de Espadas), e confie
										que sua verdade atrairá renovação (Estrela).
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

	function renderPositionCard(position: typeof positions[0]) {
		return (
			<div className="group h-full">
				<div
					className={`relative h-full rounded-xl border-2 ${position.borderColor} bg-gradient-to-br ${position.bgColor} backdrop-blur-sm transition-all duration-500 hover:scale-105 shadow-lg overflow-hidden`}
				>
					{/* Header do Card */}
					<div className="p-6 border-b border-white/5">
						<div className="flex items-start gap-4">
							{/* Número */}
							<div
								className={`shrink-0 size-12 rounded-full border-2 flex items-center justify-center text-xl font-bold ${position.color}`}
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
								<h3 className={`text-xl font-bold ${position.color} mb-1`}>
									{position.emoji} {position.title}
								</h3>
								<p className="text-sm text-violet-300/60">{position.description}</p>
							</div>
						</div>
					</div>

					{/* Conteúdo */}
					<div className="p-6 space-y-4">
						{/* O Que Esta Posição Revela */}
						<div>
							<h4 className="text-sm font-semibold text-violet-200/90 uppercase tracking-wide mb-3 flex items-center gap-2">
								<Icon icon={position.icon} className="size-4" />
								O Que Esta Posição Revela
							</h4>
							<ul className="space-y-2">
								{position.details.map((detail, i) => (
									<li key={i} className="flex items-start gap-2 text-sm">
										<Icon icon="lucide:circle" className={`size-3 mt-1 shrink-0 ${position.color}`} />
										<span className="text-violet-100/80">{detail}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Perguntas para Refletir */}
						<div className="pt-4 border-t border-white/5">
							<h4 className="text-sm font-semibold text-violet-200/90 uppercase tracking-wide mb-3 flex items-center gap-2">
								<Icon icon="lucide:help-circle" className="size-4" />
								Perguntas para Refletir
							</h4>
							<ul className="space-y-2">
								{position.questions.map((q, i) => (
									<li key={i} className="flex items-start gap-2 text-sm">
										<Icon icon="lucide:message-circle" className={`size-3 mt-1 shrink-0 ${position.color}`} />
										<span className="text-violet-200/70 italic">"{q}"</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
