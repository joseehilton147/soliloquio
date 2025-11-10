/**
 * Utilitários para cálculo de espaço disponível no viewport
 *
 * Funções reutilizáveis para calcular espaço disponível ao redor de elementos,
 * útil para posicionar modais, dropdowns, popovers e outros elementos flutuantes
 * de forma responsiva e adaptativa.
 */

/**
 * Resultado do cálculo de espaço disponível no viewport
 */
export interface ViewportSpaceCalculation {
	/** Espaço disponível acima do elemento (em pixels) */
	spaceAbove: number
	/** Espaço disponível abaixo do elemento (em pixels) */
	spaceBelow: number
	/** Espaço disponível à esquerda do elemento (em pixels) */
	spaceLeft: number
	/** Espaço disponível à direita do elemento (em pixels) */
	spaceRight: number
	/** Se deve abrir para cima (true) ou para baixo (false) */
	shouldOpenUpwards: boolean
	/** Se deve abrir para esquerda (true) ou para direita (false) */
	shouldOpenLeftwards: boolean
	/** Altura máxima recomendada para o elemento flutuante (em pixels) */
	maxHeight: number
	/** Largura máxima recomendada para o elemento flutuante (em pixels) */
	maxWidth: number
	/** Coordenadas do elemento trigger */
	triggerRect: DOMRect
}

/**
 * Opções para configurar o cálculo de espaço disponível
 */
export interface ViewportSpaceOptions {
	/** Margem de segurança ao redor do viewport (padrão: 16px) */
	margin?: number
	/** Altura mínima desejada para o elemento flutuante (padrão: 200px) */
	minHeight?: number
	/** Largura mínima desejada para o elemento flutuante (padrão: 200px) */
	minWidth?: number
	/** Offset adicional do trigger (ex: distância entre trigger e dropdown, padrão: 16px) */
	offset?: number
}

/**
 * Calcula o espaço disponível no viewport ao redor de um elemento trigger
 *
 * @param triggerElement - Elemento de referência (botão, input, etc.)
 * @param options - Opções de configuração
 * @returns Objeto com informações detalhadas sobre espaço disponível
 *
 * @example
 * ```tsx
 * const triggerRef = useRef<HTMLDivElement>(null)
 *
 * const handleOpen = () => {
 *   if (triggerRef.current) {
 *     const space = calculateAvailableSpace(triggerRef.current, {
 *       margin: 16,
 *       minHeight: 200,
 *       offset: 16
 *     })
 *
 *     setOpenUpwards(space.shouldOpenUpwards)
 *     setMaxHeight(space.maxHeight)
 *   }
 * }
 * ```
 */
export function calculateAvailableSpace(
	triggerElement: HTMLElement,
	options: ViewportSpaceOptions = {},
): ViewportSpaceCalculation {
	const {
		margin = 16,
		minHeight = 200,
		minWidth = 200,
		offset = 16,
	} = options

	// Obter coordenadas do elemento trigger
	const rect = triggerElement.getBoundingClientRect()

	// Dimensões do viewport
	const viewportHeight = window.innerHeight
	const viewportWidth = window.innerWidth

	// Calcular espaços disponíveis em todas as direções
	const spaceAbove = rect.top
	const spaceBelow = viewportHeight - rect.bottom
	const spaceLeft = rect.left
	const spaceRight = viewportWidth - rect.right

	// Decidir direção vertical (cima/baixo)
	// Abre para cima SE:
	// 1. Não há espaço mínimo embaixo E
	// 2. Há mais espaço em cima do que embaixo
	const shouldOpenUpwards = spaceBelow < minHeight && spaceAbove > spaceBelow

	// Decidir direção horizontal (esquerda/direita)
	// Abre para esquerda SE:
	// 1. Não há espaço mínimo à direita E
	// 2. Há mais espaço à esquerda do que à direita
	const shouldOpenLeftwards = spaceRight < minWidth && spaceLeft > spaceRight

	// Calcular dimensões máximas recomendadas
	const availableVerticalSpace = shouldOpenUpwards ? spaceAbove : spaceBelow
	const availableHorizontalSpace = shouldOpenLeftwards ? spaceLeft : spaceRight

	// Aplicar margens e offset
	const maxHeight = Math.max(
		minHeight,
		availableVerticalSpace - margin - offset,
	)

	const maxWidth = Math.max(
		minWidth,
		availableHorizontalSpace - margin,
	)

	return {
		spaceAbove,
		spaceBelow,
		spaceLeft,
		spaceRight,
		shouldOpenUpwards,
		shouldOpenLeftwards,
		maxHeight,
		maxWidth,
		triggerRect: rect,
	}
}

/**
 * Hook React para cálculo de espaço disponível no viewport
 *
 * @param triggerRef - Ref do elemento trigger
 * @param options - Opções de configuração
 * @returns Objeto com informações sobre espaço disponível, ou null se ref não estiver disponível
 *
 * @example
 * ```tsx
 * const triggerRef = useRef<HTMLDivElement>(null)
 * const space = useViewportSpace(triggerRef, { minHeight: 200 })
 *
 * return (
 *   <div ref={triggerRef}>
 *     <Modal
 *       openUpwards={space?.shouldOpenUpwards}
 *       maxHeight={space?.maxHeight}
 *     />
 *   </div>
 * )
 * ```
 */
export function useViewportSpace(
	triggerRef: React.RefObject<HTMLElement>,
	options?: ViewportSpaceOptions,
): ViewportSpaceCalculation | null {
	if (!triggerRef.current) {
		return null
	}

	return calculateAvailableSpace(triggerRef.current, options)
}
