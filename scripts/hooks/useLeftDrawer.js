const leftDrawer = document.querySelector("menu.left-drawer");
const toggleLeftDrawerBtn = document.querySelector(".toggle-left-drawer-btn");

export default function useLeftDrawer() {
  function toggle() {
    if (!leftDrawer) return;
    leftDrawer.classList.toggle("open");
    updateIcon();
  }

  function updateIcon() {
    if (leftDrawer.classList.contains("open")) {
      toggleLeftDrawerBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-close-icon lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>';
    } else {
      toggleLeftDrawerBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-open-icon lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>';
    }
  }

  return { leftDrawer, toggleLeftDrawerBtn, toggle, updateIcon };
}
