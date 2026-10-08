/**
 * Blog categories + types. The posts themselves live as Markdown files in
 * `content/blog/` (project root) — add a `.md` file there to publish a post.
 */
export const blogCategories = [
  "All",
  "ESG",
  "Circular Economy",
  "EPR",
  "Carbon & Net Zero",
  "KarmaVerse",
  "Community & Events",
] as const;

export type BlogCategory = Exclude<(typeof blogCategories)[number], "All">;

export type Post = {
  slug: string;
  title: string;
  summary: string;
  category: BlogCategory;
  /** ISO date, YYYY-MM-DD */
  date: string;
  readTime: string;
  author?: string;
  /** One of four generated on-brand covers, used when `image` is not set. */
  cover: 1 | 2 | 3 | 4;
  image?: string;
  /** Photo credit / licence shown under the cover on the article page. */
  imageCredit?: string;
  featured?: boolean;
};

export type PostWithBody = Post & { html: string };
