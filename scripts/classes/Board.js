import Svg from "./Svg.js";
import insertSibling from "../utilities/insertSibling.js";

export default class Board extends HTMLElement {
  #deleteButton = null;
  #deleteSvg = null;
  #dragLevel = 0;
  #editButton = null;
  #editSvg = null;
  #form = null;
  #input = null;
  #title = "";
  #titleElement = null;

  constructor({ title, dragLevel } = {}) {
    super();

    this.draggable = true;
    this._formId = self.crypto.randomUUID();
    this.#title = title ?? this.#title;
    this.dragLevel = dragLevel ?? this.dataset.dragLevel ?? this.dragLevel;
  }

  connectedCallback() {
    this.setupDOM();

    this._edit = this.edit.bind(this);
    this.editButton.addEventListener("click", this._edit);
    this._submit = this.submit.bind(this);
    this.form.addEventListener("submit", this._submit);
    this._delete = this.delete.bind(this);
    this.deleteButton.addEventListener("click", this._delete);
  }

  disconnectedCallback() {
    this.editButton.removeEventListener("click", this._edit);
    this.form.removeEventListener("submit", this._submit);
    this.deleteButton.removeEventListener("click", this._delete);
  }

  setupDOM() {
    const header =
      this.querySelector("header") ?? document.createElement("header");

    this.titleElement =
      header.querySelector("[data-title]") ?? document.createElement("p");
    this.titleElement.dataset.title = "";
    this.title =
      this.title || this.dataset.title || this.titleElement.textContent.trim();
    this.titleElement.hidden = false;
    this.titleElement.classList.add("text-swath");
    if (!header.contains(this.titleElement))
      header.insertBefore(this.titleElement, header.firstElementChild);

    this.form = this.querySelector("form") ?? document.createElement("form");
    this.form.id = this._formId;
    this.input = this.querySelector("input") ?? document.createElement("input");
    this.input.type = "text";
    this.input.name = "title";
    if (!this.form.contains(this.input)) {
      this.form.appendChild(this.input);
    }
    this.form.hidden = true;
    if (!header.contains(this.form)) {
      header.insertBefore(this.form, header.firstElementChild);
    }

    this.editButton =
      header.querySelector("button[data-edit]") ??
      document.createElement("button");
    this.editButton.type = "button";
    this.editButton.dataset.edit = true;
    this.editButton.classList.add("border-line-icon");
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
    this.deleteButton.type = "button";
    this.deleteButton.dataset.delete = true;
    this.deleteButton.classList.add("border-line-icon");
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

  get dragLevel() {
    return this.#dragLevel;
  }

  get editButton() {
    return this.#editButton;
  }

  get editSvg() {
    return this.#editSvg;
  }

  get form() {
    return this.#form;
  }

  get input() {
    return this.#input;
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

  set dragLevel(dragLevel) {
    if (this.dataset.dragLevel != dragLevel) {
      this.dataset.dragLevel = dragLevel;
      return;
    }

    this.#dragLevel = dragLevel;
  }

  set editButton(editButton) {
    this.#editButton = editButton;
  }

  set editSvg(editSvg) {
    this.#editSvg = editSvg;
  }

  set form(form) {
    this.#form = form;
  }

  set input(input) {
    this.#input = input;
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

  edit(event) {
    console.log("click");
    if (this.editButton.type === "submit") return;
    this.input.value = this.title;
    this.titleElement.hidden = true;
    this.form.hidden = false;
    const [base, id] = this.editSvg.href.split("#");
    this.editSvg.href = base + "#save";
    this.input.focus();

    setTimeout(() => {
      this.editButton.type = "submit";
      this.editButton.setAttribute("form", this._formId);
    }, 0);
  }

  submit(event) {
    event.preventDefault();
    console.log("submit");

    this.title = this.input.value;
    this.titleElement.hidden = false;
    this.form.hidden = true;
    this.editButton.type = "button";
    this.editButton.removeAttribute("form");
    const [base, id] = this.editSvg.href.split("#");
    this.editSvg.href = base + "#square-pen";
  }

  delete() {
    this.remove();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "data-title":
        this.title = newValue;
        break;
      case "data-drag-level":
        this.dragLevel = newValue;
        break;
      default:
        break;
    }
  }

  static observedAttributes = ["data-title"];
}

customElements.define("aeee-board", Board);
