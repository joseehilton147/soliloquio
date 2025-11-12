'use client'

import type { ReadingType } from '@workspace/core/tarot'
import { MysticalLoading, MysticalBreadcrumb, CardBadge, type BreadcrumbItem } from '@workspace/ui'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'

import { trpc } from '../../../src/lib/trpc'
import { ReflectionMessage } from './reflection-message'

interface PageProps {
	params: Promise<{ slug: string }>;
}


export default function CartaDetailPage({ params }: PageProps) {
	const { slug } = use(params)
	const { data: card, isLoading, error } = trpc.tarot.getBySlug.useQuery(slug)

	if (isLoading) {
		return <MysticalLoading variant="fullscreen" size="xl" />
	}

	if (error || !card) {
		const breadcrumbItems: BreadcrumbItem[] = [
			{ label: 'Início', href: '/' },
			{ label: 'Cartas', href: '/cartas' },
			{ label: 'Não encontrada' },
		]

		return (
			<div className="space-y-4">
				<MysticalBreadcrumb items={breadcrumbItems} showSparkles />
				<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
					<p className="text-sm font-medium text-destructive">
						Carta não encontrada
					</p>
				</div>
			</div>
		)
	}

	const readingTypeLabels: Record<string, string> = {
		'general': 'Leitura Geral',
		'love-relationship': 'Amor e Relacionamentos',
		'career-money': 'Carreira e Dinheiro',
		'personal-spiritual': 'Pessoal e Espiritual',
		'inverted': 'Invertida'
	}

	const breadcrumbItems: BreadcrumbItem[] = [
		{ label: 'Início', href: '/' },
		{ label: 'Cartas', href: '/cartas' },
		{ label: card.name },
	]

	return (
		<div className="space-y-8">
			{/* Breadcrumb Místico */}
			<MysticalBreadcrumb items={breadcrumbItems} showSparkles />

			{/* Layout Principal */}
			<div className="grid gap-8 lg:grid-cols-[380px_1fr]">
				{/* Sidebar - Imagem e Info Rápida */}
				<div className="lg:sticky lg:top-[calc(var(--header-height)+1rem)] lg:self-start space-y-6">
					{/* Card Image com efeito místico */}
					{card.imageUrl && (
						<div className="group relative aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0 rounded-lg overflow-hidden border-2 border-border/40 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
							{/* Mystical glow effect */}
							<div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
							<Image
								src={card.imageUrl}
								alt={card.name}
								fill
								className="object-cover"
								sizes="(max-width: 1024px) 100vw, 380px"
								priority
							/>

							{/* Card Type Badge - Canto Superior Direito */}
							{card.cardType && (
								<CardBadge
									icon="lucide:sparkles"
									label={card.cardType}
									position="top-right"
									className="z-20"
								/>
							)}
						</div>
					)}

					{/* Informações Principais */}
					<div className="rounded-lg border border-border/40 bg-gradient-to-br from-background to-muted/20 p-6 space-y-4">
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
								{card.name}
							</h1>
							<div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
								<p className="flex items-center gap-2">
									<Icon icon="lucide:sparkles" className="size-4 text-purple-500" />
									Numerologia: <span className="font-medium text-foreground">{card.numerology}</span>
								</p>
								{card.astrology && (
									<p className="flex items-center gap-2">
										<Icon icon="lucide:sparkles" className="size-4 text-indigo-500" />
										Astrologia: <span className="font-medium text-foreground">{card.astrology}</span>
									</p>
								)}
								{card.deck && (
									<p className="flex items-center gap-2">
										<Icon icon="lucide:sparkles" className="size-4 text-purple-500" />
										Baralho: <span className="font-medium text-foreground">{card.deck.name}</span>
									</p>
								)}
							</div>
						</div>

						<Link
							href={`/cartas/${card.slug}/editar`}
							className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
						>
							<Icon icon="lucide:pencil" className="size-4" />
							Editar Carta
						</Link>
					</div>
				</div>

				{/* Conteúdo Principal */}
				<div className="space-y-6">
					{/* Resumo */}
					<div className="rounded-lg border border-border/40 bg-gradient-to-br from-background to-muted/20 p-6">
						<h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
							Resumo
						</h2>
						<div
							className="mt-3 prose prose-sm dark:prose-invert max-w-none prose-p:text-foreground prose-p:leading-relaxed"
							dangerouslySetInnerHTML={{ __html: card.summary }}
						/>
					</div>

					{/* Descrição */}
					<div className="rounded-lg border border-border/40 bg-gradient-to-br from-background to-muted/20 p-6">
						<h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
							Descrição Detalhada
						</h2>
						<div
							className="mt-3 prose prose-sm dark:prose-invert max-w-none prose-p:text-foreground prose-p:leading-relaxed"
							dangerouslySetInnerHTML={{ __html: card.description }}
						/>
					</div>

					{/* Significados - Grid */}
					<div className="grid gap-6 md:grid-cols-2">
						{/* Vertical */}
						<div className="rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/5 to-emerald-500/5 p-6">
							<h2 className="flex items-center gap-2 text-lg font-semibold text-green-600 dark:text-green-400">
								<Icon icon="lucide:check-circle-2" className="size-5" />
								Significado Vertical
							</h2>
							<ul className="mt-4 space-y-2">
								{(card.verticalMeaning as string[]).map((meaning, i) => (
									<li key={i} className="flex items-start gap-2">
										<span className="mt-0.5 size-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex-shrink-0" />
										<span className="text-sm text-foreground">{meaning}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Invertido */}
						<div className="rounded-lg border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5 p-6">
							<h2 className="flex items-center gap-2 text-lg font-semibold text-amber-600 dark:text-amber-400">
								<Icon icon="lucide:alert-circle" className="size-5" />
								Significado Invertido
							</h2>
							<ul className="mt-4 space-y-2">
								{(card.invertedMeaning as string[]).map((meaning, i) => (
									<li key={i} className="flex items-start gap-2">
										<span className="mt-0.5 size-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex-shrink-0" />
										<span className="text-sm text-foreground">{meaning}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Tipos de Leitura */}
					<div className="space-y-4">
						<h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
							Tipos de Leitura
						</h2>
						{card.typesOfReading.length > 0 ? (
							<div className="grid gap-4">
								{card.typesOfReading.map((reading: any) => (
									<div
										key={reading.id}
										className="rounded-lg border border-border/40 bg-gradient-to-br from-background to-muted/20 p-6 hover:shadow-lg hover:border-purple-500/20 transition-all"
									>
										<h3 className="font-semibold text-lg flex items-center gap-2">
											<span className="size-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600" />
											{readingTypeLabels[reading.type] || reading.type}
										</h3>
										<div
											className="mt-3 prose prose-sm dark:prose-invert max-w-none prose-p:text-foreground prose-p:leading-relaxed"
											dangerouslySetInnerHTML={{ __html: reading.read }}
										/>
									</div>
								))}
							</div>
						) : (
							<div className="rounded-lg border border-border/40 bg-muted/20 p-6 text-center">
								<p className="text-sm text-muted-foreground">
									Nenhum tipo de leitura cadastrado para esta carta
								</p>
							</div>
						)}
					</div>

					{/* Mensagem para Refletir */}
					{card.reflectionMessage && (
						<div className="mt-8">
							<ReflectionMessage message={card.reflectionMessage} />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
