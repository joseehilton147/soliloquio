/**
 * Jornada da Alma (7 cartas)
 *
 * Layout: Chakras ou escada ascendente
 * Propósito: Mapear jornada espiritual através dos 7 centros energéticos
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const JORNADA_DA_ALMA: TarotSpread = {
	id: 'jornada-da-alma',
	name: 'Jornada da Alma',
	slug: 'jornada-da-alma',
	cardCount: 7,
	category: 'deep',
	layout: 'vertical',
	description: 'Como A Estrela de 7 Pontas sagrada, esta tiragem mapeia sua jornada através dos 7 chakras, revelando bloqueios e dons em cada centro energético.',
	whenToUse: 'Para trabalho espiritual profundo, quando quer entender sua evolução da alma ou desbloquear centros energéticos.',
	source: 'Rachel Pollack - Adaptado',
	difficulty: 4,
	estimatedTime: 45,
	themeColor: '#A855F7',
	icon: 'lucide:sparkles',
	tags: ['espiritual', 'chakras', 'alma', 'energia', 'profunda'],
	positions: [
		{
			id: 'raiz',
			order: 1,
			label: '1. Raiz - Segurança',
			description: 'Chakra Raiz (Muladhara). Sua base, segurança material, pertencimento. Conexão com a Terra.',
			x: 50,
			y: 90,
			rotation: 0,
			emphasis: 'bottom',
		},
		{
			id: 'sacral',
			order: 2,
			label: '2. Sacral - Criatividade',
			description: 'Chakra Sacral (Svadhisthana). Sua criatividade, sexualidade, fluxo emocional. A Água que move.',
			x: 50,
			y: 75,
			rotation: 0,
		},
		{
			id: 'plexo',
			order: 3,
			label: '3. Plexo Solar - Poder',
			description: 'Chakra Plexo Solar (Manipura). Seu poder pessoal, vontade, autoestima. O Fogo interior.',
			x: 50,
			y: 60,
			rotation: 0,
		},
		{
			id: 'coracao',
			order: 4,
			label: '4. Coração - Amor',
			description: 'Chakra Coração (Anahata). Amor, compaixão, conexão. A ponte entre céu e terra.',
			x: 50,
			y: 45,
			rotation: 0,
			emphasis: 'center',
		},
		{
			id: 'garganta',
			order: 5,
			label: '5. Garganta - Expressão',
			description: 'Chakra Garganta (Vishuddha). Sua voz, verdade, comunicação autêntica. O Ar que fala.',
			x: 50,
			y: 30,
			rotation: 0,
		},
		{
			id: 'terceiro-olho',
			order: 6,
			label: '6. Terceiro Olho - Visão',
			description: 'Chakra Terceiro Olho (Ajna). Intuição, visão interna, sabedoria. Ver além do véu.',
			x: 50,
			y: 15,
			rotation: 0,
		},
		{
			id: 'coroa',
			order: 7,
			label: '7. Coroa - Divino',
			description: 'Chakra Coroa (Sahasrara). Conexão com o divino, iluminação espiritual. O Espírito puro.',
			x: 50,
			y: 5,
			rotation: 0,
			emphasis: 'top',
		},
	],
}
