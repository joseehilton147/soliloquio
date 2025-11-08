'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'

export interface TagSuggestion {
	id: string;
	value: string;
	usageCount: number;
	similarity?: number;
}

export interface TagInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	onAddTag?: (value: string) => void;
	// Autocomplete props
	suggestions?: TagSuggestion[];
	isLoadingSuggestions?: boolean;
	onQueryChange?: (query: string) => void;
	existingTags?: string[];
}

/**
 * Átomo: Input para adicionar tags com autocomplete integrado
 * Captura Enter, busca sugestões com fuzzy search, navega com setas
 */
export const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
	({
		className,
		onAddTag,
		suggestions = [],
		isLoadingSuggestions = false,
		onQueryChange,
		existingTags = [],
		...props
	}, ref) => {
		const [value, setValue] = React.useState('')
		const [selectedIndex, setSelectedIndex] = React.useState(0)
		const [isOpen, setIsOpen] = React.useState(false)
		const internalRef = React.useRef<HTMLInputElement>(null)
		const dropdownRef = React.useRef<HTMLDivElement>(null)

		// Combinar refs externa e interna
		React.useImperativeHandle(ref, () => internalRef.current!)

		// Filtrar sugestões que já existem na lista de tags do usuário
		const filteredSuggestions = React.useMemo(() => {
			return suggestions.filter(
				(suggestion) => !existingTags.includes(suggestion.value.toLowerCase()),
			)
		}, [suggestions, existingTags])

		// Notificar mudanças na query com debounce
		React.useEffect(() => {
			if (value.length === 0) {
				setIsOpen(false)
				return
			}

			if (!onQueryChange) return

			const timer = setTimeout(() => {
				onQueryChange(value)
				setIsOpen(true)
			}, 300) // Debounce de 300ms

			return () => clearTimeout(timer)
		}, [value, onQueryChange])

		// Fechar dropdown ao clicar fora
		React.useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          internalRef.current &&
          !internalRef.current.contains(event.target as Node)
				) {
					setIsOpen(false)
				}
			}

			document.addEventListener('mousedown', handleClickOutside)
			return () => document.removeEventListener('mousedown', handleClickOutside)
		}, [])

		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			// Navegação com setas
			if (e.key === 'ArrowDown') {
				e.preventDefault()
				setSelectedIndex((prev) =>
					prev < filteredSuggestions.length - 1 ? prev + 1 : prev,
				)
			} else if (e.key === 'ArrowUp') {
				e.preventDefault()
				setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
			}
			// Enter: adicionar tag
			else if (e.key === 'Enter') {
				e.preventDefault()

				// Se há sugestões abertas e uma selecionada, usar a sugestão
				if (isOpen && filteredSuggestions.length > 0) {
					const selectedSuggestion = filteredSuggestions[selectedIndex]
					if (selectedSuggestion && onAddTag) {
						onAddTag(selectedSuggestion.value)
						setValue('')
						setIsOpen(false)
						setSelectedIndex(0)
					}
				}
				// Caso contrário, adicionar o texto digitado
				else {
					const trimmedValue = value.trim()
					if (trimmedValue && onAddTag) {
						onAddTag(trimmedValue)
						setValue('')
						setIsOpen(false)
					}
				}
			}
			// Escape: fechar dropdown
			else if (e.key === 'Escape') {
				setIsOpen(false)
			}
		}

		const handleSuggestionClick = (suggestion: TagSuggestion) => {
			if (onAddTag) {
				onAddTag(suggestion.value)
				setValue('')
				setIsOpen(false)
				setSelectedIndex(0)
				internalRef.current?.focus()
			}
		}

		const showSuggestions = isOpen && value.length > 0 && filteredSuggestions.length > 0

		return (
			<div className="relative">
				<input
					ref={internalRef}
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={handleKeyDown}
					className={cn(
						'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
						'ring-offset-background placeholder:text-muted-foreground',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
						'disabled:cursor-not-allowed disabled:opacity-50',
						className,
					)}
					{...props}
				/>

				{/* Dropdown de sugestões */}
				{showSuggestions && (
					<div
						ref={dropdownRef}
						className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md"
					>
						<div className="max-h-60 overflow-auto p-1">
							{isLoadingSuggestions
								? (
									<div className="px-3 py-2 text-sm text-muted-foreground">
										Carregando sugestões...
									</div>
								)
								: (
									filteredSuggestions.map((suggestion, index) => (
										<button
											key={suggestion.id}
											type="button"
											onClick={() => handleSuggestionClick(suggestion)}
											className={cn(
												'w-full text-left px-3 py-2 text-sm rounded-sm cursor-pointer',
												'hover:bg-accent hover:text-accent-foreground',
												'flex items-center justify-between',
												index === selectedIndex && 'bg-accent text-accent-foreground',
											)}
										>
											<span>{suggestion.value}</span>
											{suggestion.usageCount > 0 && (
												<span className="text-xs text-muted-foreground">
													{suggestion.usageCount}x
												</span>
											)}
										</button>
									))
								)}
						</div>

						{/* Hint de navegação */}
						<div className="border-t px-3 py-1.5 text-xs text-muted-foreground">
							Use ↑↓ para navegar, Enter para selecionar
						</div>
					</div>
				)}
			</div>
		)
	},
)

TagInput.displayName = 'TagInput'
