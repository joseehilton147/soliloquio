import type { ArcanoType } from './arcanos.types'

/**
 * Dados dos 2 tipos de Arcanos do Tarô com suas propriedades místicas
 *
 * Arcanos Maiores: 22 cartas da jornada espiritual (O Louco até O Mundo)
 * Arcanos Menores: 56 cartas das situações cotidianas (4 naipes × 14 cartas)
 *
 * As cores e simbologias refletem a essência mística de cada categoria
 */
export const ARCANOS: readonly ArcanoType[] = [
	{
		id: 'maiores',
		name: 'Arcanos Maiores',
		title: 'A Jornada da Alma',
		icon: 'game-icons:moon-cloak',
		decorativeIcon: 'game-icons:crystal-ball',
		count: 22,
		subtitle: '22 Cartas Sagradas',
		color: 'violet',
		gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
		bgGradient: 'from-violet-500/10 via-purple-500/10 to-fuchsia-500/10',
		borderColor: 'border-violet-500/30',
		shadowColor: 'hover:shadow-violet-500/20',
		description: [
			'Os Arcanos Maiores representam a jornada espiritual do ser humano, desde O Louco (0) até O Mundo (21). São 22 portais sagrados que ilustram os grandes temas da existência, arquétipos universais e lições profundas que transcendem o tempo.',
			'Cada carta é um espelho da alma, refletindo aspectos fundamentais da consciência humana: amor (Os Amantes), sabedoria (O Eremita), transformação (A Morte), equilíbrio (A Justiça) e iluminação (O Sol). Juntas, narram a evolução espiritual da humanidade.',
			'Quando um Arcano Maior aparece em uma leitura, ele traz mensagens de grande importância, eventos marcantes e lições kármicas que moldam o destino. São as cartas do despertar espiritual.'
		],
		quote: 'Os Arcanos Maiores são espelhos da alma, refletindo nossa jornada de autoconhecimento e evolução espiritual através dos portais do tempo.',
		keyPoints: [
			{
				title: 'Simbolismo Ancestral',
				description: 'Contêm símbolos milenares, arquétipos junguianos e sabedoria hermética transmitida através das eras'
			},
			{
				title: 'Jornada do Louco',
				description: 'Narram a odisseia da consciência humana, desde a inocência até a iluminação completa'
			},
			{
				title: 'Lições Kármicas',
				description: 'Revelam grandes temas existenciais, ciclos de vida e transformações inevitáveis do espírito'
			}
		],
		href: '/cartas/arcanos/maiores'
	},
	{
		id: 'menores',
		name: 'Arcanos Menores',
		title: 'O Campo de Ação',
		icon: 'game-icons:card-random',
		decorativeIcon: 'game-icons:clover',
		count: 56,
		subtitle: '56 Cartas Elementais',
		color: 'indigo',
		gradient: 'from-indigo-600 via-blue-600 to-cyan-600',
		bgGradient: 'from-indigo-500/10 via-blue-500/10 to-cyan-500/10',
		borderColor: 'border-indigo-500/30',
		shadowColor: 'hover:shadow-indigo-500/20',
		description: [
			'Os Arcanos Menores representam situações cotidianas, escolhas práticas e influências que moldam nosso dia a dia. São 56 cartas divididas em 4 naipes elementais (Água, Fogo, Terra, Ar), cada um revelando uma dimensão da experiência humana.',
			'Enquanto os Arcanos Maiores mostram as grandes diretrizes espirituais e lições kármicas, os Menores revelam como essas energias se manifestam no nosso livre arbítrio, nas nossas atitudes, relacionamentos, trabalho e desafios diários.',
			'Cada naipe contém 14 cartas: números de Ás a 10 (evolução da energia) e 4 figuras da corte (Valete, Cavaleiro, Rainha, Rei) que representam pessoas reais ou aspectos da nossa personalidade.'
		],
		quote: 'Os Arcanos Menores são o campo de ação da nossa vontade, onde exercemos nossas escolhas e construímos nosso destino com as mãos.',
		keyPoints: [
			{
				title: 'Vida Prática',
				description: 'Representam situações do cotidiano, escolhas pessoais e o desenrolar dos eventos diários'
			},
			{
				title: '4 Elementos',
				description: 'Cada naipe conecta-se profundamente a Água (emoções), Fogo (ação), Terra (material) ou Ar (pensamento)'
			},
			{
				title: 'Livre Arbítrio',
				description: 'Mostram como exercemos nossa vontade, tomamos decisões e co-criamos nossa realidade'
			}
		],
		href: '/cartas/arcanos/menores'
	}
] as const
