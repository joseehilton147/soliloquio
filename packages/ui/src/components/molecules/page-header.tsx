import { Icon, type IconifyIcon } from '@iconify/react'

export interface PageHeaderProps {
	/**
	 * Ícone do Iconify a ser exibido
	 */
	icon: string | IconifyIcon

	/**
	 * Título principal da página
	 */
	title: string

	/**
	 * Descrição/subtítulo opcional
	 */
	description?: string
}

/**
 * PageHeader - Molécula
 * Header reutilizável para páginas internas com ícone, título e descrição.
 *
 * Design Atômico:
 * - Átomo: Icon (Iconify)
 * - Molécula: PageHeader (este componente)
 *
 * Uso:
 * - Páginas internas (Configurações, Cartas, Baralhos, etc.)
 * - Mantém consistência visual em todo o app
 *
 * @example
 * <PageHeader
 *   icon="lucide:settings"
 *   title="Configurações"
 *   description="Personalize sua experiência mística"
 * />
 */
export function PageHeader({ icon, title, description }: PageHeaderProps) {
	return (
		<div className="space-y-3">
			<div className="flex items-center gap-3">
				{/* Icon Container */}
				<div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
					<Icon icon={icon} className="size-6 text-purple-600 dark:text-purple-400" />
				</div>

				{/* Title with gradient effect + proper line-height */}
				<h1 className="text-5xl font-bold leading-normal py-1 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
					{title}
				</h1>
			</div>

			{/* Optional Description */}
			{description && (
				<p className="text-lg text-muted-foreground ml-15">
					{description}
				</p>
			)}
		</div>
	)
}
