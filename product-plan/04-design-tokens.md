# Design Tokens Strategy: Digiskjema

## Token-prinsipper (hva som aldri overstyres)

### Never Override Principles
- **Accessibility Compliance**: All color contrast ratios must maintain WCAG 2.1 AA standards (minimum 4.5:1 for normal text, 3:1 for large text)
- **Digdir Design System Core**: Fundamental tokens from Digdir Design System must not be overridden (base color values, core spacing units, typography scales)
- **Semantic Color Relationships**: Semantic color meanings (primary, success, danger, warning) must maintain their intended accessibility and meaning
- **Focus Indicators**: Focus visibility and styling must always meet accessibility requirements
- **Touch Target Sizes**: Minimum interactive element sizes must meet accessibility standards (44px minimum)

### Core Principles
- **Digdir Design System First**: Always use Digdir Design System tokens as the foundation
- **Semantic Naming**: Use semantic names that describe purpose rather than appearance
- **Consistency**: Maintain visual consistency across all user interfaces
- **Accessibility-First**: All design decisions must prioritize accessibility compliance

## Typografi, spacing, radii, elevation: hva vi bruker fra Digdir

### Typography
- **Font Family**: Use `--fds-font-family` (system font stack) for all text
- **Font Sizes**: 
  - `--fds-font-size-xs`, `--fds-font-size-sm`, `--fds-font-size-md`, `--fds-font-size-lg`, `--fds-font-size-xl`, `--fds-font-size-2xl`, `--fds-font-size-3xl`
- **Font Weights**: 
  - `--fds-font-weight-regular`, `--fds-font-weight-medium`, `--fds-font-weight-bold`, `--fds-font-weight-extrabold`
- **Line Heights**: Use Digdir's line height tokens for consistent vertical rhythm

### Spacing
- **Spacing Scale**: Use Digdir's spacing tokens:
  - `--fds-spacing-xxs`, `--fds-spacing-xs`, `--fds-spacing-s`, `--fds-spacing-m`, `--fds-spacing-l`, `--fds-spacing-xl`, `--fds-spacing-2xl`, `--fds-spacing-3xl`, `--fds-spacing-4xl`
- **Layout Spacing**: All layout components must use Digdir spacing tokens for consistency
- **Component Padding/Margins**: Always use Digdir spacing tokens

### Border Radii
- **Radius Scale**: Use Digdir's border radius tokens:
  - `--fds-border-radius-sm`, `--fds-border-radius-md`, `--fds-border-radius-lg`, `--fds-border-radius-xl`, `--fds-border-radius-full`
- **Component Consistency**: Maintain consistent corner radii across components

### Elevation (Shadows)
- **Shadow Scale**: Use Digdir's shadow tokens:
  - `--fds-shadow-sm`, `--fds-shadow-md`, `--fds-shadow-lg`, `--fds-shadow-xl`
- **Elevation Hierarchy**: Maintain consistent elevation levels across the application

## Farger: hvilke semantiske tokens vi bruker

### Semantic Color Tokens
- **Primary Colors**:
  - `--fds-blue-60` (primary actions): #0066cc
  - `--fds-blue-70` (primary hover): #00315d
  - `--fds-blue-50` (primary light): #e7f3fa

- **Success Colors**:
  - `--fds-green-60` (success): #068400
  - `--fds-green-70` (success dark): #045c00

- **Danger Colors**:
  - `--fds-red-60` (danger): #d8000c
  - `--fds-red-70` (danger dark): #a20009
  - `--fds-red-100` (danger light): #fbd3d3

- **Warning Colors**:
  - `--fds-yellow-50` (warning): #f2c402
  - `--fds-yellow-60` (warning dark): #b99300

- **Neutral Colors**:
  - `--fds-gray-50` (background): #f0f0f0
  - `--fds-gray-100` (subtle): #f7f7f7
  - `--fds-gray-200` (borders): #dbdbdc
  - `--fds-gray-300` (medium): #c0c1c2
  - `--fds-text-default` (text): #1f2021
  - `--fds-text-subtle` (subtle text): #717274

### Surface Colors
- **Background**: `--fds-gray-50` for page backgrounds
- **Surface**: `white` for card and component backgrounds
- **Elevated surfaces**: Use appropriate shadows for elevation

### Border Colors
- **Default borders**: `--fds-gray-200`
- **Focused borders**: `--fds-blue-60`
- **Error borders**: `--fds-red-60`

## Komponentregler: knappe-hierarki, formfelter, tabell, badges, alerts

### Knapper - Hierarki og styling
- **Primary Button**:
  - Background: `--fds-blue-60`
  - Text: `white`
  - Border: `1px solid --fds-blue-60`
  - Hover: `--fds-blue-70`
  - Use for primary actions like "Submit", "Save", "Publish"

