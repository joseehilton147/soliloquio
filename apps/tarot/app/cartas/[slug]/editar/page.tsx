'use client'

import { DynamicTagInput } from '@workspace/ui/components/organisms/dynamic-tag-input'
import { ImageUploader } from '@workspace/ui/components/organisms/image-uploader'
import { RichTextEditor, MysticalLoading } from '@workspace/ui'
import { CardSuitEnum, type CardSuitValue } from '@workspace/core/tarot'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useState, useEffect } from 'react'

import { trpc } from '../../../../src/lib/trpc'
import { useTagAutocomplete } from '../../../../src/hooks/use-tag-autocomplete'

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default function EditarCartaPage({ params }: PageProps) {
	const { slug } = use(params)
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [uploadError, setUploadError] = useState<string | null>(null)
	const [verticalMeanings, setVerticalMeanings] = useState<string[]>([])
	const [invertedMeanings, setInvertedMeanings] = useState<string[]>([])

	// Estados para campos WYSIWYG
	const [name, setName] = useState('')
	const [summary, setSummary] = useState('')
	const [description, setDescription] = useState('')
	const [generalReading, setGeneralReading] = useState('')
	const [loveReading, setLoveReading] = useState('')
	const [careerReading, setCareerReading] = useState('')
	const [spiritualReading, setSpiritualReading] = useState('')
	const [invertedReading, setInvertedReading] = useState('')
	const [numerology, setNumerology] = useState('')
	const [astrology, setAstrology] = useState('')

	// Estados para novos campos
	const [deckId, setDeckId] = useState<string | null>(null)
	const [cardType, setCardType] = useState('')
	const [suit, setSuit] = useState<CardSuitValue | null>(null)

	// Autocomplete para tags verticais e invertidas
	const verticalAutocomplete = useTagAutocomplete('vertical')
	const invertedAutocomplete = useTagAutocomplete('inverted')

	// Buscar decks disponíveis
	const { data: decksData } = trpc.tarot.getDecks.useQuery()

	const { data: card, isLoading, error } = trpc.tarot.getBySlug.useQuery(slug)

	const updateMutation = trpc.tarot.update.useMutation({
		onSuccess: (updatedCard) => {
			router.push(`/cartas/${updatedCard.slug}`)
		},
	})

	// Inicializar estados quando a carta carregar (dados assíncronos)
	useEffect(() => {
		if (card) {
			if (card.imageUrl) {
				setImageUrl(card.imageUrl)
			}

			setName(card.name)
			setNumerology(card.numerology)
			setAstrology(card.astrology || '')
			setVerticalMeanings(card.verticalMeaning as string[])
			setInvertedMeanings(card.invertedMeaning as string[])
			setSummary(card.summary || '')
			setDescription(card.description || '')

			// Inicializar tipos de leitura
			const generalType = card.typesOfReading.find((r) => r.type === 'general')
			const loveType = card.typesOfReading.find((r) => r.type === 'love-relationship')
			const careerType = card.typesOfReading.find((r) => r.type === 'career-money')
			const spiritualType = card.typesOfReading.find((r) => r.type === 'personal-spiritual')
			const invertedType = card.typesOfReading.find((r) => r.type === 'inverted')

			setGeneralReading(generalType?.read || '')
			setLoveReading(loveType?.read || '')
			setCareerReading(careerType?.read || '')
			setSpiritualReading(spiritualType?.read || '')
			setInvertedReading(invertedType?.read || '')

			// Inicializar novos campos
			setDeckId(card.deckId || null)
			setCardType(card.cardType || '')
			setSuit(card.suit || null)
		}
	}, [card])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		const readingTypes = [
			{ type: 'general' as const, read: generalReading },
			{ type: 'love-relationship' as const, read: loveReading },
			{ type: 'career-money' as const, read: careerReading },
			{ type: 'personal-spiritual' as const, read: spiritualReading },
			{ type: 'inverted' as const, read: invertedReading },
		].filter((r) => r.read.length >= 10)

		try {
			await updateMutation.mutateAsync({
				id: card!.id,
				data: {
					name,
					summary,
					description,
					imageUrl: imageUrl,
					verticalMeaning: verticalMeanings,
					invertedMeaning: invertedMeanings,
					numerology,
					astrology: astrology || null,
					deckId: deckId || null,
					cardType: cardType || null,
					suit: suit || null,
					typesOfReading: readingTypes,
				},
			})
		} catch (error) {
			console.error('Erro ao atualizar carta:', error)
			setIsSubmitting(false)
		}
	}

	const handleUploadComplete = (url: string) => {
		setImageUrl(url)
		setUploadError(null)
	}

	const handleUploadError = (error: string) => {
		setUploadError(error)
	}

	if (isLoading) {
		return <MysticalLoading variant="fullscreen" size="xl" />
	}

	if (error || !card) {
		return (
			<div className="space-y-4">
				<Link
					href="/cartas/arcanos"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
				>
					<Icon icon="lucide:arrow-left" className="size-4 group-hover:-translate-x-1 transition-transform" />
					Voltar para cartas
				</Link>
				<div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-6">
					<p className="text-sm font-medium text-destructive">
						Carta não encontrada
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{/* Breadcrumb Místico */}
			<Link
				href={`/cartas/${card.slug}`}
				className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
			>
				<Icon icon="lucide:arrow-left" className="size-4 group-hover:-translate-x-1 transition-transform" />
				Voltar para carta
			</Link>

			{/* Header Místico */}
			<div className="space-y-2">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
					Editar: {card.name}
				</h1>
				<p className="text-base text-muted-foreground">
					Atualize as informações espirituais da carta de tarot
				</p>
			</div>

			<form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[380px_1fr]">
				{/* Sidebar - Preview e Info Rápida */}
				<div className="lg:sticky lg:top-24 lg:self-start space-y-4">
					{/* Preview da Imagem */}
					<div className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-indigo-500/10 p-5 backdrop-blur-sm shadow-lg shadow-purple-500/10">
						<div className="flex items-center gap-2 mb-4">
							<Icon icon="lucide:image" className="size-5 text-purple-600 dark:text-purple-400" />
							<h2 className="font-semibold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
								Imagem da Carta
							</h2>
						</div>

						{imageUrl ? (
							<div className="group relative aspect-[3/4] w-full rounded-lg overflow-hidden border-2 border-border/40 shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
								<div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
								<Image
									src={imageUrl}
									alt={name || 'Preview'}
									fill
									className="object-cover"
									sizes="380px"
								/>
							</div>
						) : (
							<div className="aspect-[3/4] w-full rounded-lg border-2 border-dashed border-purple-500/30 bg-purple-500/5 flex items-center justify-center">
								<div className="text-center space-y-2">
									<Icon icon="lucide:image" className="size-12 text-purple-500/40 mx-auto" />
									<p className="text-sm text-muted-foreground">
										Aguardando upload
									</p>
								</div>
							</div>
						)}

						<div className="mt-4">
							<ImageUploader
								onUploadComplete={handleUploadComplete}
								onUploadError={handleUploadError}
								existingImageUrl={card.imageUrl}
							/>
							{uploadError && (
								<p className="mt-2 text-sm text-destructive">{uploadError}</p>
							)}
						</div>
					</div>

					{/* Preview Info Rápida */}
					<div className="rounded-xl border-2 border-violet-500/30 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-indigo-500/10 p-5 backdrop-blur-sm shadow-lg shadow-violet-500/10">
						<div className="flex items-center gap-2 mb-4">
							<Icon icon="lucide:sparkles" className="size-5 text-violet-600 dark:text-violet-400" />
							<h2 className="font-semibold text-lg bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
								Informações Rápidas
							</h2>
						</div>

						<div className="space-y-3 text-sm">
							<div>
								<p className="text-muted-foreground mb-1">Nome da Carta</p>
								<p className="font-semibold text-foreground">
									{name || 'Sem nome'}
								</p>
							</div>

							{cardType && (
								<div>
									<p className="text-muted-foreground mb-1">Tipo</p>
									<p className="font-semibold text-foreground">{cardType}</p>
								</div>
							)}

							{suit && (
								<div>
									<p className="text-muted-foreground mb-1">Naipe</p>
									<p className="font-semibold text-foreground">
										{suit === 'COPAS' && '♥ Copas'}
										{suit === 'PAUS' && '♣ Paus'}
										{suit === 'OUROS' && '♦ Ouros'}
										{suit === 'ESPADAS' && '♠ Espadas'}
									</p>
								</div>
							)}

							{numerology && (
								<div>
									<p className="text-muted-foreground mb-1">Numerologia</p>
									<p className="font-semibold text-foreground">{numerology}</p>
								</div>
							)}

							{astrology && (
								<div>
									<p className="text-muted-foreground mb-1">Astrologia</p>
									<p className="font-semibold text-foreground">{astrology}</p>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Conteúdo Principal - Formulário */}
				<div className="space-y-6">
					{/* Informações Básicas */}
					<div className="rounded-xl border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-purple-500/10 p-6 backdrop-blur-sm shadow-lg shadow-indigo-500/10">
						<div className="flex items-center gap-2 mb-5">
							<Icon icon="lucide:layers" className="size-5 text-indigo-600 dark:text-indigo-400" />
							<h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
								Informações Básicas
							</h2>
						</div>

						<div className="space-y-4">
							<div>
								<label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
									Nome da Carta *
								</label>
								<input
									type="text"
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
									placeholder="Ex: O Mago"
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label htmlFor="cardType" className="block text-sm font-medium mb-2 text-foreground">
										Tipo de Carta
									</label>
									<input
										type="text"
										id="cardType"
										value={cardType}
										onChange={(e) => setCardType(e.target.value)}
										className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
										placeholder="Ex: Arcano Maior"
									/>
								</div>

								<div>
									<label htmlFor="suit" className="block text-sm font-medium mb-2 text-foreground">
										Naipe
									</label>
									<select
										id="suit"
										value={suit || ''}
										onChange={(e) => setSuit((e.target.value as CardSuitValue) || null)}
										className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all"
									>
										<option value="">Nenhum</option>
										<option value="COPAS">♥ Copas</option>
										<option value="PAUS">♣ Paus</option>
										<option value="OUROS">♦ Ouros</option>
										<option value="ESPADAS">♠ Espadas</option>
									</select>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label htmlFor="numerology" className="block text-sm font-medium mb-2 text-foreground">
										Numerologia *
									</label>
									<input
										type="text"
										id="numerology"
										value={numerology}
										onChange={(e) => setNumerology(e.target.value)}
										required
										className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
										placeholder="Ex: 1"
									/>
								</div>

								<div>
									<label htmlFor="astrology" className="block text-sm font-medium mb-2 text-foreground">
										Astrologia
									</label>
									<input
										type="text"
										id="astrology"
										value={astrology}
										onChange={(e) => setAstrology(e.target.value)}
										className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
										placeholder="Ex: Mercúrio"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="deckId" className="block text-sm font-medium mb-2 text-foreground">
									Baralho Associado
								</label>
								<select
									id="deckId"
									value={deckId || ''}
									onChange={(e) => setDeckId(e.target.value || null)}
									className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all"
								>
									<option value="">Selecione um baralho</option>
									{decksData?.map((deck) => (
										<option key={deck.id} value={deck.id}>
											{deck.name}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					{/* Descrições */}
					<div className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 p-6 backdrop-blur-sm shadow-lg shadow-purple-500/10">
						<div className="flex items-center gap-2 mb-5">
							<Icon icon="lucide:book-open" className="size-5 text-purple-600 dark:text-purple-400" />
							<h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
								Descrições e Conteúdo
							</h2>
						</div>

						<div className="space-y-4">
							<RichTextEditor
								label="Resumo *"
								value={summary}
								onChange={setSummary}
								placeholder="Resumo curto da carta..."
								description="Breve resumo sobre a carta (mínimo 10 caracteres)"
							/>

							<RichTextEditor
								label="Descrição Completa *"
								value={description}
								onChange={setDescription}
								placeholder="Descrição detalhada da carta..."
								description="Descrição completa sobre a carta e seus significados (mínimo 50 caracteres)"
							/>
						</div>
					</div>

					{/* Significados */}
					<div className="grid gap-6 md:grid-cols-2">
						{/* Significados Verticais */}
						<div className="rounded-xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 p-6 backdrop-blur-sm shadow-lg shadow-green-500/10">
							<div className="flex items-center gap-2 mb-4">
								<Icon icon="lucide:check-circle-2" className="size-5 text-green-600 dark:text-green-400" />
								<h3 className="font-semibold text-lg text-green-700 dark:text-green-400">
									Significados Verticais
								</h3>
							</div>
							<DynamicTagInput
								value={verticalMeanings}
								onChange={setVerticalMeanings}
								label=""
								variant="success"
								placeholder="Digite um significado e pressione Enter"
								helperText="Sugestões aparecerão enquanto você digita"
								required
								suggestions={verticalAutocomplete.suggestions}
								isLoadingSuggestions={verticalAutocomplete.isLoadingSuggestions}
								onQueryChange={verticalAutocomplete.onQueryChange}
							/>
						</div>

						{/* Significados Invertidos */}
						<div className="rounded-xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-yellow-500/10 p-6 backdrop-blur-sm shadow-lg shadow-amber-500/10">
							<div className="flex items-center gap-2 mb-4">
								<Icon icon="lucide:alert-circle" className="size-5 text-amber-600 dark:text-amber-400" />
								<h3 className="font-semibold text-lg text-amber-700 dark:text-amber-400">
									Significados Invertidos
								</h3>
							</div>
							<DynamicTagInput
								value={invertedMeanings}
								onChange={setInvertedMeanings}
								label=""
								variant="warning"
								placeholder="Digite um significado e pressione Enter"
								helperText="Sugestões aparecerão enquanto você digita"
								required
								suggestions={invertedAutocomplete.suggestions}
								isLoadingSuggestions={invertedAutocomplete.isLoadingSuggestions}
								onQueryChange={invertedAutocomplete.onQueryChange}
							/>
						</div>
					</div>

					{/* Tipos de Leitura */}
					<div className="rounded-xl border-2 border-violet-500/30 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 p-6 backdrop-blur-sm shadow-lg shadow-violet-500/10">
						<div className="flex items-center gap-2 mb-5">
							<Icon icon="lucide:star" className="size-5 text-violet-600 dark:text-violet-400" />
							<h2 className="text-xl font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
								Tipos de Leitura
							</h2>
						</div>
						<p className="text-sm text-muted-foreground mb-5">
							Pelo menos um tipo é obrigatório (mínimo 10 caracteres)
						</p>

						<div className="space-y-4">
							<RichTextEditor
								label="Leitura Geral"
								value={generalReading}
								onChange={setGeneralReading}
								placeholder="Interpretação geral da carta..."
								description="Significado geral da carta em qualquer contexto"
							/>

							<RichTextEditor
								label="Amor e Relacionamentos"
								value={loveReading}
								onChange={setLoveReading}
								placeholder="Interpretação para amor e relacionamentos..."
								description="Como a carta se manifesta em questões amorosas"
							/>

							<RichTextEditor
								label="Carreira e Dinheiro"
								value={careerReading}
								onChange={setCareerReading}
								placeholder="Interpretação para carreira e finanças..."
								description="Significado para vida profissional e financeira"
							/>

							<RichTextEditor
								label="Pessoal e Espiritual"
								value={spiritualReading}
								onChange={setSpiritualReading}
								placeholder="Interpretação para crescimento pessoal..."
								description="Desenvolvimento interior e espiritual"
							/>

							<RichTextEditor
								label="Leitura Invertida"
								value={invertedReading}
								onChange={setInvertedReading}
								placeholder="Interpretação quando a carta aparece invertida..."
								description="Significado quando surge de cabeça para baixo"
							/>
						</div>
					</div>

					{/* Error State */}
					{updateMutation.error && (
						<div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-5">
							<p className="text-sm font-medium text-destructive">
								Erro ao atualizar carta: {updateMutation.error.message}
							</p>
						</div>
					)}

					{/* Actions */}
					<div className="flex gap-4 sticky bottom-4 bg-background/80 backdrop-blur-sm p-4 rounded-xl border-2 border-border/40 shadow-lg">
						<button
							type="submit"
							disabled={isSubmitting}
							className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
						>
							<Icon icon="lucide:sparkles" className="size-4" />
							{isSubmitting ? 'Salvando Alterações...' : 'Salvar Alterações'}
						</button>
						<Link
							href={`/cartas/${card.slug}`}
							className="inline-flex items-center justify-center rounded-lg border-2 border-border/40 bg-background/50 px-6 py-3 text-sm font-medium hover:bg-accent transition-all"
						>
							Cancelar
						</Link>
					</div>
				</div>
			</form>
		</div>
	)
}
