# Prime Book Publishing Labs Project Context

This repository is a static/exported HTML website located at:

`c:\Users\Saba\Downloads\Prime Book Publishing Labs\Prime Book Publishing Labs\hancockpublishers.com`

This file exists so a new Codex chat can continue work without re-scanning the whole repo first.

## Read This First

- This is not a clean app codebase. It is a static exported site with messy structure, duplicated CSS, legacy markup, and some malformed HTML.
- Some files contain content, styles, or scripts after an early closing `</html>`. Do not assume valid document order.
- Homepage-specific styling is mostly inside `index.html`, especially a large inline style block after an early `</html>`.
- Shared/global/sitewide styling is mostly in `assets/css/main.css`, especially the final override area near the bottom.
- Search before patching. There are often duplicate selectors and older rules that still exist.
- Keep changes tightly scoped. Prefer late overrides over rewriting large legacy blocks.
- Use `apply_patch` for edits.

## Project Shape

Main pages:

- `index.html` - homepage
- `services.html`
- `about-us.html`
- `about-standalone.html`
- `portfolio.html`
- `reviews.html`
- `contact-us.html`
- `privacy-policy.html`
- `terms-and-conditions.html`

Newer replacement / custom pages:

- `about-us-new.html`
- `portfolio-new.html`
- `reviews-new.html`

Primary service pages:

- `audiobook-service.html`
- `author-website-design.html`
- `book-cover-design.html`
- `book-editing-services.html`
- `book-illustration-services.html`
- `book-marketing-services.html`
- `book-publishing-services.html`
- `ghostwriting-services.html`

Key shared assets and folders:

- `assets/css/main.css` - global stylesheet and most shared overrides
- `assets/css/editorial-pages.css` - styles for `about-us-new.html`, `portfolio-new.html`, `reviews-new.html`
- `assets/js/main.js`, `assets/js/custom.js` - existing frontend behavior
- `assets/img/service-heroes/` - service page hero backgrounds
- `assets/img/service-workflow/` - workflow section assets
- `assets/img/editing/` - package card assets and connectors
- `assets/img/platforms/` - homepage platforms-section assets
- `assets/img/brands/` - platform logos
- `assets/img/opt/` and `assets/img/portfolio-home/` - homepage portfolio visuals
- `assets/img/page-heroes/` - custom hero images used by the newer About / Portfolio / Reviews pages

## Current Truth Snapshot

This section is more important than older notes below if they conflict.

- The repo is now a mix of:
  - original exported legacy pages
  - heavily customized homepage
  - standardized service pages
  - three newer editorial-style replacement pages:
    - `about-us-new.html`
    - `portfolio-new.html`
    - `reviews-new.html`
- The homepage is still the most special-case file in the repo.
- Shared/sitewide styling is mostly controlled by late overrides near the bottom of `assets/css/main.css`.
- The three newer editorial pages have their own header/hero/button overrides in `assets/css/editorial-pages.css`.
- `about-us-new.html` now uses a custom about-only hero layout with the existing `assets/img/page-heroes/about-us-hero.png` background, a centered glass panel, screenshot-matched About Us copy using the Prime Book Publishing Labs name, and four glass stat cards below it.
- The `Our Vision & Mission` cards on `about-us-new.html` now use a dark navy background with white headings, body text, and icons through the `.editorial-about-mission__*` rules in `assets/css/editorial-pages.css`.
- `portfolio-new.html` hero copy uses scoped text-shadow rules in `assets/css/editorial-pages.css` for the hero kicker, heading, and body copy.
- `reviews-new.html` now keeps its existing hero background image but uses a centered glass hero panel like the about page with the headline “What Authors Say About Prime Book Publishing Labs.”
- If a visual change “does nothing,” there is usually a later override or page-specific stylesheet beating it.

## Current Header System

Canonical visible business name across the site is now:

- `Prime Book Publishing Labs`

The site now uses a shared two-state header system:

- top state:
  - blurred glass / translucent look
  - white nav text
  - full logo
- scrolled state:
  - metallic gold pill background
  - dark navy nav text
  - compact center logo using `assets/img/prime-logo.png`

Important implementation split:

- homepage:
  - exact approved version is in `index.html`
  - body class / scroll class logic is homepage-specific
- most sitewide pages:
  - shared version is in `assets/css/main.css`
  - scroll toggling is in `assets/js/main.js`
- editorial replacement pages:
  - `about-us-new.html`
  - `portfolio-new.html`
  - `reviews-new.html`
  - these use shared nav markup but are further tuned in `assets/css/editorial-pages.css`

Current header logo assets:

- top / transparent state logo:
  - `assets/img/prime-logo-full.png`
- sticky / scrolled compact logo:
  - `assets/img/prime-logo.png`

Do not use `assets/img/logo.png` for sticky header behavior anymore.

## Current Navigation Order

Current intended nav order across the site:

- `About`
- `Services`
- `Logo` centered and linked to homepage
- `Portfolio`
- `Reviews`

Current nav interaction rule:

- header nav links should not change text color on hover, focus, or active/current state
- the only interaction cue for top-level header links should be the underline
- transparent/top-state headers keep white text during interaction
- scrolled gold-pill headers keep dark navy text during interaction

Current mobile header note:

- the phone-only shared header uses a left-side placeholder `::before` block and the right-side hamburger button to keep the center logo visually balanced
- the hamburger control should stay vertically centered in the pill header, with the three bars centered inside the circular button
- the hamburger button is positioned absolutely in the mobile header so it does not jump during scroll-state changes

## Current Button System

Current intended button system:

- premium metallic gold gradient
- dark navy text
- subtle inset highlight and restrained shadow
- not flat yellow
- not glossy / plastic

Primary reusable selectors are enforced near the bottom of `assets/css/main.css`.

Important nuance:

- many old button rules still exist higher up in `main.css`
- the final cleanup block at the end is meant to win
- hero-specific older gold/navy button overrides were also brought closer to the same premium system

Editorial page CTA buttons:

- `about-us-new.html`
- `portfolio-new.html`
- `reviews-new.html`

