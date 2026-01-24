export default class Drawer extends HTMLMenuElement {
  _toggleButton = this.querySelector("[data-switch]");

  constructor({ toggleButton } = {}) {
    super();
    this.toggleButton = toggleButton ?? this.toggleButton;

    console.log(this.toggleButton);
    this.toggleButton.addEventListener("click", () => {
      this.toggle();
    });
  }

  get toggleButton() {
    return this._toggleButton;
  }

  set toggleButton(toggleButton) {
    this._toggleButton = toggleButton;
  }

  toggle() {
    this.setAttribute("data-open", this.dataset.open != "true");
  }
}
