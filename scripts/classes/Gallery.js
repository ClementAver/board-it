class Gallery extends HTMLElement {
  _pagination = null;
  _wrapper = null;

  constructor({ pagination, wrapper } = {}) {
    super();

    this.pagination = pagination ?? this.pagination;
    this.wrapper = wrapper ?? this.wrapper;
  }

  connectedCallback() {
    this.pagination =
      this.querySelector("[data-page]") ?? this.pagination;
    this.wrapper = this.querySelector("[data-gallery-wrapper]") ?? this.wrapper;
  }

  get pagination() {
    return this._pagination;
  }

  get wrapper() {
    return this._wrapper;
  }

  set pagination(pagination) {
    this._pagination = pagination;
  }

  set wrapper(wrapper) {
    this._wrapper = wrapper;
  }
}

customElements.define("aeee-gallery", Gallery);
