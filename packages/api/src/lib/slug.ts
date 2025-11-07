/**
 * Slug Generation Utility
 * Converts card names to URL-friendly slugs
 */

/**
 * Generate a URL-friendly slug from a string
 * @example generateSlug("O Mago") => "o-mago"
 * @example generateSlug("A Roda da Fortuna") => "a-roda-da-fortuna"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except spaces and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}
