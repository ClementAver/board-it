import Unique from "./Unique.js";

// TODO : Fix top-layer (2) placement issue ?
export default class Tooltip extends HTMLElement {
  _text = "";

  // TODO : Are all web component constructor parameters useless as we can't instanciate one web component from Javascript?
  constructor({ text } = {}) {
    super();

    if (!this.previousElementSibling) {
      this.remove();
      return;
    }

    this.id = Unique.getUniqueID();
    this.setAttribute("role", "tooltip");
    this.popover = "hint";

    this.previousElementSibling.setAttribute("aria-describedby", [this.id]);
    this.previousElementSibling.interestForElement = this;

    this.text = text ?? this.text;
    if (this.text) this.addSmallText(this.text);
  }

  get text() {
    return this._text;
  }

  set text(text) {
    this._text = text;
  }

  addSmallText(text) {
    const currentSmall = this.querySelector("small");

    let small;
    if (currentSmall) small = currentSmall;
    else small = document.createElement("small");
    small.textContent = text;

    if (!currentSmall) this.appendChild(small);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "data-text":
        console.log(newValue);
        this.text = newValue;
        this.addSmallText(newValue);
        break;
      default:
        break;
    }
  }

  static observedAttributes = ["data-text"];
}
