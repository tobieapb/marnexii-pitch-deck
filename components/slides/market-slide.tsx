"use client"

import { useEffect, useState } from "react"

interface MarketSlideProps {
  isActive: boolean
}

export function MarketSlide({ isActive }: MarketSlideProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      setMounted(true)
    }
  }, [isActive])

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/aerial-view-of-cargo-ships-waiting-at-port--expens.jpg"
          alt="Waiting vessels"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-6xl mx-auto px-4 md:px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-xl sm:text-2xl md:text-6xl font-light mb-3 sm:mb-6 md:mb-12 text-balance leading-tight">
          A <span className="text-primary">Trillion-Dollar System,</span> Slowed by Billion-Dollar Inefficiencies
        </h2>

        <div className="grid md:grid-cols-2 gap-3 sm:gap-6 md:gap-12 mb-4 sm:mb-6 md:mb-12">
          {/* Left side - The problem */}
          <div
            className={`grid grid-cols-2 gap-2 sm:gap-3 md:block md:space-y-6 transition-all duration-700 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="p-3 sm:p-4 md:p-8 border-l-4 border-destructive bg-card/50 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl md:text-5xl font-light mb-1 text-destructive">$75K</div>
              <div className="text-xs sm:text-sm md:text-lg text-muted-foreground">per day, per idle vessel</div>
            </div>

            <div className="p-3 sm:p-4 md:p-8 border-l-4 border-destructive bg-card/50 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl md:text-5xl font-light mb-1 text-destructive">$5-10M</div>
              <div className="text-xs sm:text-sm md:text-lg text-muted-foreground">daily delays in large ports</div>
            </div>
          </div>

          {/* Right side - The opportunity */}
          <div
            className={`space-y-3 sm:space-y-4 md:space-y-6 transition-all duration-700 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="p-3 sm:p-4 md:p-8 border-l-4 border-accent bg-card/50 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl md:text-5xl font-light mb-1 text-accent">$100B+</div>
              <div className="text-xs sm:text-sm md:text-lg text-muted-foreground">annual global inefficiencies</div>
            </div>

            <div className="text-xs sm:text-sm md:text-lg text-muted-foreground leading-relaxed">
              <p className="text-balance mb-2 sm:mb-3 md:mb-4">
                Across global trade, inefficiencies exceed <span className="text-foreground">$100B annually</span> -
                before emissions or throughput losses.
              </p>
              <p className="text-balance text-sm sm:text-base md:text-xl text-foreground">
                Marnexii targets the <span className="text-primary">invisible layer beneath that:</span> the data and
                decision infrastructure determining how ships move and ports breathe.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center p-3 sm:p-4 md:p-8 border border-primary bg-primary/5 backdrop-blur-sm">
          <p className="text-sm sm:text-base md:text-2xl text-balance leading-relaxed">
            By fusing real-time signals into predictive control, we unlock value across{" "}
            <span className="text-primary">every maritime operation</span> - from docking to dispatch, terminal
            management, port operations, and offshore law enforcement interest including unsanctioned fuel transfers and
            illicit rendezvous.
          </p>
        </div>
      </div>
    </div>
  )
}
