# iPhone Responsiveness Update - Porting Changes to Main Branch

This document details the steps required to port the responsive design changes from the `iphone` branch to the `main` branch of the Marnexii Pitch Deck project. These changes primarily focus on improving the user experience on smaller screen sizes, including iPhones and other mobile devices.

**Important Note:** This document outlines manual steps to apply the changes. Ensure you have a clean working directory on the `main` branch before proceeding.

## Files to be Modified

The following files need to be updated:

1.  `app/globals.css`
2.  `app/page.tsx`
3.  `components/slide-navigation.tsx`
4.  `components/slides/business-model-slide.tsx`
5.  `components/slides/market-slide.tsx`
6.  `components/slides/problem-slide.tsx`
7.  `components/slides/product-slide.tsx`
8.  `components/slides/solution-slide.tsx`
9.  `components/slides/team-slide.tsx`
10. `components/slides/title-slide.tsx`
11. `components/slides/traction-slide.tsx`
12. `components/slides/vision-slide.tsx`
13. `components/slides/why-now-slide.tsx`

---

## Detailed Changes per File

### 1. `app/globals.css`

**Purpose:** Add CSS rules to hide scrollbars on mobile for a cleaner look.

**Change:** Append the following CSS to the end of the file:

```css
/* Hide scrollbar for horizontal card carousel on mobile */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

---

### 2. `app/page.tsx`

**Purpose:** Implement touch event handling for swipe navigation and prevent native scrolling on mobile.

**Changes:**

**a. Add touch state tracking:**
   Locate the line:
   ```typescript
   const [isScrolling, setIsScrolling] = useState(false)
   ```
   Replace it with:
   ```typescript
   const [isScrolling, setIsScrolling] = useState(false)

   // <CHANGE> Add touch event state tracking for mobile swipe detection
   const [touchStart, setTouchStart] = useState<number | null>(null)
   const [touchEnd, setTouchEnd] = useState<number | null>(null)
   ```

**b. Add touch event handlers:**
   Locate the `useEffect` hook for keyboard events (it ends with `}, [currentSlide])`).
   After this `useEffect` block, add the following `useEffect` block for touch events:

   ```typescript
   useEffect(() => {
     const minSwipeDistance = 50

     const handleTouchStart = (e: TouchEvent) => {
       setTouchEnd(null)
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
   }, [currentSlide, touchStart, touchEnd])
   ```

**c. Prevent default scroll on mobile:**
   Locate the main container `div`:
   ```html
   <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-background">
   ```
   Replace it with:
   ```html
   <div 
     ref={containerRef}
     className="relative h-screen w-full overflow-hidden bg-background"
     style={{ touchAction: 'none' }} // Prevents native scroll/zoom on mobile
   >
   ```

---

### 3. `components/slide-navigation.tsx`

**Purpose:** Adjust the positioning of the slide navigation for mobile screens.

**Change:**
   Locate the line:
   ```typescript
   <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
   ```
   Replace it with:
   ```typescript
   <div className="fixed bottom-4 right-2 md:right-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-50 flex flex-col gap-3">
   ```

---

### 4. `components/slides/business-model-slide.tsx`

**Purpose:** Apply responsive padding, font sizes, and spacing.

**Changes:**

**a. Update main content container:**
   Locate the line:
   ```typescript
   className={`relative z-10 max-w-6xl mx-auto px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```
   Replace it with:
   ```typescript
   className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```

**b. Update heading:**
   Locate the line:
   ```typescript
   <h2 className="text-5xl md:text-6xl font-light mb-16 text-balance leading-tight text-center">
   ```
   Replace it with:
   ```typescript
   <h2 className="text-2xl sm:text-3xl md:text-6xl font-light mb-6 sm:mb-12 md:mb-16 text-balance leading-tight text-center">
   ```

**c. Update tiers container:**
   Locate the line:
   ```typescript
   <div className="space-y-6 mb-12">
   ```
   Replace it with:
   ```typescript
   <div className="space-y-3 sm:space-y-4 md:space-y-6 mb-6 sm:mb-8 md:mb-12">
   ```

**d. Update tier item padding:**
   Locate the line:
   ```typescript
   className={`p-8 border-l-4 ${tier.color} bg-card/50 backdrop-blur-sm transition-all duration-700 hover:bg-card/70 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
   ```
   Replace it with:
   ```typescript
   className={`p-4 sm:p-6 md:p-8 border-l-4 ${tier.color} bg-card/50 backdrop-blur-sm transition-all duration-700 hover:bg-card/70 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
   ```

**e. Update tier item gap:**
   Locate the line:
   ```typescript
   <div className="flex items-start gap-6">
   ```
   Replace it with:
   ```typescript
   <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
   ```

**f. Update tier item number font size:**
   Locate the line:
   ```typescript
   <div className="text-5xl font-light text-muted-foreground">{tier.number}</div>
   ```
   Replace it with:
   ```typescript
   <div className="text-3xl sm:text-4xl md:text-5xl font-light text-muted-foreground">{tier.number}</div>
   ```

**g. Update tier item title font size:**
   Locate the line:
   ```typescript
   <h3 className="text-2xl font-light mb-3">{tier.title}</h3>
   ```
   Replace it with:
   ```typescript
   <h3 className="text-lg sm:text-xl md:text-2xl font-light mb-2 sm:mb-3">{tier.title}</h3>
   ```

**h. Update tier item description font size:**
   Locate the line:
   ```typescript
   <p className="text-lg text-muted-foreground leading-relaxed text-balance">{tier.description}</p>
   ```
   Replace it with:
   ```typescript
   <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
     {tier.description}
   </p>
   ```

**i. Update partner ecosystem text:**
   Locate the line:
   ```typescript
   <div className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">Partner Ecosystem</div>
   ```
   Replace it with:
   ```typescript
   <div className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4 uppercase tracking-wider">
     Partner Ecosystem
   </div>
   ```

**j. Update partner ecosystem gap and font size:**
   Locate the line:
   ```typescript
   <div className="flex justify-center gap-8 text-xl">
   ```
   Replace it with:
   ```typescript
   <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 text-base sm:text-lg md:text-xl">
   ```

**k. Update value proposition container:**
   Locate the line:
   ```typescript
   <div className="mt-12 text-center p-8 border border-accent bg-accent/5 backdrop-blur-sm">
   ```
   Replace it with:
   ```typescript
   <div className="mt-6 sm:mt-8 md:mt-12 text-center p-4 sm:p-6 md:p-8 border border-accent bg-accent/5 backdrop-blur-sm">
   ```

**l. Update value proposition text:**
   Locate the line:
   ```typescript
   <p className="text-2xl text-balance leading-relaxed">
   ```
   Replace it with:
   ```typescript
   <p className="text-base sm:text-lg md:text-2xl text-balance leading-relaxed">
   ```

---

### 5. `components/slides/market-slide.tsx`

**Purpose:** Apply responsive padding, font sizes, and grid layout.

**Changes:**

**a. Update main content container:**
   Locate the line:
   ```typescript
   className={`relative z-10 max-w-6xl mx-auto px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```
   Replace it with:
   ```typescript
   className={`relative z-10 max-w-6xl mx-auto px-4 md:px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```

**b. Update heading:**
   Locate the line:
   ```typescript
   <h2 className="text-5xl md:text-6xl font-light mb-12 text-balance leading-tight">
   ```
   Replace it with:
   ```typescript
   <h2 className="text-xl sm:text-2xl md:text-6xl font-light mb-3 sm:mb-6 md:mb-12 text-balance leading-tight">
   ```

**c. Update grid container:**
   Locate the line:
   ```typescript
   <div className="grid md:grid-cols-2 gap-12 mb-12">
   ```
   Replace it with:
   ```typescript
   <div className="grid md:grid-cols-2 gap-3 sm:gap-6 md:gap-12 mb-4 sm:mb-6 md:mb-12">
   ```

**d. Update left side container:**
   Locate the line:
   ```typescript
   className={`space-y-6 transition-all duration-700 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
   ```
   Replace it with:
   ```typescript
   className={`grid grid-cols-2 gap-2 sm:gap-3 md:block md:space-y-6 transition-all duration-700 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
   ```

**e. Update problem item padding:**
   Locate the line:
   ```typescript
   <div className="p-8 border-l-4 border-destructive bg-card/50 backdrop-blur-sm">
   ```
   Replace it with:
   ```typescript
   <div className="p-3 sm:p-4 md:p-8 border-l-4 border-destructive bg-card/50 backdrop-blur-sm">
   ```

**f. Update problem item value font size:**
   Locate the line:
   ```typescript
   <div className="text-5xl font-light mb-2 text-destructive">$75K</div>
   ```
   Replace it with:
   ```typescript
   <div className="text-2xl sm:text-3xl md:text-5xl font-light mb-1 text-destructive">$75K</div>
   ```

**g. Update problem item description font size:**
   Locate the line:
   ```typescript
   <div className="text-lg text-muted-foreground">per day, per idle vessel</div>
   ```
   Replace it with:
   ```typescript
   <div className="text-xs sm:text-sm md:text-lg text-muted-foreground">per day, per idle vessel</div>
   ```

**h. Update opportunity item padding:**
   Locate the line:
   ```typescript
   <div className="p-8 border-l-4 border-accent bg-card/50 backdrop-blur-sm">
   ```
   Replace it with:
   ```typescript
   <div className="p-3 sm:p-4 md:p-8 border-l-4 border-accent bg-card/50 backdrop-blur-sm">
   ```

**i. Update opportunity item value font size:**
   Locate the line:
   ```typescript
   <div className="text-5xl font-light mb-2 text-accent">$100B+</div>
   ```
   Replace it with:
   ```typescript
   <div className="text-2xl sm:text-3xl md:text-5xl font-light mb-1 text-accent">$100B+</div>
   ```

**j. Update opportunity item description font size:**
   Locate the line:
   ```typescript
   <div className="text-lg text-muted-foreground leading-relaxed">
   ```
   Replace it with:
   ```typescript
   <div className="text-xs sm:text-sm md:text-lg text-muted-foreground leading-relaxed">
   ```

**k. Update opportunity paragraph margin:**
   Locate the line:
   ```typescript
   <p className="text-balance mb-4">
   ```
   Replace it with:
   ```typescript
   <p className="text-balance mb-2 sm:mb-3 md:mb-4">
   ```

**l. Update opportunity paragraph font size:**
   Locate the line:
   ```typescript
   <p className="text-balance text-xl text-foreground">
   ```
   Replace it with:
   ```typescript
   <p className="text-balance text-sm sm:text-base md:text-xl text-foreground">
   ```

**m. Update call to action container:**
   Locate the line:
   ```typescript
   <div className="text-center p-8 border border-primary bg-primary/5 backdrop-blur-sm">
   ```
   Replace it with:
   ```typescript
   <div className="text-center p-3 sm:p-4 md:p-8 border border-primary bg-primary/5 backdrop-blur-sm">
   ```

**n. Update call to action text:**
   Locate the line:
   ```typescript
   <p className="text-2xl text-balance leading-relaxed">
   ```
   Replace it with:
   ```typescript
   <p className="text-sm sm:text-base md:text-2xl text-balance leading-relaxed">
   ```

---

### 6. `components/slides/problem-slide.tsx`

**Purpose:** Apply responsive padding, font sizes, and hide handwritten notes on mobile.

**Changes:**

**a. Hide handwritten notes on mobile:**
   Locate the line:
   ```typescript
   <div className="absolute inset-0 opacity-5">
   ```
   Replace it with:
   ```typescript
   <div className="absolute inset-0 opacity-5 hidden md:block">
   ```

**b. Update main content container:**
   Locate the line:
   ```typescript
   className={`relative z-10 max-w-5xl mx-auto px-8 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```
   Replace it with:
   ```typescript
   className={`relative z-10 max-w-5xl mx-auto px-4 md:px-8 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```

**c. Update heading:**
   Locate the line:
   ```typescript
   <h2 className="text-6xl md:text-7xl font-light mb-12 text-balance leading-tight">
   ```
   Replace it with:
   ```typescript
   <h2 className="text-3xl sm:text-4xl md:text-7xl font-light mb-6 md:mb-12 text-balance leading-tight">
   ```

**d. Update text container:**
   Locate the line:
   ```typescript
   <div className="space-y-6 text-xl md:text-2xl text-muted-foreground leading-relaxed">
   ```
   Replace it with:
   ```typescript
   <div className="space-y-4 md:space-y-6 text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed">
   ```

**e. Update emphasized paragraph:**
   Locate the line:
   ```typescript
   <p className="text-balance mt-8 text-3xl text-foreground">
   ```
   Replace it with:
   ```typescript
   <p className="text-balance mt-6 md:mt-8 text-xl sm:text-2xl md:text-3xl text-foreground">
   ```

**f. Update call to action:**
   Locate the line:
   ```typescript
   <div className="mt-16 text-sm tracking-wider text-accent uppercase">Blind spots cost billions.</div>
   ```
   Replace it with:
   ```typescript
   <div className="mt-8 md:mt-16 text-xs md:text-sm tracking-wider text-accent uppercase">
     Blind spots cost billions.
   </div>
   ```

---

### 7. `components/slides/product-slide.tsx`

**Purpose:** Apply responsive padding, font sizes, and adjust product showcase layout for mobile.

**Changes:**

**a. Hide glowing UI elements on mobile:**
   Locate the line:
   ```typescript
   <div className="absolute inset-0 opacity-10">
   ```
   Replace it with:
   ```typescript
   <div className="absolute inset-0 opacity-10 hidden md:block">
   ```

**b. Update main content container:**
   Locate the line:
   ```typescript
   className={`relative z-10 max-w-6xl mx-auto px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```
   Replace it with:
   ```typescript
   className={`relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-0 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```

**c. Update heading:**
   Locate the line:
   ```typescript
   <h2 className="text-6xl md:text-7xl font-light mb-12 text-balance leading-tight text-center">
   ```
   Replace it with:
   ```typescript
   <h2 className="text-2xl sm:text-3xl md:text-7xl font-light mb-3 md:mb-12 text-balance leading-tight text-center">
   ```

**d. Update text container:**
   Locate the line:
   ```typescript
   <div className="text-center mb-16 space-y-4 text-xl text-muted-foreground">
   ```
   Replace it with:
   ```typescript
   <div className="text-center mb-4 md:mb-16 space-y-1 md:space-y-4 text-sm sm:text-base md:text-xl text-muted-foreground px-2 md:px-4">
   ```

**e. Update emphasized paragraph:**
   Locate the line:
   ```typescript
   <p className="text-balance text-2xl text-foreground">
   ```
   Replace it with:
   ```typescript
   <p className="text-balance text-base sm:text-lg md:text-2xl text-foreground">
   ```

**f. Update small paragraph:**
   Locate the line:
   ```typescript
   <p className="text-balance text-lg mt-6">
   ```
   Replace it with:
   ```typescript
   <p className="text-balance text-xs sm:text-sm md:text-lg mt-2 md:mt-6">
   ```

**g. Update product showcase grid:**
   Locate the line:
   ```typescript
   <div className="grid md:grid-cols-3 gap-6">
   ```
   Replace it with:
   ```typescript
   <div className="flex md:grid overflow-x-auto md:overflow-x-visible md:grid-cols-3 gap-3 md:gap-6 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
   ```

**h. Update product item container:**
   Locate the line:
   ```typescript
   className={`p-6 border border-border bg-card/50 backdrop-blur-sm transition-all duration-700 hover:border-primary ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
   ```
   Replace it with:
   ```typescript
   className={`flex-shrink-0 w-[85vw] md:w-auto snap-center p-3 md:p-6 border border-border bg-card/50 backdrop-blur-sm transition-all duration-700 hover:border-primary ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
   ```

**i. Update product item image container:**
   Locate the line:
   ```typescript
   <div className="aspect-video bg-secondary/30 rounded mb-4 flex items-center justify-center">
   ```
   Replace it with:
   ```typescript
   <div className="aspect-video bg-secondary/30 rounded mb-2 md:mb-4 flex items-center justify-center">
   ```

**j. Update product item title:**
   Locate the line:
   ```typescript
   <h3 className="text-xl font-light mb-2">Station Dashboard</h3>
   ```
   Replace it with:
   ```typescript
   <h3 className="text-base md:text-xl font-light mb-1 md:mb-2">Station Dashboard</h3>
   ```

**k. Update product item description:**
   Locate the line:
   ```typescript
   <p className="text-sm text-muted-foreground">Real-time monitoring and analytics</p>
   ```
   Replace it with:
   ```typescript
   <p className="text-xs md:text-sm text-muted-foreground">Real-time monitoring and analytics</p>
   ```

---

### 8. `components/slides/solution-slide.tsx`

**Purpose:** Apply responsive padding and font sizes.

**Changes:**

**a. Update main content container:**
   Locate the line:
   ```typescript
   className={`relative z-10 max-w-5xl mx-auto px-8 text-center transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```
   Replace it with:
   ```typescript
   className={`relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```

**b. Update heading:**
   Locate the line:
   ```typescript
   <h2 className="text-6xl md:text-7xl font-light mb-12 text-balance leading-tight">
   ```
   Replace it with:
   ```typescript
   <h2 className="text-3xl sm:text-4xl md:text-7xl font-light mb-6 md:mb-12 text-balance leading-tight">
   ```

**c. Update text container:**
   Locate the line:
   ```typescript
   <div className="space-y-6 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
   ```
   Replace it with:
   ```typescript
   <div className="space-y-4 md:space-y-6 text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
   ```

**d. Update emphasized paragraph:**
   Locate the line:
   ```typescript
   <p className="text-balance text-2xl text-foreground mt-8">
   ```
   Replace it with:
   ```typescript
   <p className="text-balance text-lg sm:text-xl md:text-2xl text-foreground mt-6 md:mt-8">
   ```

**e. Update second emphasized paragraph:**
   Locate the line:
   ```typescript
   <p className="text-balance text-2xl text-foreground">
   ```
   Replace it with:
   ```typescript
   <p className="text-balance text-lg sm:text-xl md:text-2xl text-foreground">
   ```

---

### 9. `components/slides/team-slide.tsx`

**Purpose:** Apply responsive padding, font sizes, and adjust image and bio layout for mobile.

**Changes:**

**a. Update background gradient:**
   Locate the line:
   ```typescript
   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/70 to-background/95" />
   ```
   Replace it with:
   ```typescript
   <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-background/80 via-background/85 to-background/95 md:from-transparent md:via-background/70 md:to-background/95" />
   ```

**b. Update main content container:**
   Locate the line:
   ```typescript
   className={`relative z-10 max-w-5xl mx-auto px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```
   Replace it with:
   ```typescript
   className={`relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```

**c. Update heading:**
   Locate the line:
   ```typescript
   <h2 className="text-5xl md:text-6xl font-light mb-16 text-balance leading-tight text-center">
   ```
   Replace it with:
   ```typescript
   <h2 className="text-xl sm:text-2xl md:text-6xl font-light mb-4 sm:mb-6 md:mb-16 text-balance leading-tight text-center">
   ```

**d. Update grid container:**
   Locate the line:
   ```typescript
   <div className="grid md:grid-cols-2 gap-12 items-center">
   ```
   Replace it with:
   ```typescript
   <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-12 items-center">
   ```

**e. Update image container:**
   Locate the line:
   ```typescript
   className={`transition-all duration-700 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
   ```
   Replace it with:
   ```typescript
   className={`w-full md:w-auto transition-all duration-700 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
   ```

**f. Add image and update aspect ratio:**
   Locate the line:
   ```typescript
   <div className="aspect-square" />
   ```
   Replace it with:
   ```typescript
   <div className="aspect-[4/3] md:aspect-square relative -mx-4 md:mx-0 overflow-hidden rounded-none md:rounded-lg">
     <img
       src="/founder-workspace-with-maritime-tracking-systems.jpeg"
       alt="Roberto Rivera"
       className="w-full h-full object-cover scale-110 md:scale-100"
     />
   </div>
   ```

**g. Update bio container:**
   Locate the line:
   ```typescript
   className={`space-y-6 transition-all duration-700 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
   ```
   Replace it with:
   ```typescript
   className={`w-full space-y-3 md:space-y-6 transition-all duration-700 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
   ```

**h. Update name font size:**
   Locate the line:
   ```typescript
   <h3 className="text-3xl font-light mb-2">Roberto Rivera</h3>
   ```
   Replace it with:
   ```typescript
   <h3 className="text-3xl sm:text-4xl md:text-3xl font-light mb-1 md:mb-2 text-center md:text-left">
     Roberto Rivera
   </h3>
   ```

**i. Update title font size:**
   Locate the line:
   ```typescript
   <div className="text-xl text-primary mb-6">Founder & CEO</div>
   ```
   Replace it with:
   ```typescript
   <div className="text-base sm:text-lg md:text-xl text-primary mb-3 md:mb-6 text-center md:text-left">
     Founder & CEO
   </div>
   ```

**j. Update bio text container:**
   Locate the line:
   ```typescript
   <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
   ```
   Replace it with:
   ```typescript
   <div className="space-y-2 md:space-y-4 text-xs sm:text-sm md:text-lg text-muted-foreground leading-relaxed">
   ```

**k. Update call to action container:**
   Locate the line:
   ```typescript
   <div className="pt-6 border-t border-border">
   ```
   Replace it with:
   ```typescript
   <div className="pt-3 md:pt-6 border-t border-border">
   ```

**l. Update call to action text:**
   Locate the line:
   ```typescript
   <p className="text-xl text-balance leading-relaxed">
   ```
   Replace it with:
   ```typescript
   <p className="text-sm sm:text-base md:text-xl text-balance leading-relaxed">
   ```

---

### 10. `components/slides/title-slide.tsx`

**Purpose:** Apply responsive padding, font sizes, and radar overlay size.

**Changes:**

**a. Update radar overlay size:**
   Locate the line:
   ```typescript
   className="absolute top-1/4 left-1/4 w-64 h-64 border border-accent rounded-full animate-ping"
   ```
   Replace it with:
   ```typescript
   className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 border border-accent rounded-full animate-ping"
   ```

**b. Update second radar overlay size:**
   Locate the line:
   ```typescript
   className="absolute bottom-1/3 right-1/3 w-48 h-48 border border-primary rounded-full animate-ping"
   ```
   Replace it with:
   ```typescript
   className="absolute bottom-1/3 right-1/3 w-24 h-24 md:w-48 md:h-48 border border-primary rounded-full animate-ping"
   ```

**c. Update main content container:**
   Locate the line:
   ```typescript
   className={`relative z-10 text-center transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```
   Replace it with:
   ```typescript
   className={`relative z-10 text-center px-4 md:px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```

**d. Update heading:**
   Locate the line:
   ```typescript
   <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 text-balance leading-none">MARNEXII</h1>
   ```
   Replace it with:
   ```typescript
   <h1 className="text-3xl sm:text-4xl md:text-7xl font-light tracking-tight mb-4 md:mb-8 text-balance leading-none">
     MARNEXII
   </h1>
   ```

**e. Update main paragraph:**
   Locate the line:
   ```typescript
   <p className="text-4xl md:text-5xl text-foreground max-w-3xl mx-auto leading-tight text-balance mb-6">
   ```
   Replace it with:
   ```typescript
   <p className="text-2xl sm:text-3xl md:text-5xl text-foreground max-w-3xl mx-auto leading-tight text-balance mb-4 md:mb-6">
   ```

**f. Update secondary paragraph:**
   Locate the line:
   ```typescript
   <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
   ```
   Replace it with:
   ```typescript
   <p className="text-sm sm:text-base md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4 text-balance">
   ```

**g. Update scroll indicator:**
   Locate the line:
   ```typescript
   <div className="mt-16 text-xs tracking-widest text-muted-foreground uppercase animate-pulse">
   ```
   Replace it with:
   ```typescript
   <div className="mt-8 md:mt-16 text-xs tracking-widest text-muted-foreground uppercase animate-pulse">
   ```

---

### 11. `components/slides/traction-slide.tsx`

**Purpose:** Apply responsive padding, font sizes, and play button size.

**Changes:**

**a. Update main content container:**
   Locate the line:
   ```typescript
   className={`relative z-10 w-full max-w-6xl mx-auto px-8 pt-12 pb-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```
   Replace it with:
   ```typescript
   className={`relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 pt-8 md:pt-12 pb-6 md:pb-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```

**b. Update heading:**
   Locate the line:
   ```typescript
   className="text-5xl md:text-6xl font-light mb-6 text-center text-balance leading-tight text-foreground relative z-50"
   ```
   Replace it with:
   ```typescript
   className="text-3xl sm:text-4xl md:text-6xl font-light mb-4 md:mb-6 text-center text-balance leading-tight text-foreground relative z-50"
   ```

**c. Update grid container:**
   Locate the line:
   ```typescript
   <div className="grid md:grid-cols-2 gap-6 mb-6">
   ```
   Replace it with:
   ```typescript
   <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
   ```

**d. Update subheading:**
   Locate the line:
   ```typescript
   <h3 className="text-2xl font-light mb-4 text-accent">Pilots and Partnerships</h3>
   ```
   Replace it with:
   ```typescript
   <h3 className="text-xl md:text-2xl font-light mb-3 md:mb-4 text-accent">Pilots and Partnerships</h3>
   ```

**e. Update partner item text:**
   Locate the line:
   ```typescript
   className={`text-xl text-muted-foreground transition-all duration-500 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
   ```
   Replace it with:
   ```typescript
   className={`text-base md:text-xl text-muted-foreground transition-all duration-500 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
   ```

**f. Update text container:**
   Locate the line:
   ```typescript
   <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
   ```
   Replace it with:
   ```typescript
   <div className="space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
   ```

**g. Update video container:**
   Locate the line:
   ```typescript
   <div className="mt-8 p-6 border border-border bg-card/50 backdrop-blur-sm">
   ```
   Replace it with:
   ```typescript
   <div className="mt-4 md:mt-8 p-4 md:p-6 border border-border bg-card/50 backdrop-blur-sm">
   ```

**h. Update video label:**
   Locate the line:
   ```typescript
   <div className="text-sm text-muted-foreground mb-3">
   ```
   Replace it with:
   ```typescript
   <div className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
   ```

**i. Update play button size:**
   Locate the line:
   ```typescript
   <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
   ```
   Replace it with:
   ```typescript
   <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
   ```

**j. Update play icon size:**
   Locate the line:
   ```typescript
   <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
   ```
   Replace it with:
   ```typescript
   <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
   ```

---

### 12. `components/slides/vision-slide.tsx`

**Purpose:** Apply responsive padding, font sizes, and logo size.

**Changes:**

**a. Update main content container:**
   Locate the line:
   ```typescript
   className={`relative z-10 max-w-5xl mx-auto px-8 text-center transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```
   Replace it with:
   ```typescript
   className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```

**b. Update vision label:**
   Locate the line:
   ```typescript
   <div className="mb-8 text-sm tracking-[0.3em] text-muted-foreground uppercase">Vision</div>
   ```
   Replace it with:
   ```typescript
   <div className="mb-3 sm:mb-6 md:mb-8 text-xs sm:text-sm tracking-[0.3em] text-muted-foreground uppercase">
     Vision
   </div>
   ```

**c. Update heading:**
   Locate the line:
   ```typescript
   <h2 className="text-6xl md:text-7xl font-light mb-12 text-balance leading-tight">
   ```
   Replace it with:
   ```typescript
   <h2 className="text-3xl sm:text-4xl md:text-7xl font-light mb-6 sm:mb-8 md:mb-12 text-balance leading-tight">
   ```

**d. Update text container:**
   Locate the line:
   ```typescript
   <div className="space-y-8 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-16">
   ```
   Replace it with:
   ```typescript
   <div className="space-y-3 sm:space-y-6 md:space-y-8 text-sm sm:text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-12 md:mb-16">
   ```

**e. Update emphasized paragraph:**
   Locate the line:
   ```typescript
   <p className="text-balance text-2xl">
   ```
   Replace it with:
   ```typescript
   <p className="text-balance sm:text-xl md:text-2xl">
   ```

**f. Update call to action container:**
   Locate the line:
   ```typescript
   <div className="inline-block p-8 border border-primary bg-primary/5 backdrop-blur-sm">
   ```
   Replace it with:
   ```typescript
   <div className="inline-block p-4 sm:p-6 md:p-8 border border-primary bg-primary/5 backdrop-blur-sm">
   ```

**g. Update call to action text:**
   Locate the line:
   ```typescript
   <div className="text-3xl md:text-4xl font-light text-balance leading-tight">
   ```
   Replace it with:
   ```typescript
   <div className="text-base sm:text-xl md:text-4xl font-light text-balance leading-tight">
   ```

**h. Update logo container:**
   Locate the line:
   ```typescript
   <div className={`mt-16 transition-all duration-1000 delay-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
   ```
   Replace it with:
   ```typescript
   <div
     className={`mt-6 sm:mt-12 md:mt-16 transition-all duration-1000 delay-700 ${mounted ? "opacity-100" : "opacity-0"}`}
   >
   ```

**i. Update logo text:**
   Locate the line:
   ```typescript
   <div className="text-6xl font-light tracking-tight">MARNEXII</div>
   ```
   Replace it with:
   ```typescript
   <div className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight">MARNEXII</div>
   ```

---

### 13. `components/slides/why-now-slide.tsx`

**Purpose:** Apply responsive padding, font sizes, and timeline layout.

**Changes:**

**a. Update main content container:**
   Locate the line:
   ```typescript
   className={`relative z-10 max-w-6xl mx-auto px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```
   Replace it with:
   ```typescript
   className={`relative z-10 max-w-6xl mx-auto px-4 md:px-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
   ```

**b. Update heading:**
   Locate the line:
   ```typescript
   <h2 className="text-6xl md:text-7xl font-light mb-16 text-balance leading-tight">
   ```
   Replace it with:
   ```typescript
   <h2 className="text-3xl sm:text-4xl md:text-7xl font-light mb-8 md:mb-16 text-balance leading-tight">
   ```

**c. Update grid container:**
   Locate the line:
   ```typescript
   <div className="grid md:grid-cols-2 gap-12 mb-16">
   ```
   Replace it with:
   ```typescript
   <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-16">
   ```

**d. Update text container:**
   Locate the line:
   ```typescript
   <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
   ```
   Replace it with:
   ```typescript
   <div className="space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
   ```

**e. Update emphasized paragraph:**
   Locate the line:
   ```typescript
   <p className="text-balance text-xl text-foreground">
   ```
   Replace it with:
   ```typescript
   <p className="text-balance text-base sm:text-lg md:text-xl text-foreground">
   ```

**f. Update timeline container:**
   Locate the line:
   ```typescript
   <div className="relative mb-16">
   ```
   Replace it with:
   ```typescript
   <div className="relative mb-8 md:mb-16">
   ```

**g. Update timeline line:**
   Locate the line:
   ```typescript
   <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
   ```
   Replace it with:
   ```typescript
   <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border" />
   ```

**h. Update timeline items container:**
   Locate the line:
   ```typescript
   <div className="relative flex justify-between">
   ```
   Replace it with:
   ```typescript
   <div className="relative flex flex-col md:flex-row md:justify-between gap-6 md:gap-0">
   ```

**i. Update timeline item container:**
   Locate the line:
   ```typescript
   className={`flex flex-col items-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
   ```
   Replace it with:
   ```typescript
   className={`flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-0 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
   ```

**j. Update timeline item dot:**
   Locate the line:
   ```typescript
   <div className={`w-4 h-4 rounded-full ${item.color} bg-current mb-4`} />
   ```
   Replace it with:
   ```typescript
   <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${item.color} bg-current flex-shrink-0 md:mb-4`} />
   ```

**k. Update timeline item year:**
   Locate the line:
   ```typescript
   <div className="text-2xl font-light mb-2">{item.year}</div>
   ```
   Replace it with:
   ```typescript
   <div className="flex-1">
     <div className="text-xl md:text-2xl font-light mb-1 md:mb-2">{item.year}</div>
     <div className={`text-xs sm:text-sm ${item.color}`}>{item.event}</div>
   </div>
   ```

**l. Update call to action container:**
   Locate the line:
   ```typescript
   <div className="mt-12 p-8 border border-accent/30 bg-card/50 backdrop-blur-sm">
   ```
   Replace it with:
   ```typescript
   <div className="mt-6 md:mt-12 p-4 md:p-8 border border-accent/30 bg-card/50 backdrop-blur-sm">
   ```

**m. Update call to action text:**
   Locate the line:
   ```typescript
   <p className="text-lg text-muted-foreground leading-relaxed text-balance text-center">
   ```
   Replace it with:
   ```typescript
   <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-balance text-center">
   ```

---
