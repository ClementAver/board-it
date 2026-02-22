import Drawer from "../classes/Drawer.js";

export default function initDrawers() {
  const drawers = document.querySelectorAll("[data-drawer]");

  return Array.from(drawers)
    .map((drawer) => {
      const toggleButton = document.querySelector(
        `[data-switch="${drawer.dataset.drawer}"]`,
      );
      if (!toggleButton) return;

      console.log(drawer, toggleButton);
      

      return new Drawer({ drawer, toggleButton });
    })
    .filter((drawer) => drawer !== undefined);
}
