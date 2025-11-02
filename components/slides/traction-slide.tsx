"use client"

import { useEffect, useState } from "react"
import { Play } from "lucide-react"

interface TractionSlideProps {
  isActive: boolean
}

export function TractionSlide({ isActive }: TractionSlideProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      setMounted(true)
    }
  }, [isActive])

  const partners = ["* Tug operator with over 50 vessels", "* Tug operator with 10 vessels", "* Integration Partners"]

  return (
    <div className="relative h-full w-full flex items-start justify-center overflow-y-auto">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/map-of-major-ports-with-glowing-connection-points-.jpg"
          alt="Port map"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 pt-24 sm:pt-80 xl:pt-12 pb-6 md:pb-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2
          className="text-2xl sm:text-3xl md:text-6xl font-light mb-3 sm:mb-4 md:mb-6 text-center text-balance leading-tight text-foreground relative z-50"
        >
          <br />
          Product Demo
        </h2>

        <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-light mb-2 sm:mb-3 md:mb-4 text-accent">Pilots and Partnerships</h3>
            <div className="space-y-1 sm:space-y-2">
              {partners.map((partner, index) => (
                <div
                  key={partner}
                  className={`text-sm sm:text-base md:text-xl text-muted-foreground transition-all duration-500 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  • {partner}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 md:space-y-4 text-xs sm:text-sm md:text-lg text-muted-foreground leading-relaxed">
            <p className="text-balance">
              Active build at <span className="text-primary">Fort Mason</span> (personally in San Francisco until Nov
              8th for Founders, Inc's Blueprint).
            </p>
            <p className="text-balance">
              Live ingestion, analytics, and visualization prototypes <span className="text-accent">deployed.</span>
            </p>
            <p className="text-balance text-xs sm:text-sm md:text-base italic mt-3 sm:mt-4 md:mt-6 text-muted-foreground/80">
              * Under NDA - will be disclosed at launch
            </p>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 md:mt-8 p-3 sm:p-4 md:p-6 border border-border bg-card/50 backdrop-blur-sm">
          <div className="text-xs md:text-sm text-muted-foreground mb-1 sm:mb-2 md:mb-3">
            Live Product Video
            <span className="block text-xs mt-1 text-accent">
              Note: The visualization shown is an internal monitoring tool developed by MARNEXII to show what the system
              is currently perceiving, not the final product interface.
            </span>
          </div>
          <a
            href="https://x.com/tobieapb/status/1982900207298998482"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-video bg-secondary/30 rounded overflow-hidden group cursor-pointer"
          >
            <img
              src="/sf-bay-vessel-tracking-with-trackline.jpeg"
              alt="Product demo video preview showing vessel tracking with red trackline in San Francisco Bay"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </div>
          </a>
          <div className="text-xs text-center text-muted-foreground mt-2">Click to watch full demo on X</div>
        </div>
      </div>
    </div>
  )
}
