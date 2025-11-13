'use client'

import { MysticalTabs } from '@workspace/ui'
import { TiragemCategoryPortalCard } from '../../../app/tiragens/components'
import { ALL_CATEGORIES } from '@/features/tiragens'
import { TIRAGENS_TABS_CONFIG, getTiragemTabSubtitle } from '../../config/tiragens-tabs.config'

/**
 * Tarot Tiragens Tabs
 *
 * Wrapper específico de Tarot para o componente base MysticalTabs.
 * Usa configuração de tiragens e renderiza cards de categorias.
 *
 * Este componente é a implementação específica para a página de Tiragens,
 * mas o componente base MysticalTabs pode ser reutilizado em qualquer lugar.
 *
 * @example
 * ```tsx
 * <TarotTiragensTabs />
 * ```
 */
export function TarotTiragensTabs() {
	return (
		<MysticalTabs
			tabs={TIRAGENS_TABS_CONFIG}
			defaultTab={ALL_CATEGORIES[0]?.id}
			title="Escolha Seu Portal Elemental"
			transitionDuration={500} // Transição suave de 500ms
			subtitle={(activeTab) => getTiragemTabSubtitle(activeTab)}
		>
			{(activeTab) => {
				const activeCategory = ALL_CATEGORIES.find((cat) => cat.id === activeTab)
				if (!activeCategory) return null

				return <TiragemCategoryPortalCard category={activeCategory} reversed={false} />
			}}
		</MysticalTabs>
	)
}
