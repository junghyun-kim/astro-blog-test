import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

// ── Legacy blog collection (AstroPaper) ────────────────────────────────────
const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
    }),
});

// ── 5ducks category collections ────────────────────────────────────────────
// Shared schema for all five category collections.
// heroImage accepts a local public-path string or an external URL.
const categoryPostSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  heroImage: z.string().optional(),
  draft: z.boolean().optional().default(false),
});

const toys = defineCollection({ type: "content", schema: categoryPostSchema });
const travel = defineCollection({
  type: "content",
  schema: categoryPostSchema,
});
const drinks = defineCollection({
  type: "content",
  schema: categoryPostSchema,
});
const film = defineCollection({ type: "content", schema: categoryPostSchema });
const engineering = defineCollection({
  type: "content",
  schema: categoryPostSchema,
});

export const collections = { blog, toys, travel, drinks, film, engineering };
