# About Card - Architecture & Technical Patterns

## Current System Architecture

### Portfolio Structure
- **Framework:** Next.js 16.1.6 with React 19.2.3, Turbopack bundler
- **Main file:** `/src/app/page.tsx` (contains all card content, ~30k tokens)
- **Card system:** 7 cards in horizontal scroll layout (875px × 525px each)
- **Scroll component:** `/src/components/HorizontalScroll.tsx` - flex layout with snap scrolling
- **Card component:** `/src/components/Card.tsx` - reusable wrapper with hover effects

### Existing Card Pattern (Cards 2-5)

**Structure:**
```jsx
<Card href="/route" isOutlineMode={isOutlineMode}>
  <div className="h-full flex flex-col relative overflow-hidden"
       style={{ padding: '60px' }}>

    {/* Layer 1: Tech Logos (absolute, right-aligned) */}
    <div className="absolute flex flex-col gap-6 items-end"
         style={{ right: '80px', top: '50%', transform: 'translateY(-50%)' }}>
      {/* 4 SVG logos in 100×100 containers */}
    </div>

    {/* Layer 2: Top Content (relative z-10) */}
    <div className="relative z-10">
      <h2>Title</h2>
      <p>Subtitle</p>
      <div className="space-y-3">{/* Key deliverables */}</div>
    </div>

    {/* Layer 3: Bottom Metrics (relative z-10, mt-auto) */}
    <div className="relative z-10 mt-auto" style={{ paddingTop: '165px' }}>
      <div className="text-[4.5rem]">Metric Value</div>
      <div className="text-xs uppercase">Metric Label</div>
      <a className="flex items-center gap-2">CTA Link →</a>
    </div>
  </div>
</Card>
```

**Key Patterns:**
- Fixed dimensions: 875×525px with 60px internal padding
- Three-layer system: absolute logos, relative content, bottom metrics
- All content hardcoded (no data structures/arrays)
- Conditional styling via `isOutlineMode` boolean state
- Monospace typography (Space Mono font)
- Hover effects: translate-y-1, burgundy glow shadow

### Design System

**Colors** (from `/src/app/globals.css`):
```css
--bg-mid: #C4B9A5         /* Card background */
--text-primary: #000       /* Main text */
--text-secondary: #534C44  /* Secondary text */
--text-accent: #42784F     /* Accent color */
--hover-glow: rgba(141, 21, 44, 0.4)
```

**Typography:**
- Font family: Space Mono (monospace)
- Sizes: text-[4.5rem], text-[2.75rem], text-base, text-sm, text-xs
- Weights: font-light, font-medium, font-bold
- Tracking: tracking-tight, tracking-widest
- Line heights: leading-tight, leading-none

**Spacing:**
- Card padding: 60px
- Section gaps: space-y-3, gap-6
- Margins: mb-3, mb-8, mb-12, mb-14

## Credly Badge Integration

### Credly Embed Mechanism

**User-provided embed code:**
```html
<div
  data-iframe-width="150"
  data-iframe-height="270"
  data-share-badge-id="4890a175-8a9e-4d6c-9a37-2c8625295e39"
  data-share-badge-host="https://www.credly.com">
</div>
<script type="text/javascript" async
        src="//cdn.credly.com/assets/utilities/embed.js"></script>
```

**How it works:**
1. Credly CDN script (`embed.js`) loads asynchronously
2. Script finds all divs with `data-share-badge-id` attribute
3. Dynamically creates iframe inside each div
4. Iframe renders badge image + title + verification link
5. Badge is clickable → links to Credly public verification page

**Rendered output:**
- Dimensions: 150px wide × 270px tall (as specified in data attributes)
- Content: Badge image, certification name, issuer, issue date, verification link
- Interactive: Clicking badge opens Credly verification page in new tab

### Next.js Integration Pattern

**Script Loading Strategy:**
```jsx
import Script from 'next/script'

export default function Page() {
  return (
    <>
      {/* Page content with badge divs */}
      <div data-share-badge-id="xxx"
           data-iframe-width="150"
           data-iframe-height="270"
           data-share-badge-host="https://www.credly.com" />

      {/* Load Credly script once */}
      <Script
        src="https://cdn.credly.com/assets/utilities/embed.js"
        strategy="lazyOnload"
      />
    </>
  )
}
```

**Strategy rationale:**
- `lazyOnload`: Loads after page is interactive (non-blocking)
- Script loads once, finds all badge divs automatically
- Data attributes work as-is in JSX (no camelCase needed)
- Iframes are cross-origin, no special Next.js config required

### Badge Layout Constraints

**Height Math:**
- Card height: 525px
- Card padding: 60px top + 60px bottom = 120px
- **Usable space: 405px**

**Badge dimensions:**
- Single badge: 150px wide × 270px tall
- 2×2 grid: 300px wide (150×2) × 540px tall (270×2) + gaps
- **Problem:** 540px > 405px usable space

**Solutions:**
1. **Horizontal row (4 badges):** 600px wide (150×4) + gaps = fits width, 270px tall = fits height ✓
2. **2×2 grid with smaller badges:** Scale badges down (e.g., 120×220) - may need custom CSS
3. **2 rows of 2:** 300px wide, 540px tall - TOO TALL ✗
4. **Use Credly API for smaller images:** Fetch badge images directly instead of iframe embed

**Recommended:** Horizontal row of 4 badges (150×270 each) OR smaller 2×2 grid via CSS scaling.

