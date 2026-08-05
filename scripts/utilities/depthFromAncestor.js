/**
 * Get the depth of a descendant from his ancestor.
 * @param { HTMLElement } descendant
 * @param { HTMLElement } ancestor
 * @returns { number | null } the depth level.
 */
export default function depthFromAncestor(descendant, ancestor) {
  if (!ancestor.contains(descendant)) return null;
  if (descendant === ancestor) return 0;

  let depth = 1;
  let parent = descendant.parentElement;
  while (parent !== ancestor) {
    depth++;
    parent = parent.parentElement;
  }
  console.log(depth);
  
  return depth;
}