use `.editorial-btn` rules in `assets/css/editorial-pages.css`

## Current Contact Details

Canonical sitewide contact details are now:

- email:
  - `info@primebookpublishinglabs.com`
- phone:
  - link target: `tel:+14076800272`
  - display format: `(407) 680-0272` or `+1 (407) 680-0272` depending on context
- WhatsApp:
  - link target: `https://wa.me/19544107418`
- mailing address:
  - `2630 W Broward Blvd Suite 203 #1134`
  - `Fort Lauderdale, FL 33312`
  - footer/address blocks should link to:
    - `https://maps.google.com/?q=2630%20W%20Broward%20Blvd%20Suite%20203%20%231134%20Fort%20Lauderdale,%20FL%2033312`

Footer review logo links are now:

- Trustpilot:
  - `https://www.trustpilot.com/review/primebookpublishinglabs.com`
- Reviews.io:
  - `https://www.reviews.io/company-reviews/store/primebookpublishinglabs.com`
- Google Reviews:
  - `https://www.google.com/maps/place//data=!4m3!3m2!1s0x88d901af7b400bc9:0x5c6eb73a3668fb50!12e1?source=g.page.m.ia._&laa=nmx-review-solicitation-ia2`

Important recent correction:

- the left contact rail phone and WhatsApp links in `assets/js/main.js` are part of the sitewide contact surface and must stay aligned with the canonical contact values above

## Current Gold Text System

There are now two related gold systems:

1. Metallic gold buttons
2. Metallic/clipped gold text for text that was already intended to be gold

Important:

- Do not automatically convert all headings to gold.
- Only elements already intended as gold accents should use the metallic gold text treatment.

Homepage-only gold text tuning also exists inside `index.html`.

## Current Left Contact Rail

The left rail is sitewide and is generated/normalized by `assets/js/main.js`.

Current intended behavior:

- dark navy by default
- expands on hover
- gold hover state
- items:
  - Live Chat
  - Phone
  - Whatsapp
  - Instagram
  - Facebook
- right floating sidebar/widgets were removed sitewide

Key styling lives in `assets/css/main.css`.

Important recent correction:

- rail tabs should be dark blue normally
- they should only turn gold in the hover/expanded state

## Current Homepage State

Homepage file:

- `index.html`

Homepage body class:

```html
<body class="homepage-index gd-form homepage-nav-at-top">
```

Homepage-specific truths:

- header:
  - glass at top
  - metallic gold on scroll
  - compact `prime-logo.png` on scroll
- hero:
  - current approved version is the source of truth for service-page hero rollout
  - left hero content has been moved upward for better centering against the form
  - hero form is currently 1-column on homepage
  - hero form is intentionally larger and visually stronger than earlier versions
- homepage FAQ:
  - homepage-only FAQ styling currently lives in `index.html`
  - a redesign request based on a screenshot was being worked on but is not yet reliably finalized in the repo
  - if resuming FAQ work, inspect both the FAQ CSS block around the homepage-specific overrides and the FAQ markup in `index.html`

## Current Service Page Hero System

Service pages now intentionally follow the homepage hero more closely.

Shared selector:

- `.service-hero-bg`

Current intended service-page hero behavior:

- each page keeps its own copy and its own background image
- hero background images should show without a gradient/tint overlay
- left hero content block is shifted upward to visually align with the form
- right hero form remains in place unless a page-specific visual issue requires adjustment
- hero form is now single-column on service pages, matching the current homepage form stack
- service hero CTA buttons should follow the premium metallic gold system

This behavior is controlled in `assets/css/main.css`.

Important recent correction:

- the final `.service-hero-bg::before` override near the bottom of `assets/css/main.css` disables the hero gradient overlay on service pages only

## Current Service-Page End CTA / Contact Section

The homepage’s final CTA/contact section near the footer was copied to all service pages.

That section is now the intended end-of-page block on service pages as well.

Related styling:

- `assets/css/main.css`
- `#after_cta.contact-form-section`

## Current Editorial Replacement Pages

These three pages are separate custom replacements, not just slight edits to legacy pages:

- `about-us-new.html`
- `portfolio-new.html`
- `reviews-new.html`

Their styling source of truth is:

- `assets/css/editorial-pages.css`

They use:

- custom hero images
- custom page sections
- shared nav markup
- custom CTA/button classes (`.editorial-btn`)

If header or CTA behavior looks wrong only on those three pages, inspect `assets/css/editorial-pages.css` before touching global header/button rules.

Large extra content:

- `blogs/` contains a huge exported blog/WordPress-style subtree.
- Avoid touching `blogs/` unless the task is specifically blog-related.

## Design System

Current working palette:

- Dark navy: `#061C45`
- Rich navy: `#0B2D63`
- Gold: `#D4A55A`
- Darker gold hover: `#BE8C3D`
- Cream/off-white: `#F8F4EE`
- White: `#FFFFFF`
- Charcoal text: `#1F2937`
- Soft border: `#E7E2DA`

Brand assets:

- `assets/img/prime-logo-full.png` - fuller logo
- `assets/img/prime-logo.png` - smaller `p` mark

Typography/style direction:

- Dark navy + gold is the dominant visual language.
- Buttons, cards, dividers, side rails, and flow/work sections should feel premium/editorial rather than generic SaaS.
- Homepage and service pages use a shared visual family, but homepage has a lot of page-specific inline styling in `index.html`.

## Known Structural Pitfalls

- `index.html` contains major homepage-specific CSS inline. If a homepage change does not respond to `main.css`, check `index.html`.
- Some service pages also have odd inline structures around hero sections and section wrappers.
- Duplicate button rules exist in `main.css`; later rules usually win.
- Some classes are reused inconsistently across pages.
- Some sections are active on one service page and commented out on another.
- There are old styles and newer override blocks for the same elements. Always search for the selector before editing.

## Homepage Architecture

Homepage body class:

```html
<body class="homepage-index gd-form homepage-nav-at-top">
```

Homepage custom nav:

```html
<nav class="homepage-main-nav" aria-label="Main navigation">
```

Important homepage areas:

