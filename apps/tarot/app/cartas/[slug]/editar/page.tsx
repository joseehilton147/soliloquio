'use client'

import { DynamicTagInput } from '@workspace/ui/components/organisms/dynamic-tag-input'
import { ImageUploader } from '@workspace/ui/components/organisms/image-uploader'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useState, useEffect } from 'react'

import { trpc } from '../../../../src/lib/trpc'

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
			// Estes estados são editáveis pelo usuário (DynamicTagInput.onChange)
			// Precisamos inicializá-los com os valores do servidor quando card carrega
			// eslint-disable-next-line react-you-might-not-need-an-effect/no-derived-state
			setVerticalMeanings(card.verticalMeaning as string[])
			// eslint-disable-next-line react-you-might-not-need-an-effect/no-derived-state
			setInvertedMeanings(card.invertedMeaning as string[])
		}
	}, [card])

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
			await updateMutation.mutateAsync({
				id: card!.id,
				data: {
					name: formData.get('name')?.toString() || '',
					summary: formData.get('summary')?.toString() || '',
					description: formData.get('description')?.toString() || '',
					imageUrl: imageUrl,
					verticalMeaning: verticalMeanings,
					invertedMeaning: invertedMeanings,
					numerology: formData.get('numerology')?.toString() || '',
					astrology: formData.get('astrology')?.toString() || null,
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
		return (
			<div className="space-y-8">
				<div className="h-8 w-48 animate-pulse rounded bg-muted" />
				<div className="h-64 animate-pulse rounded-lg bg-muted" />
			</div>
		)
	}

	if (error || !card) {
		return (
			<div className="space-y-4">
				<Link href="/cartas" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
					<ArrowLeft className="mr-2 size-4" />
					Voltar
				</Link>
				<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
					<p className="text-sm text-destructive">
						Carta não encontrada
					</p>
				</div>
			</div>
		)
	}

	// Helper para pegar reading type específico
	const getReadingByType = (type: string) => {
		return card.typesOfReading.find((r) => r.type === type)?.read || ''
	}

	return (
		<div className="space-y-8">
			<Link href={`/cartas/${card.slug}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
				<ArrowLeft className="mr-2 size-4" />
				Voltar para carta
			</Link>

			<div>
				<h1 className="text-4xl font-bold">Editar Carta: {card.name}</h1>
				<p className="mt-2 text-muted-foreground">
					Atualize as informações da carta de tarot
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
							defaultValue={card.name}
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
							defaultValue={card.numerology}
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
							defaultValue={card.astrology || ''}
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
							existingImageUrl={card.imageUrl}
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
							defaultValue={card.summary}
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
							defaultValue={card.description}
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
						helperText="Pressione Enter após cada significado para adicionar"
						required
					/>

					<DynamicTagInput
						value={invertedMeanings}
						onChange={setInvertedMeanings}
						label="Significados Invertidos"
						variant="warning"
						placeholder="Digite um significado e pressione Enter"
						helperText="Pressione Enter após cada significado para adicionar"
						required
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
							defaultValue={getReadingByType('general')}
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
							defaultValue={getReadingByType('love-relationship')}
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
							defaultValue={getReadingByType('career-money')}
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
							defaultValue={getReadingByType('personal-spiritual')}
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
							defaultValue={getReadingByType('inverted')}
							className="w-full rounded-md border bg-background px-3 py-2"
							placeholder="Interpretação quando a carta aparece invertida..."
						/>
					</div>
				</div>

				{updateMutation.error && (
					<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
						<p className="text-sm text-destructive">
							Erro ao atualizar carta: {updateMutation.error.message}
						</p>
					</div>
				)}

				<div className="flex gap-4">
					<button
						type="submit"
						disabled={isSubmitting}
						className="rounded-md bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
					>
						{isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
					</button>
					<Link
						href={`/cartas/${card.slug}`}
						className="rounded-md border px-6 py-3 hover:bg-accent"
					>
						Cancelar
					</Link>
				</div>
			</form>
		</div>
	)
}
