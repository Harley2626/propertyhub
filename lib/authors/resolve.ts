import { DEFAULT_AUTHOR_SLUG } from "./constants";
import { getAuthorBySlug } from "./profiles";
import type { AuthorSlug } from "./types";

export { DEFAULT_AUTHOR_SLUG };

export function resolveAuthorSlug(slug?: string): AuthorSlug {
  if (slug && getAuthorBySlug(slug)) return slug as AuthorSlug;
  return DEFAULT_AUTHOR_SLUG;
}

export function resolveAuthor(slug?: string) {
  return getAuthorBySlug(resolveAuthorSlug(slug)) ?? getAuthorBySlug(DEFAULT_AUTHOR_SLUG)!;
}
