/**
 * Get the element at cursor position, or it's ancestor based on a selector.
 * @param { Object } coords - The coordinates to match against
 * @param { number } coords.x
 * @param { number } coords.y
 * @param { string } selector - a valid css selector
 * @returns { HTMLElement | null } the found element
 */
export default function elementAtCursor({ x, y } = coords, selector) {
  if (!x || !y) return null;
  const match = document.elementFromPoint(x, y);
  return selector ? match.closest(selector) : match;
}
