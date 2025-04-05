import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  alignment?: "left" | "center" | "right"
  className?: string
}

export function SectionHeading({ title, subtitle, alignment = "left", className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        alignment === "center" && "text-center",
        alignment === "right" && "text-right",
        className,
      )}
    >
      <h2 className="heading-2">{title}</h2>
      {subtitle && <p className="body-large opacity-80 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  )
}

