"use client"

import { useEffect, useState } from "react"

interface ProblemSlideProps {
  isActive: boolean
}

export function ProblemSlide({ isActive }: ProblemSlideProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      setMounted(true)
    }
  }, [isActive])

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/congested-port-aerial-view-at-sunset-with-many-car.jpg"
          alt="Congested port"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>

      {/* Handwritten notes overlay */}
      <div className="absolute inset-0 opacity-5 hidden md:block">
        <div className="absolute top-20 left-20 text-6xl font-mono rotate-[-5deg] text-muted-foreground">
          Ship #4721...
        </div>
        <div className="absolute bottom-40 right-32 text-4xl font-mono rotate-[3deg] text-muted-foreground">
          Delayed 6hrs
        </div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-4 md:px-8 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-7xl font-light mb-6 md:mb-12 text-balance leading-tight">
          90% of global food, goods, and medicine move by sea, and will <span className="text-primary">always do so</span>.
        </h2>

        <div className="space-y-4 md:space-y-6 text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed">
          <p className="text-balance">
            Yet most ports operate on{" "}
            <span className="text-foreground">
              lagging, incomplete, or manually <em>"written on scratch-pads"</em> data.
            </span>
          </p>
          <p className="text-balance">
            Operators and regulators are alerted, make decisions, or threat assessments, <span className="text-foreground">hours or even days too late.</span>
          </p>
          <p className="text-balance mt-6 md:mt-8 text-xl sm:text-2xl md:text-3xl text-foreground">
            They're managing the world's most complex, critical, and delicate logistics infrastructure,... <span className="text-destructive">blindfolded.</span>
          </p>
          <p className="text-balance mt-6 md:mt-8">
            Turns out that the Oceans Run on <span className="text-muted-foreground">Blind Spots</span>
          </p>
        </div>

        <div className="mt-8 md:mt-16 text-xs md:text-sm tracking-wider text-accent uppercase">
          Blind spots cost billions.
        </div>
      </div>
    </div>
  )
}
