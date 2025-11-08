'use client'

import { Loader2 } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils'
import { FileDropZone } from '../molecules/file-drop-zone'
import { FilePreview } from '../molecules/file-preview'
import { ImagePreview } from '../molecules/image-preview'

export interface ImageUploaderProps {
	onUploadComplete: (imageUrl: string) => void;
	onUploadError?: (error: string) => void;
	uploadEndpoint?: string;
	accept?: string;
	maxSize?: number;
	disabled?: boolean;
	existingImageUrl?: string | null;
	className?: string;
}

/**
 * Organismo: Uploader completo de imagens
 * Gerencia estado, faz upload para API e combina FileDropZone + FilePreview
 * Suporta exibição de imagem existente para edição
 */
export function ImageUploader({
	onUploadComplete,
	onUploadError,
	uploadEndpoint = '/api/upload',
	accept = 'image/*',
	maxSize = 5 * 1024 * 1024,
	disabled = false,
	existingImageUrl = null,
	className,
}: ImageUploaderProps) {
	const [file, setFile] = React.useState<File | null>(null)
	const [isUploading, setIsUploading] = React.useState(false)
	const [uploadedUrl, setUploadedUrl] = React.useState<string | null>(existingImageUrl)
	const [showExisting, setShowExisting] = React.useState(!!existingImageUrl)

	const uploadFile = async (selectedFile: File) => {
		setIsUploading(true)

		try {
			const formData = new FormData()
			formData.append('file', selectedFile)

			// Se existe imagem antiga, passar para a API deletar
			if (existingImageUrl) {
				formData.append('oldImageUrl', existingImageUrl)
			}

			const response = await fetch(uploadEndpoint, {
				method: 'POST',
				body: formData,
			})

			if (!response.ok) {
				const error = await response.json()
				throw new Error(error.error || 'Erro ao fazer upload')
			}

			const data = await response.json()
			setUploadedUrl(data.imageUrl)
			onUploadComplete(data.imageUrl)
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
			onUploadError?.(errorMessage)
			setFile(null)
		} finally {
			setIsUploading(false)
		}
	}

	const handleFileSelect = async (selectedFile: File | null) => {
		if (!selectedFile) {
			setFile(null)
			return
		}

		setFile(selectedFile)
		await uploadFile(selectedFile)
	}

	const handleRemove = () => {
		setFile(null)
		setUploadedUrl(null)
		setShowExisting(false)
	}

	const handleRemoveExisting = () => {
		setShowExisting(false)
		setUploadedUrl(null)
	}

	return (
		<div className={cn('space-y-4', className)}>
			{isUploading
				? (
					<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8">
						<Loader2 className="mb-4 size-12 animate-spin text-primary" />
						<p className="text-sm font-medium">Fazendo upload da imagem...</p>
						<p className="mt-1 text-xs text-muted-foreground">Aguarde um momento</p>
					</div>
				)
				: showExisting && existingImageUrl && !file
					? (
						<ImagePreview imageUrl={existingImageUrl} onRemove={handleRemoveExisting} />
					)
					: !file
						? (
							<FileDropZone
								onFileSelect={handleFileSelect}
								accept={accept}
								maxSize={maxSize}
								disabled={disabled}
							/>
						)
						: (
							<div className="space-y-2">
								<FilePreview file={file} onRemove={handleRemove} />
								{uploadedUrl && (
									<p className="text-xs text-muted-foreground">
										✓ Upload concluído: {uploadedUrl}
									</p>
								)}
							</div>
						)}
		</div>
	)
}
