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
  }

  updateSelected(label) {
    const currentSelected = this.leftDrawerMenu.querySelector(".selected");
    const nextSelected = this.leftDrawerMenu.querySelector(`[data-tool="${label}"]`);

    if (currentSelected) currentSelected.classList.remove("selected");
    if (nextSelected) nextSelected.classList.add("selected");
  }
}
