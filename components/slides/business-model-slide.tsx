"use client"

import { useEffect, useState } from "react"

interface BusinessModelSlideProps {
  isActive: boolean
}

export function BusinessModelSlide({ isActive }: BusinessModelSlideProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      setMounted(true)
    }
  }, [isActive])

  const tiers = [
    {
      number: "1",
      title: "Signals",
      description:
        "Continuous edge data from our receivers and integrations. Licensed as a data feed or subscription API.",
      color: "border-accent",
      delay: "200ms",
    },
    {
      number: "2",
      title: "Predictive Modules",
      description:
        "Real-time analytics and anomaly detection designed to plug into Integration Partner, ERPs, or port systems.",
      color: "border-primary",
      delay: "400ms",
    },
    {
      number: "3",
      title: "AI Control Layer",
      description: "Fleet- and port-level decision intelligence, powering scheduling, routing, and automation.",
      color: "border-foreground",
      delay: "600ms",
    },
  ]

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />

      {/* Content */}
      <div
        className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-2xl sm:text-3xl md:text-6xl font-light mb-6 sm:mb-12 md:mb-16 text-balance leading-tight text-center">
          From <span className="text-primary">Signals</span> to <span className="text-accent">Systems</span>
        </h2>

        {/* Three-tier stack */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6 mb-6 sm:mb-8 md:mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.number}
              className={`p-4 sm:p-6 md:p-8 border-l-4 ${tier.color} bg-card/50 backdrop-blur-sm transition-all duration-700 hover:bg-card/70 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}              style={{ transitionDelay: tier.delay }}
            >
              <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
                <div className="text-3xl sm:text-4xl md:text-5xl font-light text-muted-foreground">{tier.number}</div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-light mb-2 sm:mb-3">{tier.title}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
                    {tier.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Value proposition */}
        <div className="mt-6 sm:mt-8 md:mt-12 text-center p-4 sm:p-6 md:p-8 border border-accent bg-accent/5 backdrop-blur-sm">
          <p className="text-base sm:text-lg md:text-2xl text-balance leading-relaxed">
            Each layer compounds: the more signals we own, the <span className="text-accent">smarter every connected system becomes.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
