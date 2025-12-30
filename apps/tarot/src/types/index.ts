/**
 * Tipos Globais Compartilhados
 *
 * Este barrel re-exporta tipos que são usados em múltiplos domínios.
 * Tipos específicos de domínio devem permanecer em seus respectivos
 * arquivos features/[feature]/domain/[feature].types.ts.
 *
 * Estrutura de tipos do projeto:
 * - src/types/ - Tipos globais (este arquivo)
 * - src/features/[feature]/domain/ - Tipos específicos de feature
 * - src/contexts/ - Tipos de contextos React
 * - src/lib/trpc.ts - Tipos inferidos do tRPC
 */

// Re-export do tipo de carta inferido do tRPC (usado em múltiplos componentes)
export type { TarotCardFromRouter } from '../lib/trpc'

// Re-export tipos de contexto
export type { DockSettings, DockSettingsContextType, DockVisibility } from '../contexts/dock-settings.types'

// Re-export tipos de elementos (compartilhados entre features)
export type {
	Element,
	ElementalTheme,
	ElementColorConfig,
	NaipeColorScheme,
	CategoryType,
} from '../shared/constants/element-colors'
