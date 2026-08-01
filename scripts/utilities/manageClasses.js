/**
 * @param { Array<HTMLElement> } elements
 * @param { Array<string> } classes
 * @param { {strategy?: 'add' | 'remove' } } options
 */
export default function manageClasses(
  elements,
  classes,
  { strategy = "add" } = {},
) {
  elements.forEach((e) => {
    classes.forEach((c) => {
      e.classList[strategy](c);
    });
  });
}
