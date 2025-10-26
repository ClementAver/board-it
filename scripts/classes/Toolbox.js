import Camera from "./Camera.js";
import Selector from "./Selector.js";
import Tool from "./Tool.js";

class Toolbox {
  _cameraBtn = document.querySelector('[data-tool="camera"]');
  _handled = null;
  _leftDrawer = document.getElementById("left-drawer");
  _previous = null;
  _selectorBtn = document.querySelector('[data-tool="selector"]');
  _toggleLeftDrawerBtn = document.getElementById("left-drawer-switch");
  _tools = [new Camera(), new Selector()];

  constructor({ handled, tools } = {}) {
    this.handled = handled ?? this._handled;
    this.tools = tools ?? this._tools;

    this.cameraBtn.addEventListener("click", () => {
      this.grab("camera").isLocked = true;
    });

    this.selectorBtn.addEventListener("click", () => {
      this.grab("camera").isLocked = false;
      this.grab("selector");
    });

    this.toggleLeftDrawerBtn.addEventListener("click", () => {
      this.toggle();
    });

    this.updateToggleIcon();
  }

  get cameraBtn() {
    return this._cameraBtn;
  }

  get handled() {
    return this._handled;
  }

  get leftDrawer() {
    return this._leftDrawer;
  }

  get previous() {
    return this._previous;
  }

  get selectorBtn() {
    return this._selectorBtn;
  }

  get toggleLeftDrawerBtn() {
    return this._toggleLeftDrawerBtn;
  }

  get tools() {
    return this._tools;
  }

  set cameraBtn(cameraBtn) {
    this._cameraBtn = cameraBtn;
  }

  set handled(handled) {
    this.previous = this.handled;
    this._handled = handled;
    if (this.handled) this.updateSelected();
  }

  set leftDrawer(leftDrawer) {
    this._leftDrawer = leftDrawer;
  }

  set previous(previous) {
    this._previous = previous;
  }

  set selectorBtn(selectorBtn) {
    this._selectorBtn = selectorBtn;
  }

  set toggleLeftDrawerBtn(toggleLeftDrawerBtn) {
    this._toggleLeftDrawerBtn = toggleLeftDrawerBtn;
  }

  set tools(tools) {
    this._tools = tools;
  }

  updateSelected() {
    const currentSelected = this.leftDrawer.querySelector(".selected");
    const nextSelected = this.leftDrawer.querySelector(`[data-tool="${this.handled.label}"]`);

    if (currentSelected) currentSelected.classList.remove("selected");
    if (nextSelected) nextSelected.classList.add("selected");
  }

  toggle() {
    this.leftDrawer.setAttribute("data-open", this.leftDrawer.dataset.open != "true");
    this.updateToggleIcon();
  }

  updateToggleIcon() {
    if (this.leftDrawer.dataset.open === "true") {
      this.toggleLeftDrawerBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-close-icon lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>';
    } else {
      this.toggleLeftDrawerBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-open-icon lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>';
    }
  }

  grab(label, { skipPrevious = false } = {}) {
    if (!label) return;

    // Already handled:
    if (this.handled?.label === label) {
      if (!skipPrevious) this.previous = this.handled;
      this.emit();
      return this.handled;
    }

    // else:
    const tool = this.tools.find((tool) => tool.label === label);
    if (tool) {
      this.handled = tool;
      this.emit();
      return this.handled;
    }
  }

  grabPrevious() {
    if (!this.previous) return;
    this.handled = this.previous;
    this.emit();
    return this.handled;
  }

  useSilent(label) {
    if (!label) return;

    const tool = this.tools.find((tool) => tool.label === label);
    if (tool) {
      return tool;
    }
  }

  isHandled(label) {
    return this.handled?.label === label;
  }

  emit() {
    window.dispatchEvent(
      new CustomEvent("grab", {
        detail: { cursor: this.handled.cursor, label: this.handled.label },
      })
    );
  }

  debug() {
    console.debug(this);
  }
}

export default new Toolbox();
