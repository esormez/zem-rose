# Feature 1.1: About card with AWS career and certifications

Feature: About card with AWS career and certifications
  As a portfolio visitor
  I want to see the professional background, AWS career trajectory, and verifiable certifications
  So that I can understand the expertise behind the project work

  Background:
    Given I navigate to the portfolio homepage
    And the page has finished loading

  Scenario: Card 6 displays About section with clear structure
    When I scroll to Card 6
    Then I should see the About card
    And the card should have a clear title "About"
    And the card should have a subtitle
    And the card should display vertical sections

  Scenario: AWS career timeline shows key milestones
    When I scroll to Card 6
    Then I should see an "AWS Career" section
    And the timeline should show 3-4 career milestones
    And the timeline should include "2016: Joined Amazon"
    And the timeline should include "2017: Moved to AWS T&C"
    And the timeline should include "2022: Promoted to Sr. TPM"
    And the timeline should include "2024: Sr. TPM, Data & ML Engineering"
    And the timeline should include "2025: Sr. TPM, AI-Native Engineering (current)"

  Scenario: AWS certification badges are displayed and clickable
    When I scroll to Card 6
    Then I should see an "AWS Certifications" section
    And I should see 4 certification badges
    And each badge should be rendered as an iframe
    And badge 1 should be "AWS Certified Generative AI Developer - Professional"
    And badge 2 should be "AWS Certified Solutions Architect - Associate"
    And badge 3 should be "AWS Certified Data Engineer - Associate"
    And badge 4 should be "AWS Certified Machine Learning Engineer - Associate"
    When I click on a certification badge
    Then I should be redirected to the Credly verification page

  Scenario: Education section lists degree and specializations
    When I scroll to Card 6
    Then I should see an "Education" section
    And the section should list "BS in EHS Engineering - IUP (2013)"
    And the section should list "Specialization, Big Data - UC San Diego (2019)"
    And the section should list "Specialization, Strategic Leadership - Dartmouth (2025)"
    And the section should list "Specialization, Systems Engineering - UC Boulder (2026)"
    And the section should list "Amazon ML University - 31 hours GenAI (2025)"

  Scenario: Design is consistent with portfolio aesthetic
    When I scroll to Card 6
    Then the card should use Space Mono font
    And the card should use the portfolio color palette
    And the card title should be text-[2.75rem] font-bold
    And section headings should be text-base font-medium uppercase
    And body text should be text-sm
    When I hover over the card
    Then the card should display hover effects
    And the card should translate up by 1 unit
    And the card should show burgundy glow shadow

  Scenario: Outline mode toggle works correctly
    Given I am viewing Card 6
    When I toggle outline mode
    Then the text should change to color #D5CBBA
    And the text should have text-shadow effect
    And the text should use antialiasing
    When I toggle outline mode again
    Then the text should change to var(--text-primary)
    And the text shadow should be removed

  Scenario: Card content fits within height constraints
    When I scroll to Card 6
    Then the total content height should be less than 405px
    And the Credly badges should not overflow
    And all sections should be visible without scrolling
    And the spacing should be consistent with other cards
