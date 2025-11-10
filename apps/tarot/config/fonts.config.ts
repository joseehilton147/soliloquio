/**
 * Sistema de Fontes Místicas - Configuração Centralizada
 *
 * Implementa sistema de fontes temáticas para o Tarô usando Google Fonts.
 * Arquitetura modular permite adicionar/remover fontes facilmente.
 *
 * FONTES SELECIONADAS (Google Fonts):
 * ────────────────────────────────────────────────────────────
 * DISPLAY/TÍTULOS:
 * - Cinzel: Inspirada em inscrições romanas clássicas - majestosa
 * - Playfair Display: Drama vintage do século XVIII - elegante
 * - Cormorant Garamond: Serifas refinadas - sofisticação mística
 * - Marcellus: Evoca textos astrológicos antigos - atemporal
 *
 * CORPO DE TEXTO:
 * - Philosopher: Formas únicas, insights cósmicos - legível
 * - EB Garamond: Clássica renascentista - máxima legibilidade
 * - Cormorant: Versátil, funciona em títulos e corpo
 *
 * COMO ADICIONAR NOVA FONTE:
 * ────────────────────────────────────────────────────────────
 * 1. Importar de next/font/google
 * 2. Adicionar ao MYSTICAL_FONTS object
 * 3. Definir uso (display, body, ou ambos)
 * 4. Pronto! Disponível em todo sistema
 */

import {
	Cinzel,
	Playfair_Display,
	Cormorant_Garamond,
	Marcellus,
	Philosopher,
	EB_Garamond,
	Cormorant,
} from 'next/font/google'

/**
 * ═══════════════════════════════════════════════
 * FONTES DE DISPLAY/TÍTULOS (Místicas, Impactantes)
 * ═══════════════════════════════════════════════
 */

/** Cinzel - Inscrições Romanas Clássicas */
export const cinzel = Cinzel({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-cinzel',
	display: 'swap',
})

/** Playfair Display - Drama Vintage Século XVIII */
export const playfairDisplay = Playfair_Display({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800', '900'],
	variable: '--font-playfair',
	display: 'swap',
})

/** Cormorant Garamond - Serifas Refinadas */
export const cormorantGaramond = Cormorant_Garamond({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-cormorant-garamond',
	display: 'swap',
})

/** Marcellus - Textos Astrológicos Antigos */
export const marcellus = Marcellus({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-marcellus',
	display: 'swap',
})

/**
 * ═══════════════════════════════════════════════
 * FONTES DE CORPO (Legíveis, Místicas mas Práticas)
 * ═══════════════════════════════════════════════
 */

/** Philosopher - Insights Cósmicos */
export const philosopher = Philosopher({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-philosopher',
	display: 'swap',
})

/** EB Garamond - Clássica Renascentista (Máxima Legibilidade) */
export const ebGaramond = EB_Garamond({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-eb-garamond',
	display: 'swap',
})

/** Cormorant - Versátil (Títulos + Corpo) */
export const cormorant = Cormorant({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-cormorant',
	display: 'swap',
})

/**
 * ═══════════════════════════════════════════════
 * CONFIGURAÇÃO EXPORTADA
 * ═══════════════════════════════════════════════
 */

export interface FontConfig {
	readonly name: string
	readonly description: string
	readonly usage: 'display' | 'body' | 'both'
	readonly font: ReturnType<typeof Cinzel>
	readonly cssVariable: string
}

/**
 * Catálogo de Fontes Místicas Disponíveis
 * Use este objeto para acessar qualquer fonte no sistema
 */
export const MYSTICAL_FONTS = {
	cinzel: {
		name: 'Cinzel',
		description: 'Inscrições romanas clássicas - majestosa e atemporal',
		usage: 'display',
		font: cinzel,
		cssVariable: '--font-cinzel',
	},
	playfair: {
		name: 'Playfair Display',
		description: 'Drama vintage do século XVIII - elegante e dramática',
		usage: 'display',
		font: playfairDisplay,
		cssVariable: '--font-playfair',
	},
	cormorantGaramond: {
		name: 'Cormorant Garamond',
		description: 'Serifas refinadas - sofisticação mística',
		usage: 'display',
		font: cormorantGaramond,
		cssVariable: '--font-cormorant-garamond',
	},
	marcellus: {
		name: 'Marcellus',
		description: 'Textos astrológicos antigos - sabedoria ancestral',
		usage: 'display',
		font: marcellus,
		cssVariable: '--font-marcellus',
	},
	philosopher: {
		name: 'Philosopher',
		description: 'Insights cósmicos - legível e contemplativa',
		usage: 'body',
		font: philosopher,
		cssVariable: '--font-philosopher',
	},
	ebGaramond: {
		name: 'EB Garamond',
		description: 'Clássica renascentista - máxima legibilidade',
		usage: 'body',
		font: ebGaramond,
		cssVariable: '--font-eb-garamond',
	},
	cormorant: {
		name: 'Cormorant',
		description: 'Versátil - funciona em títulos e corpo',
		usage: 'both',
		font: cormorant,
		cssVariable: '--font-cormorant',
	},
} as const satisfies Record<string, FontConfig>

/**
 * ═══════════════════════════════════════════════
 * FONTES ATIVAS (Defina aqui quais usar no sistema)
 * ═══════════════════════════════════════════════
 */

/** Fonte principal para títulos/headings/display */
export const FONT_DISPLAY = MYSTICAL_FONTS.cinzel

/** Fonte principal para corpo de texto */
export const FONT_BODY = MYSTICAL_FONTS.philosopher

/** Fonte alternativa para ênfase */
export const FONT_ACCENT = MYSTICAL_FONTS.playfair

/**
 * Helper para obter className de todas as fontes
 * Use no <html> ou <body> para disponibilizar via CSS variables
 */
export function getAllFontsClassName(): string {
	return Object.values(MYSTICAL_FONTS)
		.map((config) => config.font.variable)
		.join(' ')
}

/**
 * Helper para obter fonte específica por nome
 */
export function getFontByName(name: keyof typeof MYSTICAL_FONTS): FontConfig {
	return MYSTICAL_FONTS[name]
}
