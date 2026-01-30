export default class Drawer {
  _drawer = null;
  _toggleButton = null;

  constructor({ drawer, toggleButton } = {}) {
    this.drawer = drawer ?? this.drawer;
    this.toggleButton = toggleButton ?? this.toggleButton;

    this.toggleButton.addEventListener("click", this.toggle.bind(this));
  }

  get drawer() {
    return this._drawer;
  }

  get toggleButton() {
    return this._toggleButton;
  }

  set drawer(drawer) {
    this._drawer = drawer;
  }

  set toggleButton(toggleButton) {
    this._toggleButton = toggleButton;
  }

  toggle() {
    this.drawer.setAttribute("data-open", this.drawer.dataset.open != "true");

    if (this.drawer.dataset.open != "true") {
      this.drawer
        .querySelectorAll("[open]")
        .forEach((node) => node.removeAttribute("open"));
    }
  }

  removeListener() {
    this.toggleButton.removeEventListener("click", this.toggle);
  }
}
