'use client'

import { MysticalTabs } from '@workspace/ui'

import { TiragemCategoryPortalCard } from '@/app/(portal)/tiragens/components'
import { TIRAGENS_TABS_CONFIG, getTiragemTabSubtitle } from '@/config/tiragens-tabs.config'
import { ALL_CATEGORIES } from '@/features/tiragens'

export function TarotTiragensTabs() {
	return (
		<MysticalTabs
			tabs={TIRAGENS_TABS_CONFIG}
			defaultTab={ALL_CATEGORIES[0]?.id}
			title="Escolha Seu Portal Elemental"
			transitionDuration={500}
			subtitle={(activeTab) => getTiragemTabSubtitle(activeTab)}
		>
			{(activeTab) => {
				const activeCategory = ALL_CATEGORIES.find((cat) => cat.id === activeTab)
				if (!activeCategory) {return null}

				return <TiragemCategoryPortalCard category={activeCategory} reversed={false} />
			}}
		</MysticalTabs>
	)
}
