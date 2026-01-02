# Innsikt Section Specification

## Overview
The Innsikt section provides analytics, accessibility checks, and language usage insights for the digital form system. This section enables users to monitor key metrics, identify accessibility issues, and understand language usage patterns across their forms.

## User Flows
- View KPIs (number of views, started forms, submitted forms, failed submissions)
- Filter metrics by date range, specific form, and tenant
- View accessibility validation results (errors, warnings, improvement suggestions)
- View language usage patterns (nb/nn/en distribution, fallback behavior)
- Export reports in CSV and PDF formats

## UI Requirements
- Dashboard with top KPIs displayed as summary cards
- 2-3 graphs/charts showing trends over time
- Table showing "top forms" based on usage metrics
- Filtering controls for date range, form, and tenant selection
- Accessibility panel with status indicator and list of issues
- Language panel with visual representation of language distribution
- Loading, empty, and error states for all data operations

## States
- Loading states for all data fetching operations
- Empty states when no data is available for selected filters
- Error states when data fetching fails
- Success states after successful report export
- Various accessibility states based on the severity of issues found

## Accessibility
- All components must follow WCAG 2.1 AA guidelines
- Proper semantic HTML structure
- Sufficient color contrast for all visualizations
- Keyboard navigable components
- Screen reader compatibility for all metrics and data
- ARIA labels and descriptions for charts and graphs
- Alternative text for all visual elements
- Clear focus indicators for interactive elements
- Proper heading hierarchy