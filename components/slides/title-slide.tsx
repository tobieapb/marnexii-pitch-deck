"use client"

import { useEffect, useState } from "react"

interface TitleSlideProps {
  isActive: boolean
}

export function TitleSlide({ isActive }: TitleSlideProps) {
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
          src="/cinematic-port-at-dusk-with-cargo-ships-and-cranes.jpg"
          alt="Port at dusk"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Radar overlay effect */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-accent rounded-full animate-ping"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-48 h-48 border border-primary rounded-full animate-ping"
          style={{ animationDuration: "4s" }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 text-balance leading-none">MARNEXII</h1>

        <p className="text-4xl md:text-5xl text-foreground max-w-3xl mx-auto leading-tight text-balance mb-6">
          Mission-critical maritime AI.
        </p>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          <span className="whitespace-nowrap">A sensing, predictive decision-making, and control layer.</span>
        </p>

        <div className="mt-16 text-xs tracking-widest text-muted-foreground uppercase animate-pulse">
          Scroll to reveal
        </div>
      </div>
    </div>
  )
}
