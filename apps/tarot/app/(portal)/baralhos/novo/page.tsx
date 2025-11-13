'use client'

import { ImageUploader } from '@workspace/ui/components/organisms/image-uploader'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { trpc } from '@/lib/trpc'


export default function NovoBaralhoPage() {
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [uploadError, setUploadError] = useState<string | null>(null)

	// Estados para campos
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [publisher, setPublisher] = useState('')
	const [year, setYear] = useState('')
	const [tradition, setTradition] = useState('')

	const createMutation = trpc.tarot.createDeck.useMutation({
		onSuccess: (data) => {
			router.push(`/baralhos/${data.slug}`)
		},
	})

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		const yearValue = year ? parseInt(year, 10) : undefined

		try {
			await createMutation.mutateAsync({
				name,
				description: description || undefined,
				publisher: publisher || undefined,
				year: yearValue,
				tradition: tradition || undefined,
				imageUrl: imageUrl || undefined,
			})
		} catch (error) {
			console.error('Erro ao criar baralho:', error)
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
		<div className="space-y-6">
			{/* Breadcrumb Místico */}
			<Link
				href="/baralhos"
				className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
			>
				<Icon icon="lucide:arrow-left" className="size-4 group-hover:-translate-x-1 transition-transform" />
				Voltar para baralhos
			</Link>

			{/* Header Místico */}
			<div className="space-y-2">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
					Novo Baralho de Tarot
				</h1>
				<p className="text-base text-muted-foreground">
					Adicione um novo baralho à coleção espiritual
				</p>
			</div>

			<form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[380px_1fr]">
				{/* Sidebar - Preview */}
				<div className="lg:sticky lg:top-24 lg:self-start space-y-4">
					{/* Preview da Imagem */}
					<div className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-indigo-500/10 p-5 backdrop-blur-sm shadow-lg shadow-purple-500/10">
						<div className="flex items-center gap-2 mb-4">
							<Icon icon="lucide:image" className="size-5 text-purple-600 dark:text-purple-400" />
							<h2 className="font-semibold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
								Imagem de Capa
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
								Resumo
							</h2>
						</div>

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
					</div>
				</div>

				{/* Conteúdo Principal - Formulário */}
				<div className="space-y-6">
					{/* Informações Básicas */}
					<div className="rounded-xl border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-purple-500/10 p-6 backdrop-blur-sm shadow-lg shadow-indigo-500/10">
						<div className="flex items-center gap-2 mb-5">
							<Icon icon="lucide:book-open" className="size-5 text-indigo-600 dark:text-indigo-400" />
							<h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
								Informações do Baralho
							</h2>
						</div>

						<div className="space-y-4">
							<div>
								<label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
									Nome do Baralho *
								</label>
								<input
									type="text"
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
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
									value={tradition}
									onChange={(e) => setTradition(e.target.value)}
									className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
									placeholder="Ex: Hermética, Qabalística, Cigana"
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label htmlFor="publisher" className="block text-sm font-medium mb-2 text-foreground">
										<Icon icon="lucide:building" className="size-4 inline mr-1.5 text-indigo-500" />
										Editora
									</label>
									<input
										type="text"
										id="publisher"
										value={publisher}
										onChange={(e) => setPublisher(e.target.value)}
										className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
										placeholder="Ex: US Games Systems"
									/>
								</div>

								<div>
									<label htmlFor="year" className="block text-sm font-medium mb-2 text-foreground">
										<Icon icon="lucide:calendar" className="size-4 inline mr-1.5 text-indigo-500" />
										Ano
									</label>
									<input
										type="number"
										id="year"
										value={year}
										onChange={(e) => setYear(e.target.value)}
										min="1000"
										max="2100"
										className="w-full rounded-lg border-2 border-indigo-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all placeholder:text-muted-foreground/50"
										placeholder="Ex: 1909"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Descrição */}
					<div className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 p-6 backdrop-blur-sm shadow-lg shadow-purple-500/10">
						<div className="flex items-center gap-2 mb-5">
							<Icon icon="lucide:book-open" className="size-5 text-purple-600 dark:text-purple-400" />
							<h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
								Descrição
							</h2>
						</div>

						<div>
							<label htmlFor="description" className="block text-sm font-medium mb-2 text-foreground">
								Sobre o Baralho
							</label>
							<textarea
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								rows={6}
								className="w-full rounded-lg border-2 border-purple-500/20 bg-background/50 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all placeholder:text-muted-foreground/50 resize-none"
								placeholder="Descreva o baralho, suas características, história e o que o torna especial..."
							/>
							<p className="mt-2 text-xs text-muted-foreground">
								Informações sobre origem, artista, simbologia e características únicas
							</p>
						</div>
					</div>

					{/* Error State */}
					{createMutation.error && (
						<div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-5">
							<p className="text-sm font-medium text-destructive">
								Erro ao criar baralho: {createMutation.error.message}
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
							{isSubmitting ? 'Criando Baralho...' : 'Criar Baralho'}
						</button>
						<Link
							href="/baralhos"
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
