'use client'

import { X, FileImage } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'

import { cn } from '../../lib/utils'
import { Button } from '../atoms/button'

export interface FilePreviewProps {
	file: File;
	onRemove: () => void;
	className?: string;
}

/**
 * Molécula: Preview de arquivo selecionado com opção de remover
 * Mostra imagem com informações e botão de remoção
 */
export function FilePreview({ file, onRemove, className }: FilePreviewProps) {
	const [preview, setPreview] = React.useState<string | null>(null)

	React.useEffect(() => {
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setPreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		}

		return () => {
			if (preview) {
				URL.revokeObjectURL(preview)
			}
		}
	}, [file])

	const formatFileSize = (bytes: number): string => {
		if (bytes < 1024) return `${bytes} B`
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
		return `${(bytes / 1024 / 1024).toFixed(1)} MB`
	}

	return (
		<div className={cn('relative rounded-lg border bg-card p-4', className)}>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="absolute right-2 top-2 size-8 rounded-full"
				onClick={onRemove}
			>
				<X className="size-4" />
				<span className="sr-only">Remover arquivo</span>
			</Button>

			<div className="flex gap-4">
				{/* Preview da imagem */}
				<div className="relative size-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
					{preview
						? (
							<Image
								src={preview}
								alt={file.name}
								fill
								className="object-cover"
								sizes="80px"
							/>
						)
						: (
							<div className="flex size-full items-center justify-center">
								<FileImage className="size-8 text-muted-foreground" />
							</div>
						)}
				</div>

				{/* Informações do arquivo */}
				<div className="flex-1 space-y-1 overflow-hidden">
					<p className="truncate text-sm font-medium">{file.name}</p>
					<p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
					<p className="text-xs text-muted-foreground">{file.type}</p>
				</div>
			</div>
		</div>
	)
}
