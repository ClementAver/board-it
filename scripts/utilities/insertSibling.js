/**
 * @param { HTMLElement } element
 * @param { HTMLElement } sibling
 * @param { 'before' | 'after' | undefined } where
 */
export default function insertSibling(element, sibling, where) {
  const parent = sibling.parentNode;

  if (where && where === "before") {
    parent.insertBefore(element, sibling);
  } else {
    parent.insertBefore(element, sibling.nextElementSibling);
  }
}
