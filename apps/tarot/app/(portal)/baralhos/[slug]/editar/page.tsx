'use client'

import { Icon } from '@iconify/react'
import { useForm } from '@tanstack/react-form'
import { MysticalLoading } from '@workspace/ui'
import { ImageUploader } from '@workspace/ui/components/organisms/image-uploader'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useState, useEffect } from 'react'
import { z } from 'zod'

import { trpc } from '@/lib/trpc'

type PageProps = {
	params: Promise<{ slug: string }>
}

const deckSchema = z.object({
	name: z.string().min(1, 'Nome é obrigatório').min(2, 'Nome deve ter pelo menos 2 caracteres'),
	description: z.string(),
	publisher: z.string(),
	year: z.string(),
	tradition: z.string(),
})

export default function EditarBaralhoPage({ params }: PageProps) {
	const { slug } = use(params)
	const router = useRouter()
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [uploadError, setUploadError] = useState<string | null>(null)

	const { data: deck, isLoading, error } = trpc.tarot.getDeckBySlug.useQuery(slug)

	const updateMutation = trpc.tarot.updateDeck.useMutation({
		onSuccess: (updatedDeck) => {
			router.push(`/baralhos/${updatedDeck.slug}`)
		},
	})

	const form = useForm({
		defaultValues: {
			name: '',
			description: '',
			publisher: '',
			year: '',
			tradition: '',
		},
		validators: {
			onChange: deckSchema,
		},
		onSubmit: async ({ value }) => {
			if (!deck) {return}

			const yearValue = value.year ? Number.parseInt(value.year, 10) : undefined

			await updateMutation.mutateAsync({
				id: deck.id,
				data: {
					name: value.name,
					description: value.description || undefined,
					publisher: value.publisher || undefined,
					year: yearValue,
					tradition: value.tradition || undefined,
					imageUrl: imageUrl || undefined,
				},
			})
		},
	})

	useEffect(() => {
		if (deck) {
			if (deck.imageUrl) {
				setImageUrl(deck.imageUrl)
			}
			form.reset({
				name: deck.name,
				description: deck.description || '',
				publisher: deck.publisher || '',
				year: deck.year ? deck.year.toString() : '',
				tradition: deck.tradition || '',
			})
		}
	}, [deck, form])

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

	if (error || !deck) {
		return (
			<div className="space-y-4">
				<Link
					href="/baralhos"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
				>
					<Icon icon="lucide:arrow-left" className="size-4 group-hover:-translate-x-1 transition-transform" />
					Voltar para baralhos
				</Link>
				<div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-6">
					<p className="text-sm font-medium text-destructive">
						Baralho não encontrado
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			<Link
				href={`/baralhos/${deck.slug}`}
				className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
			>
				<Icon icon="lucide:arrow-left" className="size-4 group-hover:-translate-x-1 transition-transform" />
				Voltar para baralho
			</Link>

			<div className="space-y-2">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
					Editar: {deck.name}
				</h1>
				<p className="text-base text-muted-foreground">
					Atualize as informações do baralho espiritual
				</p>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault()
					form.handleSubmit()
				}}
				className="grid gap-6 lg:grid-cols-[380px_1fr]"
			>
				<div className="lg:sticky lg:top-24 lg:self-start space-y-4">
					<div className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-indigo-500/10 p-5 backdrop-blur-sm shadow-lg shadow-purple-500/10">
						<div className="flex items-center gap-2 mb-4">
							<Icon icon="lucide:image" className="size-5 text-purple-600 dark:text-purple-400" />
							<h2 className="font-semibold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
								Imagem de Capa
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
								existingImageUrl={deck.imageUrl}
							/>
							{uploadError && (
								<p className="mt-2 text-sm text-destructive">{uploadError}</p>
							)}
						</div>
					</div>

					<div className="rounded-xl border-2 border-violet-500/30 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-indigo-500/10 p-5 backdrop-blur-sm shadow-lg shadow-violet-500/10">
						<div className="flex items-center gap-2 mb-4">
							<Icon icon="lucide:sparkles" className="size-5 text-violet-600 dark:text-violet-400" />
							<h2 className="font-semibold text-lg bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
								Resumo
							</h2>
						</div>

						<form.Subscribe
							selector={(state) => ({
								name: state.values.name,
								tradition: state.values.tradition,
								publisher: state.values.publisher,
								year: state.values.year,
							})}
						>
							{({ name, tradition, publisher, year }) => (
								<div className="space-y-3 text-sm">
									<div>
										<p className="text-muted-foreground mb-1">Nome do Baralho</p>
										<p className="font-semibold text-foreground">
											{name || 'Sem nome'}
										</p>
									</div>

									{tradition && (
										<div>
											<p className="text-muted-foreground mb-1">Tradição</p>
											<p className="font-semibold text-foreground">{tradition}</p>
										</div>
									)}

									{publisher && (
										<div>
											<p className="text-muted-foreground mb-1">Editora</p>
											<p className="font-semibold text-foreground">{publisher}</p>
										</div>
									)}

									{year && (
										<div>
											<p className="text-muted-foreground mb-1">Ano</p>
											<p className="font-semibold text-foreground">{year}</p>
										</div>
									)}
								</div>
							)}
						</form.Subscribe>
					</div>
				</div>

				<div className="space-y-6">
					<div className="rounded-xl border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-purple-500/10 p-6 backdrop-blur-sm shadow-lg shadow-indigo-500/10">
						<div className="flex items-center gap-2 mb-5">
							<Icon icon="lucide:book-open" className="size-5 text-indigo-600 dark:text-indigo-400" />
							<h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
								Informações do Baralho
							</h2>
						</div>

						<div className="space-y-4">
							<form.Field name="name">
								{(field) => (
									<div>
										<label htmlFor={field.name} className="block text-sm font-medium mb-2 text-foreground">
											Nome do Baralho *
										</label>
										<input
											type="text"
											id={field.name}
											value={field.state.value}
											onChange={(e) => { field.handleChange(e.target.value) }}
											onBlur={field.handleBlur}
											className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
											placeholder="Ex: Rider-Waite Smith"
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

							<form.Field name="tradition">
								{(field) => (
									<div>
										<label htmlFor={field.name} className="block text-sm font-medium mb-2 text-foreground">
											Tradição
										</label>
										<input
											type="text"
											id={field.name}
											value={field.state.value}
											onChange={(e) => { field.handleChange(e.target.value) }}
											onBlur={field.handleBlur}
											className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
											placeholder="Ex: Hermética, Qabalística, Cigana"
										/>
									</div>
								)}
							</form.Field>

							<div className="grid grid-cols-2 gap-4">
								<form.Field name="publisher">
									{(field) => (
										<div>
											<label htmlFor={field.name} className="block text-sm font-medium mb-2 text-foreground">
												<Icon icon="lucide:building" className="size-4 inline mr-1.5 text-indigo-500" />
												Editora
											</label>
											<input
												type="text"
												id={field.name}
												value={field.state.value}
												onChange={(e) => { field.handleChange(e.target.value) }}
												onBlur={field.handleBlur}
												className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
												placeholder="Ex: US Games Systems"
											/>
										</div>
									)}
								</form.Field>

								<form.Field name="year">
									{(field) => (
										<div>
											<label htmlFor={field.name} className="block text-sm font-medium mb-2 text-foreground">
												<Icon icon="lucide:calendar" className="size-4 inline mr-1.5 text-indigo-500" />
												Ano
											</label>
											<input
												type="number"
												id={field.name}
												value={field.state.value}
												onChange={(e) => { field.handleChange(e.target.value) }}
												onBlur={field.handleBlur}
												min="1000"
												max="2100"
												className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
												placeholder="Ex: 1909"
											/>
										</div>
									)}
								</form.Field>
							</div>
						</div>
					</div>

					<div className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 p-6 backdrop-blur-sm shadow-lg shadow-purple-500/10">
						<div className="flex items-center gap-2 mb-5">
							<Icon icon="lucide:book-open" className="size-5 text-purple-600 dark:text-purple-400" />
							<h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
								Descrição
							</h2>
						</div>

						<form.Field name="description">
							{(field) => (
								<div>
									<label htmlFor={field.name} className="block text-sm font-medium mb-2 text-foreground">
										Sobre o Baralho
									</label>
									<textarea
										id={field.name}
										value={field.state.value}
										onChange={(e) => { field.handleChange(e.target.value) }}
										onBlur={field.handleBlur}
										rows={6}
										className="w-full rounded-lg border-2 border-purple-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all placeholder:text-muted-foreground/50 resize-none"
										placeholder="Descreva o baralho, suas características, história e o que o torna especial..."
									/>
									<p className="mt-2 text-xs text-muted-foreground">
										Informações sobre origem, artista, simbologia e características únicas
									</p>
								</div>
							)}
						</form.Field>
					</div>

					{updateMutation.error && (
						<div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-5">
							<p className="text-sm font-medium text-destructive">
								Erro ao atualizar baralho: {updateMutation.error.message}
							</p>
						</div>
					)}

					<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
						{([canSubmit, isSubmitting]) => (
							<div className="flex gap-4 sticky bottom-4 bg-background/80 backdrop-blur-sm p-4 rounded-xl border-2 border-border/40 shadow-lg">
								<button
									type="submit"
									disabled={!canSubmit || isSubmitting}
									className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
								>
									<Icon icon="lucide:sparkles" className="size-4" />
									{isSubmitting ? 'Salvando Alterações...' : 'Salvar Alterações'}
								</button>
								<Link
									href={`/baralhos/${deck.slug}`}
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
