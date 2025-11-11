import type { TiragemCategoryData } from './components'
import {
	ALL_SPREADS,
	CABECA_CORACAO_ESPIRITO,
	CONSELHO_DO_UNIVERSO,
	CRUZ_CELTA,
	DESPERTAR_ESPIRITUAL,
	DOM_E_OBSTACULO,
	ENCRUZILHADAS,
	JORNADA_DA_ALMA,
	LEI_DE_ATRACAO,
	LIBERAR_E_RETIRAR,
	MAGIA_MANIFESTADORA,
	MENSAGEM_DO_VENTO,
	MENTE_CORPO_ESPIRITO,
	PASSADO_PRESENTE_FUTURO,
	POTENCIAL_RELACIONAMENTO,
	PROBLEMA_FAZER_EVITAR,
	PROS_E_CONTRAS,
	QUATRO_ESTACOES_DA_ALMA,
	RAIZES_E_FRUTOS,
	RELACIONAMENTO_EXISTENTE,
	SIM_OU_NAO,
	TOMANDO_DECISAO,
	TRABALHO_DE_SOMBRA,
} from '../../src/data/spreads.data'

/**
 * Tiragens Categories Data
 *
 * Organização mística das tiragens em categorias elementais,
 * cada uma com seu próprio símbolo cigano, elemento e essência.
 *
 * Baseado em:
 * - Baralho Cigano (Petit Lenormand)
 * - 4 Elementos (Água, Fogo, Terra, Ar) + Espírito
 * - Símbolos místicos ciganos
 */

/**
 * CATEGORIA: Iluminação Rápida
 * Elemento: Ar (Intelecto, Pensamento, Clareza)
 * Símbolo Cigano: O Cavaleiro (Movimento, Ação)
 * Cor: Slate (Mental, Clareza, Agilidade)
 */
export const CATEGORIA_RAPIDAS: TiragemCategoryData = {
	id: 'rapidas',
	name: 'Iluminação Rápida',
	subtitle: 'Elemento Ar • Clareza Instantânea',
	description: [
		'Quando a vida exige respostas ágeis, estas tiragens são suas aliadas. Como o Cavaleiro do baralho cigano que galopa trazendo notícias, elas cortam diretamente ao cerne da questão com velocidade e precisão.',
		'O Ar é o elemento do intelecto e da comunicação clara. Estas tiragens manifestam essa energia através de respostas objetivas e diretas, perfeitas para decisões do dia a dia.',
	],
	quote:
		'A verdade mais profunda pode ser encontrada na simplicidade. Às vezes, uma única carta diz mais que mil palavras.',
	icon: 'lucide:zap',
	decorativeIcon: 'game-icons:wind-hole',
	element: 'air',
	color: 'slate',
	mysticalSymbol: 'game-icons:horse-head', // O Cavaleiro
	spreads: [SIM_OU_NAO, LIBERAR_E_RETIRAR, DOM_E_OBSTACULO, CABECA_CORACAO_ESPIRITO, MENSAGEM_DO_VENTO],
}

/**
 * CATEGORIA: Visão Interior
 * Elemento: Água (Emoção, Intuição, Fluxo)
 * Símbolo Cigano: A Lua (Intuição, Mistério)
 * Cor: Blue (Emoção, Fluxo, Profundidade)
 */
export const CATEGORIA_INSIGHTS: TiragemCategoryData = {
	id: 'insights',
	name: 'Visão Interior',
	subtitle: 'Elemento Água • Profundidade Emocional',
	description: [
		'Como a Lua do baralho cigano ilumina as águas profundas da noite, estas tiragens de 3 cartas revelam camadas ocultas de compreensão. Elas são portais para insights que transcendem a lógica.',
		'O Água é o elemento das emoções e da intuição. Nestas tiragens, cada carta é uma onda que se conecta à próxima, formando um oceano de sabedoria sobre passado, presente e futuro, ou sobre as dimensões de seu ser.',
	],
	quote:
		'Três cartas são como três espelhos da alma - juntas, revelam o reflexo completo de quem você é.',
	icon: 'lucide:eye',
	decorativeIcon: 'game-icons:water-splash',
	element: 'water',
	color: 'blue',
	mysticalSymbol: 'game-icons:crescent-moon', // A Lua
	spreads: [CONSELHO_DO_UNIVERSO, PASSADO_PRESENTE_FUTURO, MENTE_CORPO_ESPIRITO],
}

/**
 * CATEGORIA: Laços do Coração
 * Elemento: Fogo (Paixão, Energia, Transformação)
 * Símbolo Cigano: A Estrela (Proteção, Esperança)
 * Cor: Red (Paixão, Energia, Alquimia)
 */
