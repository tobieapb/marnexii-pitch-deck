# MARNEXII Pitch Deck Updates - 2025

## Overview
Updates to align the pitch deck with the one-pager messaging, broader positioning, and dual-use capabilities while maintaining vague customer positioning.

---

## Change 1: Update One-Liner Consistently

**New tagline used on Slides 1 and 12:**

```
Mission-critical maritime AI for sea and subsea operations, surveillance, & drone control.
A sensing, predictive decision-making, and control layer.
```

**Previous:**
- Slide 1: "Mission-critical maritime AI." + "A sensing, predictive decision-making, and control layer."
- Slide 11: "Mission-critical, maritime AI. A sensing, predictive decision-making, and control layer."

**Updated:**
- Slide 1: New two-line tagline
- Slide 12 (Vision): New two-line tagline

**Rationale:**
- Matches one-pager messaging
- Broader scope (sea/subsea, surveillance, drone control)
- Hints at dual-use without naming defense customers
- First line = WHAT it does (applications)
- Second line = WHAT it is (architecture/role)

**Technical fix:**
- Fix spacing in title-slide.tsx: ".A" → ". A"

---

## Change 2: Insert New Slide 3 - Capabilities & Use Cases

**Position:** Between current Slide 2 (Problem) and Slide 3 (Shift)

**Title:** TBD (Options: "What's Hidden", "Beyond AIS", "The Scope")

**Key Message:** "Complete maritime observability is deterrence."

**Content:**

### 6 Use Cases (from one-pager):

1. **Dark Vessel Detection**
   - Detect non-AIS and invisible-to-radar small vessels from miles away
   - Accurately determine threat score

2. **Defense**
   - Maritime surveillance to protect strategic maritime zones from emerging risks and intrusions

3. **Port and Vessel Efficiency**
   - Port control, demurrage curtailing, harbor docking, cargo loading, unloading, scheduling, and terminal operations made optimal

4. **Critical Infrastructure Protection**
   - Safeguard subsea cables and offshore farms from sabotage, trawling, and anchor dragging
   - Control, deploy, and send interdiction cues to port assets

5. **Illegal At-Sea Rendezvous**
   - Identify calls at sanctioned ports and illegal fuel transfers in black, grey, and high-risk areas

6. **Fisheries Protection**
   - Accurately determine nature of attack (swap, spoof, multi positions output) initiated by vessels engaged in illegal fishing

### Sensor Suite Visualization:

- AIS
- Camera
- VHF / SAR
- Radar
- 4G/5G Starlink
- Weather
- Environment
- Sonar & Hydrophone
- WiFi

**Visual Direction:**
- Dark maritime background
- Grid layout for use cases (2x3 or 3x2)
- Sensor suite icons displayed prominently
- "Complete maritime observability is deterrence" as headline

**Narrative Purpose:**
- Bridges gap between "blind spots exist" (Slide 2) and "data quality matters" (now Slide 4)
- Shows WHAT you can see before explaining WHY it matters
- Demonstrates capability without naming customers
- Lets informed viewers (defense, security, port authorities) connect dots themselves

---

## Change 3: Update Slide 12 (Vision) - New Structure with CTA

**Previous Slide 11 becomes Slide 12 (Vision)**

**New Structure:**

**Title:** Vision

**Headline:** Complete maritime observability is deterrence.

**Body Text (updated from current):**

Current narrow focus:
> "We're building a real-time digital twin of maritime ports and ships...
> Marnexii is the AI-powered control and decision layer for harbor docking and port operations."

Updated broader scope:
> "We're building a real-time digital twin of maritime ports and ships - a living system that senses, predicts, and acts.
>
> Marnexii is the AI-powered control and decision layer for sea and subsea operations, surveillance, and coordination.
>
> As global logistics and security move toward autonomy, we're ensuring the oceans move with them - safely, efficiently, and intelligently."

**Tagline (two lines):**
```
Mission-critical maritime AI for sea and subsea operations, surveillance, & drone control.
A sensing, predictive decision-making, and control layer.
```

**CTA Section (bottom of slide):**
```
─────────────
Let's Talk

Request a demo or schedule a meeting to discuss deployment in your port or region.

[Contact info / Calendar link / Email]
```

**Rationale:**
- Bookend structure: Opens with "observability is deterrence" on Slide 3, closes with it on Slide 12
- "Deterrence" as final message - powerful, hints at security without saying "defense"
- Vision + CTA together feels natural: "Here's where we're going... let's talk about your role"
- Updates narrow "harbor docking" positioning to broader sea/subsea/surveillance scope
- 12 slides total (cleaner than 13)

---

## New Slide Order (12 slides total)

1. **Title** - Mission statement (UPDATED)
2. **Problem** - Blind spots in ports
3. **Capabilities** - Sea/subsea scope + 6 use cases + sensor suite (NEW)
4. **Shift** - AI needs quality data (was Slide 3)
5. **Solution** - Digital twin (was Slide 4)
6. **Why Now** - Timing (was Slide 5)
7. **Traction** - Product demo (was Slide 6)
8. **Product** - System capabilities (was Slide 7)
9. **Market** - Economics (was Slide 8)
10. **Business Model** - Revenue model (was Slide 9)
11. **Team** - Founder (was Slide 10)
12. **Vision** - Closing + CTA (UPDATED, was Slide 11)

---

## Design Consistency

**New Slide 3 should match:**
- Dark maritime aesthetic (deep blacks, ocean blues, radar greens)
- Clean typography (Inter font)
- High contrast for readability
- Cinematic background image (port operations, vessels, or ocean view)
- Smooth fade-in animations on mount

---

## Strategic Positioning Summary

**What We Show:**
- Capabilities across commercial and security domains
- Comprehensive sensor infrastructure
- Detection of both legitimate and illegal maritime activity
- Sea, subsea, and surface monitoring

**What We Don't Say:**
- "Defense" or "military" customers
- "Coast Guard" or "Navy"
- Specific government pathways (AFWERX, DIU)
- "Dual-use" terminology
- International deployment strategy

**Outcome:**
Deck shows what we can do, stays commercially positioned, but any sophisticated viewer (investor, defense, port security) immediately sees the broader value and can ask follow-up questions in private.

---

## Files to Modify

1. `app/page.tsx` - Update slides array, add new slide import
2. `components/slides/title-slide.tsx` - Update tagline, fix spacing
3. `components/slides/capabilities-slide.tsx` - CREATE NEW
4. `components/slides/vision-slide.tsx` - Update heading, body, add CTA
5. `MARNEXII-Pitch-Deck-Updated.md` - Update documentation (optional)

---

## Implementation Notes

- All changes maintain existing design system (globals.css)
- No new dependencies required
- Slide navigation will automatically handle 12 slides
- Mobile/responsive behavior preserved
- Touch swipe, keyboard, and mouse wheel navigation unchanged

---

**Status:** Ready for implementation
**Date:** 2025-11-01
