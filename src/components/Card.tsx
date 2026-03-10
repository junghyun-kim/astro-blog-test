import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className:
      "text-lg font-semibold text-skin-base group-hover:text-skin-accent transition-colors duration-200 line-clamp-2",
  };

  return (
    <li className="group flex flex-col overflow-hidden rounded-2xl border border-skin-line bg-skin-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
      <a
        href={href}
        className="flex h-full flex-col p-5 focus-visible:no-underline focus-visible:outline-dashed"
      >
        <div className="mb-3 flex flex-wrap gap-2">
          {tags?.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="rounded-full bg-skin-accent bg-opacity-10 px-2.5 py-0.5 text-xs font-medium text-skin-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
        <p className="mt-2 flex-grow text-sm leading-relaxed text-skin-base opacity-70 line-clamp-3">
          {description}
        </p>
        <div className="mt-4 border-t border-skin-line pt-4">
          <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
        </div>
      </a>
    </li>
  );
}