1. Fixed/scrolled nav
2. Hero section
3. Partner/value section
4. Custom services stack section
5. Dark/gold editorial sections
6. Portfolio section
7. Platforms/brands section
8. Reviews section

### Homepage nav

- There should only be one homepage nav.
- Top state: transparent, full logo, white nav text.
- Scrolled state: navy background, smaller `p` mark, white text with gold hover/active feel.
- Scroll behavior is controlled in `index.html`.
- Services submenu on homepage has its own styling in `index.html`, not just `main.css`.

### Homepage hero

Hero markup:

```html
<header class="section masthead bg-gradient" id="hero">
```

Important notes:

- This is the hero section, not the nav header.
- Background image is `assets/img/home-final.png`.
- Hero overlay styling is inside `index.html`.
- The overlay was changed from a light/white tint to a black overlay directly in `index.html`.
- Homepage hero contains the prominent CTA/buttons and the hero form.

### Homepage hero form

- Uses `.hero-form-card`.
- Homepage and service-page hero forms are visually related.
- The form/select visual tuning lives partly in `main.css` and partly in `index.html`.

### Homepage custom services stack

This is the section visually like:

- numbered rows
- dark navy cards by default
- gold hover/active state

It corresponds to the “Discover Our Professional Services” / “We Offer Complete Book Publishing Services Under One Roof” style section.

Important:

- If this section looks wrong on the homepage, inspect both `index.html` and the late overrides in `assets/css/main.css`.
- There had been a white override problem before; the intended state is dark blue default and gold on hover.

### Homepage platforms / brands section

Section is the dark navy editorial section with platform cards like:

- Amazon KDP
- Barnes & Noble
- Walmart
- Apple Books
- Google Play Books
- Rakuten Kobo
- Spotify

Important:

- The card boxes should be dark navy, not white.
- Homepage-specific styles for this live in `index.html`.
- Decorative assets include:
  - `assets/img/platforms/platform-divider.png`
  - `assets/img/platforms/platform-card-frame.png`

### Homepage reviews + portfolio

Recent homepage custom sections include:

- `homepage-book-portfolio-section`
- `homepage-reviews-slider-section`

These are custom-styled and should be treated as homepage-only sections unless a user asks for shared behavior.

## Sitewide Button System

Current intended button system:

Default sitewide buttons:

- transparent background
- gold text
- gold border

Hover:

- gold background
- dark text
- gold border

Hero section buttons:

- both hero buttons should be solid gold by default
- hover flips to navy/dark treatment

Important implementation note:

- Generic button rules live in `assets/css/main.css`.
- Homepage hero button behavior responded correctly.
- Service-page hero button behavior has been stubborn due to legacy overlap and may still need verification page by page if a future task touches them.

Common selectors involved:

- `.book-btn`
- `.main-btn`
- `.btn-black-bg`
- `.cta-btn-small.main-btn.book-btn`
- `.service-hero-bg`
- `header.section.masthead`

## Sitewide Sidebar / Floating Rail

The left social rail and right floating quote/contact widgets were restyled sitewide to match the navy/gold look from the provided references.

If they regress:

- inspect `assets/css/main.css`
- check for page-specific inline overrides only if needed

## Service Page Architecture

Service pages generally share:

- hero section
- intro/value sections
- process/flowchart section on some pages
- package/pricing section on selected pages
- CTA sections

Shared hero background classes:

- `service-hero-audiobook`
- `service-hero-author-website`
- `service-hero-book-cover`
- `service-hero-book-editing`
- `service-hero-book-marketing`
- `service-hero-book-publishing`
- `service-hero-ghostwriting`
- `service-hero-illustration`

Hero background assets:

- `assets/img/service-heroes/audiobook.png`
- `assets/img/service-heroes/author-website.png`
- `assets/img/service-heroes/book-cover.png`
- `assets/img/service-heroes/book-editing.png`
- `assets/img/service-heroes/book-marketing.png`
- `assets/img/service-heroes/book-publishing.png`
- `assets/img/service-heroes/ghostwriting.png`
- `assets/img/service-heroes/illustration.png`

## Workflow / Flowchart Sections

The old flowchart/process sections on service pages were converted to a shared screenshot-inspired workflow style.

Shared component lives in:

- `assets/css/main.css`

Core selector:

- `.service-workflow-section`

Supporting asset:

- `assets/img/service-workflow/workflow-center-ornament.svg`

Pages with live workflow section styling updated:

- `audiobook-service.html`
- `author-website-design.html`
- `ghostwriting-services.html`
- `book-editing-services.html`
- `book-publishing-services.html`
- `book-cover-design.html`

Visual direction:

- dark navy background
- gold eyebrow text
- centered title/subtitle
- pinned-note style cards
- central decorative ornament
- CTA row below

If future work touches these sections:

- preserve the shared component rather than creating one-off variants unless explicitly requested

## Packages / Pricing Section System

A screenshot-inspired package-card system was built for selected service pages.

Shared selector:

- `.pricing-section--editing-process`

Related selectors:

- `.editing-process-grid`
- `.pack-main-wrapper`
- `.pack-1` through `.pack-5`

Assets:

- `assets/img/editing/book-editing-packages-bg-v2.png`
- `assets/img/editing/process-icon-consultation.svg`
- `assets/img/editing/process-icon-review.svg`
- `assets/img/editing/process-icon-edit.svg`
- `assets/img/editing/process-icon-delivery.svg`
- `assets/img/editing/process-string-1.svg`
- `assets/img/editing/process-string-2.svg`
- `assets/img/editing/process-string-3.svg`

Service pages that should keep packages:

- `book-publishing-services.html` - 3 plans
- `ghostwriting-services.html` - 3 plans
- `book-marketing-services.html` - 4 plans
- `book-editing-services.html` - 4 plans
- `book-illustration-services.html` - 4 plans

Service pages where packages were intentionally removed / not kept:

- `audiobook-service.html`
- `author-website-design.html`
- `book-cover-design.html`

Implementation notes:

