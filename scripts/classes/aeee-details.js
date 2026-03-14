export default class Details extends HTMLElement {
  _title = null;
  _drawer = null;

  constructor({ title, drawer } = {}) {
    super();

    this.title = title ?? this.title;
    this.drawer = drawer ?? this.drawer;
  }

  connectedCallback() {
    this.title = this.querySelector("[data-summary]") ?? this.title;
    this.drawer = this.title.nextElementSibling ?? this.drawer;

    this.title.addEventListener("click", this.toggle.bind(this));
  }

  get title() {
    return this._title;
  }

  get drawer() {
    return this._drawer;
  }

  set title(title) {
    this._title = title;
  }

  set drawer(drawer) {
    this._drawer = drawer;
  }

  toggle() {
    this.drawer.setAttribute("data-open", this.drawer.dataset.open != "true");

    if (this.drawer.dataset.open === "true") {
      Array.from(
        document.querySelectorAll(
          `[data-name=${this.dataset.name}] [data-open="true"]`,
        ),
      ).forEach((el) => {
        if (el.parentElement !== this) el.dataset.open = false;
      });
    }
  }
}

customElements.define("aeee-details", Details);
