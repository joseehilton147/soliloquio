import type { TiragemCategoryData } from './components'
import {
	ALL_SPREADS,
	CONSELHO_DO_UNIVERSO,
	CRUZ_CELTA,
	SIM_OU_NAO,
} from '@/data/spreads'

/**
 * Tiragens Categories Data - 3 Categorias Essenciais
 *
 * Organização mística das tiragens em categorias elementais,
 * cada uma com seu próprio símbolo cigano, elemento e essência.
 *
 * Baseado em:
 * - Baralho Cigano (Petit Lenormand)
 * - 3 Elementos: Ar (Clareza), Água (Intuição), Espírito (Sabedoria)
 * - Símbolos místicos ciganos
 */

/**
 * CATEGORIA: Iluminação Rápida
 * Elemento: Ar (Intelecto, Pensamento, Clareza)
 * Símbolo Cigano: A Flecha (Precisão, Direção, Resposta Direta)
 * Cor: Slate (Mental, Clareza, Agilidade)
 */
export const CATEGORIA_RAPIDAS: TiragemCategoryData = {
	id: 'rapidas',
	name: 'Iluminação Rápida',
	subtitle: 'Elemento Ar • Clareza Instantânea',
	description: [
		'Como a Flecha do baralho cigano que voa direto ao alvo, esta tiragem corta através da confusão com precisão cirúrgica. Uma única carta revela a verdade essencial.',
		'O Ar é o elemento do intelecto e da comunicação clara. Esta tiragem manifesta essa energia através de uma resposta objetiva e direta, perfeita para decisões que exigem sim ou não.',
	],
	quote:
		'A verdade mais profunda pode ser encontrada na simplicidade. Às vezes, uma única carta diz mais que mil palavras.',
	icon: 'lucide:zap',
	decorativeIcon: 'game-icons:wind-hole',
	element: 'air',
	color: 'slate',
	mysticalSymbol: 'lucide:target', // A Flecha/Alvo
	spreads: [SIM_OU_NAO],
}

/**
 * CATEGORIA: Visão Interior
 * Elemento: Água (Emoção, Intuição, Fluxo)
 * Símbolo Cigano: A Lua (Intuição, Mistério, Conselho Divino)
 * Cor: Blue (Emoção, Fluxo, Profundidade)
 */
export const CATEGORIA_INSIGHTS: TiragemCategoryData = {
	id: 'insights',
	name: 'Visão Interior',
	subtitle: 'Elemento Água • Profundidade Emocional',
	description: [
		'Como a Lua do baralho cigano ilumina as águas profundas da noite, esta tiragem de 3 cartas revela camadas ocultas de compreensão. Um portal para o conselho direto do universo.',
		'A Água é o elemento das emoções e da intuição. Nesta tiragem, cada carta é uma onda que se conecta à próxima, formando um oceano de sabedoria: onde focar sua energia, o que evitar, e o conselho central do cosmos.',
	],
	quote:
		'Três cartas são como três espelhos da alma - juntas, revelam a mensagem que o universo tem para você.',
	icon: 'lucide:eye',
	decorativeIcon: 'game-icons:water-splash',
	element: 'water',
	color: 'blue',
	mysticalSymbol: 'game-icons:crescent-moon', // A Lua
	spreads: [CONSELHO_DO_UNIVERSO],
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
		'Como o Livro Sagrado do baralho cigano que guarda segredos ancestrais, a Cruz Celta é um portal para os mistérios profundos da alma. A tiragem mestre do tarot, reservada para questões que tocam a essência de sua jornada espiritual.',
		'O Espírito é o quinto elemento que une e transcende todos os outros. Esta tiragem tece Ar, Água, Fogo e Terra em uma mandala completa de compreensão - passado, presente, futuro, você, o ambiente, e o desfecho que o aguarda.',
	],
	quote:
		'Quando a pergunta toca a alma, a resposta deve ser profunda. Este portal não esconde nada do buscador sincero.',
	icon: 'lucide:compass',
	decorativeIcon: 'game-icons:spiral-bloom',
	element: 'spirit',
	color: 'purple',
	mysticalSymbol: 'game-icons:spell-book', // O Livro
	spreads: [CRUZ_CELTA],
}

/**
 * Array com todas as categorias na ordem de apresentação
 */
export const ALL_CATEGORIES: TiragemCategoryData[] = [
	CATEGORIA_RAPIDAS,
	CATEGORIA_INSIGHTS,
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