- Card sizing needs to match plan count.
- 3-card and 4-card layouts may need different spacing behavior.
- Connector strings were custom assets and placement was adjusted multiple times.
- Some issues were fixed in publishing/marketing/illustration package sections already, but future visual QA is still a good idea if these sections are touched again.
- Latest sizing update: service-page `Our Packages` sections now use a wider desktop container and larger plan cards/text through a scoped override in `assets/css/main.css`; connector strings were stretched to match the larger card spacing. The live package pages are `book-editing-services.html`, `book-publishing-services.html`, `ghostwriting-services.html`, `book-marketing-services.html`, and `book-illustration-services.html`.
- Latest text-color update: gold package cards (`pack-1`, `pack-3`, `pack-5`) use dark navy for the top label and plan title, while the `INSTALLMENT AVAILABLE`/top-plan label is larger across all package cards.

## Audiobook Service Page Special Notes

`audiobook-service.html` received several page-specific adjustments.

Section counting note:

- When user says “count sections after hero,” the correct starting point is:
  - Section 1 = `Reach More Readers Through Audio`

Important recent background mapping work:

- `Reach More Readers Through Audio` uses `assets/img/home-section-white-bg.png`
- `Let Us Bring Your Story To Life Through Audio` should use `assets/img/home-section-blue-plain.png`

Important recent color note:

- The `Let Us Bring Your Story To Life Through Audio` section also needed white text because wrapper-level color alone was being overridden.
- If that section regresses, inspect direct inline styles on its heading/paragraphs.

## Homepage Background Assets Frequently Used

- `assets/img/home-section-white-bg.png`
- `assets/img/home-section-blue-plain.png`
- `assets/img/home-section-bg-books-gold.png`
- `assets/img/home-section-bg-books-gold-small.png`
- `assets/img/home-final.png`

Note:

- There is both `home-section-blue-plain.png` and older references to `home-section-blue-plain-bg.png`. Use the actual file that exists in the repo.

## CSS / HTML Search Priorities

When troubleshooting, check in this order:

1. target page HTML file
2. inline `<style>` in that page
3. late overrides in `assets/css/main.css`
4. older legacy rules in `assets/css/main.css`

Useful selectors/search terms:

- homepage:
  - `homepage-index`
  - `homepage-main-nav`
  - `homepage-services-dropdown`
  - `homepage-platforms__card`
  - `#hero.masthead`
- buttons:
  - `book-btn`
  - `btn-black-bg`
  - `main-btn`
- service pages:
  - `service-hero-bg`
  - `service-workflow-section`
  - `pricing-section--editing-process`

## Current User Preferences

- Read `context.md` before making changes.
- Keep `context.md` updated after every completed change so future chats inherit the latest state.
- Do not scan the whole repo unnecessarily when a focused context file can avoid it.
- Homepage-specific work is usually in `index.html`.
- Global/sitewide overrides are usually near the bottom of `assets/css/main.css`.
- Search before patching.
- Keep changes scoped.
- If asked, list modified files at the end.
- Follow the provided screenshot/reference closely rather than making generic design decisions.
- Do not add new sections where the user did not ask for them.

## Recently Completed / Important Changes

These are the major changes already made in this project:

