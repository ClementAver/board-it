export default class Tooltip extends HTMLElement {
  #text = "";

  constructor({ text } = {}) {
    super();

    this.id = self.crypto.randomUUID();
    this.setAttribute("role", "tooltip");
    this.popover = "hint";

    this.text = text ?? this.text;
    if (this.text) this.addSmallText(this.text);
  }

  connectedCallback() {
    if (!this.previousElementSibling) {
      this.remove();
      return;
    }
    this.previousElementSibling.setAttribute("aria-describedby", [this.id]);
    this.previousElementSibling.interestForElement = this;
  }

  get text() {
    return this.#text;
  }

  set text(text) {
    if (this.dataset.text !== text) {
      this.dataset.text = text;
      return;
    }
    this.#text = text;
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
        this.text = newValue;
        this.addSmallText(newValue);
        break;
      default:
        break;
    }
  }

  static observedAttributes = ["data-text"];
}

customElements.define("aeee-tooltip", Tooltip);
