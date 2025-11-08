'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'

export interface FileInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
	onFileSelect?: (file: File | null) => void;
}

/**
 * Átomo: Input de arquivo nativo estilizado
 * Componente mais básico para seleção de arquivos
 */
export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
	({ className, onFileSelect, ...props }, ref) => {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0] || null
			onFileSelect?.(file)
		}

		return (
			<input
				type="file"
				ref={ref}
				className={cn(
					'file:mr-4 file:rounded-md file:border-0',
					'file:bg-primary file:px-4 file:py-2',
					'file:text-sm file:font-medium file:text-primary-foreground',
					'file:hover:bg-primary/90',
					'text-sm text-muted-foreground',
					'cursor-pointer',
					className,
				)}
				onChange={handleChange}
				{...props}
			/>
		)
	},
)

FileInput.displayName = 'FileInput'
