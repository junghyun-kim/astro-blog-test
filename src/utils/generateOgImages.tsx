import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

// 1×1 transparent PNG fallback used when fonts cannot be fetched
const EMPTY_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64"
);

const fetchFonts = async () => {
  try {
    const fontFileRegular = await fetch(
      "https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf"
    );
    const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

    const fontFileBold = await fetch(
      "https://www.1001fonts.com/download/font/ibm-plex-mono.bold.ttf"
    );
    const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

    return { fontRegular, fontBold };
  } catch (err) {
    // Font fetch failed (e.g. in offline/sandboxed environments).
    console.warn("[generateOgImages] Failed to fetch fonts:", err);
    return { fontRegular: null, fontBold: null };
  }
};

const { fontRegular, fontBold } = await fetchFonts();

const fontsAvailable = fontRegular !== null && fontBold !== null;

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: fontsAvailable
    ? [
        {
          name: "IBM Plex Mono",
          data: fontRegular as ArrayBuffer,
          weight: 400,
          style: "normal",
        },
        {
          name: "IBM Plex Mono",
          data: fontBold as ArrayBuffer,
          weight: 600,
          style: "normal",
        },
      ]
    : [],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  if (!fontsAvailable) return EMPTY_PNG;
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  if (!fontsAvailable) return EMPTY_PNG;
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
