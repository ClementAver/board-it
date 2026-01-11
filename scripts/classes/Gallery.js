class Gallery extends HTMLElement {
  _wrapper = null;

  constructor({ wrapper } = {}) {
    super()

    this.wrapper = wrapper ?? this.wrapper;
  }

  connectedCallback() {
    this.wrapper = this.querySelector("[data-gallery-wrapper]") ?? this.wrapper;
  }

  get wrapper() {
    return this._wrapper;
  }

  set wrapper(wrapper) {
    this._wrapper = wrapper;
  }
}

customElements.define("aeee-gallery", Gallery);
