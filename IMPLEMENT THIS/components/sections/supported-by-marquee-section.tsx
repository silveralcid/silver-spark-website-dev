"use client"
import { HorizontalMarquee } from "@/components/ui/horizontal-marquee"

export function SupportedByMarqueeSection() {
  return (
    <section className="w-full bg-black overflow-hidden">
      {/* Full-width marquee without container constraints */}
      <div
        className="relative w-full border-t border-white/10 overflow-hidden flex items-center mt-auto"
        style={{
          zIndex: 5,
          background: "#000000" /* Solid black background */,
        }}
      >
        {/* Fade overlay at the bottom (above the marquee) */}
        <div
          className="absolute -top-[150px] left-0 right-0 h-[150px] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
            zIndex: 2,
          }}
        />

        <HorizontalMarquee
          itemClassName="text-white fill-white"
          speed={20} // Faster speed (lower number = faster)
          pauseOnHover={false}
          gap={100} // Much larger gap between icons
        />
      </div>
    </section>
  )
}

