/**
 * A pair of coordinates
 * @typedef { Object } Coordinates
 * @property { number } x - The X Coordinate
 * @property { number } y - The Y Coordinate
 */

/**
 * Return the center of an element
 * @param { HTMLElement } element
 * @returns { Coordinates }
 */
export default function centerCoords(element) {
  const { left, top, right, bottom } = element.getBoundingClientRect();
  return { x: left + (right - left) / 2, y: top + (bottom - top) / 2 };
}