- Homepage custom nav and scrolled-state behavior refined.
- Homepage hero overlay changed to black in `index.html`.
- Homepage service-stack cards corrected to dark navy default with gold hover behavior.
- Homepage platforms/brands cards corrected to dark navy card boxes.
- Homepage submenu text color fixed via homepage-specific override in `index.html`.
- Sitewide submenu text color fixed in `assets/css/main.css`.
- Sitewide sidebar/floating rail restyled to navy/gold.
- Sitewide button system updated to transparent gold-outline by default.
- Hero buttons intended to be solid gold.
- Service-page workflow sections redesigned into shared pinned-note style.
- Package sections redesigned for selected service pages only.
- Audiobook section backgrounds and text colors adjusted.
- Homepage reviews slider now enlarges the actual center card via late inline CSS and a center-detection script in `index.html`.
- Service-page review sliders now enlarge the actual center card via `assets/js/main.js` adding `service-reviews-enhanced` and late rules in `assets/css/main.css`.
- Service-page hero background images now render without the gradient/tint overlay via a final `.service-hero-bg::before` override in `assets/css/main.css`.
- CTA buttons are now section-aware sitewide through `assets/js/main.js`: white, cream/`--theme-cream`, and `home-section-white-bg.png` sections use dark navy buttons, all other sections use gold buttons, and hover keeps the same color while only animating slightly.
- Important correction: the homepage white-section CTA rule needed explicit direct selectors such as `.complete-Solution-section a.cta-btn-small.main-btn.book-btn` and `background-image: none !important`; the broader `:is(...)` rule did not reliably beat the old gradient buttons.
- Second correction: some homepage button gradients still won after CSS-only changes, so `index.html` now also has a late homepage-only script that applies inline `!important` button colors based on the closest section background.
- Latest correction: the proven section-aware button color logic was promoted to `assets/js/main.js` so all pages that load the shared script get the same inline `!important` button color treatment.
- Latest nuance: cream-like computed backgrounds, including `background-color: var(--theme-cream) !important`, are treated like white sections and should receive dark navy buttons.
- Dark/navy sections must never receive dark navy buttons; `assets/js/main.js` now treats dark computed backgrounds and non-white background images as gold-button sections before checking light fallbacks.
- Stronger fix: the section-aware button detector in `assets/js/main.js` now walks all ancestors, checks inline background declarations and known light/dark classes before computed styles, and reapplies after delayed page/slider initialization.
- Important bug fix: transparent ancestors such as rows/columns compute as `rgba(0, 0, 0, 0)` and must be skipped before dark-background checks; otherwise light/cream sections incorrectly get gold buttons.
- Service-page `Our Packages` sections now have larger desktop plan cards, larger plan text/list text, wider desktop layout coverage, and stretched connector strings via the shared `.pricing-section--editing-process` rules in `assets/css/main.css`.
- Gold cards inside service-page `Our Packages` sections now force the top plan label and plan title to dark navy; the top label font size is larger for all cards.
- Service-page FAQ headings (`Frequently Asked Questions`) now use the shared metallic gold gradient text treatment through the `.faq-section.bg-light` rules in `assets/css/main.css`.
- `.brand-font` uses the shared metallic gold text treatment but must remain `display: inline`; do not set it to `inline-block`, because longer highlighted phrases jump to a new line instead of wrapping naturally with the heading text.
- Section-aware buttons: light service showcase sections using `.complete-Solution-section.bg-grdient` must receive dark navy buttons. The shared detector in `assets/js/main.js` has a specific `isLightShowcaseSection()` exception so the cream gradient is not mistaken for a dark/background-image section.
- Phone header: `assets/js/main.js` now enhances every `.homepage-main-nav` with a generated hamburger button and cloned mobile menu, while `assets/css/main.css` has a final `max-width: 767px` override that hides desktop nav links, keeps only the full logo visible on phone, and prevents the scrolled-state compact mark from replacing it. Desktop/tablet header behavior should remain unchanged.
- Mobile header centering fix: the final phone-only `.homepage-main-nav.is-mobile-ready .homepage-navbar` rules in `assets/css/main.css` now reserve equal 42px spacer blocks on both left and right so the full logo stays truly centered even though the hamburger button is absolutely positioned.
- Sticky header centering fix: in the final desktop/tablet nav override block in `assets/css/main.css`, the scrolled-state `.homepage-centered-nav__logo` cell is now forced to a centered 74px flex slot so the compact `prime-logo.png` mark stays visually centered in the gold sticky header.
- Sitewide loading screens that use `#loading-screen` now display `assets/img/prime-logo.png` instead of the old favicon image. Head favicon links were intentionally left unchanged.
- Navigation Services behavior: the Services parent item is now a dropdown trigger only. `assets/js/main.js` prevents navigation on the parent Services link, keeps desktop hover behavior, and turns the mobile Services item into a collapsible button so the submenu is not always expanded.
- The shared header label for the about page now reads `About Us` across the site’s top navigation, so cloned mobile menus generated from that markup inherit the same wording automatically.
- On `author-website-design.html`, the blue “Website Support And Maintenance That Never Stops” split section now vertically centers its text and image columns together; the image column no longer bottom-aligns the artwork.
- The homepage popup form in `index.html` was redesigned into a homepage-only two-panel Prime modal: a branded navy visual panel on the left and a light form panel on the right, while preserving the existing popup field names, backend action, validation hooks, and `#mainpopupform` behavior. Supporting assets were added under `assets/img/popup-homepage/`.
- The old shared popup skin in `assets/css/main.css` was re-scoped to `.sitewide-offer-popup` so it no longer bleeds into the custom homepage popup redesign in `index.html`.
- The homepage popup now uses split scrolling on desktop: the outer modal shell stays fixed/composed, the right form panel handles overflow internally, and the left visual panel no longer scrolls out of position with the form.
- The homepage popup proportions were further tuned toward the provided reference: narrower left visual panel, wider right form panel, smaller right-panel header, more contained left artwork, and popup-specific close/button styling that overrides broader homepage button rules.
- The homepage popup’s left panel was further simplified toward the reference: the decorative background icon/halo was removed, the headline now uses explicit stacked line breaks, and the support copy was reduced to a cleaner poster-style composition.
- The shared popup system for non-homepage pages now also uses the newer Prime two-panel modal: `assets/js/main.js` builds the updated markup and `assets/css/main.css` provides the matching sitewide `.sitewide-offer-popup` layout, including the mixed two-column/single-column field structure and compact mobile stack.
- On mobile/tablet popup widths (`max-width: 840px`), the promotional `.offer-left` panel is hidden for both the homepage inline popup CSS and the shared `.sitewide-offer-popup` CSS, so users see the form first.
- Homepage and service-page hero copy now uses a stronger black text shadow for readability over image backgrounds. The homepage version is controlled in the late hero override block inside `index.html`; service-page hero copy uses the shared `.service-hero-bg` rules in `assets/css/main.css`.
- Mobile hero sizing for the homepage and service pages is now more compact: phone-only overrides reduce hero heading size, body copy size/spacing, CTA spacing, and counter number/label sizing in the homepage block inside `index.html` and the shared service hero mobile block in `assets/css/main.css`.
- A sitewide heading-only normalization pass was applied to HTML `h1`-`h6` tags so words beginning with lowercase letters now use uppercase initials; body copy and other non-heading text were intentionally left alone.
- The lower pitch/contact form on the homepage, `about-us-new.html`, and all primary service pages now reuses the same field set as the hero form, but via scoped `--secondary` classes: it keeps the logo/title and hero-form fields while using a separate Prime-styled light card and two-column desktop layout in `assets/css/main.css` so the real hero form remains unchanged.
- The two CTA buttons directly above that lower form (`Get a Free Consultation` and `Live Chat` inside `#after_cta.contact-form-section`) are now intentionally forced to dark navy through a section-scoped override in `assets/css/main.css`; this should not affect other `.editing-process-cta__button` instances elsewhere.
- On the homepage, those same two `#after_cta` CTA anchors also have inline dark navy/white styles at the user's request, and the homepage section-aware button color script skips `#after_cta` so it does not rewrite them back to gold after load.
- Homepage `Services We Offer` cards in `index.html` were remapped so each visible card now points to its matching service page: publishing, editing, cover design, marketing, author websites, illustration, audiobook, and ghostwriting. The last card’s heading/description were also updated from global distribution copy to ghostwriting copy.
- On `book-cover-design.html`, the “Book Covers Crafted The Right Way” body copy is scoped with `.book-cover-crafted-section p:not(.pt-3)` so those paragraphs stay regular weight while the CTA row/buttons are unaffected.
- `terms-and-conditions.html` and `privacy-policy.html` keep the existing Prime legal-page layout, header, and footer, but their `.policy-shell` body content was replaced from the referenced Flo Book Publishers legal pages and adapted to Prime Book Publishing Labs/current contact details.
- The legacy floating review widget rendered as `.bottom-reviews` / `#bottomReviews` is now disabled sitewide through `assets/css/main.css` so it no longer appears on the homepage, service pages, or legacy interior pages that still include the old widget markup.
- Important nuance: CSS overrides alone were not reliable for service-page process CTA entrance animation because several service pages still carried `data-aos` directly on `.service-workflow__cta` and other `.editing-process-cta` rows in the HTML. Those AOS attributes have now been removed from the service-page markup so those CTA buttons appear immediately, while normal hover behavior remains enabled.

