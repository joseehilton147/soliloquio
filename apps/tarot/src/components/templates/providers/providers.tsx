'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { ThemeProvider } from 'next-themes'
import { useState, Suspense } from 'react'
import superjson from 'superjson'

import { DockSettingsProvider } from '@/contexts/dock-settings-context'
import { trpc } from '@/lib/trpc'
import { PageLoadingIndicator } from '@/shared/components'

type ProvidersProps = {
	children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
					},
				},
			}),
	)

	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: '/api/trpc',
					transformer: superjson,
				}),
			],
		}),
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<DockSettingsProvider>
						<Suspense fallback={null}>
							<PageLoadingIndicator />
						</Suspense>
						{children}
					</DockSettingsProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</trpc.Provider>
	)
}
