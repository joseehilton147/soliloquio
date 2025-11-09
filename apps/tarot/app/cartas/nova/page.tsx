'use client'

import { DynamicTagInput } from '@workspace/ui/components/organisms/dynamic-tag-input'
import { ImageUploader } from '@workspace/ui/components/organisms/image-uploader'
import { RichTextEditor } from '@workspace/ui'
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

	// Estados para campos WYSIWYG
	const [summary, setSummary] = useState('')
	const [description, setDescription] = useState('')
	const [generalReading, setGeneralReading] = useState('')
	const [loveReading, setLoveReading] = useState('')
	const [careerReading, setCareerReading] = useState('')
	const [spiritualReading, setSpiritualReading] = useState('')
	const [invertedReading, setInvertedReading] = useState('')

	// Estados para novos campos
	const [deckId, setDeckId] = useState<string | null>(null)
	const [cardType, setCardType] = useState('')

	// Autocomplete para tags verticais e invertidas
	const verticalAutocomplete = useTagAutocomplete('vertical')
	const invertedAutocomplete = useTagAutocomplete('inverted')

	// Buscar decks disponíveis
	const { data: decksData } = trpc.tarot.getDecks.useQuery()

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
			{ type: 'general' as const, read: generalReading },
			{ type: 'love-relationship' as const, read: loveReading },
			{ type: 'career-money' as const, read: careerReading },
			{ type: 'personal-spiritual' as const, read: spiritualReading },
			{ type: 'inverted' as const, read: invertedReading },
		].filter((r) => r.read.length >= 10)

		try {
			await createMutation.mutateAsync({
				name: formData.get('name')?.toString() || '',
				summary,
				description,
				imageUrl: imageUrl,
				verticalMeaning: verticalMeanings,
				invertedMeaning: invertedMeanings,
				numerology: formData.get('numerology')?.toString() || '',
				astrology: formData.get('astrology')?.toString() || null,
				deckId: deckId || null,
				cardType: cardType || null,
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
						<label htmlFor="deckId" className="block text-sm font-medium mb-2 text-foreground">
							Baralho
						</label>
						<select
							id="deckId"
							value={deckId || ''}
							onChange={(e) => setDeckId(e.target.value || null)}
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
						>
							<option value="">Selecione um baralho</option>
							{decksData?.map((deck) => (
								<option key={deck.id} value={deck.id}>
									{deck.name}
								</option>
							))}
						</select>
						<p className="mt-1 text-xs text-muted-foreground">
							Opcional - Associe a carta a um baralho específico
						</p>
					</div>

					<div>
						<label htmlFor="cardType" className="block text-sm font-medium mb-2 text-foreground">
							Tipo de Carta
						</label>
						<input
							type="text"
							id="cardType"
							value={cardType}
							onChange={(e) => setCardType(e.target.value)}
							className="w-full rounded-md border border-border/40 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
							placeholder="Ex: Arcano Maior, Arcano Menor - Número, Carta Cigana"
						/>
						<p className="mt-1 text-xs text-muted-foreground">
							Opcional - Ex: Arcano Maior, Arcano Menor - Corte, Carta Cigana
						</p>
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

					<RichTextEditor
						label="Resumo *"
						value={summary}
						onChange={setSummary}
						placeholder="Resumo curto da carta..."
						description="Breve resumo sobre a carta (mínimo 10 caracteres)"
					/>

					<RichTextEditor
						label="Descrição *"
						value={description}
						onChange={setDescription}
						placeholder="Descrição detalhada da carta..."
						description="Descrição completa sobre a carta e seus significados (mínimo 50 caracteres)"
					/>

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
						description="Como a carta se manifesta em questões amorosas e relacionamentos"
					/>

					<RichTextEditor
						label="Carreira e Dinheiro"
						value={careerReading}
						onChange={setCareerReading}
						placeholder="Interpretação para carreira e finanças..."
						description="Significado da carta para vida profissional e financeira"
					/>

					<RichTextEditor
						label="Pessoal e Espiritual"
						value={spiritualReading}
						onChange={setSpiritualReading}
						placeholder="Interpretação para crescimento pessoal e espiritual..."
						description="Como a carta orienta o desenvolvimento interior e espiritual"
					/>

					<RichTextEditor
						label="Leitura Invertida"
						value={invertedReading}
						onChange={setInvertedReading}
						placeholder="Interpretação quando a carta aparece invertida..."
						description="Significado quando a carta surge de cabeça para baixo"
					/>
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
