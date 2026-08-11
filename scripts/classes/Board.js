export default class Board extends HTMLElement {
  #title = "";

  constructor({ title } = {}) {
    super();

    this.#setupDOM(({ title } = {}));
  }

  #setupDOM({ title } = {}) {
    this.#title = title ?? this.querySelector(["data-title"]) ?? this.#title;
  }

  #setupEvents() {}

  get title() {
    return this.#title;
  }

  set title(title) {
    if (this.dataset.title != title) {
      this.dataset.title = title;
      return;
    }

    this.#title = title;
    let t = this.querySelector(".title");
    if (t) t.textContent = title;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "data-title":
        this.title = newValue;
        break;
      default:
        break;
    }
  }

  static observedAttributes = ["data-title"];
}

customElements.define("aeee-board", Board);
