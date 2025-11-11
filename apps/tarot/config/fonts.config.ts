/**
 * Sistema de Fontes Místicas - Configuração Híbrida Otimizada
 *
 * Combina legibilidade máxima (WCAG AAA) com estética mística.
 * Fontes testadas para acessibilidade e experiência imersiva.
 *
 * FONTES SELECIONADAS (Google Fonts):
 * ────────────────────────────────────────────────────────────
 * DISPLAY/TÍTULOS (elegância + legibilidade):
 * - EB Garamond: Clássica renascentista - máxima legibilidade ⭐
 * - Cinzel: Romana antiga - majestosa mas legível
 * - Spectral: Serifa moderna - mística e acessível
 *
 * CORPO DE TEXTO (otimizado para leitura longa):
 * - Lora: Raízes caligráficas - altamente legível em telas ⭐
 * - Merriweather: Otimizada para web - curvas elegantes
 * - Literata: Serifa moderna - excelente para textos longos
 *
 * ACESSIBILIDADE WCAG:
 * - Tamanhos: 16px+ (AA), 18px+ (AAA)
 * - Contraste: 4.5:1 texto normal, 3:1 texto grande
 * - Evita fontes muito decorativas em corpo de texto
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
	EB_Garamond,
	Literata,
	Lora,
	Merriweather,
	Spectral,
} from 'next/font/google'

/**
 * ═══════════════════════════════════════════════
 * FONTES DE DISPLAY/TÍTULOS (Elegantes + Legíveis)
 * ═══════════════════════════════════════════════
 */

/** EB Garamond - Clássica Renascentista (MÁXIMA LEGIBILIDADE) ⭐ */
export const ebGaramond = EB_Garamond({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	variable: '--font-eb-garamond',
	display: 'swap',
})

/** Cinzel - Inscrições Romanas Clássicas (Majestosa) */
export const cinzel = Cinzel({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-cinzel',
	display: 'swap',
})

/** Spectral - Serifa Elegante Moderna (Mística) */
export const spectral = Spectral({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	variable: '--font-spectral',
	display: 'swap',
})

/**
 * ═══════════════════════════════════════════════
 * FONTES DE CORPO (Otimizadas para Leitura Longa)
 * ═══════════════════════════════════════════════
 */

/** Lora - Raízes Caligráficas (ALTAMENTE LEGÍVEL) ⭐ */
export const lora = Lora({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-lora',
	display: 'swap',
})

/** Merriweather - Otimizada para Telas (Elegante) */
export const merriweather = Merriweather({
	subsets: ['latin'],
	weight: ['300', '400', '700', '900'],
	variable: '--font-merriweather',
	display: 'swap',
})

/** Literata - Serifa Moderna (Textos Longos) */
export const literata = Literata({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-literata',
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
	readonly font: ReturnType<typeof EB_Garamond>
	readonly cssVariable: string
}

/**
 * Catálogo de Fontes Místicas Disponíveis
 * Combinação híbrida: legibilidade + misticismo
 */
export const MYSTICAL_FONTS = {
	ebGaramond: {
		name: 'EB Garamond',
		description: 'Clássica renascentista - máxima legibilidade para títulos ⭐',
		usage: 'display',
		font: ebGaramond,
		cssVariable: '--font-eb-garamond',
	},
	cinzel: {
		name: 'Cinzel',
		description: 'Romana antiga - majestosa mas acessível',
		usage: 'display',
		font: cinzel,
		cssVariable: '--font-cinzel',
	},
	spectral: {
		name: 'Spectral',
		description: 'Serifa moderna - mística e legível',
		usage: 'display',
		font: spectral,
		cssVariable: '--font-spectral',
	},
	lora: {
		name: 'Lora',
		description: 'Raízes caligráficas - altamente legível para textos ⭐',
		usage: 'body',
		font: lora,
		cssVariable: '--font-lora',
	},
	merriweather: {
		name: 'Merriweather',
		description: 'Otimizada para telas - curvas elegantes',
		usage: 'body',
		font: merriweather,
		cssVariable: '--font-merriweather',
	},
	literata: {
		name: 'Literata',
		description: 'Serifa moderna - excelente para textos longos',
		usage: 'body',
		font: literata,
		cssVariable: '--font-literata',
	},
} as const satisfies Record<string, FontConfig>

/**
 * ═══════════════════════════════════════════════
 * FONTES ATIVAS (Combinação Híbrida Otimizada)
 * ═══════════════════════════════════════════════
 */

/** Fonte principal para títulos/headings/display - Elegância clássica + Legibilidade */
export const FONT_DISPLAY = MYSTICAL_FONTS.ebGaramond

/** Fonte principal para corpo de texto - Máxima legibilidade + Sutileza mística */
export const FONT_BODY = MYSTICAL_FONTS.lora

/** Fonte alternativa para ênfase - Impacto visual místico */
export const FONT_ACCENT = MYSTICAL_FONTS.cinzel

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
