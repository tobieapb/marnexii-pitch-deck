"use client"

import { useEffect, useState } from "react"

interface ProductSlideProps {
  isActive: boolean
}

export function ProductSlide({ isActive }: ProductSlideProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      setMounted(true)
    }
  }, [isActive])

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {/* Dark cinematic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />

      <div className="absolute inset-0 opacity-10 hidden md:block">
        <div className="absolute top-20 left-20 w-64 h-48 border border-primary rounded animate-pulse" />
        <div
          className="absolute bottom-32 right-32 w-80 h-56 border border-accent rounded animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div
        className={`relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-0 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-2xl sm:text-3xl md:text-7xl font-light mb-3 md:mb-12 text-balance leading-tight text-center">
          The System That <span className="text-primary">Sees Everything</span>
        </h2>

        <div className="text-center mb-4 md:mb-16 space-y-1 md:space-y-4 text-sm sm:text-base md:text-xl text-muted-foreground px-2 md:px-4">
          <p className="text-balance">Live edge receivers. Real data. Real-time dashboards.</p>
          <p className="text-balance text-base sm:text-lg md:text-2xl text-foreground">
            Not mockups - <span className="text-accent">operational prototypes</span> already in use.
          </p>
          <p className="text-balance text-xs sm:text-sm md:text-lg mt-2 md:mt-6">
            Geospatial awareness and capability to deploy cameras and drones allow detection of non-radio and non-vessel
            objects in the waterways.
          </p>
        </div>

        <div className="flex md:grid overflow-x-auto md:overflow-x-visible md:grid-cols-3 gap-3 md:gap-6 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          <div
            className={`flex-shrink-0 w-[85vw] md:w-auto snap-center p-3 md:p-6 border border-border bg-card/50 backdrop-blur-sm transition-all duration-700 hover:border-primary ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="aspect-video bg-secondary/30 rounded mb-2 md:mb-4 flex items-center justify-center">
              <img
                src="/maritime-station-dashboard-dark-ui-real-time-vesse.jpg"
                alt="Station Dashboard"
                className="w-full h-full object-cover rounded opacity-80"
              />
            </div>
            <h3 className="text-base md:text-xl font-light mb-1 md:mb-2">Station Dashboard</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Real-time monitoring and analytics</p>
          </div>

          <div
            className={`flex-shrink-0 w-[85vw] md:w-auto snap-center p-3 md:p-6 border border-border bg-card/50 backdrop-blur-sm transition-all duration-700 hover:border-accent ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="aspect-video bg-secondary/30 rounded mb-2 md:mb-4 flex items-center justify-center">
              <img
                src="/vessel-map-viewer-with-ais-tracks-dark-interface.jpg"
                alt="Vessel Map Viewer"
                className="w-full h-full object-cover rounded opacity-80"
              />
            </div>
            <h3 className="text-base md:text-xl font-light mb-1 md:mb-2">Vessel Map Viewer</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Live positioning and route tracking</p>
          </div>

          <div
            className={`flex-shrink-0 w-[85vw] md:w-auto snap-center p-3 md:p-6 border border-border bg-card/50 backdrop-blur-sm transition-all duration-700 hover:border-primary ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="aspect-video bg-secondary/30 rounded mb-2 md:mb-4 flex items-center justify-center">
              <img
                src="/metrics-system-with-graphs-and-kpis-dark-ui-mariti.jpg"
                alt="Metrics System"
                className="w-full h-full object-cover rounded opacity-80"
              />
            </div>
            <h3 className="text-base md:text-xl font-light mb-1 md:mb-2">Metrics System</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Performance and efficiency tracking</p>
          </div>
        </div>
      </div>
    </div>
  )
}
