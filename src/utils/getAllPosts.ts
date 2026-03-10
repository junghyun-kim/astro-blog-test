import { getCollection, type CollectionEntry } from "astro:content";

export type CategorySlug =
  | "toys"
  | "travel"
  | "drinks"
  | "film"
  | "engineering";

export type AnyPost =
  | CollectionEntry<"toys">
  | CollectionEntry<"travel">
  | CollectionEntry<"drinks">
  | CollectionEntry<"film">
  | CollectionEntry<"engineering">;

export interface CategoryMeta {
  slug: CategorySlug;
  label: string;
  desc: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "toys",
    label: "장난감",
    desc: "수집하는 피규어, 레고, 메카닉 장난감 이야기",
  },
  {
    slug: "travel",
    label: "여행",
    desc: "다녀온 곳의 기록. 관광 정보보다 분위기와 경험",
  },
  {
    slug: "drinks",
    label: "커피와 와인",
    desc: "마셔본 것들. 카페, 와이너리, 취향의 변화",
  },
  {
    slug: "film",
    label: "필름",
    desc: "카메라 이야기와 그 카메라로 찍은 사진",
  },
  {
    slug: "engineering",
    label: "엔지니어링",
    desc: "실제로 써본 기술, 직접 만든 것의 딥다이브",
  },
];

export function getCategoryMeta(slug: string): CategoryMeta {
  return (
    CATEGORIES.find(c => c.slug === slug) ?? {
      slug: slug as CategorySlug,
      label: slug,
      desc: "",
    }
  );
}

// Per-collection loaders — keeps TypeScript happy with literal collection names.
const loaders: Record<CategorySlug, () => Promise<AnyPost[]>> = {
  toys: () => getCollection("toys", ({ data }) => !data.draft),
  travel: () => getCollection("travel", ({ data }) => !data.draft),
  drinks: () => getCollection("drinks", ({ data }) => !data.draft),
  film: () => getCollection("film", ({ data }) => !data.draft),
  engineering: () => getCollection("engineering", ({ data }) => !data.draft),
};

/** Load all non-draft posts from the 5 category collections, sorted newest-first. */
export async function getAllPosts(): Promise<AnyPost[]> {
  const nested = await Promise.all(CATEGORIES.map(c => loaders[c.slug]()));
  return nested
    .flat()
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Load non-draft posts for a single category, sorted newest-first. */
export async function getPostsByCategory(
  category: CategorySlug
): Promise<AnyPost[]> {
  const posts = await loaders[category]();
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