## Content Architecture

### Resume Content (Source: Resume-2026-01-26.md)

**AWS Certifications (4 total):**
1. AWS Certified Generative AI Developer -- Professional (Dec 2025, Early Adopter)
2. AWS Certified Solutions Architect -- Associate (Dec 2024)
3. AWS Certified Data Engineer -- Associate (May 2025)
4. AWS Certified Machine Learning Engineer -- Associate (Apr 2025)

**AWS Career Timeline (9 years):**
- Jul 2016: Joined Amazon.com (BI Engineer, EHS)
- Oct 2017: Moved to AWS T&C (Sr. BI Engineer, Seattle)
- May 2020: T&C Tampa (Sr. BI Engineer)
- May 2022: Promoted to Sr. TPM, BI & Analytics
- Apr 2024: Promoted to Sr. TPM, Data & ML Engineering
- Aug 2025: Appointed to Sr. TPM, AI-Native Engineering Transformation (current)

**Education:**
- BS in Environmental, Health & Safety Engineering - IUP (2013)
- Specialization, Big Data - UC San Diego (2019)
- Specialization, Strategic Leadership - Dartmouth Tuck (2025)
- Specialization, Systems Engineering - UC Boulder (expected 2026)
- Amazon ML University - 31 hours GenAI/LangChain (2025)

**Technical Proficiencies (40+ items across 4 categories):**
- AWS Services: Bedrock, Lake Formation, Glue, S3, Redshift, Neptune, Lambda, EC2, IAM, CDK
- AI/ML: RAG, Vector Databases, LangChain, Amazon Q, Prompt Engineering, Agentic Frameworks
- Data & Analytics: SQL, Python, Tableau, PostgreSQL, Apache Iceberg, Data Warehousing, ETL/ELT
- Program Management: Agile/Scrum, Jira, Strategic Planning, OKR, Stakeholder Management

### Proposed Card Structure

**Card 6: About**
```
┌─────────────────────────────────────────────┐
│ About                                       │ ← H2 title
│ 9 years driving data & AI transformation   │ ← Subtitle
│                                             │
│ [AWS Career]                                │ ← Section
│ • 2016-2025: Key milestones (3-4 bullets)  │
│                                             │
│ [AWS Certifications]                        │ ← Section
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐          │ ← 4 Credly badges
│ │Badge│ │Badge│ │Badge│ │Badge│          │
│ │     │ │     │ │     │ │     │          │
│ └─────┘ └─────┘ └─────┘ └─────┘          │
│                                             │
│ [Education]                                 │ ← Section
│ • BS EHS Eng + 4 Specializations           │
│                                             │
│ [Skills] (optional if space)                │ ← Section
│ • Curated 8-12 key technologies            │
└─────────────────────────────────────────────┘
```

**Layout Approach:**
- **NOT** project card pattern (no right-side tech logos, no bottom metrics)
- Vertical section hierarchy with clear headings
- Sections: Career → Certifications → Education → Skills
- Certifications as visual focal point (Credly badges)
- Consistent 60px padding with other cards

## Technical Constraints

**Height Limitation:**
- 405px usable space after padding
- Must fit: title (60px) + timeline (80px) + badges (270px) + education (60px) = 470px
- **Over budget by 65px** - need to optimize or split content

**Mitigation Options:**
1. Reduce padding (60px → 40px) = +40px space
2. Smaller badge iframes (custom sizing via CSS)
3. Compress timeline/education (tighter line-height)
4. Two-card approach (split certifications + education)

**Width Consideration:**
- 875px total, 60px padding each side = 755px usable
- 4 badges at 150px = 600px + 30px gaps = 630px (fits comfortably)

## Data Management

**Consistency with existing pattern:**
- All content hardcoded in JSX (no separate data files)
- Conditional styling via `isOutlineMode` state
- No component extraction (keep in page.tsx)

**Badge Data Required:**
```javascript
const certifications = [
  {
    name: 'AWS Certified Generative AI Developer',
    level: 'Professional',
    date: 'Dec 2025',
    badgeId: '4890a175-8a9e-4d6c-9a37-2c8625295e39', // ✓ provided
  },
  {
    name: 'AWS Certified Solutions Architect',
    level: 'Associate',
    date: 'Dec 2024',
    badgeId: '???', // ⚠ NEEDED
  },
  {
    name: 'AWS Certified Data Engineer',
    level: 'Associate',
    date: 'May 2025',
    badgeId: '???', // ⚠ NEEDED
  },
  {
    name: 'AWS Certified Machine Learning Engineer',
    level: 'Associate',
    date: 'Apr 2025',
    badgeId: '???', // ⚠ NEEDED
  },
]
```

## Accessibility Considerations

**Credly iframes:**
- Badge script generates iframes with alt text
- Verification links are keyboard accessible
- No additional ARIA needed for standard embed

**Custom requirements:**
- Section headings should use semantic HTML (h3 for subsections)
- Timeline bullets should use proper list markup (ul/li)
- If badges fail to load, show fallback text with links

## Performance Considerations

**Script loading:**
- Credly embed.js is ~5KB minified
- Loads async, non-blocking
- Caching: CDN provides cache headers

**Iframes:**
- 4 cross-origin iframes
- Each loads badge image from Credly
- Total payload: ~20KB for 4 badge images
- Lazy loading: Script uses lazyOnload strategy

**No performance concerns** - minimal impact, async loading pattern.
