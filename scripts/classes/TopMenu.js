class TopMenu extends HTMLElement {
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
    this.updateToggleIcon();
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
    this.updateToggleIcon();
  }

  // TODO : XSS
  updateToggleIcon() {
    if (this.header.dataset.open === "true") {
      this.toggleButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>';
    } else {
      this.toggleButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>';
    }
  }
}

customElements.define("aeee-top-menu", TopMenu);
