# Brainstorm: About Card

**Date:** 2026-02-10
**Status:** Complete
**Context:** docs/planning/context-about-card/

---

## Problem Statement

The portfolio currently has 5 project cards (AI-Native Engineering, Machine Learning, Data Engineering, Business Intelligence) but lacks a dedicated About section that showcases the user's professional background, credentials, and AWS career trajectory. Users viewing the portfolio need to understand the depth of experience and certifications backing these impressive project deliverables.

**Pain Point:** Visitors can see project outcomes but don't have context about the professional journey, formal credentials (4 AWS certifications), or educational background that underpins this expertise.

**Impact if not solved:** Portfolio appears incomplete; credibility isn't fully established through verifiable credentials; AWS-specific expertise isn't properly highlighted despite being core to the professional identity.

---

## User Perspective

**Who:** Portfolio visitors (recruiters, potential clients, professional network)

**User Context:**
- Viewing portfolio to assess technical expertise and credibility
- Looking for verifiable credentials (AWS certifications are industry-recognized)
- Wanting to understand career progression and AWS tenure
- May want to verify certifications via Credly badges (clickable/verifiable)

**Success Criteria:**
- User can see AWS career timeline (2016-Present, ~9 years)
- User can view and verify all 4 AWS certifications via Credly badges
- User can understand educational background (BS in EHS Engineering, multiple specializations)
- User can see technical proficiencies organized by category
- Content is visually consistent with portfolio aesthetic (monospace, scrolling, muted colors)

---

## Technical Exploration

### Current Architecture

**Portfolio Structure:** (from codebase analysis)
- 7-card horizontal scroll layout (875px × 525px cards)
- Cards 1-5: Intro + Project cards with tech logos, metrics, CTAs
- Card 6: Currently about/certifications placeholder (line 820)
- Card 7: Contact card (line 882)
- All content hardcoded in `/src/app/page.tsx`
- No data structures/arrays - inline JSX

**Card Pattern:**
```jsx
<Card href="/route" isOutlineMode={isOutlineMode}>
  <div style={{ padding: '60px' }}>
    {/* Absolute positioned tech logos (right side) */}
    {/* Relative z-10 content (left side) */}
    {/* Metrics section with mt-auto (bottom) */}
  </div>
</Card>
```

