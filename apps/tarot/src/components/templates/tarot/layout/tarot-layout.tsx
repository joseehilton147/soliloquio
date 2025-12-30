'use client'

import { MysticalLayout } from '@/shared/components'

type TarotLayoutProps = {
	children: React.ReactNode
}

export function TarotLayout({ children }: TarotLayoutProps) {
	return <MysticalLayout>{children}</MysticalLayout>
}
