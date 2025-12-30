import Link from 'next/link'

import type { Naipe } from '../domain'

import { NaipeCTA } from './naipe-cta'
import { NaipeHeader } from './naipe-header'
import { NaipeInfo } from './naipe-info'

type NaipeCardProps = {
	naipe: Naipe
}

export function NaipeCard({ naipe }: NaipeCardProps) {
	return (
		<Link
			href={naipe.href}
			className="group relative overflow-hidden"
		>
			<div className={`relative rounded-2xl border-2 ${naipe.borderColor} bg-gradient-to-br ${naipe.bgGradient} p-6 backdrop-blur-sm shadow-xl hover:shadow-2xl ${naipe.shadowColor} transition-all duration-300`}>
				<div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

				<div className="relative space-y-4">
					<NaipeHeader
						elementIcon={naipe.elementIcon}
						name={naipe.name}
						element={naipe.element}
						color={naipe.color}
						gradient={naipe.gradient}
						borderColor={naipe.borderColor}
						symbol={naipe.symbol}
					/>

					<NaipeInfo
						description={naipe.description}
						elementIcon={naipe.elementIcon}
						element={naipe.element}
						color={naipe.color}
						borderColor={naipe.borderColor}
						zodiac={naipe.zodiac}
						theme={naipe.theme}
					/>

					<NaipeCTA name={naipe.name} color={naipe.color} />
				</div>
			</div>
		</Link>
	)
}
