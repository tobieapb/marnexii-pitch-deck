"use client"

import { useEffect, useState } from "react"

interface SolutionSlideProps {
  isActive: boolean
}

export function SolutionSlide({ isActive }: SolutionSlideProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      setMounted(true)
    }
  }, [isActive])

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/3d-render-of-port-with-data-overlays--radar-sweeps.jpg"
          alt="Digital twin of port"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />
      </div>

      {/* Animated data overlays */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <circle
            cx="30%"
            cy="40%"
            r="100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-accent animate-ping"
            style={{ animationDuration: "3s" }}
          />
          <circle
            cx="70%"
            cy="60%"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary animate-ping"
            style={{ animationDuration: "4s" }}
          />
          <line
            x1="30%"
            y1="40%"
            x2="70%"
            y2="60%"
            stroke="currentColor"
            strokeWidth="1"
            className="text-accent"
            strokeDasharray="5,5"
          />
        </svg>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-7xl font-light mb-6 md:mb-12 text-balance leading-tight">
          A Living <span className="text-primary">Digital Twin</span> of Ports and Ships
        </h2>

        <div className="space-y-4 md:space-y-6 text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
          <p className="text-balance">
            Marnexii turns <span className="text-foreground">real-world sensor signals</span> into a unified maritime
            AI.
          </p>
          <p className="text-balance">
            It serves as a <span className="text-accent">sensing, predictive decision-making, and control layer.</span>
          </p>
          <p className="text-balance text-lg sm:text-xl md:text-2xl text-foreground mt-6 md:mt-8">
            From dock operations to fleet movements and global surveillance -
          </p>
          <p className="text-balance text-lg sm:text-xl md:text-2xl text-foreground">
            <span className="text-primary">one real-time view</span> of the global maritime waterways.
          </p>
        </div>
      </div>
    </div>
  )
}
