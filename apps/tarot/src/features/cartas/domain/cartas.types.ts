/**
 * Types do domínio de Cartas
 *
 * Tipos relacionados à exibição de cartas individuais.
 * Específicos para a feature de detalhe de carta.
 */

/**
 * Props para componente de mensagem de reflexão
 */
export type ReflectionMessageProps = {
	message: string
	className?: string
}

/**
 * Tipo de leitura disponível
 */
export type ReadingTypeKey =
	| 'general'
	| 'love-relationship'
	| 'career-money'
	| 'personal-spiritual'
	| 'inverted'
