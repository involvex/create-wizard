---
id: theme-customization
title: Theme Customization
sidebar_label: Theme Customization
---

<!-- @format -->

This section explains how to customize the Docusaurus theme, including details on the current "hacker" theme.

## The "Hacker" Theme

The `@involvex/create-wizard` documentation site uses a custom "hacker" theme, characterized by a dark background, green text, and a terminal-like aesthetic. This theme is primarily defined in `docs/src/css/custom.css`.

### Key CSS Variables

The `custom.css` file overrides several Docusaurus CSS variables to achieve the desired look:

```css
:root {
  --ifm-color-primary: #25c2a0; /* A vibrant green */
  --ifm-background-color: #0d0d0d; /* Dark background */
  --ifm-font-color-base: #00ff00; /* Bright green text */
  --ifm-font-family-base: 'Courier New', Courier, monospace;
  --ifm-navbar-background-color: #000000;
  --ifm-footer-background-color: #000000;
  --ifm-hero-background-color: #000; /* Explicitly black for hero section */
  --ifm-card-background-color: #1a1a1a;
  --ifm-link-color: #00ff00;
  --ifm-link-hover-color: #25c2a0;
  --ifm-heading-color: #00ff00;
}

html[data-theme='dark'] {
  --ifm-background-color: #0d0d0d;
  --ifm-font-color-base: #00ff00;
  --ifm-navbar-background-color: #000000;
  --ifm-footer-background-color: #000000;
  --ifm-hero-background-color: #000000;
  --ifm-card-background-color: #1a1a1a;
}

/* Additional styles for specific elements */
.hero--primary {
  background-color: #000;
  color: var(--ifm-font-color-base);
}

.button--secondary {
  background-color: #00ff00;
  color: #0d0d0d;
  border-color: #00ff00;
}

.button--secondary:hover {
  background-color: #25c2a0;
  border-color: #25c2a0;
}

.footer {
  background-color: var(--ifm-footer-background-color);
}

body {
  text-shadow: 0 0 2px #00ff00;
}

.hero__title::after {
  content: '_';
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: #00ff00;
  }
}

.navbar__logo img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
  filter: grayscale(1) brightness(3);
}

.navbar__link--active {
  color: var(--ifm-color-primary-lightest);
  text-shadow: 0 0 5px var(--ifm-color-primary-lightest);
}

.footer__link-item {
  color: var(--ifm-font-color-base);
}

.footer__link-item:hover {
  color: var(--ifm-link-hover-color);
}
```

### How to Customize

You can modify these CSS variables and add your own custom styles in `docs/src/css/custom.css` to further tailor the theme to your preferences. Refer to the [Docusaurus theming documentation](https://docusaurus.io/docs/styling-layout) for more details on how to override default styles and create your own custom themes.