export const CATEGORIA_RELACIONAMENTOS: TiragemCategoryData = {
	id: 'relacionamentos',
	name: 'Laços do Coração',
	subtitle: 'Elemento Fogo • Alquimia Relacional',
	description: [
		'Como a Estrela do baralho cigano que guia os viajantes noturnos, estas tiragens de 5-6 cartas iluminam os caminhos do coração. Elas revelam a dança energética entre duas almas.',
		'O Fogo é o elemento da transformação e da paixão. Nestas tiragens, cada carta representa uma chama que, junto às outras, cria a fogueira sagrada do relacionamento - seja ele existente ou potencial.',
	],
	quote:
		'Amor não é apenas sentimento, é alquimia. Duas energias que se encontram para criar algo maior.',
	icon: 'lucide:heart',
	decorativeIcon: 'game-icons:fire-ring',
	element: 'fire',
	color: 'red',
	mysticalSymbol: 'game-icons:north-star', // A Estrela
	spreads: [RELACIONAMENTO_EXISTENTE, POTENCIAL_RELACIONAMENTO, LEI_DE_ATRACAO],
}

/**
 * CATEGORIA: Encruzilhadas
 * Elemento: Terra (Manifestação, Materialização, Escolha)
 * Símbolo Cigano: A Chave (Abertura, Fechamento, Destino)
 * Cor: Amber (Sabedoria, Decisão, Clareza)
 */
export const CATEGORIA_DECISOES: TiragemCategoryData = {
	id: 'decisoes',
	name: 'Encruzilhadas',
	subtitle: 'Elemento Terra • Manifestação de Escolhas',
	description: [
		'A Chave do baralho cigano abre e fecha portas do destino. Estas tiragens são ferramentas sagradas para navegar nas bifurcações da vida, onde cada escolha molda sua realidade material.',
		'A Terra é o elemento da manifestação concreta. Estas tiragens trazem a magia para o plano físico, ajudando você a visualizar consequências reais de cada caminho - de decisões simples a encruzilhadas complexas.',
	],
	quote:
		'Cada escolha é uma semente plantada na Terra. Estas tiragens mostram qual jardim cada semente fará florescer.',
	icon: 'lucide:git-fork',
	decorativeIcon: 'game-icons:stone-path',
	element: 'earth',
	color: 'amber',
	mysticalSymbol: 'game-icons:skeleton-key', // A Chave
	spreads: [PROBLEMA_FAZER_EVITAR, PROS_E_CONTRAS, MAGIA_MANIFESTADORA, RAIZES_E_FRUTOS, ENCRUZILHADAS, TOMANDO_DECISAO],
}

/**
 * CATEGORIA: Portal Supremo
 * Elemento: Espírito (Transcendência, Totalidade, Sabedoria)
 * Símbolo Cigano: O Livro (Conhecimento Oculto, Mistérios)
 * Cor: Purple (Magia, Transcendência, Quintessência)
 */
export const CATEGORIA_PROFUNDA: TiragemCategoryData = {
	id: 'profunda',
	name: 'Portal Supremo',
	subtitle: 'Elemento Espírito • Sabedoria Ancestral',
	description: [
		'Como o Livro Sagrado do baralho cigano que guarda segredos ancestrais, estas tiragens são portais para os mistérios profundos da alma. Reservadas para questões que tocam a essência de sua jornada espiritual.',
		'O Espírito é o quinto elemento que une e transcende todos os outros. Estas tiragens tecem Ar, Água, Fogo e Terra em mandalas completas de compreensão - chakras, sombras, estações da alma e despertar da consciência.',
	],
	quote:
		'Quando a pergunta toca a alma, a resposta deve ser profunda. Estes portais não escondem nada do buscador sincero.',
	icon: 'lucide:compass',
	decorativeIcon: 'game-icons:spiral-bloom',
	element: 'spirit',
	color: 'purple',
	mysticalSymbol: 'game-icons:spell-book', // O Livro
	spreads: [JORNADA_DA_ALMA, TRABALHO_DE_SOMBRA, QUATRO_ESTACOES_DA_ALMA, DESPERTAR_ESPIRITUAL, CRUZ_CELTA],
}

/**
 * Array com todas as categorias na ordem de apresentação
 */
export const ALL_CATEGORIES: TiragemCategoryData[] = [
	CATEGORIA_RAPIDAS,
	CATEGORIA_INSIGHTS,
	CATEGORIA_RELACIONAMENTOS,
	CATEGORIA_DECISOES,
	CATEGORIA_PROFUNDA,
]

/**
 * Helper para buscar categoria por ID
 */
export function getCategoryById(id: string): TiragemCategoryData | undefined {
	return ALL_CATEGORIES.find((cat) => cat.id === id)
}

/**
 * Helper para contar total de spreads
 */
export function getTotalSpreadsCount(): number {
	return ALL_SPREADS.length
}
