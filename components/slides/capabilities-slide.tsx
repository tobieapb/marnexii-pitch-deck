"use client"

import { useEffect, useState, useRef } from "react"
import { Radio, Camera, Waves, Radar as RadarIcon, Cloud, Droplets, Wifi, Speaker, ChevronLeft, ChevronRight } from "lucide-react"

interface CapabilitiesSlideProps {
  isActive: boolean
}

export function CapabilitiesSlide({ isActive }: CapabilitiesSlideProps) {
  const [mounted, setMounted] = useState(false)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isActive) {
      setMounted(true)

      // Scroll to second card (centered) on mobile (after a brief delay for render)
      setTimeout(() => {
        if (row1Ref.current && window.innerWidth < 768) {
          const container = row1Ref.current
          const cardElements = container.querySelectorAll('.application-card')
          if (cardElements[1]) {
            const card = cardElements[1] as HTMLElement
            const scrollLeft = card.offsetLeft - (container.clientWidth / 2) + (card.clientWidth / 2)
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
          }
        }
        if (row2Ref.current && window.innerWidth < 768) {
          const container = row2Ref.current
          const cardElements = container.querySelectorAll('.application-card')
          if (cardElements[1]) {
            const card = cardElements[1] as HTMLElement
            const scrollLeft = card.offsetLeft - (container.clientWidth / 2) + (card.clientWidth / 2)
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
          }
        }
      }, 300)
    }
  }, [isActive])

  const applications = [
    {
      title: "Dark Vessel Detection",
      description: "Detect non-AIS and invisible-to-radar small vessels from miles away. Accurately determine threat score.",
    },
    {
      title: "Critical Infrastructure and Subsea Protection",
      description:
        "Safeguard subsea cables and offshore farms from sabotage, trawling, and anchor dragging. Control, deploy, and send interdiction cues to port assets.",
    },
    {
      title: "Defense",
      description: "Maritime surveillance to protect strategic maritime zones from emerging risks and intrusions.",
    },
    {
      title: "Port and Vessel Efficiency",
      description:
        "Port control, demurrage curtailing, harbor docking, cargo loading, unloading, scheduling, and terminal operations made optimal.",
    },
    {
      title: "Illegal At-Sea Rendezvous",
      description:
        "Identify calls at sanctioned ports and illegal fuel transfers in black, grey, and high-risk areas.",
    },
    {
      title: "Fisheries Protection",
      description:
        "Accurately determine nature of attack (swap, spoof, multi positions output) initiated by vessels engaged in illegal fishing.",
    },
  ]

  const sensors = [
    { name: "AIS", icon: Radio },
    { name: "Camera", icon: Camera },
    { name: "Sonar & Hydrophone", icon: Speaker },
    { name: "VHF / SAR", icon: Waves },
    { name: "Radar", icon: RadarIcon },
    { name: "4G/5G Starlink", icon: Wifi },
    { name: "Weather", icon: Cloud },
    { name: "Environment", icon: Droplets },
  ]

  return (
    <div className="relative h-full w-full flex items-start justify-center overflow-y-auto">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/crisp-maritime-data-overlay-with-ais--weather--and.jpg"
          alt="Maritime data overlay"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/85 to-background/95" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-12 sm:pt-16 md:pt-20 pb-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-light mb-3 sm:mb-4 md:mb-6 text-center text-balance leading-tight">
          Complete maritime <span className="text-primary">observability</span> is{" "}
          <span className="text-accent">deterrence</span>.
        </h2>

        <p className="text-sm sm:text-base md:text-xl text-muted-foreground text-center mb-6 sm:mb-8 md:mb-12 max-w-4xl mx-auto">
          A multimodal AI built to see what up until now is invisible.
        </p>

        {/* Sensor Suite - Now First */}
        <div className="border-b border-border pb-4 sm:pb-6 md:pb-8 mb-6 sm:mb-8 md:mb-10">
          <h3 className="text-lg sm:text-xl md:text-2xl font-light mb-3 sm:mb-4 md:mb-6 text-center text-muted-foreground">
            Sensor Suite Across All Products
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
            {sensors.map((sensor, index) => {
              const IconComponent = sensor.icon
              return (
                <div
                  key={sensor.name}
                  className={`flex flex-col items-center gap-2 transition-all duration-500 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground text-center leading-tight">
                    {sensor.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Applications - Horizontal scroll on mobile, grid on desktop */}
        <div>
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {applications.map((app, index) => (
              <div
                key={app.title}
                className={`p-4 md:p-6 border border-border bg-card/30 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <h3 className="text-lg md:text-xl font-light mb-2 text-foreground">{app.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {app.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Horizontal Scroll - 2 rows with peek effect */}
          <div className="md:hidden space-y-3">
            {/* Row 1: First 3 cards */}
            <div className="relative">
              {/* Visual cue: Fade gradients */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              {/* Swipe hint chevrons */}
              <ChevronLeft className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 z-10 pointer-events-none animate-pulse" />
              <ChevronRight className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 z-10 pointer-events-none animate-pulse" />

              <div ref={row1Ref} className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                <div className="flex gap-3 px-2">
                  {applications.slice(0, 3).map((app, index) => (
                    <div
                      key={app.title}
                      className={`application-card flex-shrink-0 w-[47vw] p-3 sm:p-4 border border-border bg-card/30 backdrop-blur-sm snap-center transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <h3 className="text-sm sm:text-base font-light mb-1.5 sm:mb-2 text-foreground leading-tight">{app.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {app.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Last 3 cards */}
            <div className="relative">
              {/* Visual cue: Fade gradients */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              {/* Swipe hint chevrons */}
              <ChevronLeft className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 z-10 pointer-events-none animate-pulse" />
              <ChevronRight className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 z-10 pointer-events-none animate-pulse" />

              <div ref={row2Ref} className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                <div className="flex gap-3 px-2 pb-4">
                  {applications.slice(3, 6).map((app, index) => (
                    <div
                      key={app.title}
                      className={`application-card flex-shrink-0 w-[47vw] p-3 sm:p-4 border border-border bg-card/30 backdrop-blur-sm snap-center transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                      style={{ transitionDelay: `${400 + (index + 3) * 100}ms` }}
                    >
                      <h3 className="text-sm sm:text-base font-light mb-1.5 sm:mb-2 text-foreground leading-tight">{app.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {app.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
