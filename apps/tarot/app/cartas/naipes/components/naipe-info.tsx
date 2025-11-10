import { ElementBadge } from './element-badge'
import { ZodiacInfo } from './zodiac-info'
import { ThemeInfo } from './theme-info'

/**
 * Props do componente NaipeInfo
 */
interface NaipeInfoProps {
	/** Descrição do naipe */
	description: string
	/** Ícone do elemento */
	elementIcon: string
	/** Nome do elemento */
	element: string
	/** Cor do naipe (Tailwind color name) */
	color: string
	/** Classes de borda */
	borderColor: string
	/** Signos do zodíaco */
	zodiac: string
	/** Temas principais */
	theme: string
}

/**
 * Informações completas do naipe - Molécula
 *
 * Componente burro que combina descrição, badge de elemento, signos e temas.
 * Agrupa todas as informações textuais de um naipe seguindo Design Atomic.
 *
 * @example
 * ```tsx
 * <NaipeInfo
 *   description="O naipe das emoções..."
 *   elementIcon="mdi:water"
 *   element="Água"
 *   color="blue"
 *   borderColor="border-blue-500/30"
 *   zodiac="Câncer, Escorpião, Peixes"
 *   theme="Emoções, relacionamentos..."
 * />
 * ```
 */
export function NaipeInfo({
	description,
	elementIcon,
	element,
	color,
	borderColor,
	zodiac,
	theme
}: NaipeInfoProps) {
	return (
		<div className="space-y-4">
			<p className="text-lg text-foreground/80 leading-relaxed">
				{description}
			</p>

			<ElementBadge
				icon={elementIcon}
				element={element}
				color={color}
				borderColor={borderColor}
			/>

			<ZodiacInfo zodiac={zodiac} color={color} />

			<ThemeInfo theme={theme} />
		</div>
	)
}
