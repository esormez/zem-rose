# Brainstorm: Data Engineering Card Content & Icon Updates

**Date:** 2026-02-10
**Status:** Brainstormed
**Project:** zem-rose Portfolio Enhancement

---

## Problem Statement

The Data Engineering card (Card 4) in the portfolio needs two key improvements:

1. **Missing Deliverables**: The card currently shows only a high-level description ("Petabyte-scale architectural transformation and first-party migration") and a metric ($870k+ annualized revenue reclaimed), but lacks specific deliverables that demonstrate the scope and technical depth of the work.

2. **Suboptimal Tech Stack Icons**: The current SVG icons (AWS Glue, Apache Airflow, Apache Spark, Hadoop) have visual quality and consistency issues that don't meet the professional standard set by Cards 2 (AI-Native Engineering) and 3 (Machine Learning).

**Pain Points:**
- Portfolio viewers can't quickly understand what was actually delivered
- The card feels less complete compared to the well-designed Cards 1-3
- Icon quality undermines the professional impression of the work
- Visual inconsistency (Hadoop too complex, AWS Glue too simple) creates amateur appearance

---

## User Context

**Primary User:** John Zemrose (portfolio owner)

**Audience:** Mixed
- Potential employers/recruiters evaluating technical leadership experience
- Clients considering consulting/advisory services
- Technical community assessing engineering credibility

**What Success Looks Like:**
- Data Engineering card matches the professional quality of Cards 1-3
- Viewers can quickly scan and understand the three major deliverables
- Tech stack icons are visually consistent, professional, and technically accurate
- The card effectively communicates the scale and impact of the work

---

## Technical Context: The Analytics Decoupling (Ac/Dc) Project

From resume (Apr 2024-Aug 2025):

**Project:** Led Analytics Decoupling (Ac/Dc) architectural transformation of petabyte-scale data platform (200+ schemas) empowering 20+ BI engineers across 4 organizations with self-service analytics capabilities.

**Key Outcomes:**
- Eliminated 2-4 week wait times
- Reduced ATLAS support tickets 30% (400+ tickets = 20% operational capacity)
- $870K+ annualized value delivered

**Three Core Deliverables (User-Specified):**

1. **1P Data Migration & Integration**
   - Homecoming data services integration
   - 9 first-party service pipelines (Catalog, License, User, Org, Transcript, LRS, Evaluation, Assessment, MyClass)
   - Bulk validation framework
   - SAA security compliance

2. **Data Lake Rearchitecture**
   - AWS Lake Formation migration strategy
   - Secure tagging for fine-grained access control
   - Self-service analytics capabilities
   - Petabyte-scale platform transformation

3. **Development Catalogs**
   - PII-redacted prod-grade data for lower environments
   - Standardized CDK constructs
   - Independent infrastructure provisioning
   - Maintained governance framework

---

## Approach 1: Add Deliverables List

### Layout Options Explored

**Option A: Bulleted List**
```
Petabyte-scale architectural transformation and first-party migration.

• 1P Data Migration & Integration (9 services)
• Data Lake Rearchitecture (Lake Formation)
• Development Catalogs (PII-redacted)
```

**Option B: Stacked Text Format (like Card 2 - AI-Native)**
```
{/* Key Deliverables */}
<div className="space-y-3 max-w-[600px]">
  <div className="text-sm font-medium">
    1P Data Migration & Integration: 9 first-party service pipelines with bulk validation
  </div>
  <div className="text-sm font-medium">
    Data Lake Rearchitecture: Lake Formation with secure tagging & self-service analytics
  </div>
  <div className="text-sm font-medium">
    Development Catalogs: PII-redacted prod-grade data for lower environments
  </div>
</div>
```

### Recommended: Option B (Stacked Text Format)

