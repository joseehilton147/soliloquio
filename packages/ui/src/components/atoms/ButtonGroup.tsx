import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

/**
 * **ButtonGroup Component**
 *
 * Groups related buttons together with connected styling.
 * Automatically handles border-radius for first/last child.
 * Inspired by shadcn/ui and Chakra UI patterns.
 */

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Buttons to group together
   */
  children: React.ReactNode

  /**
   * Orientation of the button group
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical"

  /**
   * Whether buttons are attached (no gap)
   * @default true
   */
  attached?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { className, children, orientation = "horizontal", attached = true, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          attached
            ? orientation === "horizontal"
              ? "[&>button:not(:first-child)]:rounded-l-none [&>button:not(:first-child)]:-ml-px [&>button:not(:last-child)]:rounded-r-none"
              : "[&>button:not(:first-child)]:rounded-t-none [&>button:not(:first-child)]:-mt-px [&>button:not(:last-child)]:rounded-b-none"
            : orientation === "horizontal"
              ? "gap-2"
              : "gap-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
