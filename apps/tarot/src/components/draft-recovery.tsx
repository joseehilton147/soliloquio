import { AlertCircle, CheckCircle2, Clock, Trash2, RotateCcw } from 'lucide-react'

// Helper para formatar tempo decorrido
function formatTimeAgo(date: Date): string {
	const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

	if (seconds < 60) return 'há alguns segundos'
	if (seconds < 3600) {
		const minutes = Math.floor(seconds / 60)
		return `há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`
	}
	if (seconds < 86400) {
		const hours = Math.floor(seconds / 3600)
		return `há ${hours} ${hours === 1 ? 'hora' : 'horas'}`
	}
	const days = Math.floor(seconds / 86400)
	return `há ${days} ${days === 1 ? 'dia' : 'dias'}`
}

interface DraftRecoveryProps {
	hasDraft: boolean
	lastSaved: Date | null
	onRestore: () => void
	onDiscard: () => void
	isSaving?: boolean
}

/**
 * Componente que mostra banner de recuperação de draft
 * Aparece quando há um draft salvo automaticamente
 */
export function DraftRecovery({
	hasDraft,
	lastSaved,
	onRestore,
	onDiscard,
	isSaving = false
}: DraftRecoveryProps) {
	if (!hasDraft) return null

	const savedTimeAgo = lastSaved ? formatTimeAgo(lastSaved) : 'há algum tempo'

	return (
		<div className="mb-6 rounded-xl border border-violet-500/30 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-indigo-500/5 p-4 backdrop-blur-sm">
			<div className="flex items-start gap-4">
				{/* Icon */}
				<div className="flex size-10 items-center justify-center rounded-full bg-violet-500/10 border border-violet-500/20">
					<AlertCircle className="size-5 text-violet-600 dark:text-violet-400" />
				</div>

				{/* Content */}
				<div className="flex-1 space-y-3">
					<div>
						<h3 className="font-semibold text-foreground">
							Rascunho encontrado
						</h3>
						<p className="text-sm text-muted-foreground mt-1">
							Você tem um rascunho salvo automaticamente {savedTimeAgo}.
							Deseja recuperar ou descartar?
						</p>
					</div>

					{/* Actions */}
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={onRestore}
							className="group inline-flex items-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-700 px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105 shadow-lg shadow-violet-500/25"
						>
							<RotateCcw className="size-4 transition-transform group-hover:rotate-180" />
							Recuperar Rascunho
						</button>

						<button
							type="button"
							onClick={onDiscard}
							className="group inline-flex items-center gap-2 rounded-lg border border-border/40 bg-background/50 hover:bg-destructive/10 hover:border-destructive/30 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-destructive transition-all"
						>
							<Trash2 className="size-4 transition-transform group-hover:scale-110" />
							Descartar
						</button>
					</div>
				</div>

				{/* Auto-save indicator */}
				{isSaving && (
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<div className="size-2 rounded-full bg-violet-500 animate-pulse" />
						<span>Salvando...</span>
					</div>
				)}
			</div>
		</div>
	)
}

interface AutosaveIndicatorProps {
	lastSaved: Date | null
	isSaving: boolean
}

/**
 * Indicador de auto-save no footer ou topo do formulário
 */
export function AutosaveIndicator({ lastSaved, isSaving }: AutosaveIndicatorProps) {
	if (isSaving) {
		return (
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<div className="size-2 rounded-full bg-violet-500 animate-pulse" />
				<span>Salvando rascunho...</span>
			</div>
		)
	}

	if (lastSaved) {
		const savedTimeAgo = formatTimeAgo(lastSaved)
		return (
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<CheckCircle2 className="size-4 text-green-500" />
				<span>Salvo {savedTimeAgo}</span>
			</div>
		)
	}

	return (
		<div className="flex items-center gap-2 text-sm text-muted-foreground">
			<Clock className="size-4" />
			<span>Aguardando mudanças...</span>
		</div>
	)
}
