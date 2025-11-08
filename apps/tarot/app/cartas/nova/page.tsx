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
			<Link href="/cartas" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
				<ArrowLeft className="mr-2 size-4" />
				Voltar para cartas
			</Link>

			<div>
				<h1 className="text-4xl font-bold">Nova Carta de Tarot</h1>
				<p className="mt-2 text-muted-foreground">
					Adicione uma nova carta ao baralho espiritual
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="rounded-lg border bg-card p-6 space-y-4">
					<h2 className="text-xl font-semibold">Informações Básicas</h2>

					<div>
						<label htmlFor="name" className="block text-sm font-medium mb-2">
							Nome da Carta *
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							className="w-full rounded-md border bg-background px-3 py-2"
							placeholder="Ex: O Mago"
						/>
					</div>

					<div>
						<label htmlFor="numerology" className="block text-sm font-medium mb-2">
							Numerologia *
						</label>
						<input
							type="text"
							id="numerology"
							name="numerology"
							required
							className="w-full rounded-md border bg-background px-3 py-2"
							placeholder="Ex: 1"
						/>
					</div>

					<div>
						<label htmlFor="astrology" className="block text-sm font-medium mb-2">
							Astrologia
						</label>
						<input
							type="text"
							id="astrology"
							name="astrology"
							className="w-full rounded-md border bg-background px-3 py-2"
							placeholder="Ex: Mercúrio"
						/>
					</div>

					<div>
						<span className="block text-sm font-medium mb-2">
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
						<label htmlFor="summary" className="block text-sm font-medium mb-2">
							Resumo *
						</label>
						<textarea
							id="summary"
							name="summary"
							required
							rows={3}
							className="w-full rounded-md border bg-background px-3 py-2"
							placeholder="Resumo curto da carta..."
						/>
					</div>

					<div>
						<label htmlFor="description" className="block text-sm font-medium mb-2">
							Descrição *
						</label>
						<textarea
							id="description"
							name="description"
							required
							rows={6}
							className="w-full rounded-md border bg-background px-3 py-2"
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

				<div className="rounded-lg border bg-card p-6 space-y-4">
					<h2 className="text-xl font-semibold">Tipos de Leitura</h2>
					<p className="text-sm text-muted-foreground">Pelo menos um tipo é obrigatório</p>

					<div>
						<label htmlFor="generalReading" className="block text-sm font-medium mb-2">
							Geral
						</label>
						<textarea
							id="generalReading"
							name="generalReading"
							rows={4}
							className="w-full rounded-md border bg-background px-3 py-2"
							placeholder="Interpretação geral da carta..."
						/>
					</div>

					<div>
						<label htmlFor="loveReading" className="block text-sm font-medium mb-2">
							Amor e Relacionamentos
						</label>
						<textarea
							id="loveReading"
							name="loveReading"
							rows={4}
							className="w-full rounded-md border bg-background px-3 py-2"
							placeholder="Interpretação para amor e relacionamentos..."
						/>
					</div>

					<div>
						<label htmlFor="careerReading" className="block text-sm font-medium mb-2">
							Carreira e Dinheiro
						</label>
						<textarea
							id="careerReading"
							name="careerReading"
							rows={4}
							className="w-full rounded-md border bg-background px-3 py-2"
							placeholder="Interpretação para carreira e finanças..."
						/>
					</div>

					<div>
						<label htmlFor="spiritualReading" className="block text-sm font-medium mb-2">
							Pessoal e Espiritual
						</label>
						<textarea
							id="spiritualReading"
							name="spiritualReading"
							rows={4}
							className="w-full rounded-md border bg-background px-3 py-2"
							placeholder="Interpretação para crescimento pessoal e espiritual..."
						/>
					</div>

					<div>
						<label htmlFor="invertedReading" className="block text-sm font-medium mb-2">
							Invertida
						</label>
						<textarea
							id="invertedReading"
							name="invertedReading"
							rows={4}
							className="w-full rounded-md border bg-background px-3 py-2"
							placeholder="Interpretação quando a carta aparece invertida..."
						/>
					</div>
				</div>

				{createMutation.error && (
					<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
						<p className="text-sm text-destructive">
							Erro ao criar carta: {createMutation.error.message}
						</p>
					</div>
				)}

				<div className="flex gap-4">
					<button
						type="submit"
						disabled={isSubmitting}
						className="rounded-md bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
					>
						{isSubmitting ? 'Criando...' : 'Criar Carta'}
					</button>
					<Link
						href="/cartas"
						className="rounded-md border px-6 py-3 hover:bg-accent"
					>
						Cancelar
					</Link>
				</div>
			</form>
		</div>
	)
}
