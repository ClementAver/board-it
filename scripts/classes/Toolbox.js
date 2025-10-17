import Camera from "./Camera.js";
import Selector from "./Selector.js";
import Tool from "./Tool.js";

class Toolbox {
  _cameraBtn = document.querySelector("button.camera");
  _handled = null;
  _leftDrawer = document.querySelector("menu.left-drawer");
  _previous = null;
  _selectorBtn = document.querySelector("button.selector");
  _toggleLeftDrawerBtn = document.querySelector(".toggle-left-drawer-btn");
  _tools = [new Camera(), new Selector()];

  constructor({ handled, tools } = {}) {
    this.handled = handled ?? this._handled;
    this.tools = tools ?? this._tools;

    this.cameraBtn.addEventListener("click", () => {
      this.grab("camera", true);
    });

    this.selectorBtn.addEventListener("click", () => {
      this.grab("selector", true);
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
    this.updateActive();
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

  updateActive() {
    if (!this.handled) return;
    const currentActive = this.leftDrawer.querySelector(".active");
    const nextActive = this.leftDrawer.querySelector(`.${this.handled.label}`);

    if (currentActive) currentActive.classList.remove("active");
    if (nextActive) nextActive.classList.add("active");
  }

  toggle() {
    if (!this.leftDrawer) return;
    this.leftDrawer.classList.toggle("open");
    this.updateToggleIcon();
  }

  updateToggleIcon() {
    if (this.leftDrawer.classList.contains("open")) {
      this.toggleLeftDrawerBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-close-icon lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>';
    } else {
      this.toggleLeftDrawerBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-open-icon lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>';
    }
  }

  grab(label, emit = false) {
    // Already handled:
    if (this.handled?.label === label) {
      if (emit) this.emit();
      return this.handled;
    }
    // else:
    const tool = this.tools.find((tool) => tool.label === label) ?? null;
    if (tool instanceof Tool) {
      this.handled = tool;
      if (emit) this.emit();
      return this.handled;
    }
  }

  authorise(label) {
    return this.handled.label === label;
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
