import { slugifyStr } from "@utils/slugify";
import { getOgImageUrl } from "@utils/getOgImageUrl";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, tags, ogImage } =
    frontmatter;

  // Resolve ogImage to a URL string
  const imageUrl = getOgImageUrl(ogImage);

  const primaryTag = tags?.[0];

  const titleProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className:
      "font-serif text-xl font-light leading-snug tracking-tight text-skin-base transition-colors duration-300 group-hover:text-skin-accent sm:text-2xl",
  };

  return (
    <li className="group flex flex-col">
      <a
        href={href}
        className="flex h-full flex-col focus-visible:no-underline focus-visible:outline-dashed"
      >
        {/* Cover image — sharp corners, no border-radius */}
        {imageUrl && (
          <div className="mb-5 overflow-hidden" style={{ aspectRatio: "3/2" }}>
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        )}

        {/* Category label */}
        {primaryTag && (
          <span className="editorial-label mb-2 block">{primaryTag}</span>
        )}

        {/* Title */}
        {secHeading ? (
          <h2 {...titleProps}>{title}</h2>
        ) : (
          <h3 {...titleProps}>{title}</h3>
        )}

        {/* Description */}
        <p className="mt-3 flex-grow text-sm leading-relaxed text-skin-base opacity-60 line-clamp-3">
          {description}
        </p>

        {/* Date */}
        <div className="mt-5 border-t border-skin-line pt-4">
          <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
        </div>
      </a>
    </li>
  );
}
