import Toolbox from "./Toolbox.js";

export default class LeftDrawer {
  _cameraBtn = document.querySelector('[data-tool="camera"]');
  _leftDrawerMenu = document.getElementById("left-drawer");
  _selectorBtn = document.querySelector('[data-tool="selector"]');
  _toggleLeftDrawerBtn = document.getElementById("left-drawer-switch");

  constructor() {
    window.addEventListener("grab", (e) => {
      this.updateSelected(e.detail.label);
    });

    this.cameraBtn.addEventListener("click", () => {
      Toolbox.grab("camera").isLocked = true;
    });

    this.selectorBtn.addEventListener("click", () => {
      Toolbox.grab("selector");
    });

    this.toggleLeftDrawerBtn.addEventListener("click", () => {
      this.toggle();
    });

    this.updateToggleIcon();
  }

  get cameraBtn() {
    return this._cameraBtn;
  }

  get leftDrawerMenu() {
    return this._leftDrawerMenu;
  }

  get selectorBtn() {
    return this._selectorBtn;
  }

  get toggleLeftDrawerBtn() {
    return this._toggleLeftDrawerBtn;
  }

  set cameraBtn(cameraBtn) {
    this._cameraBtn = cameraBtn;
  }

  set leftDrawerMenu(leftDrawerMenu) {
    this._leftDrawerMenu = leftDrawerMenu;
  }

  set selectorBtn(selectorBtn) {
    this._selectorBtn = selectorBtn;
  }

  set toggleLeftDrawerBtn(toggleLeftDrawerBtn) {
    this._toggleLeftDrawerBtn = toggleLeftDrawerBtn;
  }

  toggle() {
    this.leftDrawerMenu.setAttribute("data-open", this.leftDrawerMenu.dataset.open != "true");
    this.updateToggleIcon();
  }

  updateSelected(label) {
    const currentSelected = this.leftDrawerMenu.querySelector(".selected");
    const nextSelected = this.leftDrawerMenu.querySelector(`[data-tool="${label}"]`);

    if (currentSelected) currentSelected.classList.remove("selected");
    if (nextSelected) nextSelected.classList.add("selected");
  }

  // TODO : XSS
  updateToggleIcon() {
    if (this.leftDrawerMenu .dataset.open === "true") {
      this.toggleLeftDrawerBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-close-icon lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>';
    } else {
      this.toggleLeftDrawerBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-open-icon lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>';
    }
  }
}
