import Image from "next/image"
import { cn } from "@/lib/utils"

export interface ClientLogo {
  src: string
  alt: string
  width: number
  height: number
}

interface ClientLogosProps {
  logos: ClientLogo[]
  className?: string
  showNames?: boolean
}

export function ClientLogos({ logos, className, showNames = false }: ClientLogosProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16", className)}>
      {logos.map((logo, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="h-12 w-auto opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
            <Image
              src={logo.src || "/placeholder.svg"}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-full w-auto object-contain"
            />
          </div>
          {showNames && <span className="mt-2 text-xs text-gray-400">{logo.alt}</span>}
        </div>
      ))}
    </div>
  )
}