- **Secondary Button**:
  - Background: `white`
  - Text: `--fds-blue-60`
  - Border: `1px solid --fds-blue-60`
  - Hover: `--fds-blue-50` background
  - Use for secondary actions like "Cancel", "Edit", "Preview"

- **Danger Button**:
  - Background: `--fds-red-60`
  - Text: `white`
  - Border: `1px solid --fds-red-60`
  - Hover: `--fds-red-70`
  - Use for destructive actions like "Delete", "Archive", "Remove"

- **Size Variants**:
  - Default: `--fds-spacing-s` `--fds-spacing-m` padding
  - Small: `--fds-spacing-xs` `--fds-spacing-s` padding

### Formfelter
- **Input Fields**:
  - Border: `1px solid --fds-gray-200`
  - Background: `white`
  - Border-radius: `--fds-border-radius-md`
  - Focus: `--fds-blue-60` border with `0 0 0 3px rgba(0, 102, 204, 0.2)` outline

- **Select Fields**:
  - Same styling as input fields
  - Use Digdir Design System's `ds-input` class

- **Text Areas**:
  - Same styling as input fields
  - Minimum height: `calc(var(--dsc-input-size)*1.5)`

### Tabeller
- **Table Headers**:
  - Background: gradient from `--fds-gray-100` to `white`
  - Text: `--fds-text-default`, `--fds-font-weight-bold`
  - Border-bottom: `2px solid --fds-blue-100`

- **Table Rows**:
  - Hover: `--fds-blue-50` background
  - Alternating rows: consistent white background
  - Border-bottom: `1px solid --fds-gray-100`

- **Cell Padding**: `--fds-spacing-m` `--fds-spacing-l`

### Badges
- **Status Badges**:
  - Border-radius: `--fds-border-radius-full`
  - Padding: `--fds-spacing-xs` `--fds-spacing-m`
  - Font: `--fds-font-size-xs`, `--fds-font-weight-bold`

- **Color Variants**:
  - Active: `--fds-green-60` background
  - Inactive: `--fds-gray-300` background
  - Draft: `--fds-yellow-50` background
  - Submitted: `--fds-blue-200` background
  - Processed: `--fds-green-60` background

### Alerts (not currently implemented but for future use)
- **Info Alert**: `--fds-blue-100` background with `--fds-blue-60` border
- **Success Alert**: `--fds-green-100` background with `--fds-green-60` border
- **Warning Alert**: `--fds-yellow-100` background with `--fds-yellow-60` border
- **Error Alert**: `--fds-red-100` background with `--fds-red-60` border

## Dark mode strategi

### Current Status
- **Not Implemented**: Digiskjema currently follows Digdir Design System's approach which primarily focuses on light mode
- **Future Consideration**: Dark mode implementation would follow Digdir's design system guidelines when available
- **Accessibility Priority**: Maintain WCAG 2.1 AA compliance in any color mode

### Principles for Future Implementation
- Follow Digdir Design System's dark mode guidelines when available
- Maintain all accessibility requirements
- Preserve brand consistency
- Ensure proper contrast ratios in both modes

## Konkrete implementeringssteg

### Hvor theme importeres
- **Primary Location**: `frontend/src/index.css` - import Digdir Design System CSS
- **Import Statement**: `@import "@digdir/designsystemet-css";`
- **No Theme Import**: Do not import `@digdir/designsystemet-css/theme` as it does not exist

### Hvilke globale styles som er lov
- **CSS Custom Properties**: Define custom properties in `:root` that extend Digdir tokens
- **Layout Components**: Global styles for layout components like AppShell, header, sidebar
- **Typography Base**: Base typography styles that use Digdir font tokens
- **Focus Styles**: Global focus visibility styles
- **Accessibility Enhancements**: Global accessibility improvements

### Hvilke som er forbudt (random gradients, custom button-styling)
- **No Random Gradients**: Do not add decorative gradients that conflict with Digdir Design System
- **No Custom Button Styling**: Do not create custom button styles that don't follow Digdir patterns
- **No Override Core Tokens**: Do not change core Digdir color values (e.g., `--fds-blue-60`)
- **No Custom Shadows**: Do not create custom shadow styles that don't use Digdir tokens
- **No Custom Border Radius**: Do not use non-standard border radius values
- **No Decorative Elements**: Avoid adding decorative elements that don't serve a functional purpose
- **No Custom Color Palettes**: Do not introduce colors outside the Digdir Design System palette

### Implementation Rules
- **Token Usage**: Always use Digdir Design System tokens as the base
- **Semantic Extensions**: Only extend tokens with semantic, purposeful additions
- **Component Consistency**: Maintain consistent styling across all components
- **Accessibility Compliance**: Ensure all styling maintains WCAG 2.1 AA compliance
- **Responsive Design**: All styles must be responsive and work across devices
- **Performance**: Optimize CSS for performance and minimal bundle size