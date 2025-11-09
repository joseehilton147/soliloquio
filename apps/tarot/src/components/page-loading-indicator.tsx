'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

/**
 * Indicador de loading global para transições de página
 * Exibe um overlay místico durante a navegação
 */
export function PageLoadingIndicator() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		// Mostra loading ao começar a navegar
		setIsLoading(true)

		// Timer para esconder loading (fallback se a página carregar muito rápido)
		const timeout = setTimeout(() => {
			setIsLoading(false)
		}, 300)

		return () => {
			clearTimeout(timeout)
			setIsLoading(false)
		}
	}, [pathname, searchParams])

	if (!isLoading) return null

	return (
		<>
			{/* Barra de progresso no topo */}
			<div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent">
				<div className="h-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 animate-progress-bar" />
			</div>

			{/* Overlay com spinner místico */}
			<div className="fixed inset-0 z-[9998] bg-background/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
				<div className="relative">
					{/* Círculo rotativo externo */}
					<div className="absolute inset-0 size-20 animate-spin-slow [animation-duration:3s]">
						<div className="size-full rounded-full border-2 border-violet-500/20 border-t-violet-500" />
					</div>

					{/* Círculo rotativo interno (reverso) */}
					<div className="absolute inset-0 size-20 animate-spin-slow [animation-duration:2s] [animation-direction:reverse]">
						<div className="size-full rounded-full border-2 border-purple-500/20 border-t-purple-500" />
					</div>

					{/* Ícone central */}
					<div className="relative flex size-20 items-center justify-center">
						<Loader2 className="size-8 text-violet-600 dark:text-violet-400 animate-spin" />
					</div>

					{/* Glow effect */}
					<div className="absolute inset-0 -z-10 size-20 blur-xl bg-violet-500/20 rounded-full animate-pulse" />
				</div>
			</div>

			<style jsx>{`
				@keyframes progress-bar {
					0% {
						width: 0%;
						margin-left: 0%;
					}
					50% {
						width: 70%;
						margin-left: 15%;
					}
					100% {
						width: 0%;
						margin-left: 100%;
					}
				}

				.animate-progress-bar {
					animation: progress-bar 2s ease-in-out infinite;
				}
			`}</style>
		</>
	)
}
