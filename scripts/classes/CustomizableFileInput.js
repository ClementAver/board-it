export default class CustomizableFileInput extends HTMLElement {
  #input = null;
  #label = null;
  #paragraph = null;

  constructor({ input, label, paragraph } = {}) {
    super();

    this.input = input ?? this.input;
    this.label = label ?? this.label;
    this.paragraph = paragraph ?? this.paragraph;
  }

  connectedCallback() {
    this.input = this.querySelector("input[type='file']") ?? this.input;
    this.label = this.querySelector("label") ?? this.label;
    this.paragraph = this.querySelector("p") ?? this.paragraph;

    this.input.classList.add("sr-only-extended");
    this._change =  this.change.bind(this)
    this.input.addEventListener("change", this._change);
    this.label.addEventListener("keydown", (event) => {
      event.stopPropagation();
      if (event.code === "Enter" || event.code === "Space") this.input.click();
    });
  }

  disconnectedCallback() {
    this.input.removeEventListener("change", this._change);
  }

  get input() {
    return this.#input;
  }

  get label() {
    return this.#label;
  }

  get paragraph() {
    return this.#paragraph;
  }

  set input(input) {
    this.#input = input;
  }

  set label(label) {
    this.#label = label;
  }

  set paragraph(paragraph) {
    this.#paragraph = paragraph;
  }

  change(event) {
    if (this.paragraph) {
      const count = event.target.files.length ?? 0;
      this.paragraph.querySelector("small").textContent = `${count} fichier${
        count > 1 ? "s" : ""
      } sélectionné${count > 1 ? "s" : ""}`;
    }
  }
}

customElements.define("aeee-file-input", CustomizableFileInput);
