import Drawer from "../classes/Drawer.js";

export default function initDrawers() {
  const drawers = document.querySelectorAll("[data-drawer]");

  return Array.from(drawers)
    .map((drawer) => {
      const toggleButton = drawer.querySelector("[data-switch]");
      if (!toggleButton) return;

      return new Drawer({ drawer, toggleButton });
    })
    .filter((drawer) => drawer !== undefined);
}
