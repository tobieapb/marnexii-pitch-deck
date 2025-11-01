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
        className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="mb-3 sm:mb-6 md:mb-8 text-xs sm:text-sm tracking-[0.3em] text-muted-foreground uppercase">
          Vision
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-7xl font-light mb-6 sm:mb-8 md:mb-12 text-balance leading-tight">
          Complete maritime <span className="text-primary">observability</span> is <span className="text-accent">deterrence</span>.
        </h2>

        <div className="space-y-3 sm:space-y-6 md:space-y-8 text-sm sm:text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-12 md:mb-16">
          <p className="text-balance">
            We're building a <span className="text-foreground">real-time digital twin of maritime ports and ships</span>{" "}
            — a living system that senses, predicts, and acts.
          </p>
          <p className="text-balance">
            Marnexii is the <span className="text-accent">AI-powered control and decision layer</span> for sea and subsea operations, surveillance, and coordination.
          </p>
          <p className="text-balance sm:text-xl md:text-2xl">
            As global logistics and security move toward autonomy, we're ensuring the oceans move with them —{" "}
            <span className="text-primary">safely, efficiently, and intelligently.</span>
          </p>
        </div>

        {/* Tagline */}
        <div
          className={`transition-all duration-1000 delay-500 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="inline-block p-4 sm:p-6 md:p-8 border border-primary bg-primary/5 backdrop-blur-sm">
            <div className="text-base sm:text-xl md:text-4xl font-light text-balance leading-tight">
              <span className="text-primary">Mission-critical maritime AI for sea and subsea operations, surveillance, & drone control.</span>
              <br />
              <span className="text-muted-foreground">A sensing, predictive decision-making, and control layer.</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`mt-6 sm:mt-12 md:mt-16 transition-all duration-1000 delay-700 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          <div className="border-t border-border pt-4 sm:pt-6 md:pt-8 max-w-3xl mx-auto">
            <div className="text-xl sm:text-2xl md:text-3xl font-light mb-2 sm:mb-3 md:mb-4">Let's Talk</div>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4 md:mb-6">
              Request a demo or schedule a meeting to discuss deployment in your port or region.
            </p>
            <div className="text-sm sm:text-base md:text-lg text-primary">
              <a href="mailto:roberto@marnexii.com" className="hover:text-accent transition-colors">
                roberto@marnexii.com
              </a>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div
          className={`mt-4 sm:mt-6 md:mt-8 transition-all duration-1000 delay-900 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          <div className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight">MARNEXII</div>
        </div>
      </div>
    </div>
  )
}
