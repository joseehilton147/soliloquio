import type { Metadata } from 'next'

import '@workspace/ui/globals.css'
import './tarot.css'
import { getAllFontsClassName } from '../config/fonts.config'

import { Providers } from '@/components/templates/providers'
import { TarotLayout } from '@/components/templates/tarot/layout'

export const metadata: Metadata = {
	title: 'Tarot - Solilóquio',
	description: 'Interpretações e leituras de Tarot para sua jornada espiritual',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR" suppressHydrationWarning className={getAllFontsClassName()}>
			<body>
				<Providers>
					<TarotLayout>{children}</TarotLayout>
				</Providers>
			</body>
		</html>
	)
}
