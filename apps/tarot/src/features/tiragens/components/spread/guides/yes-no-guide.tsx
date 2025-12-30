'use client'

import { Icon } from '@iconify/react'

/**
 * Guia Visual para Tiragem Sim ou Não
 *
 * Componente educativo e místico que ensina como interpretar
 * a tiragem de 1 carta para respostas sim/não.
 *
 * Design: Cards coloridos, ícones visuais, tipografia clara
 * Acessibilidade: Alto contraste, texto legível, hierarquia visual
 */

type CardExample = {
	name: string
	note?: string
}

type GuideSection = {
	title: string
	emoji: string
	color: string
	bgColor: string
	borderColor: string
	icon: string
	cards: {
		maiores?: CardExample[]
		menores?: CardExample[]
		figuras?: string[]
	}
}

export function YesNoGuide() {
	const sections: GuideSection[] = [
		{
			title: 'Cartas que Indicam SIM',
			emoji: '📗',
			color: 'text-emerald-300',
			bgColor: 'from-emerald-950/40 to-emerald-900/20',
			borderColor: 'border-emerald-500/30 hover:border-emerald-400/60',
			icon: 'lucide:check-circle',
			cards: {
				maiores: [
					{ name: 'O Sol (XIX)', note: 'Sim definitivo! Sucesso e clareza' },
					{ name: 'A Estrela (XVII)', note: 'Sim! Esperança e otimismo' },
					{ name: 'O Mundo (XXI)', note: 'Sim! Realização e conclusão' },
					{ name: 'A Roda da Fortuna (X)', note: 'Sim! Mudança favorável' },
					{ name: 'Todos os ASES', note: 'Sim! Novos começos' },
				],
				menores: [
					{ name: 'Copas (2, 3, 6, 9, 10)', note: 'Sim emocional' },
					{ name: 'Ouros (3, 6, 9, 10)', note: 'Sim material/financeiro' },
					{ name: 'Paus (2, 3, 6)', note: 'Sim para ação' },
				],
				figuras: ['Valete, Cavaleiro, Rainha e Rei de Copas e Ouros'],
			},
		},
		{
			title: 'Cartas que Indicam NÃO',
			emoji: '📕',
			color: 'text-rose-300',
			bgColor: 'from-rose-950/40 to-rose-900/20',
			borderColor: 'border-rose-500/30 hover:border-rose-400/60',
			icon: 'lucide:x-circle',
			cards: {
				maiores: [
					{ name: 'A Torre (XVI)', note: 'Não. Mudança brusca necessária' },
					{ name: 'O Diabo (XV)', note: 'Não. Padrões limitantes presentes' },
					{ name: 'A Morte (XIII)', note: 'Não agora. Transformação em curso' },
					{ name: 'O Enforcado (XII)', note: 'Não. Aguarde e reflita mais' },
				],
				menores: [
					{ name: '5 de Copas', note: 'Não. Perda ou decepção' },
					{ name: '5 de Paus', note: 'Não. Conflitos presentes' },
					{ name: '5 de Espadas', note: 'Não. Derrota ou traição' },
					{ name: '7 de Espadas', note: 'Não. Falta de transparência' },
					{ name: '9 de Espadas', note: 'Não. Ansiedade e preocupação' },
					{ name: '10 de Espadas', note: 'Não. Fim de ciclo doloroso' },
				],
			},
		},
		{
			title: 'Cartas Neutras - Reformule',
			emoji: '⚪',
			color: 'text-amber-300',
			bgColor: 'from-amber-950/40 to-amber-900/20',
			borderColor: 'border-amber-500/30 hover:border-amber-400/60',
			icon: 'lucide:help-circle',
			cards: {
				maiores: [
					{ name: 'A Justiça (XI)', note: 'Depende de suas ações' },
					{ name: 'O Eremita (IX)', note: 'Precisa de mais reflexão' },
					{ name: 'A Temperança (XIV)', note: 'Equilíbrio necessário primeiro' },
				],
				menores: [
					{ name: '2 de Espadas', note: 'Indecisão, reformule' },
					{ name: '4 de Copas', note: 'Apatia, não está claro' },
					{ name: '7 de Copas', note: 'Ilusão, seja mais específico' },
				],
			},
		},
	]

	const tips = [
		{ icon: 'lucide:target', text: 'Faça perguntas claras e específicas' },
		{ icon: 'lucide:ban', text: 'Evite perguntas com "talvez" ou "pode ser"' },
		{ icon: 'lucide:focus', text: 'Foque em uma situação por vez' },
		{ icon: 'lucide:sparkles', text: 'Confie em sua primeira impressão sobre a carta' },
		{ icon: 'lucide:rotate-ccw', text: 'Se não fizer sentido, reformule a pergunta' },
	]

	const goodQuestions = [
		'Devo aceitar esta oferta de trabalho?',
		'Este é um bom momento para investir?',
		'Devo ter essa conversa hoje?',
	]

	const badQuestions = [
		{ q: 'Serei feliz?', reason: 'muito aberta' },
		{ q: 'O que devo fazer?', reason: 'não é sim/não' },
		{ q: 'Ele me ama?', reason: 'complexa demais para 1 carta' },
	]

	return (
		<div className="space-y-12 py-8">
			{/* Header */}
			<div className="text-center space-y-4 max-w-3xl mx-auto">
				<div className="flex items-center justify-center gap-3">
					<div className="h-px w-16 bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
					<Icon
						icon="lucide:book-open"
						className="size-8 text-violet-400/60"
						style={{ filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.6))' }}
					/>
					<div className="h-px w-16 bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
				</div>

				<h2 className="text-3xl font-serif font-bold text-violet-200">
					Como Interpretar Sua Resposta
				</h2>
				<p className="text-base text-violet-300/70 leading-relaxed">
					Aprenda a identificar se sua carta indica sim, não ou se você deve reformular sua pergunta.
				</p>
			</div>

			{/* Cards de Categorias */}
			<div className="grid md:grid-cols-3 gap-6">
				{sections.map((section, index) => (
					<div
						key={section.title}
						className="group"
						style={{ animationDelay: `${index * 100}ms` }}
					>
						<div
							className={`relative h-full rounded-xl border-2 ${section.borderColor} bg-gradient-to-br ${section.bgColor} backdrop-blur-sm transition-all duration-500 hover:scale-105 shadow-lg overflow-hidden`}
						>
							{/* Header do Card */}
							<div className="p-6 border-b border-white/5">
								<div className="flex items-start gap-4">
									<div className="shrink-0">
										<Icon
											icon={section.icon}
											className={`size-10 ${section.color}`}
											style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
										/>
									</div>
									<div className="flex-1">
										<h3 className={`text-xl font-bold ${section.color} mb-1`}>
											{section.emoji} {section.title}
										</h3>
									</div>
								</div>
							</div>

							{/* Conteúdo do Card */}
							<div className="p-6 space-y-4">
								{/* Arcanos Maiores */}
								{section.cards.maiores && section.cards.maiores.length > 0 && (
									<div className="space-y-2">
										<h4 className="text-sm font-semibold text-violet-200/90 uppercase tracking-wide flex items-center gap-2">
											<Icon icon="lucide:crown" className="size-4" />
											Arcanos Maiores
										</h4>
										<ul className="space-y-2">
											{section.cards.maiores.map((card, i) => (
												<li key={i} className="flex items-start gap-2 text-sm">
													<Icon
														icon="lucide:circle"
														className={`size-3 mt-1 shrink-0 ${section.color}`}
													/>
													<div>
														<span className="text-violet-100/90 font-medium">{card.name}</span>
														{card.note && (
															<span className="text-violet-300/60 block text-xs mt-0.5">
																{card.note}
															</span>
														)}
													</div>
												</li>
											))}
										</ul>
									</div>
								)}

								{/* Arcanos Menores */}
								{section.cards.menores && section.cards.menores.length > 0 && (
									<div className="space-y-2">
										<h4 className="text-sm font-semibold text-violet-200/90 uppercase tracking-wide flex items-center gap-2">
											<Icon icon="lucide:layers" className="size-4" />
											Arcanos Menores
										</h4>
										<ul className="space-y-2">
											{section.cards.menores.map((card, i) => (
												<li key={i} className="flex items-start gap-2 text-sm">
													<Icon
														icon="lucide:circle"
														className={`size-3 mt-1 shrink-0 ${section.color}`}
													/>
													<div>
														<span className="text-violet-100/90 font-medium">{card.name}</span>
														{card.note && (
															<span className="text-violet-300/60 block text-xs mt-0.5">
																{card.note}
															</span>
														)}
													</div>
												</li>
											))}
										</ul>
									</div>
								)}

								{/* Figuras da Corte */}
								{section.cards.figuras && section.cards.figuras.length > 0 && (
									<div className="space-y-2 pt-2 border-t border-white/5">
										<h4 className="text-sm font-semibold text-violet-200/90 uppercase tracking-wide flex items-center gap-2">
											<Icon icon="lucide:users" className="size-4" />
											Figuras da Corte
										</h4>
										<ul className="space-y-1">
											{section.cards.figuras.map((fig, i) => (
												<li key={i} className="text-sm text-violet-100/80 flex items-start gap-2">
													<Icon
														icon="lucide:circle"
														className={`size-3 mt-1 shrink-0 ${section.color}`}
													/>
													{fig}
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Dicas Importantes */}
			<div className="max-w-4xl mx-auto">
				<div className="relative rounded-xl border-2 border-violet-500/30 bg-gradient-to-br from-violet-950/40 to-violet-900/20 backdrop-blur-sm p-8">
					<div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 bg-black">
						<div className="flex items-center gap-2">
							<Icon icon="lucide:lightbulb" className="size-5 text-amber-400" />
							<h3 className="text-lg font-bold text-violet-200">Dicas Importantes</h3>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-4 mt-4">
						{tips.map((tip, i) => (
							<div key={i} className="flex items-start gap-3 group/tip">
								<Icon
									icon={tip.icon}
									className="size-5 text-violet-400/70 mt-0.5 group-hover/tip:text-violet-300 transition-colors"
								/>
								<p className="text-sm text-violet-200/80 leading-relaxed">{tip.text}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Exemplos de Perguntas */}
			<div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
				{/* Perguntas Boas */}
				<div className="rounded-xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 backdrop-blur-sm p-6">
					<div className="flex items-center gap-3 mb-4">
						<Icon icon="lucide:check-circle-2" className="size-6 text-emerald-400" />
						<h3 className="text-lg font-bold text-emerald-300">Perguntas Boas ✓</h3>
					</div>
					<ul className="space-y-3">
						{goodQuestions.map((q, i) => (
							<li key={i} className="flex items-start gap-2">
								<Icon icon="lucide:quote" className="size-4 text-emerald-400/60 mt-1 shrink-0" />
								<span className="text-sm text-violet-100/90 italic">"{q}"</span>
							</li>
						))}
					</ul>
				</div>

				{/* Perguntas Ruins */}
				<div className="rounded-xl border-2 border-rose-500/30 bg-gradient-to-br from-rose-950/40 to-rose-900/20 backdrop-blur-sm p-6">
					<div className="flex items-center gap-3 mb-4">
						<Icon icon="lucide:x-circle" className="size-6 text-rose-400" />
						<h3 className="text-lg font-bold text-rose-300">Perguntas Ruins ✗</h3>
					</div>
					<ul className="space-y-3">
						{badQuestions.map((item, i) => (
							<li key={i} className="space-y-1">
								<div className="flex items-start gap-2">
									<Icon icon="lucide:quote" className="size-4 text-rose-400/60 mt-1 shrink-0" />
									<span className="text-sm text-violet-100/90 italic">"{item.q}"</span>
								</div>
								<p className="text-xs text-rose-300/60 pl-6">→ {item.reason}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}
