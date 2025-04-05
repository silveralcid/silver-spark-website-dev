import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface SectionDividerProps {
  heading: string
  description: string
  ctaText?: string
  ctaHref?: string
  variant?: "default" | "accent" | "subtle"
  align?: "left" | "center" | "right"
  className?: string
}

export function SectionDivider({
  heading,
  description,
  ctaText,
  ctaHref,
  variant = "default",
  align = "center",
  className,
}: SectionDividerProps) {
  // Determine background and text colors based on variant - using only monochromatic colors
  const variantStyles = {
    default: "bg-black text-white",
    accent: "bg-white text-black border-t border-b border-gray-200",
    subtle: "bg-gray-100 text-black",
  }

  // Determine text alignment
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  return (
    <div className={cn("py-8 md:py-12", variantStyles[variant], className)}>
      <div className="section-inner">
        <div
          className={cn(
            "max-w-3xl mx-auto",
            alignStyles[align],
            align === "left" ? "ml-0 mr-auto" : align === "right" ? "ml-auto mr-0" : "",
          )}
        >
          <h4 className="text-sm md:text-base font-semibold uppercase tracking-wider mb-2">{heading}</h4>

          <p className="text-lg md:text-xl mb-4">{description}</p>

          {ctaText && ctaHref && (
            <Button
              variant={variant === "default" ? "outline" : "default"}
              size="sm"
              className={
                variant === "default"
                  ? "border-white text-white hover:bg-white/10"
                  : "bg-black text-white hover:bg-gray-800"
              }
              asChild
            >
              <Link href={ctaHref}>
                <span>{ctaText}</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

