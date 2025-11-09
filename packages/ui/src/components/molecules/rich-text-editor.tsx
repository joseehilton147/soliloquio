'use client'

import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
	Bold,
	Italic,
	List,
	ListOrdered,
	Heading2,
	Heading3,
	Quote,
	Undo,
	Redo,
	Minus,
} from 'lucide-react'
import { useEffect } from 'react'
import { cn } from '../../lib/utils'

export interface RichTextEditorProps {
	value?: string
	onChange?: (value: string) => void
	placeholder?: string
	label?: string
	description?: string
	error?: string
	disabled?: boolean
	maxLength?: number
	className?: string
	editorClassName?: string
}

/**
 * Editor de texto rico (WYSIWYG) usando Tiptap
 * Suporta formatação básica: negrito, itálico, listas, citações, etc.
 */
export function RichTextEditor({
	value = '',
	onChange,
	placeholder = 'Escreva aqui...',
	label,
	description,
	error,
	disabled = false,
	maxLength,
	className,
	editorClassName,
}: RichTextEditorProps) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: value,
		editable: !disabled,
		immediatelyRender: false, // Fix SSR hydration issues
		editorProps: {
			attributes: {
				class: cn(
					'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[200px] px-4 py-3',
					editorClassName,
				),
			},
		},
		onUpdate: ({ editor }) => {
			const html = editor.getHTML()
			onChange?.(html)
		},
	})

	// Update editor content when value changes externally
	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value)
		}
	}, [editor, value])

	const charCount = editor?.storage.characterCount?.characters() || 0
	const isOverLimit = maxLength ? charCount > maxLength : false

	return (
		<div className={cn('space-y-2', className)}>
			{/* Label */}
			{label && (
				<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					{label}
				</label>
			)}

			{/* Description */}
			{description && (
				<p className="text-sm text-muted-foreground">{description}</p>
			)}

			{/* Editor Container */}
			<div
				className={cn(
					'rounded-xl border bg-background transition-all',
					error
						? 'border-destructive/50 focus-within:border-destructive'
						: 'border-border/40 focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/10',
					disabled && 'cursor-not-allowed opacity-50',
				)}
			>
				{/* Toolbar */}
				{!disabled && editor && (
					<MenuBar editor={editor} className="border-b border-border/40 p-2" />
				)}

				{/* Editor */}
				<EditorContent
					editor={editor}
					placeholder={placeholder}
					className={cn(
						'prose-headings:font-semibold prose-headings:text-foreground',
						'prose-p:text-foreground prose-p:leading-relaxed',
						'prose-strong:text-foreground prose-strong:font-semibold',
						'prose-em:text-foreground',
						'prose-blockquote:border-l-purple-500/50 prose-blockquote:text-muted-foreground',
						'prose-ul:text-foreground prose-ol:text-foreground',
						'prose-li:text-foreground',
					)}
				/>

				{/* Character Count */}
				{maxLength && (
					<div className="flex items-center justify-end gap-2 border-t border-border/40 px-4 py-2 text-xs text-muted-foreground">
						<span className={cn(isOverLimit && 'text-destructive font-medium')}>
							{charCount} / {maxLength}
						</span>
					</div>
				)}
			</div>

			{/* Error Message */}
			{error && <p className="text-sm text-destructive">{error}</p>}
		</div>
	)
}

interface MenuBarProps {
	editor: Editor
	className?: string
}

function MenuBar({ editor, className }: MenuBarProps) {
	const buttonClass = (isActive: boolean) =>
		cn(
			'inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium transition-all',
			'hover:bg-muted/50 active:scale-95',
			isActive
				? 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-600 dark:text-purple-400'
				: 'text-muted-foreground hover:text-foreground',
			'disabled:pointer-events-none disabled:opacity-50',
		)

	return (
		<div className={cn('flex flex-wrap items-center gap-1', className)}>
			{/* Text Formatting */}
			<button
				type="button"
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				className={buttonClass(editor.isActive('bold'))}
				title="Negrito (Ctrl+B)"
			>
				<Bold className="size-4" />
			</button>

			<button
				type="button"
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				className={buttonClass(editor.isActive('italic'))}
				title="Itálico (Ctrl+I)"
			>
				<Italic className="size-4" />
			</button>

			<div className="mx-1 h-6 w-px bg-border/40" />

			{/* Headings */}
			<button
				type="button"
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={buttonClass(editor.isActive('heading', { level: 2 }))}
				title="Título 2"
			>
				<Heading2 className="size-4" />
			</button>

			<button
				type="button"
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				className={buttonClass(editor.isActive('heading', { level: 3 }))}
				title="Título 3"
			>
				<Heading3 className="size-4" />
			</button>

			<div className="mx-1 h-6 w-px bg-border/40" />

			{/* Lists */}
			<button
				type="button"
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={buttonClass(editor.isActive('bulletList'))}
				title="Lista com marcadores"
			>
				<List className="size-4" />
			</button>

			<button
				type="button"
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={buttonClass(editor.isActive('orderedList'))}
				title="Lista numerada"
			>
				<ListOrdered className="size-4" />
			</button>

			<div className="mx-1 h-6 w-px bg-border/40" />

			{/* Blockquote */}
			<button
				type="button"
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={buttonClass(editor.isActive('blockquote'))}
				title="Citação"
			>
				<Quote className="size-4" />
			</button>

			<div className="mx-1 h-6 w-px bg-border/40" />

			{/* Horizontal Rule */}
			<button
				type="button"
				onClick={() => editor.chain().focus().setHorizontalRule().run()}
				className={buttonClass(false)}
				title="Linha horizontal"
			>
				<Minus className="size-4" />
			</button>

			<div className="mx-1 h-6 w-px bg-border/40" />

			{/* Undo/Redo */}
			<button
				type="button"
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
				className={buttonClass(false)}
				title="Desfazer (Ctrl+Z)"
			>
				<Undo className="size-4" />
			</button>

			<button
				type="button"
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
				className={buttonClass(false)}
				title="Refazer (Ctrl+Y)"
			>
				<Redo className="size-4" />
			</button>
		</div>
	)
}
