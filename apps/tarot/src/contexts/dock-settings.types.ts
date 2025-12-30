/**
 * Tipos para configurações do Dock
 *
 * Exportados para reutilização em componentes que consomem o contexto.
 */

export type DockVisibility = 'always' | 'auto-hide'

export type DockSettings = {
	visibility: DockVisibility
}

export type DockSettingsContextType = {
	settings: DockSettings
	updateSettings: (settings: Partial<DockSettings>) => void
}
