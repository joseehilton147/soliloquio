import * as React from "react"
import * as LucideIcons from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

/**
 * **Icon Component**
 *
 * Responsivo icon atom que renderiza ícones do lucide-react por nome.
 * Integra perfeitamente com Button e outros componentes.
 *
 * @example
 * ```tsx
 * <Icon name="Heart" size="md" />
 * <Icon name="Sparkles" className="text-purple-500" />
 * <Button size="icon"><Icon name="X" /></Button>
 * ```
 */

export type LucideIconName = keyof typeof LucideIcons

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Nome do ícone do lucide-react
   * @example "Heart", "Sparkles", "ArrowRight"
   */
  name: LucideIconName

  /**
   * Tamanho do ícone (responsivo)
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl"

  /**
   * Espessura do stroke
   * @default 2
   */
  strokeWidth?: number
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = "md", strokeWidth = 2, className, ...props }, ref) => {
    const IconComponent = LucideIcons[name] as React.ComponentType<LucideIcons.LucideProps>

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in lucide-react`)
      return null
    }

    const sizeClasses = {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    }

    return (
      <IconComponent
        ref={ref}
        className={cn(sizeClasses[size], className)}
        strokeWidth={strokeWidth}
        {...props}
      />
    )
  }
)

Icon.displayName = "Icon"

export { Icon }
