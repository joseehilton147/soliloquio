'use client'

import { Icon } from '@iconify/react'
import Image from 'next/image'
import * as React from 'react'

import { cn } from '../../lib/utils'
import { Button } from '../atoms/button'

export interface ImagePreviewProps {
	imageUrl: string;
	onRemove: () => void;
	className?: string;
}

/**
 * Molécula: Preview de imagem existente (URL)
 * Mostra imagem já salva com opção de remover
 */
export function ImagePreview({ imageUrl, onRemove, className }: ImagePreviewProps) {
	return (
		<div className={cn('relative rounded-lg border bg-card p-4', className)}>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="absolute right-2 top-2 size-8 rounded-full"
				onClick={onRemove}
			>
				<Icon icon="lucide:x" className="size-4" />
				<span className="sr-only">Remover imagem</span>
			</Button>

			<div className="flex gap-4">
				{/* Preview da imagem */}
				<div className="relative size-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
					<Image
						src={imageUrl}
						alt="Preview da imagem"
						fill
						className="object-cover"
						sizes="80px"
					/>
				</div>

				{/* Informações da imagem */}
				<div className="flex-1 space-y-1 overflow-hidden">
					<p className="text-sm font-medium">Imagem atual</p>
					<p className="truncate text-xs text-muted-foreground">{imageUrl}</p>
					<p className="text-xs text-muted-foreground">
						Clique no X para substituir por outra imagem
					</p>
				</div>
			</div>
		</div>
	)
}