**Design System:**
- Fonts: Monospace (Space Mono), muted color palette
- Colors: --text-primary (#000), --text-secondary (#534C44), --text-accent (#42784F)
- Hover: Burgundy glow (rgba(141, 21, 44, 0.4)), -translate-y-1
- Scroll: Horizontal with snap, keyboard navigation

### Resume Content Analysis

From `/docs/planning/context-data-eng-card/Resume-2026-01-26.md`:

**AWS Certifications:**
1. AWS Certified Generative AI Developer -- Professional (Early Adopter, Dec 2025)
2. AWS Certified Solutions Architect -- Associate (Dec 2024)
3. AWS Certified Data Engineer -- Associate (May 2025)
4. AWS Certified Machine Learning Engineer -- Associate (Apr 2025)

**AWS Career Timeline:**
- Jul 2016 - Oct 2017: BI Engineer, Global EHS (Amazon.com)
- Oct 2017 - Jul 2019: Sr. BI Engineer, T&C (Seattle)
- May 2020 - May 2022: Sr. BI Engineer, T&C (Tampa)
- May 2022 - Apr 2024: Sr. TPM, Business Intelligence & Analytics
- Apr 2024 - Aug 2025: Sr. TPM, Data & ML Engineering
- Aug 2025 - Present: Sr. TPM, AI-Native Engineering Transformation

**Education:**
- BS in Environmental, Health & Safety Engineering - IUP (May 2013)
- Specialization, Big Data - UC San Diego (Aug 2019)
- Specialization, Strategic Leadership - Dartmouth Tuck School (Nov 2025)
- Specialization, Systems Engineering - UC Boulder (expected Mar 2026)
- Amazon ML University - 31 hours GenAI/LangChain (Oct 2025)

**Technical Proficiencies:** (grouped in resume)
- AWS Services: Bedrock, Lake Formation, Glue, S3, Redshift, Neptune, Lambda, EC2, VPC, IAM, CDK
- AI/ML: RAG, Vector DBs, LangChain, Amazon Q, Prompt Engineering, Model Eval, Agentic Frameworks, Knowledge Graphs
- Data & Analytics: SQL, Python, Tableau, PostgreSQL, Apache Iceberg, Data Warehousing, ETL/ELT
- Program Management: Agile/Scrum, Jira, Strategic Planning, OKR, Stakeholder Management

### Credly Badge Integration

**User-provided embed code:**
```html
<div
  data-iframe-width="150"
  data-iframe-height="270"
  data-share-badge-id="4890a175-8a9e-4d6c-9a37-2c8625295e39"
  data-share-badge-host="https://www.credly.com">
</div>
<script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
```

**How it works:**
- Credly CDN script (embed.js) finds divs with `data-share-badge-id`
- Dynamically creates iframe with badge image, title, verification link
- Each certification has unique badge ID
- Badges are clickable → links to Credly verification page
- Rendered size: 150px wide × 270px tall

**Next.js Considerations:**
- External script loading: Use `next/script` component with `strategy="lazyOnload"`
- Script should load once, find all badge divs on page
- Data attributes are JSX-safe (camelCase: `data-iframe-width` works as-is)
- Iframes are cross-origin, should work without special config

**Research from web search:**
- AWS certifications auto-generate Credly badges
- Badges are verifiable (SHA256 hash, Open Badge Specification)
- Can be shared on LinkedIn, email signatures, websites
- Public badge URLs for verification

Sources:
- [Earn AWS Certification Badges | Digital Badges | AWS](https://aws.amazon.com/certification/certification-digital-badges/)
- [Amazon Web Services Training and Certification - Credly](https://www.credly.com/organizations/amazon-web-services/badges)
- [AWS Certification Badges & Verification: Ultimate Guide](https://passitexams.com/articles/aws-certification-badges-and-verification/)

---

## Approaches Considered

### Approach 1: Replace Card 6 Entirely (RECOMMENDED)

**Description:** Card 6 (line 820) is currently a placeholder for about/certifications. Replace its entire content with new about card featuring AWS tenure, certifications (Credly badges), education, and skills.

**Structure:**
```
┌─────────────────────────────────────────┐
│  About                                  │
│                                         │
│  [AWS Career Timeline Section]          │
│  • 9 years at Amazon (2016-Present)    │
│  • Key roles highlighted                │
│                                         │
│  [Certifications Section]               │
│  • 4 Credly badge embeds in grid       │
│  • Professional + 3 Associates          │
│                                         │
│  [Education Section]                    │
│  • BS + 4 Specializations               │
│  • Amazon ML University                 │
│                                         │
│  [Skills Section - optional]            │
│  • Grouped by category                  │
└─────────────────────────────────────────┘
```

**Layout Pattern:**
- Different from project cards (no tech logos on right, no big metrics at bottom)
- Vertical sections with clear hierarchy
- Credly badges in 2×2 grid or horizontal row
- Typography: Same monospace fonts, size hierarchy
- Spacing: 60px padding consistent with other cards

**Pros:**
- Fits naturally into existing 7-card structure
- Card 6 is already designated for this purpose
- Maintains horizontal scroll experience
- Same size constraints (875px × 525px) keep consistency
- No routing changes needed

**Cons:**
- 525px height may require tight spacing for all content
- Credly iframes (270px tall) eat significant vertical space
- May need to prioritize content (timeline OR full skills breakdown)

### Approach 2: Add New Card 8

**Description:** Keep Card 6 as-is, add brand new Card 8 after contact card.

**Pros:**
- More space to work with (can design fresh)
- Doesn't overwrite existing placeholder

**Cons:**
- About content should come BEFORE contact card logically
- Breaks natural flow (projects → contact)
- Would need to reorder cards or have awkward placement

**Rejected:** Poor information architecture.

### Approach 3: Expand to Multi-Section Card (Scrollable Content)

**Description:** Make Card 6 have internal scrolling (overflow-y: auto) to fit more content.

**Pros:**
- Can include all content without compromise
- Matches "scrolling experience" design principle

**Cons:**
- Breaks consistency (no other card has internal scroll)
- Two scroll axes (horizontal page + vertical card) is confusing UX
- Complicates keyboard navigation

**Rejected:** Violates design consistency, poor UX.

---

## Risks and Unknowns

### Technical Risks

**1. Credly Script Loading (Medium Risk)**
- External script from Credly CDN must load reliably
- If script fails/blocks, badges won't render
- **Mitigation:** Use Next.js `<Script>` with `strategy="lazyOnload"`, add fallback text/link

**2. Card Height Constraints (Medium Risk)**
- 525px height with 60px padding = 405px usable space
- 4 Credly badges at 270px tall = too tall for single row
- 2×2 grid at 150px wide = 300px + gaps = fits, but badges may be small
- **Mitigation:** Test badge sizing, may need custom CSS to scale badges down or use API for smaller images

**3. Content Density (Low Risk)**
- Resume has extensive content, card space is limited
- May need editorial decisions on what to include
- **Mitigation:** Prioritize: Certifications > Timeline > Education > Skills (minimal)

### Scope Risks

**1. Skills Section Complexity (Medium Risk)**
- Resume has 40+ technical proficiencies across 4 categories
- Full skills grid may dominate card, push certifications down
- **Question:** Should skills be comprehensive or curated highlights?
- **Recommendation:** Curated highlights (8-12 key technologies) OR separate skills into Card 7, move contact to Card 8

**2. Badge ID Collection (Low Risk)**
- User provided one badge ID (4890a175-8a9e-4d6c-9a37-2c8625295e39)
- Need IDs for all 4 certifications
- **Action Required:** User must provide remaining 3 badge IDs

### Open Questions

1. **Badge IDs:** Do you have the Credly badge share IDs for all 4 certifications, or just the one provided?
2. **Skills Depth:** Should skills be comprehensive (all 40+) or curated highlights (8-12)?
3. **Timeline Format:** Bullet list of roles or visual timeline graphic?
4. **Badge Size:** Are 150×270 badges acceptable, or prefer smaller for more space?

---

## Recommended Direction

### Primary Recommendation: Approach 1 (Replace Card 6)

**Rationale:**
- Natural fit for existing placeholder
- Maintains portfolio flow and consistency
- Leverages established card pattern and design system
- Minimal technical complexity (no routing, no new infrastructure)

**Recommended Scope (MVP):**

**Card 6: About**
1. **Header:** "About" title + subtitle about AWS career
2. **Certifications Section:** 4 Credly badges in 2×2 grid (primary focus)
3. **Timeline Section:** Condensed AWS career (3-4 key milestones)
4. **Education Section:** Degree + specializations (bullet list)
5. **Skills:** Curated highlights (8-12 technologies) OR omit for space

**Content Priority:** Certifications > Timeline > Education > Skills

**Technical Approach:**
- Hardcode content in page.tsx (consistent with existing pattern)
- Use `next/script` for Credly embed.js
- Create 4 badge divs with data attributes
- Custom CSS to constrain badge iframes if needed
- Test in both outline mode and normal mode

**Design Alignment:**
- Same fonts (Space Mono monospace)
- Same colors (--text-primary, --text-secondary, --text-accent)
- Same hover effects (if card has href, apply glow)
- Different internal layout (no right-side logos, no bottom metrics)
- Vertical sections with hierarchy

### Alternative Recommendation: Two-Card Approach

If content doesn't fit comfortably in 525px height:

**Card 6: Certifications & Timeline**
- Focus: Credly badges (2×2 grid) + AWS career timeline
- Clean, credential-focused

**Card 7: Education & Skills**
- Focus: Educational background + technical proficiencies
- Move contact to Card 8

**Pros:** More breathing room, clear content separation
**Cons:** Pushes contact card further right, more implementation work

---

## Key Decisions

1. **Scope:** Single card (Card 6 replacement) over multi-card approach
2. **Content Priority:** Certifications first, then timeline, then education, skills optional
3. **Badge Integration:** Use Credly embed script with next/script component
4. **Layout:** Vertical sections, NOT project card pattern (no logos/metrics)
5. **Design Consistency:** Same typography and colors, different internal structure

---

## Next Steps

### Before Planning Phase:

1. **Collect Badge IDs:** User needs to provide Credly share badge IDs for:
   - AWS Certified Solutions Architect -- Associate
   - AWS Certified Data Engineer -- Associate
   - AWS Certified Machine Learning Engineer -- Associate
   - (GenAI Professional ID already provided: 4890a175-8a9e-4d6c-9a37-2c8625295e39)

2. **Content Decisions:**
   - Confirm skills depth preference (comprehensive vs curated)
   - Confirm timeline format preference (bullet list vs visual)
   - Confirm if contact card moves to Card 8 if two-card approach needed

### Planning Phase Will Cover:

- Detailed component structure and JSX layout
- Credly script integration specifics
- CSS for badge sizing and responsiveness
- Content copy and hierarchy
- Accessibility considerations (badge alt text, ARIA labels)
- Testing plan (outline mode, hover states, mobile)

---

## Open Questions for User

1. Do you have all 4 Credly badge share IDs, or need help finding them?
2. Should skills be comprehensive (40+ items) or highlights (8-12 key techs)?
3. Is 525px height acceptable, or should we split into two cards (certifications + education separate)?
4. Any specific AWS roles/milestones you want emphasized in timeline?
