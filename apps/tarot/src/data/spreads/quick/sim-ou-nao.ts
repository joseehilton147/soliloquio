/**
 * Tiragem Sim ou Não (1 carta)
 *
 * A tiragem mais simples e direta do tarot para respostas rápidas.
 * Use quando precisar de uma orientação clara sobre uma pergunta específica.
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const SIM_OU_NAO: TarotSpread = {
	id: 'sim-ou-nao',
	name: 'Sim ou Não',
	slug: 'sim-ou-nao',
	cardCount: 1,
	category: 'quick',
	layout: 'single',
	description: 'Tire uma única carta para obter uma resposta direta. Ideal para decisões simples do dia a dia que precisam de orientação rápida.',
	whenToUse: 'Use quando tiver uma pergunta específica que possa ser respondida com sim ou não. Evite perguntas muito complexas ou abertas.',
	source: 'Tradicional',
	difficulty: 1,
	estimatedTime: 5,
	themeColor: '#64748B',
	icon: 'lucide:target',
	tags: ['rápida', 'direta', 'decisão', 'iniciante'],
	positions: [
		{
			id: 'resposta',
			order: 1,
			label: 'Resposta da Carta',
			description: `Como interpretar sua resposta:

📗 CARTAS QUE INDICAM SIM (Energia Positiva)

Arcanos Maiores Positivos:
• O Sol (XIX) - Sim definitivo! Sucesso e clareza
• A Estrela (XVII) - Sim! Esperança e otimismo
• O Mundo (XXI) - Sim! Realização e conclusão
• A Roda da Fortuna (X) - Sim! Mudança favorável
• Todos os ASES - Sim! Novos começos e oportunidades

Arcanos Menores Positivos:
• Copas (2, 3, 6, 9, 10) - Sim emocional
• Ouros (3, 6, 9, 10) - Sim material/financeiro
• Paus (2, 3, 6) - Sim para ação
• Valete/Cavaleiro/Rainha/Rei de Copas e Ouros - Sim

📕 CARTAS QUE INDICAM NÃO (Energia Desafiadora)

Arcanos Maiores Desafiadores:
• A Torre (XVI) - Não. Momento de mudança brusca
• O Diabo (XV) - Não. Padrões limitantes presentes
• A Morte (XIII) - Não agora. Transformação necessária
• O Enforcado (XII) - Não. Aguarde e reflita mais

Arcanos Menores Desafiadores:
• 5 de Copas - Não. Perda ou decepção
• 5 de Paus - Não. Conflitos presentes
• 5 de Espadas - Não. Derrota ou traição
• 7 de Espadas - Não. Falta de transparência
• 9 de Espadas - Não. Ansiedade e preocupação
• 10 de Espadas - Não. Fim de um ciclo doloroso

⚪ CARTAS NEUTRAS (Reformule a Pergunta)

Quando a carta não é claramente positiva nem negativa:
• A Justiça (XI) - Depende de suas ações
• O Eremita (IX) - Precisa de mais reflexão
• A Temperança (XIV) - Equilíbrio necessário primeiro
• 2 de Espadas - Indecisão, reformule
• 4 de Copas - Apatia, não está claro
• 7 de Copas - Ilusão, seja mais específico

🎯 DICAS IMPORTANTES:

1. Faça perguntas claras e específicas
2. Evite perguntas com "talvez" ou "pode ser"
3. Foque em uma situação por vez
4. Confie em sua primeira impressão sobre a carta
5. Se a resposta não fizer sentido, reformule a pergunta

💡 EXEMPLOS DE PERGUNTAS BOAS:
• "Devo aceitar esta oferta de trabalho?"
• "Este é um bom momento para investir?"
• "Devo ter essa conversa hoje?"

❌ EXEMPLOS DE PERGUNTAS RUINS:
• "Serei feliz?" (muito aberta)
• "O que devo fazer?" (não é sim/não)
• "Ele me ama?" (complexa demais para 1 carta)`,
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
	],
}