**Rationale:**
- Matches Card 2 (AI-Native Engineering) format exactly
- Consistent with existing portfolio design language
- "Title: Description" format is scannable
- No bullets or numbers - clean appearance
- Uses same `space-y-3` spacing as Card 2
- `text-sm font-medium` matches other card deliverables

**Implementation:**
- Add directly after title (like Card 2, no paragraph description above it)
- OR replace "Petabyte-scale..." with this format
- Use same styling classes as Card 2
- Maintain `max-w-[600px]` for readability

---

## Approach 2: Fix Tech Stack Icons

### Current Icon Problems (from codebase analysis)

**Visual Quality Issues:**
1. **AWS Glue** - Oversimplified (6 circles + 4 lines), looks amateurish
2. **Hadoop** - Overly complex (40+ paths), cluttered appearance
3. **Airflow** - Excessive SVG metadata, inconsistent styling
4. **Spark** - Different viewBox scaling, quality mismatch

**Technical Issues:**
- Inconsistent viewBox specifications (96×96, 32×32, 256×256)
- Mixed stroke/fill properties causing rendering inconsistency
- Size variation (110px for Glue vs 100px for others)
- Doesn't match professional standard of Cards 2-3

### Solution Options

**Option A: Source Official/Better Quality SVGs**

Replace current icons with professional sources:

1. **AWS Glue** → [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/)
   - Official AWS icon set
   - Consistent with AWS brand
   - Professional quality

