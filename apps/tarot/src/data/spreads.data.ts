/**
 * Tiragens Predefinidas de Tarot
 *
 * Baseado em: "Guia para Leitura Intuitiva" - Stefani Caponi
 *
 * Cada tiragem contém:
 * - Posições visuais (x, y) em porcentagem (0-100)
 * - Descrições místicas de cada posição
 * - Layout otimizado para visualização
 */

import type { TarotSpread } from '@workspace/core/tarot'

/**
 * ═══════════════════════════════════════════════════════
 * TIRAGENS DE 1 CARTA - Clareza Instantânea
 * ═══════════════════════════════════════════════════════
 */

/**
 * Sim ou Não (1 carta)
 *
 * Layout: Uma carta central
 * Propósito: Resposta direta e objetiva para perguntas fechadas
 */
export const SIM_OU_NAO: TarotSpread = {
	id: 'sim-ou-nao',
	name: 'Sim ou Não',
	slug: 'sim-ou-nao',
	cardCount: 1,
	category: 'quick',
	layout: 'single',
	description: 'A tiragem mais direta possível. Como a Flecha do baralho cigano, vai direto ao alvo. Use para perguntas que exigem apenas sim ou não.',
	whenToUse: 'Quando precisar de uma resposta clara e direta para uma pergunta específica. Melhor para decisões simples do dia a dia.',
	source: 'Tradicional',
	difficulty: 1,
	estimatedTime: 5,
	themeColor: '#64748B',
	icon: 'lucide:target',
	tags: ['rápida', 'direta', 'decisão', 'simples'],
	positions: [
		{
			id: 'resposta',
			order: 1,
			label: 'Resposta',
			description: 'A resposta direta do universo. Cartas positivas (Sol, Estrela, Mundo, Ases) = Sim. Cartas desafiadoras (Torre, Diabo, 5 de Copas) = Não. Cartas neutras pedem reformulação da pergunta.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
	],
}

/**
 * ═══════════════════════════════════════════════════════
 * TIRAGENS DE 2 CARTAS - Quick Insights
 * ═══════════════════════════════════════════════════════
 */

/**
 * Liberar e Retirar (2 cartas)
 *
 * Layout: Duas cartas lado a lado
 * Propósito: Identificar o que soltar e o que buscar
 */
export const LIBERAR_E_RETIRAR: TarotSpread = {
	id: 'liberar-e-retirar',
	name: 'Liberar e Retirar',
	slug: 'liberar-e-retirar',
	cardCount: 2,
	category: 'quick',
	layout: 'linear',
	description: 'Uma tiragem simples porém poderosa para identificar padrões que precisam ser liberados e energias que devem ser cultivadas.',
	whenToUse: 'Quando sentir que está preso em padrões antigos ou precisa de clareza sobre mudanças necessárias.',
	source: 'Stefani Caponi',
	difficulty: 1,
	estimatedTime: 10,
	themeColor: '#8B5CF6',
	icon: 'lucide:scale',
	tags: ['rápida', 'mudança', 'transformação', 'simples'],
	positions: [
		{
			id: 'liberar',
			order: 1,
			label: 'Liberar',
			description: 'O que você precisa soltar, liberar ou deixar ir. Padrões, crenças ou comportamentos que não servem mais ao seu crescimento.',
			x: 35,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'retirar',
			order: 2,
			label: 'Retirar',
			description: 'O que você precisa buscar, cultivar ou trazer para sua vida. Novas energias, hábitos ou perspectivas que apoiam sua jornada.',
			x: 65,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
	],
}

/**
 * Dom e Obstáculo (2 cartas)
 *
 * Layout: Duas cartas lado a lado
 * Propósito: Reconhecer seus dons naturais e os desafios a superar
 */
export const DOM_E_OBSTACULO: TarotSpread = {
	id: 'dom-e-obstaculo',
	name: 'Dom e Obstáculo',
	slug: 'dom-e-obstaculo',
	cardCount: 2,
	category: 'quick',
	layout: 'linear',
	description: 'Revela seus dons inatos e os obstáculos que estão impedindo você de manifestá-los plenamente.',
	whenToUse: 'Quando precisar reconectar com suas habilidades naturais ou entender bloqueios que está enfrentando.',
	source: 'Stefani Caponi',
	difficulty: 1,
	estimatedTime: 10,
	themeColor: '#10B981',
	icon: 'lucide:shield-check',
	tags: ['rápida', 'autoconhecimento', 'obstáculos', 'dons'],
	positions: [
		{
			id: 'dom',
			order: 1,
			label: 'Dom',
			description: 'Seu dom natural, talento ou força interior. A luz que você carrega e que pode iluminar seu caminho.',
			x: 35,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'obstaculo',
			order: 2,
			label: 'Obstáculo',
			description: 'O desafio ou bloqueio que está impedindo a manifestação plena do seu dom. O que precisa ser transmutado.',
			x: 65,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
	],
}

/**
 * ═══════════════════════════════════════════════════════
 * TIRAGENS DE 3 CARTAS - Deeper Insights
 * ═══════════════════════════════════════════════════════
 */

/**
 * Conselho do Universo (3 cartas)
 *
 * Layout: Triângulo (1 em cima, 2 embaixo)
 * Propósito: Mensagem direta do universo
 */
export const CONSELHO_DO_UNIVERSO: TarotSpread = {
	id: 'conselho-do-universo',
	name: 'Conselho do Universo',
	slug: 'conselho-do-universo',
	cardCount: 3,
	category: 'insight',
	layout: 'triangle',
	description: 'Uma mensagem cósmica de três camadas: o que observar, o que evitar e a sabedoria central.',
	whenToUse: 'Quando buscar orientação direta do universo sobre situações complexas ou decisões importantes.',
	source: 'Stefani Caponi',
	difficulty: 2,
	estimatedTime: 15,
	themeColor: '#6366F1',
	icon: 'lucide:sparkles',
	tags: ['orientação', 'conselho', 'universo', 'sabedoria'],
	positions: [
		{
			id: 'foco',
			order: 1,
			label: 'Onde Focar',
			description: 'No que você deve direcionar sua atenção e energia agora. O foco que trará clareza.',
			x: 25,
			y: 60,
			rotation: 0,
		},
		{
			id: 'evitar',
			order: 2,
			label: 'O Que Evitar',
			description: 'Armadilhas, distrações ou padrões que você deve conscientemente evitar neste momento.',
			x: 75,
			y: 60,
			rotation: 0,
		},
		{
			id: 'conselho',
			order: 3,
			label: 'Conselho do Universo',
			description: 'A mensagem central. A sabedoria cósmica que integra tudo e ilumina seu próximo passo.',
			x: 50,
			y: 30,
			rotation: 0,
			emphasis: 'center',
			connectedTo: ['foco', 'evitar'],
		},
	],
}

/**
 * Passado, Presente e Futuro (3 cartas)
 *
 * Layout: Linha horizontal (clássico)
 * Propósito: Linha do tempo energética
 */
export const PASSADO_PRESENTE_FUTURO: TarotSpread = {
	id: 'passado-presente-futuro',
	name: 'Passado, Presente e Futuro',
	slug: 'passado-presente-futuro',
	cardCount: 3,
	category: 'insight',
	layout: 'linear',
	description: 'A tiragem clássica que revela a linha do tempo energética: de onde você vem, onde está e para onde vai.',
	whenToUse: 'Para entender a progressão de uma situação ou ver o fluxo temporal de eventos e energias.',
	source: 'Tradicional',
	difficulty: 1,
	estimatedTime: 15,
	themeColor: '#EC4899',
	icon: 'lucide:clock',
	tags: ['clássica', 'tempo', 'linha temporal', 'tradicional'],
	positions: [
		{
			id: 'passado',
			order: 1,
			label: 'Passado',
			description: 'Influências passadas, lições aprendidas ou energias que ainda ecoam no presente.',
			x: 20,
			y: 50,
			rotation: 0,
			connectedTo: ['presente'],
		},
		{
			id: 'presente',
			order: 2,
			label: 'Presente',
			description: 'A energia atual, o momento agora. O que está vivo e pulsando em sua realidade presente.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'center',
			connectedTo: ['passado', 'futuro'],
		},
		{
			id: 'futuro',
			order: 3,
			label: 'Futuro',
			description: 'O potencial que se desenha, a direção para onde a energia está fluindo. Tendências futuras.',
			x: 80,
			y: 50,
			rotation: 0,
			connectedTo: ['presente'],
		},
	],
}

/**
 * Mente, Corpo e Espírito (3 cartas)
 *
 * Layout: Triângulo vertical
 * Propósito: Integração dos três aspectos do ser
 */
export const MENTE_CORPO_ESPIRITO: TarotSpread = {
	id: 'mente-corpo-espirito',
	name: 'Mente, Corpo e Espírito',
	slug: 'mente-corpo-espirito',
	cardCount: 3,
	category: 'insight',
	layout: 'triangle',
	description: 'Uma tiragem holística que examina os três aspectos fundamentais do seu ser e como estão interagindo.',
	whenToUse: 'Para check-ins de bem-estar integral ou quando sentir desalinhamento entre pensamento, corpo e alma.',
	source: 'Stefani Caponi',
	difficulty: 2,
	estimatedTime: 20,
	themeColor: '#14B8A6',
	icon: 'lucide:heart-handshake',
	tags: ['holístico', 'bem-estar', 'integração', 'equilíbrio'],
	positions: [
		{
			id: 'mente',
			order: 1,
			label: 'Mente',
			description: 'Seus padrões mentais, crenças e pensamentos predominantes. O que sua mente está processando.',
			x: 50,
			y: 20,
			rotation: 0,
			emphasis: 'top',
			connectedTo: ['corpo', 'espirito'],
		},
		{
			id: 'corpo',
			order: 2,
			label: 'Corpo',
			description: 'Seu estado físico, necessidades corporais e como seu corpo está respondendo à vida.',
			x: 30,
			y: 70,
			rotation: 0,
			connectedTo: ['mente', 'espirito'],
		},
		{
			id: 'espirito',
			order: 3,
			label: 'Espírito',
			description: 'Sua essência espiritual, conexão com o divino e propósito maior. A voz da alma.',
			x: 70,
			y: 70,
			rotation: 0,
			connectedTo: ['mente', 'corpo'],
		},
	],
}

/**
 * Cabeça-Coração-Espírito (3 cartas)
 *
 * Layout: Triângulo (Cabeça no topo, Coração e Espírito na base)
 * Propósito: Integrar três perspectivas diferentes para decisões complexas
 */
export const CABECA_CORACAO_ESPIRITO: TarotSpread = {
	id: 'cabeca-coracao-espirito',
	name: 'Cabeça-Coração-Espírito',
	slug: 'cabeca-coracao-espirito',
	cardCount: 3,
	category: 'quick',
	layout: 'triangle',
	description: 'Como Os Três Pássaros mensageiros, esta tiragem traz três vozes diferentes: a lógica, a emocional e a espiritual. Perfeita quando mente e coração estão em conflito.',
	whenToUse: 'Quando enfrenta decisões onde lógica e sentimento divergem, ou quando precisa incluir a perspectiva espiritual.',
	source: 'Tradicional - Adaptado',
	difficulty: 2,
	estimatedTime: 15,
	themeColor: '#64748B',
	icon: 'lucide:brain-circuit',
	tags: ['rápida', 'decisão', 'integração', 'perspectivas'],
	positions: [
		{
			id: 'cabeca',
			order: 1,
			label: 'Cabeça',
			description: 'O que sua mente lógica está dizendo. Razão, análise, pensamento crítico. O Ar que corta através da confusão.',
			x: 50,
			y: 20,
			rotation: 0,
			emphasis: 'top',
			connectedTo: ['coracao', 'espirito'],
		},
		{
			id: 'coracao',
			order: 2,
			label: 'Coração',
			description: 'O que seu coração está sentindo. Emoções, desejos, paixões. A Água que flui sob a superfície.',
			x: 30,
			y: 70,
			rotation: 0,
			connectedTo: ['cabeca', 'espirito'],
		},
		{
			id: 'espirito',
			order: 3,
			label: 'Espírito',
			description: 'O que sua alma precisa. Propósito maior, intuição profunda, sabedoria ancestral. O Fogo que ilumina o caminho.',
			x: 70,
			y: 70,
			rotation: 0,
			connectedTo: ['cabeca', 'coracao'],
		},
	],
}

/**
 * Mensagem do Vento (3 cartas)
 *
 * Layout: Linha horizontal (fluxo temporal)
 * Propósito: Entender o movimento e fluxo de energias em sua vida
 */
export const MENSAGEM_DO_VENTO: TarotSpread = {
	id: 'mensagem-do-vento',
	name: 'Mensagem do Vento',
	slug: 'mensagem-do-vento',
	cardCount: 3,
	category: 'quick',
	layout: 'linear',
	description: 'Como As Nuvens que se movem pelo céu, esta tiragem revela o que está chegando, o que permanece e o que está partindo de sua vida.',
	whenToUse: 'Para entender ciclos de mudança, quando sentir que algo está em movimento mas não sabe exatamente o quê.',
	source: 'Inspirado em tradições xamânicas',
	difficulty: 2,
	estimatedTime: 15,
	themeColor: '#94A3B8',
	icon: 'lucide:wind',
	tags: ['rápida', 'mudança', 'ciclos', 'transição'],
	positions: [
		{
			id: 'chega',
			order: 1,
			label: 'O que Chega',
			description: 'Energias, pessoas ou situações que estão entrando em sua vida. O vento que sopra trazendo o novo.',
			x: 20,
			y: 50,
			rotation: 0,
			emphasis: 'left',
		},
		{
			id: 'permanece',
			order: 2,
			label: 'O que Permanece',
			description: 'Aquilo que é estável e duradouro. A rocha que não se move mesmo com o vento. Sua fundação.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'parte',
			order: 3,
			label: 'O que Parte',
			description: 'O que está deixando sua vida, completando um ciclo. O vento que sopra levando o antigo.',
			x: 80,
			y: 50,
			rotation: 0,
			emphasis: 'right',
		},
	],
}

/**
 * Problema-Fazer-Evitar (3 cartas)
 *
 * Layout: Triângulo invertido (Problema no topo, ações na base)
 * Propósito: Decisão prática com ações concretas a seguir ou evitar
 */
export const PROBLEMA_FAZER_EVITAR: TarotSpread = {
	id: 'problema-fazer-evitar',
	name: 'Problema-Fazer-Evitar',
	slug: 'problema-fazer-evitar',
	cardCount: 3,
	category: 'decision',
	layout: 'triangle-inverted',
	description: 'Como As Pedras do baralho cigano que mostram obstáculos e caminhos, esta tiragem oferece clareza direta: o problema, o que fazer e o que não fazer.',
	whenToUse: 'Quando enfrenta um problema específico e precisa de orientação prática e direta sobre como agir.',
	source: 'Tradicional',
	difficulty: 2,
	estimatedTime: 15,
	themeColor: '#F59E0B',
	icon: 'lucide:signpost',
	tags: ['decisão', 'prática', 'ação', 'terra'],
	positions: [
		{
			id: 'problema',
			order: 1,
			label: 'O Problema',
			description: 'O cerne da questão. O desafio ou obstáculo que você está enfrentando. A pedra no caminho.',
			x: 50,
			y: 20,
			rotation: 0,
			emphasis: 'top',
		},
		{
			id: 'fazer',
			order: 2,
			label: 'Fazer Isso',
			description: 'Ação recomendada. O que você DEVE fazer, cultivar ou buscar. O caminho da esquerda - ativo e construtivo.',
			x: 30,
			y: 70,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'evitar',
			order: 3,
			label: 'Evitar Isso',
			description: 'Ação a evitar. O que você NÃO deve fazer. O caminho da direita - o que afasta da solução.',
			x: 70,
			y: 70,
			rotation: 0,
		},
	],
}

/**
 * ═══════════════════════════════════════════════════════
 * TIRAGENS DE 5 CARTAS - Relationship & Manifestation
 * ═══════════════════════════════════════════════════════
 */

/**
 * Seu Potencial Relacionamento (5 cartas)
 *
 * Layout: Estrela de 5 pontas
 * Propósito: Explorar relacionamento em potencial
 */
export const POTENCIAL_RELACIONAMENTO: TarotSpread = {
	id: 'potencial-relacionamento',
	name: 'Seu Potencial Relacionamento',
	slug: 'potencial-relacionamento',
	cardCount: 5,
	category: 'relationship',
	layout: 'circle',
	description: 'Explore as dinâmicas de um relacionamento que ainda não existe, mas está no horizonte das possibilidades.',
	whenToUse: 'Quando conhecer alguém novo ou sentir atração por alguém e quiser entender o potencial da conexão.',
	source: 'Stefani Caponi',
	difficulty: 3,
	estimatedTime: 25,
	themeColor: '#F43F5E',
	icon: 'lucide:heart',
	tags: ['relacionamento', 'amor', 'potencial', 'conexão'],
	positions: [
		{
			id: 'voce',
			order: 1,
			label: 'Você Nesta Conexão',
			description: 'Como você se mostra ou se mostraria neste relacionamento. Suas energias e expectativas.',
			x: 50,
			y: 15,
			rotation: 0,
			emphasis: 'top',
		},
		{
			id: 'outro',
			order: 2,
			label: 'A Outra Pessoa',
			description: 'Como a outra pessoa se apresenta energeticamente. Suas intenções e estado emocional.',
			x: 85,
			y: 40,
			rotation: 0,
		},
		{
			id: 'conexao',
			order: 3,
			label: 'A Conexão',
			description: 'A química, a energia que existe entre vocês. O que os une ou poderia unir.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'center',
			connectedTo: ['voce', 'outro', 'desafio', 'potencial'],
		},
		{
			id: 'desafio',
			order: 4,
			label: 'Desafio Potencial',
			description: 'Obstáculos, diferenças ou áreas que precisarão de atenção consciente se seguirem adiante.',
			x: 15,
			y: 40,
			rotation: 0,
		},
		{
			id: 'potencial',
			order: 5,
			label: 'Potencial do Relacionamento',
			description: 'Para onde este relacionamento pode evoluir. O fruto que pode nascer desta semente.',
			x: 50,
			y: 85,
			rotation: 0,
			emphasis: 'bottom',
		},
	],
}

/**
 * Lei de Atração (5 cartas)
 *
 * Layout: Pirâmide invertida
 * Propósito: Manifestar desejos conscientemente
 */
export const LEI_DE_ATRACAO: TarotSpread = {
	id: 'lei-de-atracao',
	name: 'Lei de Atração',
	slug: 'lei-de-atracao',
	cardCount: 5,
	category: 'insight',
	layout: 'custom',
	description: 'Trabalhe com a lei de atração conscientemente: identifique bloqueios, alinhe energias e manifeste seus desejos.',
	whenToUse: 'Quando quiser manifestar algo específico ou entender por que suas manifestações não estão se concretizando.',
	source: 'Stefani Caponi',
	difficulty: 3,
	estimatedTime: 30,
	themeColor: '#F59E0B',
	icon: 'lucide:zap',
	tags: ['manifestação', 'lei de atração', 'desejo', 'abundância'],
	positions: [
		{
			id: 'desejo',
			order: 1,
			label: 'Seu Desejo',
			description: 'O que você realmente deseja manifestar. A essência do seu sonho ou objetivo.',
			x: 50,
			y: 15,
			rotation: 0,
			emphasis: 'top',
			connectedTo: ['bloqueio', 'apoio'],
		},
		{
			id: 'bloqueio',
			order: 2,
			label: 'Bloqueio Energético',
			description: 'Crenças limitantes, medos ou padrões que bloqueiam a manifestação do seu desejo.',
			x: 30,
			y: 40,
			rotation: 0,
		},
		{
			id: 'apoio',
			order: 3,
			label: 'Apoio Universal',
			description: 'Forças, sincronicidades ou recursos que o universo já colocou ao seu redor para ajudar.',
			x: 70,
			y: 40,
			rotation: 0,
		},
		{
			id: 'acao',
			order: 4,
			label: 'Ação Necessária',
			description: 'O que você precisa FAZER no plano físico. Manifestação requer ação alinhada.',
			x: 35,
			y: 70,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'resultado',
			order: 5,
			label: 'Resultado Provável',
			description: 'O desfecho mais provável se você seguir as orientações das cartas anteriores.',
			x: 65,
			y: 70,
			rotation: 0,
			emphasis: 'highlight',
		},
	],
}

/**
 * Magia Manifestadora (5 cartas)
 *
 * Layout: Pentagrama (estrela de 5 pontas)
 * Propósito: Manifestar desejos no plano material através da alquimia espiritual
 */
export const MAGIA_MANIFESTADORA: TarotSpread = {
	id: 'magia-manifestadora',
	name: 'Magia Manifestadora',
	slug: 'magia-manifestadora',
	cardCount: 5,
	category: 'decision',
	layout: 'pentagram',
	description: 'Como O Anel do baralho cigano que representa concretização, esta tiragem é um ritual de manifestação. O pentagrama transforma sonho em realidade.',
	whenToUse: 'Quando tem um desejo específico que quer manifestar no mundo físico. Use como ritual de intenção.',
	source: 'Inspirado em práticas de magia natural',
	difficulty: 3,
	estimatedTime: 30,
	themeColor: '#F59E0B',
	icon: 'lucide:sparkles',
	tags: ['manifestação', 'desejo', 'magia', 'terra', 'ritual'],
	positions: [
		{
			id: 'desejo',
			order: 1,
			label: 'O Desejo',
			description: 'O que você verdadeiramente deseja manifestar. Seja específico e claro em sua intenção.',
			x: 50,
			y: 10,
			rotation: 0,
			emphasis: 'top',
		},
		{
			id: 'bloqueios',
			order: 2,
			label: 'Bloqueios',
			description: 'Crenças limitantes, medos ou padrões que impedem a manifestação. O que precisa ser liberado.',
			x: 85,
			y: 35,
			rotation: 0,
		},
		{
			id: 'recursos',
			order: 3,
			label: 'Recursos',
			description: 'Dons, talentos e recursos que você JÁ tem para manifestar esse desejo. Suas ferramentas.',
			x: 70,
			y: 75,
			rotation: 0,
		},
		{
			id: 'acao',
			order: 4,
			label: 'Ação Concreta',
			description: 'O passo prático que você deve dar no mundo físico. Manifestação exige materialização.',
			x: 30,
			y: 75,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'resultado',
			order: 5,
			label: 'Resultado',
			description: 'O fruto que nascerá se você seguir as orientações. A semente plantada hoje, colhida amanhã.',
			x: 15,
			y: 35,
			rotation: 0,
		},
	],
}

/**
 * Raízes e Frutos (5 cartas)
 *
 * Layout: Árvore (raiz, tronco, 3 galhos)
 * Propósito: Entender causas profundas e possíveis resultados futuros
 */
export const RAIZES_E_FRUTOS: TarotSpread = {
	id: 'raizes-e-frutos',
	name: 'Raízes e Frutos',
	slug: 'raizes-e-frutos',
	cardCount: 5,
	category: 'decision',
	layout: 'tree',
	description: 'Como A Árvore do baralho cigano que representa crescimento e vida, esta tiragem mostra raízes (causas), tronco (presente) e frutos (possibilidades).',
	whenToUse: 'Quando quer entender as causas profundas de uma situação e explorar diferentes possibilidades futuras.',
	source: 'Baseado em sabedoria ancestral',
	difficulty: 3,
	estimatedTime: 25,
	themeColor: '#10B981',
	icon: 'lucide:tree-deciduous',
	tags: ['crescimento', 'causas', 'possibilidades', 'terra', 'natureza'],
	positions: [
		{
			id: 'raiz',
			order: 1,
			label: 'Raiz (Causa)',
			description: 'A causa profunda, a origem da situação. O que está enterrado sob a terra, alimentando tudo.',
			x: 50,
			y: 80,
			rotation: 0,
			emphasis: 'bottom',
		},
		{
			id: 'tronco',
			order: 2,
			label: 'Tronco (Presente)',
			description: 'Sua situação atual. O momento presente que cresce da raiz e sustenta os galhos.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
			connectedTo: ['raiz', 'fruto1', 'fruto2', 'fruto3'],
		},
		{
			id: 'fruto1',
			order: 3,
			label: 'Fruto 1 (Caminho A)',
			description: 'Primeira possibilidade futura. Um fruto que pode nascer se seguir este caminho.',
			x: 20,
			y: 20,
			rotation: 0,
		},
		{
			id: 'fruto2',
			order: 4,
			label: 'Fruto 2 (Caminho B)',
			description: 'Segunda possibilidade futura. Outro fruto que pode nascer com escolhas diferentes.',
			x: 50,
			y: 10,
			rotation: 0,
			emphasis: 'top',
		},
		{
			id: 'fruto3',
			order: 5,
			label: 'Fruto 3 (Caminho C)',
			description: 'Terceira possibilidade futura. Um terceiro fruto mostrando alternativa inesperada.',
			x: 80,
			y: 20,
			rotation: 0,
		},
	],
}

/**
 * ═══════════════════════════════════════════════════════
 * TIRAGENS DE 4 CARTAS - Decision Balance
 * ═══════════════════════════════════════════════════════
 */

/**
 * Prós e Contras (4 cartas)
 *
 * Layout: 2x2 (Opção A e B, cada com Prós e Contras)
 * Propósito: Avaliar duas opções diferentes de forma equilibrada
 */
export const PROS_E_CONTRAS: TarotSpread = {
	id: 'pros-e-contras',
	name: 'Prós e Contras',
	slug: 'pros-e-contras',
	cardCount: 4,
	category: 'decision',
	layout: 'grid',
	description: 'Como A Balança do baralho cigano que pesa os dois lados, esta tiragem ajuda a ver benefícios e desafios de cada opção com clareza.',
	whenToUse: 'Quando está entre duas escolhas e precisa ver os dois lados de forma equilibrada e prática.',
	source: 'Tradicional',
	difficulty: 2,
	estimatedTime: 20,
	themeColor: '#F59E0B',
	icon: 'lucide:scale',
	tags: ['decisão', 'escolha', 'equilíbrio', 'terra', 'prático'],
	positions: [
		{
			id: 'opcaoA-pro',
			order: 1,
			label: 'Opção A - Benefício',
			description: 'O lado positivo da primeira opção. O que você ganha se escolher este caminho.',
			x: 25,
			y: 30,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'opcaoA-contra',
			order: 2,
			label: 'Opção A - Desafio',
			description: 'O lado desafiador da primeira opção. O que você pode perder ou enfrentar.',
			x: 25,
			y: 70,
			rotation: 0,
		},
		{
			id: 'opcaoB-pro',
			order: 3,
			label: 'Opção B - Benefício',
			description: 'O lado positivo da segunda opção. O que você ganha se escolher este caminho.',
			x: 75,
			y: 30,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'opcaoB-contra',
			order: 4,
			label: 'Opção B - Desafio',
			description: 'O lado desafiador da segunda opção. O que você pode perder ou enfrentar.',
			x: 75,
			y: 70,
			rotation: 0,
		},
	],
}

/**
 * ═══════════════════════════════════════════════════════
 * TIRAGENS DE 6 CARTAS - Deep Analysis
 * ═══════════════════════════════════════════════════════
 */

/**
 * Seu Relacionamento Existente (6 cartas)
 *
 * Layout: Hexágono
 * Propósito: Análise profunda de relacionamento atual
 */
export const RELACIONAMENTO_EXISTENTE: TarotSpread = {
	id: 'relacionamento-existente',
	name: 'Seu Relacionamento Existente',
	slug: 'relacionamento-existente',
	cardCount: 6,
	category: 'relationship',
	layout: 'circle',
	description: 'Uma análise profunda e honesta de um relacionamento já estabelecido, revelando dinâmicas, desafios e potenciais.',
	whenToUse: 'Para check-ins de relacionamentos sérios ou quando precisar de clareza sobre dinâmicas atuais.',
	source: 'Stefani Caponi',
	difficulty: 3,
	estimatedTime: 35,
	themeColor: '#EC4899',
	icon: 'lucide:heart',
	tags: ['relacionamento', 'amor', 'casal', 'dinâmica'],
	positions: [
		{
			id: 'voce',
			order: 1,
			label: 'Você Agora',
			description: 'Seu estado emocional e energético atual dentro do relacionamento.',
			x: 25,
			y: 25,
			rotation: 0,
		},
		{
			id: 'parceiro',
			order: 2,
			label: 'Seu Parceiro(a)',
			description: 'O estado emocional e energético do seu parceiro(a) no momento presente.',
			x: 75,
			y: 25,
			rotation: 0,
		},
		{
			id: 'fundacao',
			order: 3,
			label: 'Fundação',
			description: 'A base do relacionamento. O que os mantém juntos, valores compartilhados.',
			x: 50,
			y: 40,
			rotation: 0,
			emphasis: 'center',
			connectedTo: ['voce', 'parceiro', 'desafio', 'crescimento', 'futuro'],
		},
		{
			id: 'desafio',
			order: 4,
			label: 'Desafio Atual',
			description: 'O obstáculo ou tensão que vocês estão navegando juntos agora.',
			x: 20,
			y: 60,
			rotation: 0,
		},
		{
			id: 'crescimento',
			order: 5,
			label: 'Oportunidade de Crescimento',
			description: 'Como este relacionamento está (ou pode estar) fazendo vocês evoluírem.',
			x: 80,
			y: 60,
			rotation: 0,
		},
		{
			id: 'futuro',
			order: 6,
			label: 'Futuro Juntos',
			description: 'Para onde o relacionamento está caminhando. O potencial de longo prazo.',
			x: 50,
			y: 80,
			rotation: 0,
			emphasis: 'bottom',
		},
	],
}

/**
 * Encruzilhadas (6 cartas)
 *
 * Layout: Cruz dupla (caminho atual + 2 opções)
 * Propósito: Explorar profundamente duas escolhas diferentes
 */
export const ENCRUZILHADAS: TarotSpread = {
	id: 'encruzilhadas',
	name: 'Encruzilhadas',
	slug: 'encruzilhadas',
	cardCount: 6,
	category: 'decision',
	layout: 'crossroads',
	description: 'Como A Cruz do Caminho no baralho cigano (#22 - Crossroads), esta tiragem ilumina decisões complexas mostrando seu caminho atual e as duas direções possíveis.',
	whenToUse: 'Quando está em uma encruzilhada importante da vida e precisa entender profundamente cada opção antes de escolher.',
	source: 'Inspirado em Lenormand #22 Crossroads',
	difficulty: 3,
	estimatedTime: 30,
	themeColor: '#F59E0B',
	icon: 'lucide:route',
	tags: ['decisão', 'escolha', 'encruzilhada', 'terra', 'caminho'],
	positions: [
		{
			id: 'situacao-atual',
			order: 1,
			label: 'Situação Atual',
			description: 'Onde você está agora. O ponto de partida antes da encruzilhada.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'center',
			connectedTo: ['opcaoA1', 'opcaoA2', 'opcaoB1', 'opcaoB2'],
		},
		{
			id: 'opcaoA1',
			order: 2,
			label: 'Opção A - Natureza',
			description: 'A essência da primeira opção. O que ela realmente significa para você.',
			x: 15,
			y: 20,
			rotation: 0,
		},
		{
			id: 'opcaoA2',
			order: 3,
			label: 'Opção A - Resultado',
			description: 'Aonde a primeira opção leva. O destino deste caminho.',
			x: 15,
			y: 80,
			rotation: 0,
			emphasis: 'bottom',
		},
		{
			id: 'opcaoB1',
			order: 4,
			label: 'Opção B - Natureza',
			description: 'A essência da segunda opção. O que ela realmente significa para você.',
			x: 85,
			y: 20,
			rotation: 0,
		},
		{
			id: 'opcaoB2',
			order: 5,
			label: 'Opção B - Resultado',
			description: 'Aonde a segunda opção leva. O destino deste caminho.',
			x: 85,
			y: 80,
			rotation: 0,
			emphasis: 'bottom',
		},
		{
			id: 'conselho',
			order: 6,
			label: 'Conselho do Universo',
			description: 'A orientação espiritual para esta decisão. O que você precisa saber para escolher sabiamente.',
			x: 50,
			y: 20,
			rotation: 0,
			emphasis: 'top',
		},
	],
}

/**
 * Tomando uma Decisão (6 cartas)
 *
 * Layout: Duas colunas (comparação)
 * Propósito: Avaliar duas opções lado a lado
 */
export const TOMANDO_DECISAO: TarotSpread = {
	id: 'tomando-decisao',
	name: 'Tomando uma Decisão',
	slug: 'tomando-decisao',
	cardCount: 6,
	category: 'decision',
	layout: 'custom',
	description: 'Compare duas opções lado a lado, veja consequências de cada caminho e receba orientação para decidir com clareza.',
	whenToUse: 'Quando enfrentar uma escolha importante entre duas opções e precisar ver além da mente racional.',
	source: 'Stefani Caponi',
	difficulty: 3,
	estimatedTime: 30,
	themeColor: '#8B5CF6',
	icon: 'lucide:git-fork',
	tags: ['decisão', 'escolha', 'opções', 'clareza'],
	positions: [
		{
			id: 'situacao',
			order: 1,
			label: 'Situação Atual',
			description: 'O contexto geral. A energia em torno da decisão que você precisa tomar.',
			x: 50,
			y: 15,
			rotation: 0,
			emphasis: 'top',
			connectedTo: ['opcao1-pro', 'opcao2-pro'],
		},
		{
			id: 'opcao1-pro',
			order: 2,
			label: 'Opção 1 - Pró',
			description: 'Os benefícios, vantagens e energias positivas da primeira opção.',
			x: 25,
			y: 40,
			rotation: 0,
		},
		{
			id: 'opcao1-contra',
			order: 3,
			label: 'Opção 1 - Contra',
			description: 'Os desafios, desvantagens ou consequências difíceis da primeira opção.',
			x: 25,
			y: 65,
			rotation: 0,
			connectedTo: ['opcao1-pro'],
		},
		{
			id: 'opcao2-pro',
			order: 4,
			label: 'Opção 2 - Pró',
			description: 'Os benefícios, vantagens e energias positivas da segunda opção.',
			x: 75,
			y: 40,
			rotation: 0,
		},
		{
			id: 'opcao2-contra',
			order: 5,
			label: 'Opção 2 - Contra',
			description: 'Os desafios, desvantagens ou consequências difíceis da segunda opção.',
			x: 75,
			y: 65,
			rotation: 0,
			connectedTo: ['opcao2-pro'],
		},
		{
			id: 'orientacao',
			order: 6,
			label: 'Orientação Final',
			description: 'A sabedoria do universo sobre qual caminho está mais alinhado com seu bem maior.',
			x: 50,
			y: 90,
			rotation: 0,
			emphasis: 'bottom',
			connectedTo: ['opcao1-contra', 'opcao2-contra'],
		},
	],
}

/**
 * ═══════════════════════════════════════════════════════
 * TIR AGENS DE 7 CARTAS - Spiritual Journey
 * ═══════════════════════════════════════════════════════
 */

/**
 * Jornada da Alma (7 cartas)
 *
 * Layout: Chakras ou escada ascendente
 * Propósito: Mapear jornada espiritual através dos 7 centros energéticos
 */
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

/**
 * Trabalho de Sombra (7 cartas)
 *
 * Layout: Espelho dividido (Luz e Sombra)
 * Propósito: Integrar aspectos inconscientes e ocultos da personalidade
 */
export const TRABALHO_DE_SOMBRA: TarotSpread = {
	id: 'trabalho-de-sombra',
	name: 'Trabalho de Sombra',
	slug: 'trabalho-de-sombra',
	cardCount: 7,
	category: 'deep',
	layout: 'mirror',
	description: 'Como O Espelho da bruxa que reflete verdades ocultas, esta tiragem trabalha com o conceito jungiano de Sombra, revelando e integrando aspectos negados de si mesmo.',
	whenToUse: 'Quando pronto para encarar partes de si que nega ou rejeita. Trabalho profundo de autoconhecimento e cura.',
	source: 'Carl Jung - Adaptado para Tarot',
	difficulty: 5,
	estimatedTime: 50,
	themeColor: '#6B21A8',
	icon: 'lucide:moon',
	tags: ['sombra', 'jung', 'psicologia', 'profunda', 'integração'],
	positions: [
		{
			id: 'luz-consciente',
			order: 1,
			label: 'Luz - Persona',
			description: 'Quem você pensa que é. A máscara que mostra ao mundo, o eu consciente.',
			x: 25,
			y: 20,
			rotation: 0,
		},
		{
			id: 'luz-dons',
			order: 2,
			label: 'Luz - Dons Reconhecidos',
			description: 'Talentos e virtudes que você já aceita e cultiva em si.',
			x: 25,
			y: 40,
			rotation: 0,
		},
		{
			id: 'luz-valores',
			order: 3,
			label: 'Luz - Valores Conscientes',
			description: 'O que você defende, acredita e valoriza conscientemente.',
			x: 25,
			y: 60,
			rotation: 0,
		},
		{
			id: 'sombra-negada',
			order: 4,
			label: 'Sombra - Eu Negado',
			description: 'Aspectos de si mesmo que nega, rejeita ou não reconhece. A sombra inconsciente.',
			x: 75,
			y: 20,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'sombra-dons-ocultos',
			order: 5,
			label: 'Sombra - Dons Ocultos',
			description: 'Talentos e forças que você tem mas não reconhece. Poder escondido na sombra.',
			x: 75,
			y: 40,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'sombra-medo',
			order: 6,
			label: 'Sombra - Medo Projetado',
			description: 'O que você teme em si e projeta nos outros. A sombra que vê fora.',
			x: 75,
			y: 60,
			rotation: 0,
		},
		{
			id: 'integracao',
			order: 7,
			label: 'Integração - Eu Completo',
			description: 'Como unir luz e sombra. O caminho para se tornar inteiro, aceitando todas as partes.',
			x: 50,
			y: 85,
			rotation: 0,
			emphasis: 'bottom',
		},
	],
}

/**
 * ═══════════════════════════════════════════════════════
 * TIRAGENS DE 8 CARTAS - Seasonal Cycles
 * ═══════════════════════════════════════════════════════
 */

/**
 * As 4 Estações da Alma (8 cartas)
 *
 * Layout: Roda dividida em 4 quadrantes
 * Propósito: Compreender ciclos e fases da jornada espiritual
 */
export const QUATRO_ESTACOES_DA_ALMA: TarotSpread = {
	id: 'quatro-estacoes-da-alma',
	name: 'As 4 Estações da Alma',
	slug: 'quatro-estacoes-da-alma',
	cardCount: 8,
	category: 'deep',
	layout: 'wheel',
	description: 'Como A Roda que gira eternamente, esta tiragem mapeia os ciclos da sua alma através das 4 estações. Cada estação tem seu tempo sagrado.',
	whenToUse: 'Para entender ciclos de vida, processar mudanças sazonais da alma, ou planejar o ano espiritual.',
	source: 'Baseado em tradições pagãs e Roda do Ano',
	difficulty: 4,
	estimatedTime: 45,
	themeColor: '#8B5CF6',
	icon: 'lucide:compass',
	tags: ['ciclos', 'estações', 'roda', 'tempo', 'profunda'],
	positions: [
		{
			id: 'centro',
			order: 1,
			label: 'Centro - Essência',
			description: 'O núcleo imutável da sua alma. O que permanece através de todas as estações.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'center',
		},
		{
			id: 'primavera-novos-comecos',
			order: 2,
			label: 'Primavera - Novos Começos',
			description: 'Primavera da alma. O que está nascendo, brotando, despertando em você agora.',
			x: 75,
			y: 20,
			rotation: 0,
		},
		{
			id: 'primavera-plantio',
			order: 3,
			label: 'Primavera - Plantio',
			description: 'Sementes a plantar. Intenções, sonhos e projetos que você deve iniciar.',
			x: 85,
			y: 35,
			rotation: 0,
		},
		{
			id: 'verao-florescimento',
			order: 4,
			label: 'Verão - Florescimento',
			description: 'Verão da alma. O que está em pleno florescer, expressão máxima da sua energia.',
			x: 75,
			y: 80,
			rotation: 0,
		},
		{
			id: 'verao-celebracao',
			order: 5,
			label: 'Verão - Celebração',
			description: 'Conquistas a celebrar. Alegrias, vitórias e abundância da estação quente.',
			x: 85,
			y: 65,
			rotation: 0,
		},
		{
			id: 'outono-colheita',
			order: 6,
			label: 'Outono - Colheita',
			description: 'Outono da alma. Frutos maduros prontos para colher. O que você plantou e agora recebe.',
			x: 25,
			y: 80,
			rotation: 0,
		},
		{
			id: 'outono-gratidao',
			order: 7,
			label: 'Outono - Gratidão',
			description: 'Agradecer e soltar. Sabedoria adquirida, folhas que caem, ciclos que se completam.',
			x: 15,
			y: 65,
			rotation: 0,
		},
		{
			id: 'inverno-descanso',
			order: 8,
			label: 'Inverno - Descanso Sagrado',
			description: 'Inverno da alma. Recolhimento, descanso, morte simbólica. Preparando o renascimento.',
			x: 25,
			y: 20,
			rotation: 0,
		},
	],
}

/**
 * ═══════════════════════════════════════════════════════
 * TIRAGENS DE 9 CARTAS - Spiritual Awakening
 * ═══════════════════════════════════════════════════════
 */

/**
 * Despertar Espiritual (9 cartas)
 *
 * Layout: Mandala 3x3 (passado, presente, futuro espiritual)
 * Propósito: Mapear jornada de despertar da consciência
 */
export const DESPERTAR_ESPIRITUAL: TarotSpread = {
	id: 'despertar-espiritual',
	name: 'Despertar Espiritual',
	slug: 'despertar-espiritual',
	cardCount: 9,
	category: 'deep',
	layout: 'mandala',
	description: 'Como O Lótus que desabrocha em 9 pétalas, esta tiragem-mandala revela a jornada do despertar espiritual em 9 estágios sagrados.',
	whenToUse: 'Para processos de despertar espiritual, kundalini, transformação profunda da consciência.',
	source: 'Inspirado no caminho do Louco pelos Arcanos Maiores',
	difficulty: 5,
	estimatedTime: 60,
	themeColor: '#7C3AED',
	icon: 'lucide:flame-kindling',
	tags: ['despertar', 'iluminação', 'mandala', 'transformação', 'mestra'],
	positions: [
		{
			id: 'passado-feridas',
			order: 1,
			label: 'Passado - Feridas',
			description: 'Traumas e feridas do passado que iniciaram sua busca espiritual.',
			x: 15,
			y: 15,
			rotation: 0,
		},
		{
			id: 'passado-ilusoes',
			order: 2,
			label: 'Passado - Ilusões',
			description: 'Crenças limitantes e ilusões que você já transcendeu.',
			x: 50,
			y: 15,
			rotation: 0,
		},
		{
			id: 'passado-primeira-luz',
			order: 3,
			label: 'Passado - Primeira Luz',
			description: 'O momento de despertar, a primeira faísca de consciência além do ego.',
			x: 85,
			y: 15,
			rotation: 0,
		},
		{
			id: 'presente-sombra',
			order: 4,
			label: 'Presente - Sombra Atual',
			description: 'Aspectos inconscientes que ainda precisa integrar agora.',
			x: 15,
			y: 50,
			rotation: 0,
		},
		{
			id: 'presente-essencia',
			order: 5,
			label: 'Presente - Essência',
			description: 'Quem você realmente é além de todas as máscaras. Sua verdade mais profunda AGORA.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'center',
		},
		{
			id: 'presente-luz',
			order: 6,
			label: 'Presente - Luz Atual',
			description: 'Sabedoria e consciência que você já conquistou no presente.',
			x: 85,
			y: 50,
			rotation: 0,
		},
		{
			id: 'futuro-bloqueio',
			order: 7,
			label: 'Futuro - Último Bloqueio',
			description: 'O desafio final antes da iluminação plena.',
			x: 15,
			y: 85,
			rotation: 0,
		},
		{
			id: 'futuro-dons',
			order: 8,
			label: 'Futuro - Dons do Despertar',
			description: 'Capacidades espirituais e dons que surgirão com seu despertar.',
			x: 50,
			y: 85,
			rotation: 0,
		},
		{
			id: 'futuro-servico',
			order: 9,
			label: 'Futuro - Serviço',
			description: 'Como você usará sua consciência desperta para servir ao mundo.',
			x: 85,
			y: 85,
			rotation: 0,
			emphasis: 'bottom',
		},
	],
}

/**
 * ═══════════════════════════════════════════════════════
 * TIRAGENS DE 10 CARTAS - Master Level
 * ═══════════════════════════════════════════════════════
 */

/**
 * A Cruz Celta (10 cartas)
 *
 * Layout: Cruz celta tradicional
 * Propósito: Análise completa de situação complexa
 */
export const CRUZ_CELTA: TarotSpread = {
	id: 'cruz-celta',
	name: 'A Cruz Celta',
	slug: 'cruz-celta',
	cardCount: 10,
	category: 'deep',
	layout: 'celtic',
	description: 'A tiragem mestre do tarot. Uma análise profunda e completa que examina todos os ângulos de uma situação.',
	whenToUse: 'Para questões complexas que requerem análise profunda. Reserve tempo e espaço sagrado para esta leitura.',
	source: 'Tradicional',
	difficulty: 5,
	estimatedTime: 60,
	themeColor: '#7C3AED',
	icon: 'lucide:crosshair',
	tags: ['avançada', 'completa', 'profunda', 'tradicional', 'mestra'],
	positions: [
		{
			id: 'presente',
			order: 1,
			label: 'O Presente',
			description: 'A essência da situação agora. O coração da questão no momento presente.',
			x: 40,
			y: 45,
			rotation: 0,
			emphasis: 'center',
			connectedTo: ['cruzamento', 'fundacao', 'passado-recente', 'coroa', 'futuro-proximo'],
		},
		{
			id: 'cruzamento',
			order: 2,
			label: 'O Cruzamento',
			description: 'Influências externas, desafios ou energias que cruzam seu caminho atual.',
			x: 40,
			y: 45,
			rotation: 90,
			emphasis: 'center',
		},
		{
			id: 'fundacao',
			order: 3,
			label: 'Fundação',
			description: 'A base da situação. Raízes profundas, causas subjacentes ou motivações inconscientes.',
			x: 40,
			y: 65,
			rotation: 0,
		},
		{
			id: 'passado-recente',
			order: 4,
			label: 'Passado Recente',
			description: 'Eventos ou energias recentes que levaram à situação atual.',
			x: 20,
			y: 45,
			rotation: 0,
		},
		{
			id: 'coroa',
			order: 5,
			label: 'Melhor Resultado Possível',
			description: 'O potencial máximo, o melhor que pode acontecer se você alinhar suas ações.',
			x: 40,
			y: 25,
			rotation: 0,
			emphasis: 'top',
		},
		{
			id: 'futuro-proximo',
			order: 6,
			label: 'Futuro Próximo',
			description: 'O que está chegando, eventos ou energias no horizonte imediato.',
			x: 60,
			y: 45,
			rotation: 0,
		},
		{
			id: 'voce',
			order: 7,
			label: 'Você',
			description: 'Como você se vê nesta situação. Sua auto-percepção e atitude interna.',
			x: 85,
			y: 80,
			rotation: 0,
		},
		{
			id: 'ambiente',
			order: 8,
			label: 'Ambiente Externo',
			description: 'Influências externas, como outros veem a situação, fatores ambientais.',
			x: 85,
			y: 60,
			rotation: 0,
		},
		{
			id: 'esperancas-medos',
			order: 9,
			label: 'Esperanças e Medos',
			description: 'Suas expectativas secretas, medos escondidos ou desejos não expressos.',
			x: 85,
			y: 40,
			rotation: 0,
		},
		{
			id: 'resultado-final',
			order: 10,
			label: 'Resultado Final',
			description: 'O desfecho mais provável. A síntese de todas as energias e a culminação da jornada.',
			x: 85,
			y: 20,
			rotation: 0,
			emphasis: 'highlight',
		},
	],
}

/**
 * ═══════════════════════════════════════════════════════
 * ARRAY CONSOLIDADO - Todas as Tiragens
 * ═══════════════════════════════════════════════════════
 */

export const ALL_SPREADS: TarotSpread[] = [
	// 1 Carta
	SIM_OU_NAO,

	// 2 Cartas
	LIBERAR_E_RETIRAR,
	DOM_E_OBSTACULO,

	// 3 Cartas
	CONSELHO_DO_UNIVERSO,
	PASSADO_PRESENTE_FUTURO,
	MENTE_CORPO_ESPIRITO,
	CABECA_CORACAO_ESPIRITO,
	MENSAGEM_DO_VENTO,
	PROBLEMA_FAZER_EVITAR,

	// 4 Cartas
	PROS_E_CONTRAS,

	// 5 Cartas
	POTENCIAL_RELACIONAMENTO,
	LEI_DE_ATRACAO,
	MAGIA_MANIFESTADORA,
	RAIZES_E_FRUTOS,

	// 6 Cartas
	RELACIONAMENTO_EXISTENTE,
	ENCRUZILHADAS,
	TOMANDO_DECISAO,

	// 7 Cartas
	JORNADA_DA_ALMA,
	TRABALHO_DE_SOMBRA,

	// 8 Cartas
	QUATRO_ESTACOES_DA_ALMA,

	// 9 Cartas
	DESPERTAR_ESPIRITUAL,

	// 10 Cartas
	CRUZ_CELTA,
]

/**
 * Helper: Buscar tiragem por slug
 */
export function getSpreadBySlug(slug: string): TarotSpread | undefined {
	return ALL_SPREADS.find((spread) => spread.slug === slug)
}

/**
 * Helper: Filtrar tiragens por categoria
 */
export function getSpreadsByCategory(category: TarotSpread['category']): TarotSpread[] {
	return ALL_SPREADS.filter((spread) => spread.category === category)
}

/**
 * Helper: Filtrar tiragens por número de cartas
 */
export function getSpreadsByCardCount(count: number): TarotSpread[] {
	return ALL_SPREADS.filter((spread) => spread.cardCount === count)
}
