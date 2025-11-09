import { Slot } from '@radix-ui/react-slot'
import { cn } from '@workspace/ui/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Icon } from '@iconify/react'
import * as React from 'react'

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
	{
		variants: {
			variant: {
				default:
          'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 hover:from-purple-500 hover:to-indigo-500 active:scale-95',
				destructive:
          'bg-destructive text-white shadow-lg shadow-destructive/20 hover:bg-destructive/90 hover:shadow-xl hover:shadow-destructive/30 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 active:scale-95',
				outline:
          'border-2 border-purple-500/40 bg-gradient-to-b from-purple-500/5 to-transparent text-purple-700 dark:text-purple-300 backdrop-blur-sm shadow-sm shadow-purple-500/5 hover:border-purple-500/60 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200',
				secondary:
          'bg-gradient-to-br from-purple-200 via-purple-200 to-violet-200 text-purple-950 dark:bg-gradient-to-br dark:from-purple-900/50 dark:via-violet-900/50 dark:to-purple-900/50 dark:text-purple-50 border border-purple-300/50 dark:border-purple-700/50 shadow-sm shadow-purple-500/10 hover:from-purple-300 hover:via-violet-300 hover:to-purple-300 dark:hover:from-purple-800/60 dark:hover:via-violet-800/60 dark:hover:to-purple-800/60 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transition-all duration-200',
				ghost:
          'text-purple-700 dark:text-purple-300 hover:bg-gradient-to-br hover:from-purple-500/10 hover:via-violet-500/10 hover:to-purple-500/5 hover:text-purple-800 dark:hover:text-purple-200 hover:shadow-md hover:shadow-purple-500/10 active:scale-95 transition-all duration-200',
				link: 'text-purple-600 dark:text-purple-400 underline-offset-4 decoration-purple-500/30 hover:decoration-purple-500 hover:underline hover:text-purple-700 dark:hover:text-purple-300 hover:shadow-sm active:text-purple-800 dark:active:text-purple-200 transition-all duration-200',
				gradient:
          'bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 hover:from-purple-500 hover:via-violet-500 hover:to-indigo-500 active:scale-95 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700',
				glow:
          'bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 text-white shadow-lg shadow-purple-500/40 hover:shadow-2xl hover:shadow-violet-400/60 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-600 active:scale-95 border border-purple-400/20 hover:border-violet-300/40 transition-all duration-300',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5',
				lg: 'h-11 rounded-lg px-6 text-base has-[>svg]:px-5',
				icon: 'size-9',
				'icon-sm': 'size-8',
				'icon-lg': 'size-11',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ComponentProps<'button'>,
	VariantProps<typeof buttonVariants> {
	/**
   * Render as child element using Radix Slot
   * @default false
   */
	asChild?: boolean

	/**
   * Loading state - shows spinner and disables button
   * @default false
   */
	loading?: boolean

	/**
   * Text to show when loading (optional)
   * If not provided, original children will be shown
   */
	loadingText?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			loading = false,
			loadingText,
			children,
			disabled,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button'

		return (
			<Comp
				ref={ref}
				data-slot="button"
				className={cn(buttonVariants({ variant, size, className }))}
				disabled={disabled || loading}
				{...props}
			>
				{loading && (
					<Icon icon="lucide:loader-2" className="size-4 animate-spin" aria-hidden="true" />
				)}
				{loading && loadingText ? loadingText : children}
			</Comp>
		)
	},
)

Button.displayName = 'Button'

export { Button, buttonVariants }
