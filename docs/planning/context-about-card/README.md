# About Card - Planning Context

**Status:** finalized
**Epic Bead:** zem-rose-smw
**Created:** 2026-02-10
**Brainstorm:** ../brainstorm-about-card.md
**Menu Plan:** ../menu-plan.yaml

---

## Problem

The portfolio lacks a dedicated About section showcasing professional background, AWS career trajectory, and verifiable credentials. Visitors can see project outcomes but don't have context about the 9-year AWS career, 4 AWS certifications, or educational background underpinning this expertise.

## Approach

Replace Card 6 (current about/certifications placeholder at line 820 in page.tsx) with comprehensive about card featuring:
1. AWS career timeline (2016-Present, key milestones)
2. Certifications section with 4 Credly badge embeds (2×2 grid)
3. Education section (BS + 4 specializations)
4. Optional: Curated skills highlights (8-12 key technologies)

**Technical approach:**
- Hardcode content in page.tsx (consistent with existing cards)
- Integrate Credly embed script via next/script with lazyOnload strategy
- Vertical section layout (NOT project card pattern with logos/metrics)
- Same design system (Space Mono, muted colors, hover effects)
- Height constraint: 525px with 60px padding = 405px usable space

**Content priority:** Certifications > Timeline > Education > Skills

## Scope

**Type:** Feature (1-3 sessions)
**Phases:** 1
**Features:** 1
**Tasks:** 6

**Feature List:**
- Feature 1.1: About card with AWS career and certifications

**Task Breakdown:**
1. Replace Card 6 with vertical section layout (30min)
2. Add AWS career timeline content (20min)
3. Add education content section (20min)
4. Integrate Credly certification badges (30min) - ⚠️ BLOCKED on badge IDs
5. Apply design system and outline mode styling (30min)
6. Polish spacing and verify responsiveness (20min)

**Estimated Duration:** 2-3 sessions (~2.5 hours implementation)

## Finalize Summary

**Beads Created:**
- Epic: zem-rose-smw (Phase 1: About Card Implementation)
- Feature: zem-rose-smw.1 (About card with AWS career and certifications)
- Tasks: 6 tasks with sequential dependencies

**Test Specs:**
- BDD: tests/features/feature-1.1-about-card.feature (7 scenarios)
- TDD: None (all tasks have tdd: false)

**Ready to Start:**
- zem-rose-smw.1.1: Replace Card 6 with vertical section layout

## Key Decisions

| Date | Phase | Decision | Rationale |
|------|-------|----------|-----------|
| 2026-02-10 | brainstorm | Single card approach (Card 6 replacement) | Natural fit for existing placeholder, maintains flow, minimal complexity |
| 2026-02-10 | brainstorm | Certifications as primary focus | Verifiable credentials establish credibility, Credly badges are interactive/visual |
| 2026-02-10 | brainstorm | Use Credly embed script | Official AWS/Credly integration, provides verification, clickable badges |
| 2026-02-10 | brainstorm | Vertical section layout | About content needs different structure than project cards (no tech logos, no metrics) |
| 2026-02-10 | brainstorm | Content priority: Certs > Timeline > Edu > Skills | Space-constrained (525px height), certifications most impactful, skills can be minimal |

## Risks & Constraints

**Technical:**
- Credly script must load reliably (mitigation: lazyOnload + fallback)
- Badge height (270px) requires careful spacing in 405px usable space
- 2×2 badge grid at 150px wide should fit (300px + gaps)

**Content:**
- Resume has 40+ technical proficiencies - needs curation
- 9-year career timeline needs condensing to 3-4 key milestones
- May need to deprioritize skills section if space tight

**Open Questions:**
- Need 3 more Credly badge IDs (only 1 provided so far)
- Skills depth: comprehensive or curated highlights?
- Timeline format: bullets or visual?
- Single card sufficient or split into two cards?
