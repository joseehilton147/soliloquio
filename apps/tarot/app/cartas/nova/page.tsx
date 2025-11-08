'use client'

import { DynamicTagInput } from '@workspace/ui/components/organisms/dynamic-tag-input'
import { ImageUploader } from '@workspace/ui/components/organisms/image-uploader'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { trpc } from '../../../src/lib/trpc'
import { useTagAutocomplete } from '../../../src/hooks/use-tag-autocomplete'

export default function NovaCartaPage() {
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [uploadError, setUploadError] = useState<string | null>(null)
	const [verticalMeanings, setVerticalMeanings] = useState<string[]>([])
	const [invertedMeanings, setInvertedMeanings] = useState<string[]>([])

	// Autocomplete para tags verticais e invertidas
	const verticalAutocomplete = useTagAutocomplete('vertical')
	const invertedAutocomplete = useTagAutocomplete('inverted')

	const createMutation = trpc.tarot.create.useMutation({
		onSuccess: (data) => {
			router.push(`/cartas/${data.slug}`)
		},
	})

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		const formData = new FormData(e.currentTarget)

		const readingTypes = [
			{ type: 'general', read: formData.get('generalReading')?.toString() || '' },
			{ type: 'love-relationship', read: formData.get('loveReading')?.toString() || '' },
			{ type: 'career-money', read: formData.get('careerReading')?.toString() || '' },
			{ type: 'personal-spiritual', read: formData.get('spiritualReading')?.toString() || '' },
			{ type: 'inverted', read: formData.get('invertedReading')?.toString() || '' },
		].filter((r) => r.read.length >= 10)

		try {
			await createMutation.mutateAsync({
				name: formData.get('name')?.toString() || '',
				summary: formData.get('summary')?.toString() || '',
				description: formData.get('description')?.toString() || '',
				imageUrl: imageUrl,
				verticalMeaning: verticalMeanings,
				invertedMeaning: invertedMeanings,
				numerology: formData.get('numerology')?.toString() || '',
				astrology: formData.get('astrology')?.toString() || null,
				typesOfReading: readingTypes,
			})
		} catch (error) {
			console.error('Erro ao criar carta:', error)
			setIsSubmitting(false)
		}
	}

	const handleUploadComplete = (url: string) => {
		setImageUrl(url)
		setUploadError(null)
	}

	const handleUploadError = (error: string) => {
		setUploadError(error)
		setImageUrl(null)
	}

	return (
		<div className="space-y-8">
			{/* Breadcrumb Místico */}
			<Link
				href="/cartas"
				className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
			>
				<ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
				Voltar para cartas
			</Link>

			{/* Header Místico */}
			<div className="space-y-3">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
					Nova Carta de Tarot
				</h1>
				<p className="text-lg text-muted-foreground">
					Adicione uma nova carta ao baralho espiritual
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Informações Básicas */}
				<div className="rounded-lg border border-border/40 bg-gradient-to-br from-background to-muted/20 p-6 space-y-4">
					<h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
						Informações Básicas
					</h2>

					<div>
						<label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
							Nome da Carta *
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
							placeholder="Ex: O Mago"
						/>
					</div>

					<div>
						<label htmlFor="numerology" className="block text-sm font-medium mb-2 text-foreground">
							Numerologia *
						</label>
						<input
							type="text"
							id="numerology"
							name="numerology"
							required
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
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
							name="astrology"
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
							placeholder="Ex: Mercúrio"
						/>
					</div>

					<div>
						<span className="block text-sm font-medium mb-2 text-foreground">
							Imagem da Carta
						</span>
						<ImageUploader
							onUploadComplete={handleUploadComplete}
							onUploadError={handleUploadError}
						/>
						{uploadError && (
							<p className="mt-2 text-sm text-destructive">{uploadError}</p>
						)}
					</div>

					<div>
						<label htmlFor="summary" className="block text-sm font-medium mb-2 text-foreground">
							Resumo *
						</label>
						<textarea
							id="summary"
							name="summary"
							required
							rows={3}
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
							placeholder="Resumo curto da carta..."
						/>
					</div>

					<div>
						<label htmlFor="description" className="block text-sm font-medium mb-2 text-foreground">
							Descrição *
						</label>
						<textarea
							id="description"
							name="description"
							required
							rows={6}
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
							placeholder="Descrição detalhada da carta..."
						/>
					</div>

					<DynamicTagInput
						value={verticalMeanings}
						onChange={setVerticalMeanings}
						label="Significados Verticais"
						variant="success"
						placeholder="Digite um significado e pressione Enter"
						helperText="Sugestões aparecerão enquanto você digita. Pressione Enter para adicionar"
						required
						suggestions={verticalAutocomplete.suggestions}
						isLoadingSuggestions={verticalAutocomplete.isLoadingSuggestions}
						onQueryChange={verticalAutocomplete.onQueryChange}
					/>

					<DynamicTagInput
						value={invertedMeanings}
						onChange={setInvertedMeanings}
						label="Significados Invertidos"
						variant="warning"
						placeholder="Digite um significado e pressione Enter"
						helperText="Sugestões aparecerão enquanto você digita. Pressione Enter para adicionar"
						required
						suggestions={invertedAutocomplete.suggestions}
						isLoadingSuggestions={invertedAutocomplete.isLoadingSuggestions}
						onQueryChange={invertedAutocomplete.onQueryChange}
					/>
				</div>

				{/* Tipos de Leitura */}
				<div className="rounded-lg border border-border/40 bg-gradient-to-br from-background to-muted/20 p-6 space-y-4">
					<div>
						<h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
							Tipos de Leitura
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">Pelo menos um tipo é obrigatório (mínimo 10 caracteres)</p>
					</div>

					<div>
						<label htmlFor="generalReading" className="block text-sm font-medium mb-2 text-foreground">
							Leitura Geral
						</label>
						<textarea
							id="generalReading"
							name="generalReading"
							rows={4}
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
							placeholder="Interpretação geral da carta..."
						/>
					</div>

					<div>
						<label htmlFor="loveReading" className="block text-sm font-medium mb-2 text-foreground">
							Amor e Relacionamentos
						</label>
						<textarea
							id="loveReading"
							name="loveReading"
							rows={4}
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
							placeholder="Interpretação para amor e relacionamentos..."
						/>
					</div>

					<div>
						<label htmlFor="careerReading" className="block text-sm font-medium mb-2 text-foreground">
							Carreira e Dinheiro
						</label>
						<textarea
							id="careerReading"
							name="careerReading"
							rows={4}
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
							placeholder="Interpretação para carreira e finanças..."
						/>
					</div>

					<div>
						<label htmlFor="spiritualReading" className="block text-sm font-medium mb-2 text-foreground">
							Pessoal e Espiritual
						</label>
						<textarea
							id="spiritualReading"
							name="spiritualReading"
							rows={4}
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
							placeholder="Interpretação para crescimento pessoal e espiritual..."
						/>
					</div>

					<div>
						<label htmlFor="invertedReading" className="block text-sm font-medium mb-2 text-foreground">
							Leitura Invertida
						</label>
						<textarea
							id="invertedReading"
							name="invertedReading"
							rows={4}
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
							placeholder="Interpretação quando a carta aparece invertida..."
						/>
					</div>
				</div>

				{/* Error State */}
				{createMutation.error && (
					<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
						<p className="text-sm font-medium text-destructive">
							Erro ao criar carta: {createMutation.error.message}
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
						{isSubmitting ? 'Criando...' : 'Criar Carta'}
					</button>
					<Link
						href="/cartas"
						className="inline-flex items-center justify-center rounded-lg border border-border/40 bg-background/50 px-6 py-3 text-sm font-medium hover:bg-accent transition-all"
					>
						Cancelar
					</Link>
				</div>
			</form>
		</div>
	)
}
