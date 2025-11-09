'use client'

import { ImageUploader } from '@workspace/ui/components/organisms/image-uploader'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useState, useEffect } from 'react'

import { trpc } from '../../../../src/lib/trpc'

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default function EditarBaralhoPage({ params }: PageProps) {
	const { slug } = use(params)
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [uploadError, setUploadError] = useState<string | null>(null)

	const { data: deck, isLoading, error } = trpc.tarot.getDeckBySlug.useQuery(slug)

	const updateMutation = trpc.tarot.updateDeck.useMutation({
		onSuccess: (updatedDeck) => {
			router.push(`/baralhos/${updatedDeck.slug}`)
		},
	})

	useEffect(() => {
		if (deck?.imageUrl) {
			setImageUrl(deck.imageUrl)
		}
	}, [deck])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!deck) return

		setIsSubmitting(true)

		const formData = new FormData(e.currentTarget)
		const yearValue = formData.get('year')?.toString()

		try {
			await updateMutation.mutateAsync({
				id: deck.id,
				data: {
					name: formData.get('name')?.toString(),
					description: formData.get('description')?.toString() || undefined,
					publisher: formData.get('publisher')?.toString() || undefined,
					year: yearValue ? parseInt(yearValue, 10) : undefined,
					tradition: formData.get('tradition')?.toString() || undefined,
					imageUrl: imageUrl || undefined,
				},
			})
		} catch (error) {
			console.error('Erro ao atualizar baralho:', error)
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
		return (
			<div className="space-y-8">
				<div className="h-8 w-48 animate-pulse rounded-lg bg-gradient-to-br from-muted to-muted/50" />
				<div className="h-64 animate-pulse rounded-lg bg-gradient-to-br from-muted to-muted/50" />
			</div>
		)
	}

	if (error || !deck) {
		return (
			<div className="space-y-4">
				<Link
					href="/baralhos"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
				>
					<ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
					Voltar para baralhos
				</Link>
				<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
					<p className="text-sm font-medium text-destructive">
						Baralho não encontrado
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-8">
			{/* Breadcrumb Místico */}
			<Link
				href={`/baralhos/${deck.slug}`}
				className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
			>
				<ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
				Voltar para baralho
			</Link>

			{/* Header Místico */}
			<div className="space-y-3">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
					Editar: {deck.name}
				</h1>
				<p className="text-lg text-muted-foreground">
					Atualize as informações do baralho espiritual
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Informações do Baralho */}
				<div className="rounded-lg border border-border/40 bg-gradient-to-br from-background to-muted/20 p-6 space-y-4">
					<h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
						Informações do Baralho
					</h2>

					<div>
						<label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
							Nome do Baralho *
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							defaultValue={deck.name}
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
							placeholder="Ex: Rider-Waite Smith"
						/>
					</div>

					<div>
						<label htmlFor="tradition" className="block text-sm font-medium mb-2 text-foreground">
							Tradição
						</label>
						<input
							type="text"
							id="tradition"
							name="tradition"
							defaultValue={deck.tradition || ''}
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
							placeholder="Ex: Hermética, Qabalística"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="publisher" className="block text-sm font-medium mb-2 text-foreground">
								Editora
							</label>
							<input
								type="text"
								id="publisher"
								name="publisher"
								defaultValue={deck.publisher || ''}
								className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
								placeholder="Ex: US Games Systems"
							/>
						</div>

						<div>
							<label htmlFor="year" className="block text-sm font-medium mb-2 text-foreground">
								Ano
							</label>
							<input
								type="number"
								id="year"
								name="year"
								min="1000"
								max="2100"
								defaultValue={deck.year || ''}
								className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
								placeholder="Ex: 1909"
							/>
						</div>
					</div>

					<div>
						<span className="block text-sm font-medium mb-2 text-foreground">
							Imagem de Capa
						</span>
						<ImageUploader
							onUploadComplete={handleUploadComplete}
							onUploadError={handleUploadError}
							existingImageUrl={deck.imageUrl}
						/>
						{uploadError && (
							<p className="mt-2 text-sm text-destructive">{uploadError}</p>
						)}
					</div>

					<div>
						<label htmlFor="description" className="block text-sm font-medium mb-2 text-foreground">
							Descrição
						</label>
						<textarea
							id="description"
							name="description"
							rows={4}
							defaultValue={deck.description || ''}
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
							placeholder="Sobre o baralho, suas características e história..."
						/>
					</div>
				</div>

				{/* Error State */}
				{updateMutation.error && (
					<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
						<p className="text-sm font-medium text-destructive">
							Erro ao atualizar baralho: {updateMutation.error.message}
						</p>
					</div>
				)}

				{/* Actions */}
				<div className="flex gap-4">
					<button
						type="submit"
						disabled={isSubmitting}
						className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
					>
						{isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
					</button>
					<Link
						href={`/baralhos/${deck.slug}`}
						className="inline-flex items-center justify-center rounded-lg border border-border/40 bg-background/50 px-6 py-3 text-sm font-medium hover:bg-accent transition-all"
					>
						Cancelar
					</Link>
				</div>
			</form>
		</div>
	)
}
