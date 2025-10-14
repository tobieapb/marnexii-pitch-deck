"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SlideNavigation } from "@/components/slide-navigation"
import { TitleSlide } from "@/components/slides/title-slide"
import { ProblemSlide } from "@/components/slides/problem-slide"
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
  { id: 3, component: ShiftSlide, title: "AI is Only as Good as the Data It Sees" },
  { id: 4, component: SolutionSlide, title: "A Living Digital Twin" },
  { id: 5, component: WhyNowSlide, title: "Maritime's Anduril Moment" },
  { id: 6, component: TractionSlide, title: "Already Trusted by Operators" },
  { id: 7, component: ProductSlide, title: "The System That Sees Everything" },
  { id: 8, component: MarketSlide, title: "Trillion-Dollar System" },
  { id: 9, component: BusinessModelSlide, title: "From Signals to Systems" },
  { id: 10, component: TeamSlide, title: "Domain Roots. Technical Precision." },
  { id: 11, component: VisionSlide, title: "Mission-Critical, Maritime AI" },
]

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const [tickerPosition, setTickerPosition] = useState({ x: 0, y: 0 })
  const [isDraggingTicker, setIsDraggingTicker] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const tickerRef = useRef<HTMLDivElement>(null)

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
    const minSwipeDistance = 50

    const handleTouchStart = (e: TouchEvent) => {
      if (tickerRef.current && tickerRef.current.contains(e.target as Node)) {
        setIsDraggingTicker(true)
        setDragStart({
          x: e.touches[0].clientX - tickerPosition.x,
          y: e.touches[0].clientY - tickerPosition.y,
        })
        return // Don't process as slide swipe
      }

      setTouchEnd(null)
      setTouchStart(e.targetTouches[0].clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingTicker) {
        e.preventDefault()
        setTickerPosition({
          x: e.touches[0].clientX - dragStart.x,
          y: e.touches[0].clientY - dragStart.y,
        })
        return // Don't process as slide swipe
      }

      setTouchEnd(e.targetTouches[0].clientY)
    }

    const handleTouchEnd = () => {
      if (isDraggingTicker) {
        setIsDraggingTicker(false)
        return // Don't process as slide swipe
      }

      if (!touchStart || !touchEnd) return

      const distance = touchStart - touchEnd
      const isUpSwipe = distance > minSwipeDistance
      const isDownSwipe = distance < -minSwipeDistance

      if (isUpSwipe && currentSlide < slides.length - 1) {
        setCurrentSlide((prev) => prev + 1)
      }

      if (isDownSwipe && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1)
      }

      setTouchStart(null)
      setTouchEnd(null)
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentSlide, touchStart, touchEnd, isDraggingTicker, dragStart, tickerPosition])

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

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background"
      style={{ touchAction: "none" }}
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

      <div
        ref={tickerRef}
        className="fixed bottom-4 right-4 md:bottom-4 md:left-4 md:right-auto text-xs text-muted-foreground font-mono cursor-move md:cursor-default select-none bg-background/50 backdrop-blur-sm px-2 py-1 rounded border border-border/50"
        style={{
          transform: window.innerWidth < 768 ? `translate(${tickerPosition.x}px, ${tickerPosition.y}px)` : undefined,
          touchAction: "none",
        }}
      >
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  )
}
