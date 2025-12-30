/**
 * Página Individual de Tiragem (Server Component)
 *
 * Página dinâmica que renderiza qualquer tiragem baseado no slug.
 * Carrega dados no servidor e passa para client component.
 */

import { notFound } from 'next/navigation'

import { TiragemClient as TiragemPageClient } from './components'

import { getSpreadBySlug } from '@/data/spreads'

type TiragemPageProps = {
	params: Promise<{
		slug: string
	}>
}

export default async function TiragemPage(props: TiragemPageProps) {
	const params = await props.params
	const spread = getSpreadBySlug(params.slug)

	// Se tiragem não existir, retorna 404
	if (!spread) {
		notFound()
	}

	return <TiragemPageClient spread={spread} />
}
