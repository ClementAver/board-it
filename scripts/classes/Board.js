import Svg from "./Svg.js";
import insertSibling from "../utilities/insertSibling.js";

export default class Board extends HTMLElement {
  #title = "";
  #titleElement = null;
  #edit = null;
  #delete = null;

  constructor({ title } = {}) {
    super();

    this.#title = title ?? this.#title;
  }

  connectedCallback() {
    this.setupDOM();
  }

  setupDOM() {
    const header =
      this.querySelector("header") ?? document.createElement("header");

    this.titleElement =
      header.querySelector("[data-title]") ?? document.createElement("p");
    this.title =
      this.title || this.dataset.title || this.titleElement.textContent.trim();
    if (!header.contains(this.titleElement))
      header.insertBefore(this.titleElement, header.firstElementChild);

    this.edit =
      header.querySelector('aeee-svg[data-href*="#square-pen"]') ??
      new Svg({ href: "../assets/icons/sprites.svg#square-pen" });
    if (!header.contains(this.edit))
      insertSibling(this.edit, this.titleElement, "after");

    this.delete =
      header.querySelector('aeee-svg[data-href*="#trash-2"]') ??
      new Svg({ href: "../assets/icons/sprites.svg#trash-2" });
    if (!header.contains(this.delete))
      insertSibling(this.delete, this.edit, "after");

    if (!this.contains(header))
      this.insertBefore(header, this.firstElementChild);
  }

  #setupEvents() {}

  get title() {
    return this.#title;
  }

  get titleElement() {
    return this.#titleElement;
  }

  set title(title) {
    if (this.dataset.title != title) {
      this.dataset.title = title;
      return;
    }

    this.#title = title;
    if (this.titleElement) this.titleElement.textContent = title;
  }

  set titleElement(titleElement) {
    this.#titleElement = titleElement;
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
