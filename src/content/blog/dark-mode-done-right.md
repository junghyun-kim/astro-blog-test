---
author: Sat Naing
pubDatetime: 2024-03-01T12:00:00Z
title: Dark Mode Done Right
slug: dark-mode-done-right
featured: false
draft: false
tags:
  - design
  - ux
ogImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"
description: "A deep dive into implementing dark mode in modern web applications while keeping the user experience smooth and consistent."
---

Dark mode is more than just inverting colors — it's about creating a cohesive experience that's easy on the eyes.

## CSS Custom Properties Approach

Using CSS variables makes switching themes trivial:

```css
:root {
  --bg: #ffffff;
  --text: #111827;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
}
```

## Respect User Preferences

Always honor the `prefers-color-scheme` media query as the default:

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* dark styles */
  }
}
```

## Smooth Transitions

Add a transition to prevent jarring flashes:

```css
body {
  transition:
    background-color 0.2s,
    color 0.2s;
}
```

A well-crafted dark mode improves accessibility and user satisfaction.
