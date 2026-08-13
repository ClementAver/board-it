export default class Drawer {
  #drawer = null;
  #toggleButton = null;

  constructor({ drawer, toggleButton } = {}) {
    this.drawer = drawer ?? this.drawer;
    this.toggleButton = toggleButton ?? this.toggleButton;

    this._toggle = this.toggle.bind(this);
    this.toggleButton.addEventListener("click", this._toggle);
  }

  get drawer() {
    return this.#drawer;
  }

  get toggleButton() {
    return this.#toggleButton;
  }

  set drawer(drawer) {
    this.#drawer = drawer;
  }

  set toggleButton(toggleButton) {
    this.#toggleButton = toggleButton;
  }

  toggle() {
    this.drawer.dataset.open = this.drawer.dataset.open !== "true";

    if (this.drawer.dataset.open !== "true") {
      this.drawer
        .querySelectorAll("[open]")
        .forEach((node) => node.removeAttribute("open"));
    }
  }

  removeListener() {
    this.toggleButton.removeEventListener("click", this._toggle);
  }
}
