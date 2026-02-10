Feature: Enhanced Data Engineering Card
  As a portfolio viewer
  I want to see specific deliverables and professional tech stack icons on the Data Engineering card
  So that I can quickly understand the scope and impact of the work

  Background:
    Given the portfolio application is running
    And I navigate to the Data Engineering card (Card 4)

  Scenario: Card displays three deliverables in stacked text format
    When I view the Data Engineering card
    Then I should see the deliverables section
    And the deliverables should match Card 2 styling
    And I should see "1P Data Migration & Integration: 9 first-party service pipelines with bulk validation"
    And I should see "Data Lake Rearchitecture: Lake Formation with secure tagging & self-service analytics"
    And I should see "Development Catalogs: PII-redacted prod-grade data for lower environments"
    And the text should use space-y-3 spacing
    And the text should be text-sm font-medium

  Scenario: Tech stack shows AWS-centric icons with consistent quality
    When I view the Data Engineering card tech stack
    Then I should see 4 technology icons
    And I should see the AWS Lake Formation icon
    And I should see the AWS Redshift icon
    And I should see the AWS Glue icon
    And I should see the Apache Airflow icon
    And all icons should be 100px x 100px
    And all icons should have 8px padding
    And all icons should use #534C44 color

  Scenario: Icons use standardized viewBox and styling
    When I inspect the SVG icons
    Then all icons should have viewBox "0 0 512 512"
    And all icons should have consistent fill color
    And all icons should scale proportionally
    And icons should match Cards 2-3 quality

  Scenario: Deliverables text is scannable with proper format
    When I read the deliverables section
    Then each deliverable should follow "Title: Description" format
    And titles should be easily distinguishable
    And descriptions should provide technical context
    And text should be readable at normal viewing distance

  Scenario: Visual consistency across all cards
    When I view Cards 1 through 4
    Then Card 4 should match the professional quality of Cards 1-3
    And typography should be consistent across all cards
    And icon styling should be consistent
    And spacing should be uniform
    And outline mode should work for all cards

  Scenario: Outline mode support
    When I toggle outline mode
    Then deliverables text should have proper text-shadow
    And icon opacity should change to 0.6
    And all text should remain readable
    And color scheme should adapt correctly
