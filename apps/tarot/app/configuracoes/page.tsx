'use client'

import { Icon } from '@iconify/react'
import { PageHeader } from '@workspace/ui/components/molecules'
import { cn } from '@workspace/ui/lib/utils'

import { useDockSettings } from '../../src/contexts/dock-settings-context'

type DockVisibility = 'always' | 'auto-hide'

/**
 * Opção de configuração de visibilidade da dock
 *
 * @property {DockVisibility} value - Valor da configuração
 * @property {string} label - Título exibido ao usuário
 * @property {string} description - Descrição detalhada do comportamento
 */
interface VisibilityOption {
	value: DockVisibility
	label: string
	description: string
}

const VISIBILITY_OPTIONS: VisibilityOption[] = [
	{
		value: 'always',
		label: 'Sempre Visível',
		description: 'A dock permanece sempre visível na parte inferior da tela',
	},
	{
		value: 'auto-hide',
		label: 'Ocultar Automaticamente',
		description: 'A dock aparece ao rolar para o topo e desaparece ao rolar para baixo',
	},
]

/**
 * Página de configurações da aplicação
 *
 * Permite ao usuário personalizar o comportamento da dock de navegação,
 * controlando quando ela deve ser exibida ou ocultada automaticamente.
 *
 * @component
 * @example
 * ```tsx
 * // Rota: /configuracoes
 * <ConfiguracoesPage />
 * ```
 *
 * @remarks
 * - A dock está sempre posicionada na parte inferior (bottom-6)
 * - As configurações são persistidas no localStorage automaticamente
 * - Mudanças são aplicadas em tempo real sem necessidade de reload
 *
 * @returns {JSX.Element} Página de configurações renderizada
 */
export default function ConfiguracoesPage() {
	const { settings, updateSettings } = useDockSettings()

	const currentVisibilityOption = VISIBILITY_OPTIONS.find(
		(option) => option.value === settings.visibility,
	)

	const handleVisibilityChange = (visibility: DockVisibility): void => {
		updateSettings({ visibility })
	}

	return (
		<div className="space-y-12">
			<PageHeader
				icon="lucide:settings"
				title="Configurações"
				description="Personalize sua experiência mística"
			/>

			<section className="space-y-6">
				<div className="flex items-center gap-3">
					<Icon icon="lucide:palette" className="size-5 text-purple-600 dark:text-purple-400" />
					<h2 className="text-2xl font-semibold">Aparência</h2>
				</div>

				<div className="space-y-8">
					<div className="space-y-4">
						<div>
							<h3 className="text-lg font-medium mb-1">Comportamento da Dock</h3>
							<p className="text-sm text-muted-foreground">
								Defina quando a dock de navegação deve aparecer na tela
							</p>
						</div>

						<div className="grid gap-4 md:grid-cols-2">
							{VISIBILITY_OPTIONS.map((option) => {
								const isSelected = settings.visibility === option.value

								return (
									<button
										key={option.value}
										onClick={() => handleVisibilityChange(option.value)}
										className={cn(
											'group relative overflow-hidden rounded-2xl p-6 text-left',
											'border-2 transition-all duration-200',
											'hover:scale-[1.02]',
											isSelected
												? 'border-purple-500 bg-purple-500/10'
												: 'border-border/40 bg-gradient-to-br from-background via-background to-muted/10 hover:border-purple-500/30',
										)}
									>
										{isSelected && (
											<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5" />
										)}

										<div className="relative space-y-2">
											<div className="flex items-center justify-between">
												<h4 className="font-semibold">{option.label}</h4>

												{isSelected && (
													<div className="flex size-5 items-center justify-center rounded-full bg-purple-500">
														<svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
														</svg>
													</div>
												)}
											</div>

											<p className="text-sm text-muted-foreground">{option.description}</p>
										</div>
									</button>
								)
							})}
						</div>
					</div>

					<div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 p-6">
						<p className="text-sm text-muted-foreground mb-4">
							<span className="font-medium text-foreground">💡 Dica:</span> As alterações são aplicadas
							imediatamente. Role a página para ver a dock em ação!
						</p>

						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<span className="size-2 rounded-full bg-purple-500 animate-pulse" />
							Configuração atual:{' '}
							<span className="font-medium text-purple-600 dark:text-purple-400">
								{currentVisibilityOption?.label}
							</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
