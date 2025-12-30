import { ElementBadge } from './element-badge'
import { ThemeInfo } from './theme-info'
import { ZodiacInfo } from './zodiac-info'

type NaipeInfoProps = {
	description: string
	elementIcon: string
	element: string
	color: string
	borderColor: string
	zodiac: string
	theme: string
}

export function NaipeInfo({
	description,
	elementIcon,
	element,
	color,
	borderColor,
	zodiac,
	theme,
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
