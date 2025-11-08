import type { Metadata } from 'next'

import '@workspace/ui/globals.css'
import { Providers } from '../src/components/providers'
import { TarotLayout } from '../src/components/tarot-layout'

export const metadata: Metadata = {
	title: 'Tarot - Solilóquio',
	description: 'Interpretações e leituras de Tarot para sua jornada espiritual',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR" className="dark" suppressHydrationWarning>
			<body className="dark">
				<Providers>
					<TarotLayout>{children}</TarotLayout>
				</Providers>
			</body>
		</html>
	)
}
