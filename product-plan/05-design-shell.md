# App Shell Design Specification: Digiskjema

## AppShell layout (header, sidebar, main)

### Layout Structure
The AppShell follows a standard application layout with three primary regions:

```
┌─────────────────────────────────────────┐
│                Header                   │
├──────────────┬──────────────────────────┤
│              │                          │
│   Sidebar    │                          │
│              │                          │
│              │                          │
│              │                          │
│              │       Main Content       │
│              │                          │
│              │                          │
│              │                          │
│              │                          │
├──────────────┴──────────────────────────┤
│                Footer                   │
└─────────────────────────────────────────┘
```

### CSS Grid Implementation
- **Container**: CSS Grid with `grid-template-areas: "header header" "sidebar main" "footer footer"`
- **Grid Rows**: `var(--header-height) 1fr var(--footer-height)`
- **Grid Columns**: `var(--sidebar-width) 1fr`
- **Responsive Breakpoint**: Below 768px, layout changes to single column with mobile drawer

### Header Specifications
- **Height**: `--header-height` (70px)
- **Background**: White with transparency effect (`rgba(255, 255, 255, 0.95)`)
- **Box-shadow**: `var(--fds-shadow-medium)` for elevation
- **Position**: Sticky at top with `z-index: 1000`
- **Padding**: `0 var(--fds-spacing-xl)` horizontally

### Sidebar Specifications
- **Width**: `--sidebar-width` (280px)
- **Background**: White with transparency effect (`rgba(255, 255, 255, 0.95)`)
- **Border**: Right border `1px solid var(--fds-gray-200)`
- **Position**: Sticky with backdrop filter
- **Overflow**: Auto for scrolling when content overflows

### Main Content Specifications
- **Padding**: `var(--fds-spacing-2xl)` all around
- **Background**: Gradient using `--fds-gray-50`
- **Overflow**: Auto for scrolling when content overflows
- **Min-height**: `calc(100vh - var(--header-height) - var(--footer-height))`

## Navigasjon: grupper, aktiv state, mobil drawer

### Navigation Groups
Navigation items are organized into functional groups:

1. **Form Management Group**:
   - Skjema (Form overview)
   - Bygg skjema (Form builder)

2. **Template & Organization Group**:
   - Malmaker (Template gallery)
   - Kategorier (Category management)

3. **System Management Group**:
   - Leietakarar (Multi-tenant management)
   - Betingelser (Conditional logic)
   - Analyser (Analytics)
   - Språk (Language management)

4. **System Administration Group**:
   - Tilgjenge (Accessibility features)
   - Admin (System administration)

### Active State
- **Visual Indicator**: Left border `4px solid var(--fds-blue-60)`
- **Background**: Gradient from `--fds-blue-50` to white
- **Text Color**: `var(--fds-blue-60)`
- **Font Weight**: `var(--fds-font-weight-medium)`
- **Hover Effect**: Background color `var(--fds-blue-50)` with `transform: translateX(4px)`

### Mobile Drawer
- **Trigger**: Hamburger menu button in header on mobile
- **Behavior**: Slides in from left
- **Overlay**: Semi-transparent background overlay
- **Close**: Click outside or close button
- **Z-index**: 1000 to appear above other content

## Sideheader standard (tittel, beskrivelse, primær CTA)

### Side Header Structure
Each page includes a standardized header section:

```html
<div className="page-header">
  <h2>Page Title</h2>
  <div className="page-description">Page description</div>
  <div className="page-actions">Primary CTA button</div>
</div>
```

### Title Specifications
- **Typography**: 
  - Font size: `var(--fds-font-size-2xlarge)` (1.5rem)
  - Font weight: `var(--fds-font-weight-extrabold)` (700)
  - Color: `var(--fds-text-default)` with gradient text effect
  - Line height: Inherited from design system