## Open Caution Items

- Service-page hero buttons may still need page-by-page verification if a future task is about hero CTAs specifically.
- Because this is a static export, some “no change” issues are caused by page-level inline CSS beating shared rules.
- Some previous visual fixes were done quickly based on screenshots and may benefit from QA if the same section is edited again.

## Recommended Workflow For A New Codex Chat

1. Read this `context.md`.
2. Open only the file(s) directly related to the user’s request.
3. For homepage changes, inspect `index.html` first.
4. For sitewide changes, inspect the late overrides in `assets/css/main.css`.
5. Search for the specific selector before patching because duplicates are common.
6. Keep fixes narrow and avoid broad refactors unless explicitly requested.

## Files Most Likely To Be Modified Again

- `index.html`
- `assets/css/main.css`
- `audiobook-service.html`
- `author-website-design.html`
- `book-cover-design.html`
- `book-editing-services.html`
- `book-illustration-services.html`
- `book-marketing-services.html`
- `book-publishing-services.html`
- `ghostwriting-services.html`

## Handoff Reminder

If starting a new chat, tell Codex:

- this is a static exported site
- homepage styles are in `index.html`
- sitewide styles are in `assets/css/main.css`
- read `context.md` before making changes
- keep changes scoped
- search before patching

## Superseding 2026 Update

If anything earlier in this file conflicts with this section, trust this section.

### Most Current Architecture

- `index.html` is still the homepage source of truth and contains a large amount of homepage-only CSS and some homepage-only JS behavior.
- `assets/css/main.css` contains the late sitewide override system and should be checked near the bottom first for shared styling changes.
- `assets/css/editorial-pages.css` is the source of truth for:
  - `about-us-new.html`
  - `portfolio-new.html`
  - `reviews-new.html`

### Header System

Current approved header behavior:

- top state:
  - blurred glass / translucent pill
  - full logo: `assets/img/prime-logo-full.png`
  - white nav text
- scrolled state:
  - metallic gold pill
  - dark navy nav text
  - compact sticky logo: `assets/img/prime-logo.png`

Implementation split:

- homepage exact version:
  - `index.html`
- sitewide shared version:
  - `assets/css/main.css`
  - `assets/js/main.js`
- editorial replacement page adjustments:
  - `assets/css/editorial-pages.css`

Do not use `assets/img/logo.png` for sticky header behavior.

### Navigation Order

Current sitewide nav order:

- `About`
- `Services`
- centered logo linking to `index.html`
- `Portfolio`
- `Reviews`

### Homepage Current Truth

- Homepage header is approved and should be treated as the reference version for shared header behavior.
- Homepage hero:
  - left copy / right form layout
  - hero form is now single-column
  - left hero block has been shifted upward to align visually with the form
- Homepage button system:
  - section-aware homepage CTA colors are enforced in a late inline style block near the bottom of `index.html`
  - CTAs in plain white sections or sections using `assets/img/home-section-white-bg.png` should be dark navy
  - CTAs in all other homepage sections, including image-background sections, should be gold
  - CTA hover should not swap colors; hover should only slightly lift/grow the button
- Shared homepage popup:
  - `#mainpopupform` in `index.html` now uses the same intake fields as the homepage hero form
  - popup field order is: name, phone, email, manuscript-ready, published-before, book-type, services
  - popup controls were restyled to a cleaner white-on-gold treatment for readability
  - dropdown arrows were explicitly restyled for visibility, and the close button now uses a gold circular control
  - for non-home pages, `assets/js/main.js` is now the source of truth:
    - if a page has no popup, it injects the shared `#mainpopupform`
    - if a page still contains an older embedded `#mainpopupform`, it rewrites that modal to the updated homepage-style field set instead of leaving the legacy popup in place
  - this was necessary because many legacy service/about pages already shipped their own old popup markup and scripts
  - additionally, the legacy embedded popup HTML was directly updated in these pages so they no longer ship the old field set in source:
    - `about-us.html`
    - `audiobook-service.html`
    - `author-website-design.html`
    - `book-cover-design.html`
    - `book-editing-services.html`
    - `book-illustration-services.html`
    - `book-marketing-services.html`
    - `book-publishing-services.html`
    - `ghostwriting-services.html`
    - `portfolio.html`
    - `reviews.html`
    - `services.html`
  - a later cleanup pass removed the extra duplicated old popup demo blocks that had been pasted mid-file into the primary service pages as a second `<!DOCTYPE html>` section; those pages now fall back cleanly to the shared `assets/js/main.js` + `.sitewide-offer-popup` implementation instead of rendering the old coupon popup from inline source
  - after that cleanup, several service pages still had an older inline `DOMContentLoaded` script that tried to hide/show `#mainpopupform` directly; those inline scripts were removed so they no longer throw on missing markup or interfere with the shared popup builder in `assets/js/main.js`
  - `assets/js/main.js` was also hardened so the shared popup still initializes even if a page already contains a `#mainpopupform` container placeholder
  - because the legacy service pages are structurally malformed in places, the most reliable final setup for the primary service pages is:
    - one real `#mainpopupform.sitewide-offer-popup` modal is present in the HTML source of each service page
    - a small page-level fallback initializer opens that modal after load and binds all `href="#mainpopupform"` / `data-bs-target="#mainpopupform"` triggers to `bootstrap.Modal.getOrCreateInstance(...)`
    - the shared `assets/js/main.js` popup logic still exists, but the service pages no longer depend on late runtime injection alone
  - this service-page popup setup was verified with a headless Edge screenshot on `audiobook-service.html`, confirming the new two-panel Prime popup renders onscreen instead of the old right-side glass form
- Homepage gold accent text:
  - metallic treatment only for text that was already intended to be gold
