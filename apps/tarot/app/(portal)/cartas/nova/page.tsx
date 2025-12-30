'use client'

import { Icon } from '@iconify/react'
import { useForm } from '@tanstack/react-form'
import { type CardSuitValue } from '@workspace/core/tarot'
import { RichTextEditor } from '@workspace/ui'
import { DynamicTagInput } from '@workspace/ui/components/organisms/dynamic-tag-input'
import { ImageUploader } from '@workspace/ui/components/organisms/image-uploader'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

import { useTagAutocomplete } from '@/hooks/use-tag-autocomplete'
import { trpc } from '@/lib/trpc'

const cardSchema = z.object({
	name: z.string().min(1, 'Nome é obrigatório').min(2, 'Nome deve ter pelo menos 2 caracteres'),
	cardType: z.string(),
	suit: z.enum(['COPAS', 'PAUS', 'OUROS', 'ESPADAS']).nullable(),
	numerology: z.string().min(1, 'Numerologia é obrigatória'),
	astrology: z.string(),
	reflectionMessage: z.string(),
	deckId: z.string().nullable(),
	summary: z.string().min(10, 'Resumo deve ter pelo menos 10 caracteres'),
	description: z.string().min(50, 'Descrição deve ter pelo menos 50 caracteres'),
	generalReading: z.string(),
	loveReading: z.string(),
	careerReading: z.string(),
	spiritualReading: z.string(),
	invertedReading: z.string(),
	verticalMeanings: z.array(z.string()).min(1, 'Adicione pelo menos um significado vertical'),
	invertedMeanings: z.array(z.string()).min(1, 'Adicione pelo menos um significado invertido'),
})

