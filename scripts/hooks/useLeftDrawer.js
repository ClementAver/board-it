import Toolbox from "../classes/Toolbox.js";

const leftDrawer = document.querySelector("menu.left-drawer");
const toggleLeftDrawerBtn = document.querySelector(".toggle-left-drawer-btn");
const cameraBtn = document.querySelector("button.camera");
const selectorBtn = document.querySelector("button.selector");

export default function useLeftDrawer() {
  window.addEventListener("grab", (e) => {
    updateActive(e.detail.label);
  });

  cameraBtn.addEventListener("click", () => {
    Toolbox.grab("camera", true);
  });
  selectorBtn.addEventListener("click", () => {
    Toolbox.grab("selector", true);
  });

  function toggle() {
    if (!leftDrawer) return;
    leftDrawer.classList.toggle("open");
    updateToggleIcon();
  }

  function updateToggleIcon() {
    if (leftDrawer.classList.contains("open")) {
      toggleLeftDrawerBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-close-icon lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>';
    } else {
      toggleLeftDrawerBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-open-icon lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>';
    }
  }

  function updateActive(next) {
    const currentActive = leftDrawer.querySelector(".active");
    const nextActive = leftDrawer.querySelector(`.${next}`);

    if (currentActive) currentActive.classList.remove("active");
    if (nextActive) nextActive.classList.add("active");
  }

  return { leftDrawer, toggleLeftDrawerBtn, toggle, updateToggleIcon, updateActive };
}