### Description Specifications
- **Typography**:
  - Font size: `var(--fds-font-size-small)` (0.875rem)
  - Color: `var(--fds-text-subtle)` (#717274)
  - Margin-top: `var(--fds-spacing-xs)`

### Primary CTA
- **Position**: Top-right of page header (when applicable)
- **Style**: Primary button using Digdir Design System token
- **Behavior**: Contextual action based on page functionality

## Standard states: loading/empty/error/success

### Loading State
- **Global Loading**: Full-screen overlay with spinner when entire page is loading
- **Component Loading**: Skeleton components using `ds-skeleton` class
- **Spinner**: Digdir Design System spinner component
- **Text**: "Laster innhold..." or contextual loading text

### Empty State
- **Container**: Centered card with illustration and message
- **Title**: Bold, `var(--fds-font-size-large)` text
- **Description**: Subtle text explaining the empty state
- **Actions**: Primary and secondary buttons for next steps
- **Spacing**: `var(--fds-spacing-2xl)` padding around content

### Error State
- **Container**: Card with error styling
- **Icon**: Error icon using Digdir Design System
- **Title**: Error title in danger color
- **Description**: Detailed error explanation
- **Actions**: Retry or contact support buttons
- **Color**: Background uses `--fds-red-100` for error context

### Success State
- **Container**: Card with success styling
- **Icon**: Success checkmark using Digdir Design System
- **Title**: Success confirmation in success color
- **Description**: Success details
- **Actions**: Continue or next steps buttons
- **Color**: Background uses `--fds-green-100` for success context

## Responsiv oppførsel (mobil/tablet/desktop)

### Desktop (>1024px)
- **Sidebar**: Always visible, fixed width `--sidebar-width`
- **Header**: Full width with all navigation elements
- **Main Content**: Full responsive area
- **Grid**: Two-column layout maintained

### Tablet (768px - 1024px)
- **Sidebar**: Collapsed by default, expandable via menu button
- **Header**: Maintains full functionality
- **Main Content**: Adjusts to available width
- **Navigation**: Hamburger menu appears for sidebar access

### Mobile (<768px)
- **Layout Change**: Grid changes to single column
- **Sidebar**: Becomes drawer overlay
- **Header**: Compact layout with mobile menu button
- **Main Content**: Full width with adjusted padding
- **Navigation**: Mobile-first approach with drawer access
- **Touch Targets**: Minimum 44px for all interactive elements

### Responsive Breakpoints
- **Small**: <768px (Mobile)
- **Medium**: 768px - 1024px (Tablet)
- **Large**: >1024px (Desktop)

## Tilgjengelighet (fokusrekkefølge, skip-link, aria-mønstre)

### Focus Order
1. Header navigation (skip link first, then logo, then user menu)
2. Sidebar navigation items (top to bottom)
3. Main content (top to bottom)
4. Footer content

### Skip Link
- **Purpose**: Allow keyboard users to skip navigation
- **Implementation**: Hidden until focused, appears as primary button
- **Target**: Main content area
- **Text**: "Hopp til hovedinnhold"
- **Position**: Top of document flow, visible on focus

### ARIA Patterns
- **Navigation Landmarks**: 
  - Header: `role="banner"` or `<header>` element
  - Navigation: `role="navigation"` or `<nav>` element
  - Main Content: `role="main"` or `<main>` element
  - Footer: `role="contentinfo"` or `<footer>` element

- **Sidebar**:
  - `aria-label="Hovednavigasjon"`
  - `role="navigation"`

- **Menu Items**:
  - `role="menuitem"` for navigation items
  - `aria-current="page"` for active page
  - `aria-expanded` and `aria-controls` for expandable sections

- **Mobile Drawer**:
  - `aria-modal="true"` when open
  - `aria-hidden="true"` when closed
  - Focus trap when open

- **Buttons**:
  - `aria-label` for icon buttons
  - `aria-pressed` for toggle buttons
  - `aria-describedby` for additional context

### Keyboard Navigation
- **Tab Order**: Logical, intuitive progression through interface
- **Focus Indicators**: Visible focus rings using Digdir Design System
- **Keyboard Shortcuts**: Accessible navigation via keyboard only
- **Focus Management**: Proper focus handling when content changes

## Komponentliste (Digdir-komponenter som brukes hvor)

### Header Components
- **Logo**: Typography using `--fds-font-family` and `--fds-blue-60`
- **User Menu**: Avatar using `ds-avatar` or similar pattern
- **Navigation Button**: `ds-button` for mobile menu toggle
- **User Info**: Text components with appropriate typography tokens

### Sidebar Components
- **Menu List**: `<ul>` with `ds-list` styling or similar
- **Menu Items**: `<li>` elements with `ds-list-item` styling
- **Active State**: Custom styling built on Digdir tokens
- **Icons**: If used, Digdir's icon system (though text-only for now)

### Main Content Components
- **Page Headers**: Typography components with Digdir tokens
- **Cards**: `ds-card` or similar container with Digdir styling
- **Buttons**: Primary, secondary, and danger buttons following Digdir hierarchy
- **Tables**: `ds-table` or native table with Digdir styling
- **Forms**: `ds-input`, `ds-select`, `ds-textarea` for all form elements
- **Badges**: `ds-badge` for status indicators

### Footer Components
- **Text**: Standard typography with Digdir tokens
- **Layout**: Flexbox or grid using Digdir spacing tokens

### State Components
- **Loading**: `ds-skeleton` for skeleton screens
- **Empty State**: Custom layout with Digdir typography and spacing
- **Error/Success**: Alert patterns using Digdir color tokens
- **Spinners**: `ds-spinner` for loading indicators

### Utility Components
- **Spacing**: Digdir spacing tokens (`--fds-spacing-*`)
- **Typography**: Digdir font tokens (`--fds-font-*`)
- **Colors**: Digdir color tokens (`--fds-*`)
- **Shadows**: Digdir shadow tokens (`--fds-shadow-*`)
- **Border Radius**: Digdir radius tokens (`--fds-border-radius-*`)