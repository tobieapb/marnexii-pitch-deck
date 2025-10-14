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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/70 to-background/95" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-5xl md:text-6xl font-light mb-16 text-balance leading-tight text-center">
          Domain Roots. <span className="text-primary">Technical Precision.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-700 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="aspect-square" />
          </div>

          {/* Bio */}
          <div
            className={`space-y-6 transition-all duration-700 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <div>
              <h3 className="text-3xl font-light mb-2">Roberto Rivera</h3>
              <div className="text-xl text-primary mb-6">Founder & CEO</div>
            </div>

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
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

            <div className="pt-6 border-t border-border">
              <p className="text-xl text-balance leading-relaxed">
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
