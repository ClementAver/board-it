class Gallery extends HTMLElement {
  _nextButton = null;
  _page = 1;
  _pageNumber = 1;
  _pagination = null;
  _previousButton = null;
  _wrapper = null;

  constructor({
    nextButton,
    page,
    pageNumber,
    pagination,
    previousButton,
    wrapper,
  } = {}) {
    super();

    this.nextButton = nextButton ?? this.nextButton;
    this.page = page ?? this.page;
    this.pageNumber = pageNumber ?? this.pageNumber;
    this.pagination = pagination ?? this.pagination;
    this.previousButton = previousButton ?? this.previousButton;
    this.wrapper = wrapper ?? this.wrapper;
  }

  connectedCallback() {
    this.next = this.querySelector("[data-gallery-wrapper]") ?? this.next;
    this.pagination =
      this.querySelector("[data-pagination]") ?? this.pagination;
    this.previous = this.querySelector("[data-previous]") ?? this.previous;
    this.wrapper = this.querySelector("[data-next]") ?? this.wrapper;

    this.updatePagination();
  }

  get nextButton() {
    return this._nextButton;
  }

  get page() {
    return this._page;
  }

  get pageNumber() {
    return this._pageNumber;
  }

  get pagination() {
    return this._pagination;
  }

  get pagination() {
    return this._pagination;
  }

  get previousButton() {
    return this._previousButton;
  }

  get wrapper() {
    return this._wrapper;
  }

  set nextButton(nextButton) {
    this._nextButton = nextButton;
  }

  set page(page) {
    this._page = page;
  }

  set pageNumber(pageNumber) {
    this._pageNumber = pageNumber;
  }

  set pagination(pagination) {
    this._pagination = pagination;
  }

  set previousButton(previousButton) {
    this._previousButton = previousButton;
  }

  set wrapper(wrapper) {
    this._wrapper = wrapper;
  }

  updatePagination(number) {
    if (number) this.page = number;
    this.pagination.textContent = `Page\u00a0: ${this.page}\u00a0/\u00a0${this.pageNumber}`;
  }
}

customElements.define("aeee-gallery", Gallery);