export default function NovaCartaPage() {
	const router = useRouter()
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [uploadError, setUploadError] = useState<string | null>(null)

	const verticalAutocomplete = useTagAutocomplete('vertical')
	const invertedAutocomplete = useTagAutocomplete('inverted')

	const { data: decksData } = trpc.tarot.getDecks.useQuery()

	const createMutation = trpc.tarot.create.useMutation({
		onSuccess: (data) => {
			router.push(`/cartas/${data.slug}`)
		},
	})

	const form = useForm({
		defaultValues: {
			name: '',
			cardType: '',
			suit: null as CardSuitValue | null,
			numerology: '',
			astrology: '',
			reflectionMessage: '',
			deckId: null as string | null,
			summary: '',
			description: '',
			generalReading: '',
			loveReading: '',
			careerReading: '',
			spiritualReading: '',
			invertedReading: '',
			verticalMeanings: [] as string[],
			invertedMeanings: [] as string[],
		},
		validators: {
			onChange: cardSchema,
		},
		onSubmit: async ({ value }) => {
			const readingTypes = [
				{ type: 'general' as const, read: value.generalReading },
				{ type: 'love-relationship' as const, read: value.loveReading },
				{ type: 'career-money' as const, read: value.careerReading },
				{ type: 'personal-spiritual' as const, read: value.spiritualReading },
				{ type: 'inverted' as const, read: value.invertedReading },
			].filter((r) => r.read.length >= 10)

			await createMutation.mutateAsync({
				name: value.name,
				summary: value.summary,
				description: value.description,
				imageUrl: imageUrl,
				verticalMeaning: value.verticalMeanings,
				invertedMeaning: value.invertedMeanings,
				numerology: value.numerology,
				astrology: value.astrology || null,
				reflectionMessage: value.reflectionMessage || null,
				deckId: value.deckId || null,
				cardType: value.cardType || null,
				suit: value.suit || null,
				typesOfReading: readingTypes,
			})
		},
	})

	const handleUploadComplete = (url: string) => {
		setImageUrl(url)
		setUploadError(null)
	}

	const handleUploadError = (error: string) => {
		setUploadError(error)
		setImageUrl(null)
	}

	return (
		<div className="space-y-6">
			{/* Breadcrumb Místico */}
			<Link
				href="/cartas/arcanos"
				className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
			>
				<Icon icon="lucide:arrow-left" className="size-4 group-hover:-translate-x-1 transition-transform" />
				Voltar para cartas
			</Link>

			{/* Header Místico */}
			<div className="space-y-2">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
					Nova Carta de Tarot
				</h1>
				<p className="text-base text-muted-foreground">
					Crie uma nova carta para expandir o conhecimento místico
				</p>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault()
					form.handleSubmit()
				}}
				className="grid gap-6 lg:grid-cols-[380px_1fr]"
			>
				{/* Sidebar - Preview e Info Rápida */}
				<div className="lg:sticky lg:top-[calc(var(--header-height)+1rem)] lg:self-start space-y-4">
					{/* Preview da Imagem */}
					<div className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-indigo-500/10 p-5 backdrop-blur-sm shadow-lg shadow-purple-500/10">
						<div className="flex items-center gap-2 mb-4">
							<Icon icon="lucide:image" className="size-5 text-purple-600 dark:text-purple-400" />
							<h2 className="font-semibold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
								Imagem da Carta
							</h2>
						</div>

						{imageUrl
							? (
								<div className="group relative aspect-[3/4] w-full rounded-lg overflow-hidden border-2 border-border/40 shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
									<div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
									<form.Subscribe selector={(state) => state.values.name}>
										{(name) => (
											<Image
												src={imageUrl}
												alt={name || 'Preview'}
												fill
												className="object-cover"
												sizes="380px"
											/>
										)}
									</form.Subscribe>
								</div>
							)
							: (
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

						<form.Subscribe
							selector={(state) => ({
								name: state.values.name,
								cardType: state.values.cardType,
								suit: state.values.suit,
								numerology: state.values.numerology,
								astrology: state.values.astrology,
								reflectionMessage: state.values.reflectionMessage,
							})}
						>
							{({ name, cardType, suit, numerology, astrology, reflectionMessage }) => (
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

									{reflectionMessage && (
										<div className="pt-3 border-t border-amber-500/20">
											<p className="text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5 text-sm font-medium">
												<Icon icon="ph:owl-duotone" className="size-4" />
												Reflexão
											</p>
											<p className="text-sm text-foreground/80 italic">{reflectionMessage}</p>
										</div>
									)}
								</div>
							)}
						</form.Subscribe>
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
							<form.Field name="name">
								{(field) => (
									<div>
										<label htmlFor={field.name} className="block text-sm font-medium mb-2 text-foreground">
											Nome da Carta *
										</label>
										<input
											type="text"
											id={field.name}
											value={field.state.value}
											onChange={(e) => { field.handleChange(e.target.value) }}
											onBlur={field.handleBlur}
											className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
											placeholder="Ex: O Mago"
										/>
										{field.state.meta.errors.length > 0 && (
											<p className="mt-1 text-sm text-destructive">
												{typeof field.state.meta.errors[0] === 'string'
													? field.state.meta.errors[0]
													: field.state.meta.errors[0]?.message}
											</p>
										)}
									</div>
								)}
							</form.Field>

							<div className="grid grid-cols-2 gap-4">
								<form.Field name="cardType">
									{(field) => (
										<div>
											<label htmlFor={field.name} className="block text-sm font-medium mb-2 text-foreground">
												Tipo de Carta
											</label>
											<input
												type="text"
												id={field.name}
												value={field.state.value}
												onChange={(e) => { field.handleChange(e.target.value) }}
												onBlur={field.handleBlur}
												className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
												placeholder="Ex: Arcano Maior"
											/>
										</div>
									)}
								</form.Field>

								<form.Field name="suit">
									{(field) => (
										<div>
											<label htmlFor={field.name} className="block text-sm font-medium mb-2 text-foreground">
												Naipe
											</label>
											<select
												id={field.name}
												value={field.state.value || ''}
												onChange={(e) => { field.handleChange((e.target.value as CardSuitValue) || null) }}
												onBlur={field.handleBlur}
												className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all"
											>
												<option value="">Nenhum</option>
												<option value="COPAS">♥ Copas</option>
												<option value="PAUS">♣ Paus</option>
												<option value="OUROS">♦ Ouros</option>
												<option value="ESPADAS">♠ Espadas</option>
											</select>
										</div>
									)}
								</form.Field>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<form.Field name="numerology">
									{(field) => (
										<div>
											<label htmlFor={field.name} className="block text-sm font-medium mb-2 text-foreground">
												Numerologia *
											</label>
											<input
												type="text"
												id={field.name}
												value={field.state.value}
												onChange={(e) => { field.handleChange(e.target.value) }}
												onBlur={field.handleBlur}
												className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
												placeholder="Ex: 1"
											/>
											{field.state.meta.errors.length > 0 && (
												<p className="mt-1 text-sm text-destructive">
													{typeof field.state.meta.errors[0] === 'string'
														? field.state.meta.errors[0]
														: field.state.meta.errors[0]?.message}
												</p>
											)}
										</div>
									)}
								</form.Field>

								<form.Field name="astrology">
									{(field) => (
										<div>
											<label htmlFor={field.name} className="block text-sm font-medium mb-2 text-foreground">
												Astrologia
											</label>
											<input
												type="text"
												id={field.name}
												value={field.state.value}
												onChange={(e) => { field.handleChange(e.target.value) }}
												onBlur={field.handleBlur}
												className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
												placeholder="Ex: Mercúrio"
											/>
										</div>
									)}
								</form.Field>
							</div>

							<form.Field name="reflectionMessage">
								{(field) => (
									<div>
										<label htmlFor={field.name} className="block text-sm font-medium mb-2 text-foreground flex items-center gap-2">
											<Icon icon="ph:owl-duotone" className="size-5 text-amber-600 dark:text-amber-400" />
											Mensagem para Refletir
										</label>
										<textarea
											id={field.name}
											value={field.state.value}
											onChange={(e) => { field.handleChange(e.target.value) }}
											onBlur={field.handleBlur}
											rows={3}
											className="w-full rounded-lg border-2 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/60 transition-all placeholder:text-muted-foreground/50"
											placeholder="Ex: Que energia você está permitindo entrar em sua vida agora?"
										/>
										<p className="text-xs text-muted-foreground mt-1.5 flex items-start gap-1.5">
											<Icon icon="lucide:info" className="size-3.5 mt-0.5 shrink-0" />
											<span>Pergunta introspectiva que convida o consulente à reflexão profunda sobre a mensagem da carta.</span>
										</p>
									</div>
								)}
							</form.Field>

							<form.Field name="deckId">
								{(field) => (
									<div>
										<label htmlFor={field.name} className="block text-sm font-medium mb-2 text-foreground">
											Baralho Associado
										</label>
										<select
											id={field.name}
											value={field.state.value || ''}
											onChange={(e) => { field.handleChange(e.target.value || null) }}
											onBlur={field.handleBlur}
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
								)}
							</form.Field>
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
							<form.Field name="summary">
								{(field) => (
									<RichTextEditor
										label="Resumo *"
										value={field.state.value}
										onChange={field.handleChange}
										placeholder="Resumo curto da carta..."
										description="Breve resumo sobre a carta (mínimo 10 caracteres)"
									/>
								)}
							</form.Field>

							<form.Field name="description">
								{(field) => (
									<RichTextEditor
										label="Descrição Completa *"
										value={field.state.value}
										onChange={field.handleChange}
										placeholder="Descrição detalhada da carta..."
										description="Descrição completa sobre a carta e seus significados (mínimo 50 caracteres)"
									/>
								)}
							</form.Field>
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
							<form.Field name="verticalMeanings">
								{(field) => (
									<DynamicTagInput
										value={field.state.value}
										onChange={field.handleChange}
										label=""
										variant="success"
										placeholder="Digite um significado e pressione Enter"
										helperText="Sugestões aparecerão enquanto você digita"
										required
										suggestions={verticalAutocomplete.suggestions}
										isLoadingSuggestions={verticalAutocomplete.isLoadingSuggestions}
										onQueryChange={verticalAutocomplete.onQueryChange}
									/>
								)}
							</form.Field>
						</div>

						{/* Significados Invertidos */}
						<div className="rounded-xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-yellow-500/10 p-6 backdrop-blur-sm shadow-lg shadow-amber-500/10">
							<div className="flex items-center gap-2 mb-4">
								<Icon icon="lucide:alert-circle" className="size-5 text-amber-600 dark:text-amber-400" />
								<h3 className="font-semibold text-lg text-amber-700 dark:text-amber-400">
									Significados Invertidos
								</h3>
							</div>
							<form.Field name="invertedMeanings">
								{(field) => (
									<DynamicTagInput
										value={field.state.value}
										onChange={field.handleChange}
										label=""
										variant="warning"
										placeholder="Digite um significado e pressione Enter"
										helperText="Sugestões aparecerão enquanto você digita"
										required
										suggestions={invertedAutocomplete.suggestions}
										isLoadingSuggestions={invertedAutocomplete.isLoadingSuggestions}
										onQueryChange={invertedAutocomplete.onQueryChange}
									/>
								)}
							</form.Field>
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
							<form.Field name="generalReading">
								{(field) => (
									<RichTextEditor
										label="Leitura Geral"
										value={field.state.value}
										onChange={field.handleChange}
										placeholder="Interpretação geral da carta..."
										description="Significado geral da carta em qualquer contexto"
									/>
								)}
							</form.Field>

							<form.Field name="loveReading">
								{(field) => (
									<RichTextEditor
										label="Amor e Relacionamentos"
										value={field.state.value}
										onChange={field.handleChange}
										placeholder="Interpretação para amor e relacionamentos..."
										description="Como a carta se manifesta em questões amorosas"
									/>
								)}
							</form.Field>

							<form.Field name="careerReading">
								{(field) => (
									<RichTextEditor
										label="Carreira e Dinheiro"
										value={field.state.value}
										onChange={field.handleChange}
										placeholder="Interpretação para carreira e finanças..."
										description="Significado para vida profissional e financeira"
									/>
								)}
							</form.Field>

							<form.Field name="spiritualReading">
								{(field) => (
									<RichTextEditor
										label="Pessoal e Espiritual"
										value={field.state.value}
										onChange={field.handleChange}
										placeholder="Interpretação para crescimento pessoal..."
										description="Desenvolvimento interior e espiritual"
									/>
								)}
							</form.Field>

							<form.Field name="invertedReading">
								{(field) => (
									<RichTextEditor
										label="Leitura Invertida"
										value={field.state.value}
										onChange={field.handleChange}
										placeholder="Interpretação quando a carta aparece invertida..."
										description="Significado quando surge de cabeça para baixo"
									/>
								)}
							</form.Field>
						</div>
					</div>

					{/* Error State */}
					{createMutation.error && (
						<div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-5">
							<p className="text-sm font-medium text-destructive">
								Erro ao criar carta: {createMutation.error.message}
							</p>
						</div>
					)}

					{/* Actions */}
					<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
						{([canSubmit, isSubmitting]) => (
							<div className="flex gap-4 sticky bottom-4 bg-background/80 backdrop-blur-sm p-4 rounded-xl border-2 border-border/40 shadow-lg">
								<button
									type="submit"
									disabled={!canSubmit || isSubmitting}
									className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
								>
									<Icon icon="lucide:sparkles" className="size-4" />
									{isSubmitting ? 'Criando Carta...' : 'Criar Carta'}
								</button>
								<Link
									href="/cartas/arcanos"
									className="inline-flex items-center justify-center rounded-lg border-2 border-border/40 bg-background/50 px-6 py-3 text-sm font-medium hover:bg-accent transition-all"
								>
									Cancelar
								</Link>
							</div>
						)}
					</form.Subscribe>
				</div>
			</form>
		</div>
	)
}
