"use client"

import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <>
        <style jsx global>{`
          .btn-glow {
            animation: pulse-glow 2s infinite;
          }
          
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 10px 2px rgba(234, 88, 12, 0.5);
            }
            50% {
              box-shadow: 0 0 20px 5px rgba(234, 88, 12, 0.8);
            }
          }
          
          .btn-glow:hover {
            background: linear-gradient(to right, #c2410c, #d97706);
            color: white !important; /* Force white text on hover */
          }
          
          /* Ensure button is responsive */
          @media (max-width: 640px) {
            .btn-glow {
              padding: 0.75rem 1.5rem;
              font-size: 1rem;
            }
          }
        `}</style>
        <Comp
          className={cn(
            "relative inline-flex items-center justify-center mt-4 px-8 py-6 h-auto text-lg font-medium",
            "text-black bg-white rounded-md overflow-hidden",
            "transition-colors ease-in-out",
            "btn-glow",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      </>
    )
  },
)
AnimatedButton.displayName = "AnimatedButton"

export { AnimatedButton }

