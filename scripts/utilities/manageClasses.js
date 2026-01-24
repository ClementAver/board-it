/**
 * @param { HTMLElement } element
 * @param { Array<string> } classes
 * @param { {strategy?: 'add' | 'remove' | 'replace' | 'toggle' } } options
 */
export default function manageClasses(
  element,
  classes,
  { strategy = "add" } = {},
) {
  classes.forEach((c) => {
    element.classList[strategy](c);
  });
}
