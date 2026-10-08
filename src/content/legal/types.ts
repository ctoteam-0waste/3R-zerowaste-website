/**
 * Legal document shape. In `list` items, a leading "Label — text" or "Question? answer"
 * is rendered with the label in bold; email addresses become mailto links.
 */
export type LegalSection = {
  title: string;
  /** Plain paragraphs shown before the list */
  paras?: string[];
  list?: string[];
  /** Simple table (first row is the header) */
  table?: string[][];
  /** Paragraphs shown after the list or table */
  after?: string[];
};

export type LegalDoc = {
  title: string;
  intro: string;
  sections: LegalSection[];
  closing: string[];
};
