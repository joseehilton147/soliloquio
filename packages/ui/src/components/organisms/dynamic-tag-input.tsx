'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import { TagInput, type TagSuggestion } from '../atoms/tag-input'
import { Tag } from '../molecules/tag'

export interface DynamicTagInputProps {
	value: string[];
	onChange: (tags: string[]) => void;
	placeholder?: string;
	variant?: 'default' | 'primary' | 'success' | 'warning';
	maxTags?: number;
	className?: string;
	label?: string;
	required?: boolean;
	helperText?: string;
	// Autocomplete props
	suggestions?: TagSuggestion[];
	isLoadingSuggestions?: boolean;
	onQueryChange?: (query: string) => void;
}

/**
 * Organismo: Sistema completo de input de tags dinâmicas
 * Gerencia lista de tags com adição e remoção
 * Suporta autocomplete com fuzzy search integrado no TagInput
 */
export function DynamicTagInput({
	value,
	onChange,
	placeholder = 'Digite e pressione Enter',
	variant = 'default',
	maxTags,
	className,
	label,
	required = false,
	helperText,
	suggestions = [],
	isLoadingSuggestions = false,
	onQueryChange,
}: DynamicTagInputProps) {
	const handleAddTag = (newTag: string) => {
		// Evitar duplicatas
		if (value.includes(newTag)) {
			return
		}

		// Respeitar limite máximo
		if (maxTags && value.length >= maxTags) {
			return
		}

		onChange([...value, newTag])
	}

	const handleRemoveTag = (index: number) => {
		onChange(value.filter((_, i) => i !== index))
	}

	const canAddMore = !maxTags || value.length < maxTags

	return (
		<div className={cn('space-y-3', className)}>
			{label && (
				<label className="block text-sm font-medium">
					{label} {required && <span className="text-destructive">*</span>}
				</label>
			)}

			{/* Lista de tags */}
			{value.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{value.map((tag, index) => (
						<Tag
							key={index}
							value={tag}
							variant={variant}
							onRemove={() => handleRemoveTag(index)}
						/>
					))}
				</div>
			)}

			{/* Input para adicionar novas tags */}
			{canAddMore && (
				<div>
					<TagInput
						placeholder={placeholder}
						onAddTag={handleAddTag}
						suggestions={suggestions}
						isLoadingSuggestions={isLoadingSuggestions}
						onQueryChange={onQueryChange}
						existingTags={value.map((t) => t.toLowerCase())}
					/>
					{helperText && (
						<p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
					)}
					{maxTags && (
						<p className="mt-1 text-xs text-muted-foreground">
							{value.length} de {maxTags} tags
						</p>
					)}
				</div>
			)}

			{/* Mensagem quando atingir limite */}
			{!canAddMore && (
				<p className="text-sm text-muted-foreground">
					Limite máximo de {maxTags} tags atingido
				</p>
			)}

			{/* Input hidden para formulários */}
			<input
				type="hidden"
				value={JSON.stringify(value)}
				required={required && value.length === 0}
			/>
		</div>
	)
}
