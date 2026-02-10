# Architecture: Data Engineering Card

## Current Implementation

**File:** `src/app/page.tsx` (Card 4, lines 438-613)

**Structure:**
```
<Card href="/data-engineering">
  <div> (padding: 60px)
    {/* Tech Stack Logos - right aligned, vertically stacked */}
    <div> (4 SVG icons: AWS Glue, Airflow, Spark, Hadoop)

    {/* Content - top section */}
    <h2>Data Engineering</h2>
    <p>Petabyte-scale architectural transformation...</p>

    {/* Content - metrics section */}
    <div>$870k+ Annualized Revenue Reclaimed</div>
  </div>
</Card>
```

## Design Patterns from Cards 2-3

**Icon Container:**
- Size: `100px × 100px`
- Padding: `8px`
- Opacity: `0.4` (normal) / `0.6` (outline mode)
- Layout: Vertically stacked with `gap-6`

**Typography:**
- H2: `text-[2.75rem] font-bold leading-tight mb-3`
- Description: `text-base font-medium mb-8`
- Metric: `text-[4.5rem] font-mono font-bold`

**Color System:**
- Icons: `#534C44` (brown/taupe)
- Text primary: `var(--text-primary)`
- Text secondary: `var(--text-secondary)`
- Text accent: `var(--text-accent)`

## Proposed Changes

### Content Addition
Insert after `<p>Petabyte-scale...</p>`:

```tsx
<div className="mt-6 space-y-4">
  <div>
    <span className="font-semibold">1. 1P Data Migration & Integration</span>
    <br />
    <span className="text-sm">9 first-party service pipelines with bulk validation</span>
  </div>
  <div>
    <span className="font-semibold">2. Data Lake Rearchitecture</span>
    <br />
    <span className="text-sm">Lake Formation with secure tagging & self-service analytics</span>
  </div>
  <div>
    <span className="font-semibold">3. Development Catalogs</span>
    <br />
    <span className="text-sm">PII-redacted prod-grade data for lower environments</span>
  </div>
</div>
```

### Icon Replacement

**New Stack:**
1. AWS Lake Formation
2. AWS Redshift
3. AWS Glue
4. Apache Airflow

**Standards:**
- viewBox: `0 0 512 512`
- fill: `#534C44`
- size: `100px × 100px`
- padding: `8px`

## Technical Constraints

- Next.js 16.1.6 with React 19.2.3
- Inline SVGs (no external icon libraries)
- Must support both normal and outline modes
- Responsive design considerations (padding adjustments)

## Testing Checklist

- [ ] Deliverables text is readable and scannable
- [ ] Icons are visually consistent with Cards 2-3
- [ ] Layout doesn't break on different screen sizes
- [ ] Outline mode works for new icons
- [ ] Typography matches existing style
- [ ] No visual regression in other cards
