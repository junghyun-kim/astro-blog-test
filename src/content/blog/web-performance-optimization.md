---
author: Sat Naing
pubDatetime: 2024-03-20T14:00:00Z
title: Web Performance Optimization Guide
slug: web-performance-optimization
featured: false
draft: false
tags:
  - performance
  - web
description: "Practical techniques to dramatically improve your website's loading speed, Core Web Vitals scores, and overall user experience."
---

Performance is a feature. Users expect fast websites, and search engines reward them. Let's look at key optimization techniques.

## Image Optimization

Images are often the biggest performance bottleneck:

- Use modern formats like WebP or AVIF
- Always specify width and height attributes
- Use lazy loading for below-the-fold images

```html
<img src="hero.webp" width="1200" height="630" loading="lazy" alt="Hero" />
```

## Code Splitting

Split your JavaScript bundles to load only what's needed:

```js
// Dynamic import
const module = await import("./heavy-component.js");
```

## Caching Strategy

Leverage browser caching with proper cache headers:

- Static assets: long cache (`max-age=31536000`)
- HTML: short cache or no-cache

## Core Web Vitals

Focus on these key metrics:

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

Small improvements compound into a significantly better user experience.
