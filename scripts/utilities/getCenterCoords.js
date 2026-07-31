export default function getCenterCoords(element) {
  const { left, top, right, bottom } = element.getBoundingClientRect();
  return { x: left + (right - left) / 2, y: top + (bottom - top) / 2 };
}
