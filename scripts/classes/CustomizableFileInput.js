export default class CustomizableFileInput extends HTMLElement {
  _input = null;
  _label = null;
  _paragraph = null;

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

    this.input.addEventListener("change", this.change.bind(this));
  }

  disconnectedCallback() {
    this.input.removeEventListener("change", this.change);
  }

  get input() {
    return this._input;
  }

  get label() {
    return this._label;
  }

  get paragraph() {
    return this._paragraph;
  }

  set input(input) {
    this._input = input;
  }

  set label(label) {
    this._label = label;
  }

  set paragraph(paragraph) {
    this._paragraph = paragraph;
  }

  change(event) {
    // TODO : issue at trigger.
    if (this.paragraph) {
      const count = event.target.files.length ?? 0;
      this.paragraph.querySelector("small").textContent = `${count} fichier${
        count > 1 ? "s" : ""
      } sélectionné${count > 1 ? "s" : ""}`;
    }
  }
}

customElements.define("aeee-file-input", CustomizableFileInput);
