import Svg from "./Svg.js";
import insertSibling from "../utilities/insertSibling.js";

export default class Board extends HTMLElement {
  #deleteButton = null;
  #deleteSvg = null;
  #editButton = null;
  #editSvg = null;
  #title = "";
  #titleElement = null;

  constructor({ title } = {}) {
    super();

    this.#title = title ?? this.#title;
  }

  connectedCallback() {
    this.setupDOM();

    this._edit = this.edit.bind(this);
    this.editButton.addEventListener("click", this._edit);
  }

  disconnectedCallback() {
    this.editButton.removeEventListener("click", this._edit);
  }

  setupDOM() {
    const header =
      this.querySelector("header") ?? document.createElement("header");

    this.titleElement =
      header.querySelector("[data-title]") ?? document.createElement("p");
    this.titleElement.dataset.title = "";
    this.title =
      this.title || this.dataset.title || this.titleElement.textContent.trim();
    if (!header.contains(this.titleElement))
      header.insertBefore(this.titleElement, header.firstElementChild);

    this.editButton =
      header.querySelector("button[data-edit]") ??
      document.createElement("button");
    this.editButton.dataset.edit = true;
    this.editSvg =
      this.editButton.querySelector("aeee-svg") ??
      new Svg({ href: "../assets/icons/sprites.svg#square-pen" });
    if (!this.editButton.contains(this.editSvg))
      this.editButton.appendChild(this.editSvg);
    if (!header.contains(this.editButton))
      insertSibling(this.editButton, this.titleElement, "after");

    this.deleteButton =
      header.querySelector("button[data-delete]") ??
      document.createElement("button");
    this.deleteButton.dataset.delete = true;
    this.deleteSvg =
      this.deleteButton.querySelector("aeee-svg") ??
      new Svg({ href: "../assets/icons/sprites.svg#trash-2" });
    if (!this.deleteButton.contains(this.deleteSvg))
      this.deleteButton.appendChild(this.deleteSvg);
    if (!header.contains(this.deleteButton))
      insertSibling(this.deleteButton, this.editButton, "after");

    if (!this.contains(header))
      this.insertBefore(header, this.firstElementChild);
  }

  get deleteButton() {
    return this.#deleteButton;
  }

  get deleteSvg() {
    return this.#deleteSvg;
  }

  get editButton() {
    return this.#editButton;
  }

  get editSvg() {
    return this.#editSvg;
  }

  get title() {
    return this.#title;
  }

  get titleElement() {
    return this.#titleElement;
  }

  set deleteButton(deleteButton) {
    this.#deleteButton = deleteButton;
  }

  set deleteSvg(deleteSvg) {
    this.#deleteSvg = deleteSvg;
  }

  set editButton(editButton) {
    this.#editButton = editButton;
  }

  set editSvg(editSvg) {
    this.#editSvg = editSvg;
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

  edit() {
    if (this.editSvg.href.includes("#square-pen")) {
      const [base, id] = this.editSvg.href.split("#");
      this.editSvg.href = base + "#save";
    } else {
      const [base, id] = this.editSvg.href.split("#");
      this.editSvg.href = base + "#square-pen";
    }
  }

  static observedAttributes = ["data-title"];
}

customElements.define("aeee-board", Board);