2. **Apache Airflow** → [Apache Airflow GitHub](https://github.com/apache/airflow)
   - Official project logo
   - Cleaner than current version
   - Brand accurate

3. **Apache Spark** → Keep but source official version
   - [Apache Spark official](https://spark.apache.org/)
   - Simpler, more recognizable

4. **Hadoop** → Replace with **Snowflake** or **Redshift**
   - Hadoop elephant is too complex and dated
   - Project used AWS services (Lake Formation, Redshift implied)
   - **Snowflake** or **Redshift** logo is cleaner and more modern
   - Better represents actual tech stack

**Option B: Use Icon Library (Devicon/SimpleIcons)**

- [Devicon](https://devicon.dev/) - Consistent tech icons
- [SimpleIcons](https://simpleicons.org/) - Official brand icons
- Pre-optimized, consistent styling
- Easier to maintain

**Option C: Modernize Full Stack**

Replace with technologies more representative of the actual work:

1. **AWS Lake Formation** (core of the rearchitecture)
2. **AWS Redshift** (data warehouse)
3. **Apache Iceberg** (mentioned in resume tech proficiencies)
4. **AWS CDK** (standardized constructs for infrastructure)

### Recommended: Hybrid Approach

**Keep:** AWS Glue (core service), Apache Airflow (relevant)
**Replace:** Hadoop → **AWS Redshift** or **Snowflake**
**Upgrade:** Use official sources for all icons
**Add/Swap:** Consider Apache Spark → **AWS Lake Formation** (more central)

**Final Stack Recommendation:**
1. **AWS Lake Formation** - Core rearchitecture technology
2. **AWS Redshift** - Data warehouse (petabyte-scale)
3. **AWS Glue** - ETL/data catalog
4. **Apache Airflow** - Orchestration

**Rationale:**
- Accurately reflects the actual AWS-centric architecture
- All icons available from AWS Architecture Icons (consistent styling)
- Professional quality from single source
- Tells the technical story: Lake Formation + Redshift + Glue + Airflow = modern data platform
- Much cleaner visual consistency

**Implementation Steps:**
1. Download AWS Architecture Icons (official set)
2. Extract: Lake Formation, Redshift, Glue icons
3. Source Airflow from official Apache project
4. Standardize all to:
   - viewBox: `0 0 512 512`
   - fill: `#534C44`
   - size: `100px × 100px`
   - padding: `8px`
5. Remove unnecessary SVG metadata
6. Test at actual display size for clarity

---

## Risks & Unknowns

### Content Risks

1. **Too Much Detail?**
   - Risk: Deliverables list makes card too text-heavy
   - Mitigation: Keep descriptions concise (one line each)
   - Alternative: Use compact format if needed

2. **Technical Accuracy**
   - Risk: Oversimplifying complex work
   - Mitigation: User (John) can refine language during review
   - Validation: Matches resume language

### Icon Risks

1. **AWS Icon Licensing**
   - Risk: AWS Architecture Icons may have usage restrictions
   - Mitigation: Check AWS Asset Package license terms
   - Alternative: Use SimpleIcons (MIT licensed)

2. **Visual Consistency**
   - Risk: Mixing AWS + Apache icons may still look inconsistent
   - Mitigation: Process all icons to same viewBox and styling
   - Test: View at actual size before finalizing

3. **Wrong Technologies?**
   - Risk: Showcasing Lake Formation + Redshift instead of Spark + Hadoop might not represent actual work
   - Mitigation: User can confirm which tech stack to showcase
   - Question: Was the architecture AWS-native or mixed?

---

## Recommended Direction

### Phase 1: Content Updates (Priority 1)

**Add Deliverables Section:**

Format (matching Card 2 style):
```jsx
{/* Key Deliverables */}
<div className="space-y-3 max-w-[600px]">
  <div className="text-sm font-medium">
    1P Data Migration & Integration: 9 first-party service pipelines with bulk validation
  </div>
  <div className="text-sm font-medium">
    Data Lake Rearchitecture: Lake Formation with secure tagging & self-service analytics
  </div>
  <div className="text-sm font-medium">
    Development Catalogs: PII-redacted prod-grade data for lower environments
  </div>
</div>
```

**Rationale:**
- Matches Card 2 (AI-Native) format exactly
- Consistent with portfolio design language
- "Title: Description" format is scannable
- Clean, professional appearance
- Low risk, high impact
- Easy to implement

### Phase 2: Icon Replacement (Priority 2)

**Replace Icons with AWS-Centric Stack:**

New icon set:
1. AWS Lake Formation
2. AWS Redshift
3. AWS Glue
4. Apache Airflow

**Source:**
- AWS icons from [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/)
- Airflow from official Apache project or Devicon

**Standardization:**
- Uniform viewBox: `0 0 512 512`
- Consistent fill: `#534C44`
- Size: `100px × 100px`
- Padding: `8px`

**Rationale:**
- Accurately represents AWS-native architecture
- Professional, consistent quality
- Single source for 3/4 icons (AWS)
- Matches the "Lake Formation migration strategy" from resume
- Modern, recognizable technologies

---

## Open Questions

1. **Tech Stack Confirmation:**
   - Is the architecture purely AWS-native (Lake Formation, Redshift, Glue)?
   - Or was Spark/Hadoop actually used significantly?
   - This determines which icons to showcase

2. **Deliverables Format:**
   - Is numbered list preferred, or should we use a different format?
   - Any specific language refinements needed?

3. **Icon Sources:**
   - Preference for AWS Architecture Icons vs Devicon?
   - Any specific design preferences for icon style?

---

## Next Steps

1. **Review & Refine:**
   - User reviews brainstorm document
   - Confirms deliverables language
   - Confirms tech stack to showcase

2. **Create Structured Plan (scope):**
   - Break down into specific implementation tasks
   - Define acceptance criteria
   - Create test specifications

3. **Implement (cook):**
   - Update page.tsx with deliverables content
   - Source and implement new icons
   - Test visual consistency

---

## Suggested Scope

**MVP (Minimum Viable Product):**
- Add deliverables list below description
- Replace Hadoop icon with cleaner alternative
- Standardize icon sizing to 100px

**Full Enhancement:**
- Add all three deliverables with descriptions
- Replace all four icons with AWS-centric stack
- Standardize all SVG properties
- Match visual quality of Cards 2-3

**Recommended:** Start with MVP, iterate to Full Enhancement if needed.
