/**
 * Representa uma carta de naipe para exibição em grids
 * Tipo simplificado usado em listagens e componentes de UI
 */
export type NaipeCardData = {
	id: string
	slug: string | null
	name: string
	imageUrl?: string | null
	deck?: { name: string } | null
	numerology?: number | string | boolean | null
	verticalMeaning?: unknown
	typesOfReading?: unknown
}

/**
 * Representa um naipe do Tarô com suas propriedades visuais e simbólicas
 */
export type Naipe = {
	/** Nome do naipe (Copas, Paus, Ouros, Espadas) */
	name: string
	/** Símbolo Unicode do naipe (♥ ♣ ♦ ♠) */
	symbol: string
	/** Elemento associado (Água, Fogo, Terra, Ar) */
	element: string
	/** Ícone do elemento (Iconify) */
	elementIcon: string
	/** Cor base do naipe (Tailwind color name) */
	color: string
	/** Classes de gradiente do naipe */
	gradient: string
	/** Classes de gradiente de fundo */
	bgGradient: string
	/** Classes de cor da borda */
	borderColor: string
	/** Classes de cor da sombra no hover */
	shadowColor: string
	/** Descrição curta do naipe */
	description: string
	/** Signos do zodíaco associados */
	zodiac: string
	/** Temas principais representados */
	theme: string
	/** URL de navegação */
	href: string
}
