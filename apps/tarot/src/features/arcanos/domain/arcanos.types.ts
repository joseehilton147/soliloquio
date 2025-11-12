/**
 * Representa um tipo de Arcano do Tarô com suas propriedades místicas
 */
export interface ArcanoType {
	/** Identificador único */
	id: 'maiores' | 'menores'
	/** Nome do tipo de arcano */
	name: string
	/** Título místico */
	title: string
	/** Ícone místico (Iconify) */
	icon: string
	/** Ícone secundário para decoração */
	decorativeIcon: string
	/** Quantidade de cartas */
	count: number
	/** Subtítulo descritivo */
	subtitle: string
	/** Cor base (Tailwind color name) */
	color: string
	/** Classes de gradiente */
	gradient: string
	/** Classes de gradiente de fundo */
	bgGradient: string
	/** Classes de borda */
	borderColor: string
	/** Classes de sombra no hover */
	shadowColor: string
	/** Descrição principal (array de parágrafos) */
	description: string[]
	/** Citação mística */
	quote: string
	/** Pontos-chave */
	keyPoints: Array<{
		title: string
		description: string
	}>
	/** URL de navegação */
	href: string
}
