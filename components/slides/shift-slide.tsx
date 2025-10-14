"use client"

import { useEffect, useState } from "react"

interface ShiftSlideProps {
  isActive: boolean
}

export function ShiftSlide({ isActive }: ShiftSlideProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      setMounted(true)
    }
  }, [isActive])

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      {/* Split screen effect */}
      <div className="relative z-10 w-full h-full flex">
        {/* Left side - Noisy data */}
        <div
          className={`w-1/2 h-full relative border-r border-border transition-all duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src="/noisy-ais-radar-feed-with-static-and-incomplete-da.jpg"
            alt="Noisy AIS feed"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50" />
          <div className="absolute bottom-12 left-12 text-2xl text-muted-foreground">Noisy AIS Feed</div>
        </div>

        {/* Right side - Clean fused data */}
        <div
          className={`w-1/2 h-full relative transition-all duration-1000 delay-300 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src="/crisp-maritime-data-overlay-with-ais--weather--and.jpg"
            alt="Fused data overlay"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/50" />
          <div className="absolute bottom-12 right-12 text-2xl text-primary">Fused Overlay</div>
        </div>
      </div>

      {/* Center content */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div
          className="backdrop-blur-sm border border-border p-12 max-w-3xl mx-8 min-h-[400px] flex flex-col justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
        >
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-balance leading-tight">
            AI is Only as Good as the <span className="text-primary">Data It Sees</span>
          </h2>

          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p className="text-balance">AI can't predict what it can't perceive.</p>
            <p className="text-balance">
              Maritime systems lack <span className="text-foreground">continuous, high-fidelity ground truth.</span>
            </p>
            <p className="text-balance text-xl text-foreground mt-6">
              Marnexii is rebuilding that foundation - <span className="text-accent">from the edge up.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
