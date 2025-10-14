"use client"

import { useEffect, useState } from "react"

interface WhyNowSlideProps {
  isActive: boolean
}

export function WhyNowSlide({ isActive }: WhyNowSlideProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      setMounted(true)
    }
  }, [isActive])

  const timeline = [
    { year: "2021", event: "Ever Given blocks the Suez Canal - halts $9B/day in trade", color: "text-destructive" },
    { year: "2022", event: "Russia invades Ukraine - global sanctions reshape commodities", color: "text-accent" },
    { year: "2023", event: "Red Sea attacks and rerouted vessels - new chokepoints emerge", color: "text-primary" },
    {
      year: "2024",
      event: "Baltimore bridge collapse - disrupts critical U.S. port traffic",
      color: "text-foreground",
    },
  ]

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />

      {/* Content */}
      <div
        className={`relative z-10 max-w-6xl mx-auto px-4 md:px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-7xl font-light mb-4 sm:mb-6 md:mb-16 text-balance leading-tight">
          Maritime's <span className="text-primary">Anduril Moment</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-12 mb-6 sm:mb-8 md:mb-16">
          <div className="space-y-2 sm:space-y-3 md:space-y-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            <p className="text-balance">
              Global trade strains, emissions rules, and AI-native infrastructure are{" "}
              <span className="text-foreground">converging.</span>
            </p>
            <p className="text-balance">
              Hardware costs are down, <span className="text-accent">edge compute is up.</span>
            </p>
          </div>
          <div className="space-y-2 sm:space-y-3 md:space-y-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            <p className="text-balance">
              Ports are becoming <span className="text-primary">networks, not facilities.</span>
            </p>
            <p className="text-balance text-base sm:text-lg md:text-xl text-foreground">
              The next decade of shipping will be defined by who controls the{" "}
              <span className="text-accent">data layer.</span>
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mb-6 sm:mb-8 md:mb-16">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-muted-foreground/40" />
          <div className="relative flex flex-col md:flex-row md:justify-between gap-4 sm:gap-6 md:gap-0">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`flex flex-row md:flex-col items-start md:items-center gap-3 md:gap-0 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${item.color} bg-current flex-shrink-0 md:mb-4`} />
                <div className="flex-1 flex items-baseline gap-2 md:flex-col md:items-center md:gap-0">
                  <div className="text-lg sm:text-xl md:text-2xl font-light md:mb-2">{item.year}</div>
                  <div className={`text-xs sm:text-sm ${item.color} md:text-center`}>{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:mt-12 p-4 md:p-8 border border-accent/30 bg-card/50 backdrop-blur-sm">
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-balance text-center">
            Data is an evergreen part of the AI process. Big model makers are mostly set (OpenAI, Anthropic, xAI, etc),
            but they will always need new data to train and ground their models on.
          </p>
        </div>
      </div>
    </div>
  )
}
