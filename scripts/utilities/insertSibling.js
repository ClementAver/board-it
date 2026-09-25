/**
 * @param { HTMLElement } element
 * @param { HTMLElement } sibling
 * @param { 'before' | 'after' | undefined } where
 * @returns { HTMLElement | undefined } The added child (unless the element is a DocumentFragment, in which case the empty DocumentFragment is returned).
 */
export default function insertSibling(element, sibling, where) {
  const parent = sibling.parentNode;

  if (where && where === "before") {
    return parent.insertBefore(element, sibling);
  } else {
    return parent.insertBefore(element, sibling.nextElementSibling);
  }
}