- Homepage FAQ:
  - there is active homepage-only FAQ styling in `index.html`
  - the latest redesign request for the homepage FAQ was in progress and may still need a dedicated cleanup pass

### Service Page Current Truth

Service pages now intentionally mirror the homepage hero behavior more closely.

Shared hero selector:

- `.service-hero-bg`

Current service hero behavior:

- keep each page’s own copy and background
- service hero background images should not have a gradient/tint overlay
- hero form is single-column
- left hero content is shifted upward for form alignment
- form column remains mostly unchanged unless a page-specific balance issue appears

Service-page hero/layout/button adjustments live primarily in:

- `assets/css/main.css`

Important service-page caveat:

- service pages may still have `body class="homepage-index gd-form"`, so do not rely on `body:not(.homepage-index)` to target service pages
- book editing and book publishing service hero forms have the page-specific `service-hero-form-card--shadowed` modifier for a darker blurred background and stronger field shadows; keep this scoped unless the same treatment is explicitly requested elsewhere

### Editorial Replacement Pages Current Truth

These are not minor variants of old pages; they are separate custom replacement pages:

- `about-us-new.html`
- `portfolio-new.html`
- `reviews-new.html`

Their custom CTA button class:

- `.editorial-btn`

Their header behavior is shared with the site, but they also have page-specific overrides in:

- `assets/css/editorial-pages.css`

If only these 3 pages look wrong, inspect `editorial-pages.css` first.

### Portfolio Page Current Truth

- `portfolio-new.html` is the live working portfolio page.
- The featured portfolio shelf now contains the original curated cards plus the added root-level JPG assets from `assets/img/portfolio/`.
- The portfolio filter set on `portfolio-new.html` now uses real genre groupings for the expanded shelf: `Memoir`, `Nonfiction`, `Fiction`, `Romance`, `Children's`, plus the existing `Campaigns` bucket.
- The added root-level JPG assets from `assets/img/portfolio/` were classified into those real genres and given cover-specific titles/descriptions instead of placeholder copy.
- The new cards reuse the existing `.editorial-portfolio-card` structure so visual styling remains controlled by `assets/css/editorial-pages.css`.

### About Page Current Truth

- `about-us-new.html` is the live working About page.
- Two screenshot-inspired editorial sections were added immediately after the About hero:
  - a `Who We Are` text-and-image section
  - a `Discover More` image-and-text section
- Two more continuity sections were then added after those:
  - a dark-navy centered author-support CTA band
  - an `Our Vision & Mission` two-card section
- Directly under those two continuity sections, `about-us-new.html` now also includes:
  - the shared service-page FAQ block structure, adapted with About-page questions
  - the shared end-of-service-page contact/form section using `#after_cta`
- The `Our Vision & Mission` cards on `about-us-new.html` now use crisp Font Awesome icons instead of raster-like placeholders, and their card backgrounds were warmed to a light gold tint to better match the site palette.
- These sections intentionally use the site's existing editorial visual language rather than the source screenshot's plain cyan styling:
  - shared editorial section backgrounds
  - gold buttons on dark-blue sections only
  - dark-navy buttons on non-blue About sections
  - framed placeholder images pulled from local assets
- The supporting styles for those two new sections live in `assets/css/editorial-pages.css` under the `.editorial-about-*` selectors.

### Button System Current Truth

Current intended button design:

- premium metallic gold gradient
- dark navy text
- restrained, modern luxury look
- subtle depth, not plastic

Important:

- old button rules still exist higher in `assets/css/main.css`
- the final cleanup/override region near the bottom is supposed to win
- hero-specific legacy button rules also exist and can override shared behavior if edited carelessly

### Left Contact Rail Current Truth

Current intended behavior:

- dark blue tabs by default
- expands on hover
- gold hover state only
- items:
  - Live Chat
  - Phone
  - Whatsapp
  - Instagram
  - Facebook

Key files:

- structure/behavior:
  - `assets/js/main.js`
- styling:
  - `assets/css/main.css`

### Service Page Footer CTA Block

The homepage-style final CTA/contact section near the footer was copied to service pages and is now the intended end-of-page CTA block there.

Relevant selector:

- `#after_cta.contact-form-section`

### Package / Pricing Notes

Current package truths:

- `book-editing-services.html`
  - Proofreading package removed
  - section now designed for 3 services/plans
- `ghostwriting-services.html`
  - package CTA buttons were fixed for visibility

### Slider / Review / Portfolio Notes

- Homepage portfolio slider:
  - arrows removed
  - auto-scroll behavior intended
- Homepage reviews slider:
  - center review card grows dynamically
  - implementation is in late inline CSS/JS in `index.html`
- `book-marketing-services.html`
  - portfolio section was replaced with the homepage portfolio section style
- footer review logos:
  - footer review badges now use image assets copied from the provided external references:
    - `assets/img/review/reviews-io.png`
    - `assets/img/review/trustpilot-logo.png`
    - `assets/img/review/google-reviews.png`
  - compatibility copies also exist at:
    - `assets/img/review/reviewsio.png`
    - `assets/img/review/trustpilot.png`
    - `assets/img/review/google3.png`
  - right-side review badges in the newer footer use shared responsive layout rules from `assets/css/main.css`
  - desktop: compact right-aligned stacked column
  - tablet: three-item row beneath the main footer columns
  - mobile: centered single-column stack with constrained logo widths
  - legacy footer rows on older pages were also normalized to the same Reviews.io / Trustpilot / Google trio
- homepage scroll-to-top button:
  - should match the service-page design
  - avoid homepage-only inline overrides in `index.html`; shared styling should come from `assets/css/main.css`
- Service-page review sliders:
  - all eight primary service pages have the `homepage-reviews-slider` component
  - center review card grows dynamically
  - implementation uses `assets/js/main.js` to add `service-reviews-enhanced`
  - styling lives in late rules near the bottom of `assets/css/main.css`
- review sections:
  - intended dark-blue/gold styling sitewide

### Most Likely Files To Touch Next

