/**
 * Sistema de Tiragens de Tarot - Tipos TypeScript
 *
 * Define a estrutura de dados para tiragens (spreads) de tarot,
 * incluindo posições de cartas e layouts visuais.
 *
 * Baseado em: "Guia para Leitura Intuitiva" - Stefani Caponi
 */

/**
 * Categoria de tiragem por propósito e complexidade
 */
export type SpreadCategory =
	| 'quick'         // Tiragens rápidas (2 cartas)
	| 'insight'       // Insights profundos (3 cartas)
	| 'relationship'  // Relacionamentos (5-6 cartas)
	| 'decision'      // Tomada de decisão (6 cartas)
	| 'deep'          // Análise profunda (10+ cartas)
	| 'custom'        // Tiragens personalizadas

/**
 * Tipo de layout visual da tiragem
 */
export type SpreadLayout =
	| 'single'            // Carta única central
	| 'linear'            // Linha horizontal
	| 'vertical'          // Linha vertical
	| 'triangle'          // Triângulo
	| 'triangle-inverted' // Triângulo invertido
	| 'cross'             // Cruz
	| 'horseshoe'         // Ferradura
	| 'celtic'            // Cruz Celta específica
	| 'circle'            // Círculo
	| 'wheel'             // Roda/Círculo com centro
	| 'pentagram'         // Estrela de 5 pontas
	| 'grid'              // Grade/Grid (3x3, 4x4, etc)
	| 'tree'              // Árvore (vertical com ramificações)
	| 'mirror'            // Espelho (simétrico)
	| 'crossroads'        // Encruzilhada (4 direções)
	| 'mandala'           // Mandala (circular concêntrico)
	| 'custom'            // Layout personalizado

/**
 * Posição individual de uma carta na tiragem
 *
 * Define onde a carta aparece visualmente e o que ela representa
 */
export interface SpreadPosition {
	/** ID único da posição */
	id: string

	/** Número da posição (ordem de leitura) */
	order: number

	/** Nome da posição (ex: "Passado", "Obstáculo") */
	label: string

	/** Descrição do significado dessa posição */
	description: string

	/** Coordenada X no canvas (0-100 em %) */
	x: number

	/** Coordenada Y no canvas (0-100 em %) */
	y: number

	/** Rotação da carta em graus (0-360) */
	rotation?: number

	/** Indicador visual especial (ex: "center", "top") */
	emphasis?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'highlight'

	/** Conexões visuais com outras posições (linhas místicas) */
	connectedTo?: string[]
}

/**
 * Tiragem de Tarot completa
 *
 * Define uma tiragem com todas suas posições e metadados
 */
export interface TarotSpread {
	/** ID único da tiragem */
	id: string

	/** Nome da tiragem */
	name: string

	/** Slug para URL (kebab-case) */
	slug: string

	/** Número de cartas na tiragem */
	cardCount: number

	/** Categoria da tiragem */
	category: SpreadCategory

	/** Descrição geral da tiragem */
	description: string

	/** Quando usar esta tiragem */
	whenToUse: string

	/** Tipo de layout visual */
	layout: SpreadLayout

	/** Array de posições das cartas */
	positions: SpreadPosition[]

	/** Fonte/autor da tiragem */
	source?: string

	/** Dificuldade (1-5) */
	difficulty?: 1 | 2 | 3 | 4 | 5

	/** Tempo estimado de leitura (minutos) */
	estimatedTime?: number

	/** Tags para busca */
	tags?: string[]

	/** Cor temática (hex) */
	themeColor?: string

	/** Ícone representativo */
	icon?: string
}

/**
 * Tiragem Personalizada (salva no BD)
 *
 * Extends TarotSpread com campos específicos de usuário
 */
export interface CustomSpread extends TarotSpread {
	/** ID do usuário criador */
	userId: string

	/** Data de criação */
	createdAt: Date

	/** Data da última atualização */
	updatedAt: Date

	/** Se a tiragem é pública (compartilhável) */
	isPublic: boolean

	/** Número de vezes que foi usada */
	usageCount?: number

	/** Avaliação média (1-5) */
	rating?: number

	/** Notas pessoais do criador */
	notes?: string
}

/**
 * Resultado de uma tiragem realizada
 *
 * Armazena as cartas sorteadas e interpretações
 */
export interface SpreadReading {
	/** ID único da leitura */
	id: string

	/** ID da tiragem usada */
	spreadId: string

	/** ID do usuário (se logado) */
	userId?: string

	/** Data da leitura */
	readAt: Date

	/** Cartas sorteadas (ID da carta + posição) */
	cards: Array<{
		positionId: string
		cardId: string
		isReversed: boolean
	}>

	/** Pergunta feita (opcional) */
	question?: string

	/** Interpretação/notas do usuário */
	interpretation?: string

	/** Se foi favoritada */
	isFavorite?: boolean

	/** Tags para organização */
	tags?: string[]
}

/**
 * Validação de tiragem customizada
 */
export interface SpreadValidation {
	isValid: boolean
	errors: string[]
	warnings: string[]
}

/**
 * Configurações visuais do canvas de tiragem
 */
export interface SpreadCanvasConfig {
	/** Largura do canvas em px */
	width: number

	/** Altura do canvas em px */
	height: number

	/** Mostrar grid de auxílio */
	showGrid?: boolean

	/** Mostrar conexões entre cartas */
	showConnections?: boolean

	/** Modo de visualização */
	mode: 'view' | 'edit' | 'reading'

	/** Cor de fundo */
	backgroundColor?: string

	/** Mostrar números das posições */
	showPositionNumbers?: boolean
}
