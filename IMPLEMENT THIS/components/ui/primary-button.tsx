import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { forwardRef } from "react"
import { ChevronRight } from "lucide-react"

export interface PrimaryButtonProps extends ButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  showArrow?: boolean
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, variant = "default", showArrow = false, children, asChild = false, ...props }, ref) => {
    const buttonClasses = cn(
      "bg-gradient-to-r from-orange-700 to-amber-600 hover:from-orange-800 hover:to-amber-700",
      "text-white font-medium border-none transition-all duration-300",
      "shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
      "px-6 py-3 h-auto",
      className,
    )

    // When asChild is true, we just pass the children directly to Button with asChild
    if (asChild) {
      return (
        <Button ref={ref} className={buttonClasses} asChild={true} {...props}>
          {children}
        </Button>
      )
    }

    // When asChild is false, we can add the arrow if needed
    return (
      <Button ref={ref} className={buttonClasses} {...props}>
        <span className="flex items-center justify-center">
          {children}
          {showArrow && (
            <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
      </Button>
    )
  },
)

PrimaryButton.displayName = "PrimaryButton"