- `index.html`
- `assets/css/main.css`
- `assets/css/editorial-pages.css`
- `assets/js/main.js`
- service page HTML files when copy/section markup changes are requested

### Reviews Page Current Truth

- `reviews-new.html` is the live working reviews page.
- The primary testimonial grid on `reviews-new.html` now includes the original editorial-style review cards plus the full imported review set from `https://flobookpublishers.com/reviews.html`.
- Imported review copy was adapted only by changing the referenced business name to `Prime Book Publishing Labs`; the page still uses the existing `.editorial-review-card` structure and `editorial-pages.css` styling.
- Reviews-page testimonial cards should use a uniform desktop/tablet card height with internal scrolling for longer review text. This behavior is scoped in `assets/css/editorial-pages.css` under `.editorial-page--reviews .editorial-review-card`; on mobile the cards return to natural height with no internal scroll.
- The internal review scrollbar on `reviews-new.html` is custom-styled in `assets/css/editorial-pages.css` to match the navy/gold site language instead of the browser default.

### Current Known Caution

- This repo still has many duplicate selectors and stale legacy rules.
- Search before patching every time.
- For homepage tasks:
  - check `index.html` first
- For sitewide tasks:
  - check the bottom of `assets/css/main.css`
- For new About / Portfolio / Reviews page issues:
  - check `assets/css/editorial-pages.css`

## Latest Handoff Update - 2026-07-01

If anything above conflicts with this section, trust this section first.

### Current Workspace Path

The active workspace in the latest sessions is:

`c:\Prime Book Publishers`

### Legal Pages

- `terms-and-conditions.html` and `privacy-policy.html` keep the current Prime legal-page design and layout.
- Their main `.policy-shell` body content was replaced from:
  - `https://primebookpublishinglabs.com/terms-conditions/`
  - `https://primebookpublishinglabs.com/privacy-policy/`
- Do not replace the surrounding Prime header/footer/legal shell unless explicitly asked.

### Canonical Address

The current sitewide address is:

- `2630 W Broward Blvd Suite 203 #1134`
- `Fort Lauderdale, FL 33312`

Associated Google Maps links and JSON-LD postal code were updated to match this address.

### Encoding / Weird Character Fixes

- Service pages previously had visible replacement-character artifacts, especially broken apostrophes in words like "Let's".
- Those were cleaned up across the website where found.
- Important later incident: during the Zendesk cleanup, some root HTML files temporarily gained duplicate UTF-8 BOM bytes or blank lines before `<!doctype html>`, causing a hosted-only white strip at the top of pages.
- Final fix: all real root HTML pages were normalized so `<!doctype html>` is the first content in the file.
- `assets/css/main.css` also now explicitly resets:
  - `html, body { margin: 0 !important; padding-top: 0 !important; }`
- If hosted-only top whitespace reappears, first check for bytes/content before `<!doctype html>`.

### Zendesk Chat

The old chat system was removed.

Removed/cleaned:

- old `$zopim` references
- old `hancockghostwritershelp` Zendesk comments/blocks
- old key `053e2c67-be01-471b-bd16-852776fdb086`
- old `snippeta6cf` static script references
- hardcoded page-level `ze-snippet` tags

Current Zendesk integration:

- `assets/js/main.js` is the single source of truth.
- It injects:
  - `https://static.zdassets.com/ekr/snippet.js?key=3928d221-6f4b-41fe-a0c7-121aed1653d2`
- It exposes:
  - `window.setButtonURL`
  - `window.toggleChat`
- Those functions open the Zendesk widget via the Zendesk API.
- The visible chat launcher should be rendered by Zendesk itself, not by a custom hardcoded button.
- A temporary hardcoded fallback button with id `site-zendesk-launcher` was added and then removed. It should not exist in HTML, CSS, or JS.
- The left rail Live Chat item calls the Zendesk open function and should continue to work.

### Left Contact Rail

The left contact/sidebar rail should be visible on all pages and all devices.

Implementation:

- `assets/js/main.js` now creates `#sticky-social-icons-container` if the page does not already have one.
- It normalizes the rail content to:
  - Live Chat
  - Phone
  - Whatsapp
  - Instagram
  - Facebook
- It removes `hide-in-mobile` and adds `site-contact-rail`.
- `assets/css/main.css` overrides old mobile hide behavior so the rail remains visible on mobile.

### Mobile / Non-Desktop Hero Backgrounds

For mobile/non-desktop only:

- Homepage hero uses `assets/img/home-section-blue-plain.png`.
- Service page heroes using `.service-hero-bg` use `assets/img/home-section-blue-plain.png`.
- Editorial pages use `assets/img/home-section-blue-plain.png` below desktop width:
  - `about-us-new.html`
  - `reviews-new.html`
  - `portfolio-new.html`

Desktop hero backgrounds should remain unchanged.

### Mobile / Non-Desktop Header White Strip Fixes

Several fixes were made for white space above mobile/tablet headers:

- Shared mobile header offset is intended to be small but present, around `8px`, not stuck to the top and not with a large blank strip.
- `contact-us.html`, `privacy-policy.html`, and `terms-and-conditions.html` use `legal-nav-shell` for their nav wrapper to collapse Bootstrap container spacing on non-desktop views.
- Editorial page header top offsets are in `assets/css/editorial-pages.css`.
- Homepage-specific header behavior still has important inline CSS in `index.html`.

### Service Package Cards On Mobile

The "Our Packages" section on service pages uses:

- `.pricing-section--editing-process`
- `.pack-main-wrapper`
- `.pricing`
- `.pkg-list`

Current mobile/non-desktop behavior:

- package wrappers are wider and centered below desktop width
- package cards have a fixed visual height using `box-sizing: border-box`
- `.pkg-list` scrolls internally instead of expanding the whole card
- desktop rules are intentionally unchanged

Relevant file:

- `assets/css/main.css`

### Current Root Page Doctype Cleanliness

After the Zendesk cleanup and hosted-only whitespace fix, all real root HTML pages should start directly with:

```html
<!doctype html>
```

No duplicate BOM bytes, blank lines, or other text should appear before it.

Check this before blaming CSS if a hosted-only top strip appears again.
