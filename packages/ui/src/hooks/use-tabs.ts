'use client'

import { useState, useCallback } from 'react'

export interface UseTabsOptions {
	defaultTab?: string
	onChange?: (tabId: string) => void
}

export interface UseTabsReturn {
	activeTab: string
	setActiveTab: (tabId: string) => void
	isActive: (tabId: string) => boolean
}

/**
 * Hook para gerenciar estado de tabs
 *
 * @example
 * ```tsx
 * const { activeTab, setActiveTab, isActive } = useTabs({
 *   defaultTab: 'tab1',
 *   onChange: (id) => console.log('Tab changed to:', id)
 * })
 * ```
 */
export function useTabs({ defaultTab, onChange }: UseTabsOptions = {}): UseTabsReturn {
	const [activeTab, setActiveTabState] = useState<string>(defaultTab || '')

	const setActiveTab = useCallback(
		(tabId: string) => {
			setActiveTabState(tabId)
			onChange?.(tabId)
		},
		[onChange]
	)

	const isActive = useCallback(
		(tabId: string) => activeTab === tabId,
		[activeTab]
	)

	return {
		activeTab,
		setActiveTab,
		isActive,
	}
}
