"use client"

interface SlideNavigationProps {
  currentSlide: number
  totalSlides: number
  onSlideChange: (slide: number) => void
}

export function SlideNavigation({ currentSlide, totalSlides, onSlideChange }: SlideNavigationProps) {
  return (
    <div className="fixed bottom-4 right-2 md:right-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-50 flex flex-col gap-3">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}
