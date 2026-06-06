export default class Gallery extends HTMLElement {
  #pagination = null;
  #wrapper = null;

  constructor({ pagination, wrapper } = {}) {
    super();

    this.pagination = pagination ?? this.pagination;
    this.wrapper = wrapper ?? this.wrapper;
  }

  connectedCallback() {
    this.pagination = this.querySelector("[data-page]") ?? this.pagination;
    this.wrapper = this.querySelector("[data-gallery-wrapper]") ?? this.wrapper;
  }

  get pagination() {
    return this.#pagination;
  }

  get wrapper() {
    return this.#wrapper;
  }

  set pagination(pagination) {
    this.#pagination = pagination;
  }

  set wrapper(wrapper) {
    this.#wrapper = wrapper;
  }
}

customElements.define("aeee-gallery", Gallery);
