// TODO : Useless div wrapper ?
export default class TopMenu extends HTMLElement {
  _header = null;
  _toggleButton = null;

  constructor({ header, toggleButton } = {}) {
    super();

    this.header = header ?? this.header;
    this.toggleButton = toggleButton ?? this.toggleButton;
  }

  connectedCallback() {
    this.header = this.querySelector("header") ?? this.header;
    this.toggleButton =
      this.querySelector("[data-switch]") ?? this.toggleButton;

    this.toggleButton.addEventListener("click", this.toggle.bind(this));
  }

  disconnectedCallback() {
    this.toggleButton.removeEventListener("click", this.toggle);
  }

  get header() {
    return this._header;
  }

  get toggleButton() {
    return this._toggleButton;
  }

  set header(header) {
    this._header = header;
  }

  set toggleButton(toggleButton) {
    this._toggleButton = toggleButton;
  }

  toggle() {
    this.header.setAttribute("data-open", this.header.dataset.open != "true");
  }
}
