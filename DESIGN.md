# Design System: Architectural Charcoal & Solar Flare (Spatial Monolith)

<!-- impeccable:design-schema 1 -->

## World & Concept

An architectural, museum-grade technical portfolio engineered for Nitish Kumar (Software Engineer at Sopra Steria & Generative AI Builder). The design language rejects generic cyberpunk tropes, cyan neon halos, fake HUD telemetry, and decorative loading overlays. In their place stands an architectural aesthetic defined by charcoal monolithic surfaces, crisp off-white typography, restrained solar flare orange accents (`#ff6b35`), and an interactive 3D WebGL centerpiece.

## Palette

### Core Tokens
- **Canvas Void** (`#0b0d11`): Deep architectural ground, calibrated to avoid muddy pure black.
- **Charcoal Plate** (`#12151c`): Elevated surface for cards, dialogs, and navigation containers.
- **Charcoal Elevated** (`#181c26`): Secondary layer for internal badges, chips, and code previews.
- **Architectural Border** (`#222735`): Crisp 1px structural dividing lines.
- **Border Active** (`#ff6b35` / `rgba(255, 107, 53, 0.35)`): High-signal focus and active indicator.

### Typography Tokens
- **Architectural Off-White** (`#f1f3f7`): Primary headlines, titles, and high-emphasis labels.
- **Architectural Slate Muted** (`#9ba3af`): Body prose, secondary metadata, contrast ratio ≥ 5.5:1.
- **Architectural Slate Dim** (`#64748b`): Tertiary captions, copyright, and subtle micro-labels.

### Accent Tokens
- **Warm Solar Flare / Orange** (`#ff6b35`): High-signal primary accent for interactive states, key CTA buttons, active timeline nodes, and focal highlights. Total viewport coverage strictly maintained below 8%.
- **Warm Orange Hover** (`#ff8352`): Interactive hover feedback state.
- **Warm Orange Tint** (`rgba(255, 107, 53, 0.1)` to `rgba(255, 107, 53, 0.25)`): Subtle badge fills, glow accents, and text selection.

## Typography

- **Headlines & Titles**: `Syne`, sans-serif (`--font-syne`), letter-spacing `-0.02em`. Weight 700 / 800. No text gradients; emphasis comes from structural scale and weight.
- **Body & Prose**: System sans-serif / `Inter`, 15px–17px, line-height 1.65, color `#9ba3af`.
- **Metadata, Tags & Telemetry**: `Space_Mono`, monospace (`--font-space-mono`), 11px–13px, uppercase tracking 1px–2px.

## Elevation, Depth & 3D Spatial Grammar

### 3D WebGL Centerpiece
- Powered by `three` (`Hero3DCanvas.tsx`).
- Interactive rotating 3D architectural polyhedron (icosahedron with dark reflective physical material, structural wireframe edges, and warm orange vertex nodes).
- Mouse and touch drag interaction with inertial lerping and physics damping.
- Static blueprint SVG fallback when WebGL is unsupported or `prefers-reduced-motion` is active.

### Card Depth & Hover States
- Flat resting elevation with 1px architectural border (`#222735`).
- On hover: 3D perspective tilt tracking cursor coordinates (`rotateX` / `rotateY` up to 6deg), lifting the card forward (`translateZ(4px)`).
- Border sharpens to `rgba(255, 107, 53, 0.4)` with soft shadow `0 16px 40px -12px rgba(0, 0, 0, 0.5)`.

## Brand Identity & Monogram

- **N Monogram**: Faceted, geometric architectural monogram rendered from the user's vector asset (`/logo-white-transparent.png`).
- Embedded consistently across Navbar brand badge, Hero identity pill, Architecture payload watermark, Footer, and Favicon.

## Components

### Buttons
- **Primary Action**: Background Warm Orange (`#ff6b35`), text Charcoal Void (`#0b0d11`), font Space Mono 12px bold uppercase tracking, radius 8px (`rounded-lg`), min-height 44px.
- **Secondary Action**: Background Charcoal Plate (`#12151c`), border 1px solid (`#222735`), text Off-White (`#f1f3f7`), radius 8px.

### Badges & Technical Chips
- Background Charcoal Elevated (`#181c26`), border 1px solid (`#222735`), text `#f1f3f7`, Space Mono 11px.

### Navigation
- Height 80px, fixed top bar, background `#0b0d11` at 90% opacity with 12px backdrop blur, bottom border 1px solid `#222735`.
- Warm orange scroll progress bar pinned to the top viewport edge.

### Interactive Pipeline Flow
- 5-stage architectural pipeline simulator visualizing Context Ingestion, Model Context Protocol (MCP), Hybrid Vector/Graph RAG, LangChain Agent Loops, and Groq LPU inference.
- Automated sequence pulse simulating real-time token and query dispatch.

## Do's and Don'ts

### Do:
- Maintain generous architectural spacing and structural hierarchy.
- Preserve off-white against charcoal contrast (minimum 5:1 for body text).
- Use the N monogram as the primary brand identifier.
- Provide accessible fallbacks and keyboard focus rings for all interactive elements.

### Don't:
- Don't use kicker/eyebrow tags ("01 // ...") above section headings.
- Don't use gradient text or neon glows.
- Don't introduce fake HUD telemetry or terminal glitch animations.
- Don't hijack the user's scroll behavior.
