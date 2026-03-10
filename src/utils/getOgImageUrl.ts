import type { ImageMetadata } from "astro";

/**
 * Resolves an ogImage field (which can be a processed ImageMetadata object
 * from Astro's image() schema helper, or a plain external URL string) into
 * a usable URL string.
 */
export function getOgImageUrl(
  ogImage: ImageMetadata | string | undefined
): string | undefined {
  if (!ogImage) return undefined;
  if (typeof ogImage === "string") return ogImage;
  return ogImage.src;
}
