"use client"

import { useEffect, useState } from "react"

interface VisionSlideProps {
  isActive: boolean
}

export function VisionSlide({ isActive }: VisionSlideProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      setMounted(true)
    }
  }, [isActive])

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {/* Background Image - Satellite view */}
      <div className="absolute inset-0">
        <img
          src="/high-orbit-satellite-view-of-port-at-dawn--data-ar.jpg"
          alt="Satellite view of port"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/95" />
      </div>

      {/* Animated data arcs */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <path
            d="M 100 500 Q 400 200 700 500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-accent"
            strokeDasharray="10,5"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2s" repeatCount="indefinite" />
          </path>
          <path
            d="M 700 500 Q 1000 300 1300 500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
            strokeDasharray="10,5"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2.5s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-8 text-center transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="mb-8 text-sm tracking-[0.3em] text-muted-foreground uppercase">Vision</div>

        <h2 className="text-6xl md:text-7xl font-light mb-12 text-balance leading-tight">
          Mission-Critical, <span className="text-primary">Maritime AI</span>
        </h2>

        <div className="space-y-8 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-16">
          <p className="text-balance">
            We're building a <span className="text-foreground">real-time digital twin of maritime ports and ships</span>{" "}
            — a living system that senses, predicts, and acts.
          </p>
          <p className="text-balance">
            Marnexii is the <span className="text-accent">AI-powered control and decision layer</span> for harbor
            docking and port operations.
          </p>
          <p className="text-balance text-2xl">
            As global logistics move toward autonomy, we're ensuring the oceans move with them —{" "}
            <span className="text-primary">safely, efficiently, and intelligently.</span>
          </p>
        </div>

        {/* Tagline */}
        <div
          className={`transition-all duration-1000 delay-500 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="inline-block p-8 border border-primary bg-primary/5 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-light text-balance leading-tight">
              <span className="text-primary">Mission-critical, maritime AI.</span>
              <br />
              <span className="text-muted-foreground">A sensing, predictive decision-making, and control layer.</span>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className={`mt-16 transition-all duration-1000 delay-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <div className="text-6xl font-light tracking-tight">MARNEXII</div>
        </div>
      </div>
    </div>
  )
}
