"use client"

import { useEffect, useState } from "react"

interface TeamSlideProps {
  isActive: boolean
}

export function TeamSlide({ isActive }: TeamSlideProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      setMounted(true)
    }
  }, [isActive])

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/founder-workspace-with-maritime-tracking-systems.jpeg"
          alt="Founder workspace"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-background/80 via-background/85 to-background/95 md:from-transparent md:via-background/70 md:to-background/95" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-xl sm:text-2xl md:text-6xl font-light mb-4 sm:mb-6 md:mb-16 text-balance leading-tight text-center">
          Domain Roots. <span className="text-primary">Technical Precision.</span>
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-12 items-center">
          <div
            className={`w-full md:w-auto transition-all duration-700 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="aspect-[4/3] md:aspect-square relative -mx-4 md:mx-0 overflow-hidden rounded-none md:rounded-lg">
              <img
                src="/founder-workspace-with-maritime-tracking-systems.jpeg"
                alt="Roberto Rivera"
                className="w-full h-full object-cover scale-110 md:scale-100"
              />
            </div>
          </div>

          {/* Bio */}
          <div
            className={`w-full space-y-3 md:space-y-6 transition-all duration-700 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
          >
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-3xl font-light mb-1 md:mb-2 text-center md:text-left">
                Roberto Rivera
              </h3>
              <div className="text-base sm:text-lg md:text-xl text-primary mb-3 md:mb-6 text-center md:text-left">
                Founder & CEO
              </div>
            </div>

            <div className="space-y-2 md:space-y-4 text-xs sm:text-sm md:text-lg text-muted-foreground leading-relaxed">
              <p className="text-balance">
                • From a <span className="text-foreground">seafaring family</span>; raised around ports and vessels.
              </p>
              <p className="text-balance">
                • Over <span className="text-foreground">9 years in the maritime domain</span>, specializing in harbor
                docking and port operations.
              </p>
              <p className="text-balance">
                • The past <span className="text-accent">two years dedicated exclusively</span> to advanced vessel
                monitoring and AIS data systems.
              </p>
              <p className="text-balance">
                • Deep technical expertise in{" "}
                <span className="text-foreground">PostgreSQL/PostGIS, data ingestion, and real-time analytics.</span>
              </p>
            </div>

            <div className="pt-3 md:pt-6 border-t border-border">
              <p className="text-sm sm:text-base md:text-xl text-balance leading-relaxed">
                Marnexii bridges <span className="text-primary">operational experience</span> with{" "}
                <span className="text-accent">engineering precision</span> — connecting maritime reality to AI
                infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
