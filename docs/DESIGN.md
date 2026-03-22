# Design System Specification: The Kinetic Vault

## 1. Overview & Creative North Star

### The Creative North Star: "Precision Lithography"
In the high-stakes world of digital asset trading, visual noise is the enemy of execution. This design system moves away from the "dashboard-in-a-box" aesthetic. Instead, it adopts **Precision Lithography**—a philosophy where UI elements feel etched into the screen rather than pasted onto it. 

We achieve a premium, editorial feel by rejecting traditional borders in favor of **Tonal Topography**. By using subtle shifts in dark-scale values and intentional asymmetry in data visualization, we create a sense of infinite depth. The layout shouldn't feel like a grid; it should feel like a high-end physical console where data is the only thing that glows.

---

## 2. Colors & Surface Logic

The palette is rooted in a deep, obsidian foundation (`surface: #111417`), allowing our high-contrast "Action Colors" to command immediate attention without causing optical fatigue.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off parts of the interface. 
Boundaries must be defined through background color shifts. For example, a sidebar should be `surface_container_low`, while the main stage remains `surface`. This creates a sophisticated, "app-as-a-single-object" feel.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked sheets of darkened glass. Use the tiers to imply importance:
*   **Base Layer:** `surface` (#111417)
*   **Lower Priority/Backgrounds:** `surface_container_lowest` (#0b0e11)
*   **Standard Cards/Modules:** `surface_container` (#1d2023)
*   **Active/Elevated Elements:** `surface_container_highest` (#323538)

### The "Glass & Gradient" Rule
To elevate the experience, floating elements (modals, dropdowns) should use **Glassmorphism**. Apply a semi-transparent `surface_bright` with a 20px backdrop blur. 
*   **Signature Textures:** For primary CTAs (Buy/Long), use a linear gradient from `primary_container` (#00f296) to `primary_fixed_dim` (#00e38c). This adds "soul" and a tactile, liquid quality to the buttons that a flat hex code cannot achieve.

---

## 3. Typography

This system utilizes a dual-font strategy to balance character with extreme legibility.

*   **Display & Headlines (Space Grotesk):** A modern, geometric sans-serif used for market caps, large price tickers, and section headers. Its wide apertures and technical rhythm convey a sense of "The Future of Finance."
*   **Functional Text (Inter):** Used for all data tables, labels, and body copy. Inter is chosen for its exceptional readability at small scales (label-sm: 0.6875rem), which is critical for dense trading environments.

**The Editorial Scale:** Use `display-lg` (3.5rem) for singular, high-impact data points (e.g., Total Portfolio Balance) to create a clear visual anchor on the page, contrasted against `label-sm` for technical metadata.

---

## 4. Elevation & Depth

We eschew traditional shadows for **Tonal Layering**. Depth is a result of light logic, not drop-shadow presets.

*   **The Layering Principle:** Place a `surface_container_low` card on a `surface` background to create a "recessed" look. Place a `surface_container_high` card on a `surface` background to create a "protruding" look.
*   **Ambient Shadows:** When an element must float (e.g., a context menu), use a shadow with a 40px blur at 6% opacity. The shadow color should be a tinted version of `on_surface` to simulate light refracting through the UI layers.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility in data-heavy tables, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary (Buy/Profit):** Gradient of `primary_container` to `primary_fixed_dim`. Text: `on_primary_fixed`. High-roundedness (`md: 0.375rem`).
*   **Secondary (Sell/Loss):** Solid `secondary_container`. Text: `on_secondary_container`. 
*   **Tertiary:** No background. Use `label-md` typography with `surface_tint` as the text color.

### Data Tables & Cards
*   **No Dividers:** Forbid the use of line dividers between rows. Use a `2.5 (0.5rem)` vertical spacing scale to separate rows. Use a subtle hover state change to `surface_container_highest` to highlight the active row.
*   **Interactive Charts:** Background should be `surface_container_lowest`. Grid lines in the chart must use `outline_variant` at 10% opacity. The "Price Action" line should be `primary_fixed` with a 2px outer glow of the same color.

### Chips
*   **Status Chips:** Use `lg (0.5rem)` roundedness. For "Open Orders," use `tertiary_container` with `on_tertiary_container` text. Keep padding tight: `1.5 (0.3rem)` top/bottom, `3 (0.6rem)` left/right.

### Input Fields
*   **Structure:** Use `surface_container_low` for the input track. No bottom-line border. On focus, the container should shift to `surface_container_highest` with a "Ghost Border" of `primary` at 20% opacity.

---

## 6. Do's and Don'ts

### Do
*   **Do** use `surface_container` tiers to create hierarchy. An "Order Entry" panel should be one tier higher than the "Market History" panel.
*   **Do** use `spaceGrotesk` for numbers that represent value or change.
*   **Do** leverage the `0.5 (0.1rem)` spacing increment for micro-adjustments in data-dense tables.

### Don't
*   **Don't** use 100% opaque white for text. Always use `on_surface` or `on_surface_variant` to prevent "halation" (the glowing effect of white-on-black).
*   **Don't** use standard "drop shadows." If it doesn't look like it's physically layered using surface colors, it's incorrect.
*   **Don't** use "Alert Red" for Sell/Loss. Use the specified `secondary` (rose red) palette to maintain the sophisticated, high-end editorial tone.