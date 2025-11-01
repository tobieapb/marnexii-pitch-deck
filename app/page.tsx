"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SlideNavigation } from "@/components/slide-navigation"
import { TitleSlide } from "@/components/slides/title-slide"
import { ProblemSlide } from "@/components/slides/problem-slide"
import { CapabilitiesSlide } from "@/components/slides/capabilities-slide"
import { ShiftSlide } from "@/components/slides/shift-slide"
import { SolutionSlide } from "@/components/slides/solution-slide"
import { WhyNowSlide } from "@/components/slides/why-now-slide"
import { TractionSlide } from "@/components/slides/traction-slide"
import { ProductSlide } from "@/components/slides/product-slide"
import { MarketSlide } from "@/components/slides/market-slide"
import { BusinessModelSlide } from "@/components/slides/business-model-slide"
import { TeamSlide } from "@/components/slides/team-slide"
import { VisionSlide } from "@/components/slides/vision-slide"

const slides = [
  { id: 1, component: TitleSlide, title: "Mission-Critical Maritime AI" },
  { id: 2, component: ProblemSlide, title: "The Oceans Run on Blind Spots" },
  { id: 3, component: CapabilitiesSlide, title: "Complete Maritime Observability" },
  { id: 4, component: ShiftSlide, title: "AI is Only as Good as the Data It Sees" },
  { id: 5, component: SolutionSlide, title: "A Living Digital Twin of Ports, Ships, Sea, and Subsea" },
  { id: 6, component: WhyNowSlide, title: "Maritime's Anduril Moment" },
  { id: 7, component: TractionSlide, title: "Already Trusted by Operators" },
  { id: 8, component: ProductSlide, title: "The System That Sees Everything" },
  { id: 9, component: MarketSlide, title: "Trillion-Dollar System" },
  { id: 10, component: BusinessModelSlide, title: "From Signals to Systems" },
  { id: 11, component: TeamSlide, title: "Domain Roots. Technical Precision." },
  { id: 12, component: VisionSlide, title: "Vision" },
]

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)

  // <CHANGE> Add touch event state tracking for mobile swipe detection
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return

      e.preventDefault()

      if (e.deltaY > 0 && currentSlide < slides.length - 1) {
        setIsScrolling(true)
        setCurrentSlide((prev) => prev + 1)
        setTimeout(() => setIsScrolling(false), 800)
      } else if (e.deltaY < 0 && currentSlide > 0) {
        setIsScrolling(true)
        setCurrentSlide((prev) => prev - 1)
        setTimeout(() => setIsScrolling(false), 800)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSlide, isScrolling])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "ArrowDown" || e.key === "ArrowRight") && currentSlide < slides.length - 1) {
        setCurrentSlide((prev) => prev + 1)
      } else if ((e.key === "ArrowUp" || e.key === "ArrowLeft") && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide])

  // <CHANGE> Add touch event handlers for mobile swipe navigation
  useEffect(() => {
    // Minimum swipe distance (in px) to trigger slide change
    const minSwipeDistance = 50

    const handleTouchStart = (e: TouchEvent) => {
      setTouchEnd(null) // Reset touch end
      setTouchStart(e.targetTouches[0].clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientY)
    }

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return
      
      const distance = touchStart - touchEnd
      const isUpSwipe = distance > minSwipeDistance
      const isDownSwipe = distance < -minSwipeDistance

      if (isUpSwipe && currentSlide < slides.length - 1) {
        // Swiped up - go to next slide
        setCurrentSlide(prev => prev + 1)
      }
      
      if (isDownSwipe && currentSlide > 0) {
        // Swiped down - go to previous slide
        setCurrentSlide(prev => prev - 1)
      }

      // Reset touch state
      setTouchStart(null)
      setTouchEnd(null)
    }

    // Add touch event listeners
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentSlide, slides.length, touchStart, touchEnd])

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translateY(-${currentSlide * 100}vh)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="h-screen w-full">
            <slide.component isActive={index === currentSlide} />
          </div>
        ))}
      </div>

      <SlideNavigation currentSlide={currentSlide} totalSlides={slides.length} onSlideChange={setCurrentSlide} />

      {currentSlide < slides.length - 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground animate-bounce"
          onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))}
        >
          <ChevronDown className="h-8 w-8" />
        </Button>
      )}

      <div className="fixed bottom-4 left-4 text-xs text-muted-foreground font-mono">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  )
}
