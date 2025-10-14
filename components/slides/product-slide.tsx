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

      {/* Glowing UI elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-48 border border-primary rounded animate-pulse" />
        <div
          className="absolute bottom-32 right-32 w-80 h-56 border border-accent rounded animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-6xl mx-auto px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-6xl md:text-7xl font-light mb-12 text-balance leading-tight text-center">
          The System That <span className="text-primary">Sees Everything</span>
        </h2>

        <div className="text-center mb-16 space-y-4 text-xl text-muted-foreground">
          <p className="text-balance">Live edge receivers. Real data. Real-time dashboards.</p>
          <p className="text-balance text-2xl text-foreground">
            Not mockups - <span className="text-accent">operational prototypes</span> already in use.
          </p>
          <p className="text-balance text-lg mt-6">
            Geospatial awareness and capability to deploy cameras and drones allow detection of non-radio and non-vessel
            objects in the waterways.
          </p>
        </div>

        {/* Product showcase */}
        <div className="grid md:grid-cols-3 gap-6">
          <div
            className={`p-6 border border-border bg-card/50 backdrop-blur-sm transition-all duration-700 hover:border-primary ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="aspect-video bg-secondary/30 rounded mb-4 flex items-center justify-center">
              <img
                src="/maritime-station-dashboard-dark-ui-real-time-vesse.jpg"
                alt="Station Dashboard"
                className="w-full h-full object-cover rounded opacity-80"
              />
            </div>
            <h3 className="text-xl font-light mb-2">Station Dashboard</h3>
            <p className="text-sm text-muted-foreground">Real-time monitoring and analytics</p>
          </div>

          <div
            className={`p-6 border border-border bg-card/50 backdrop-blur-sm transition-all duration-700 hover:border-accent ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="aspect-video bg-secondary/30 rounded mb-4 flex items-center justify-center">
              <img
                src="/vessel-map-viewer-with-ais-tracks-dark-interface.jpg"
                alt="Vessel Map Viewer"
                className="w-full h-full object-cover rounded opacity-80"
              />
            </div>
            <h3 className="text-xl font-light mb-2">Vessel Map Viewer</h3>
            <p className="text-sm text-muted-foreground">Live positioning and route tracking</p>
          </div>

          <div
            className={`p-6 border border-border bg-card/50 backdrop-blur-sm transition-all duration-700 hover:border-primary ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="aspect-video bg-secondary/30 rounded mb-4 flex items-center justify-center">
              <img
                src="/metrics-system-with-graphs-and-kpis-dark-ui-mariti.jpg"
                alt="Metrics System"
                className="w-full h-full object-cover rounded opacity-80"
              />
            </div>
            <h3 className="text-xl font-light mb-2">Metrics System</h3>
            <p className="text-sm text-muted-foreground">Performance and efficiency tracking</p>
          </div>
        </div>
      </div>
    </div>
  )
}
