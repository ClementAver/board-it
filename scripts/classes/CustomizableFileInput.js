export default class CustomizableFileInput {
  _input = document.querySelector("input[type='file']");
  _label = this.input.nextElementSibling;
  _hasIndicator = false;
  _paragraph = null;

  constructor({ input, label, paragraph } = {}) {
    this.input = input ?? this.input;
    this.label = label ?? this.input.nextElementSibling;
    this.hasIndicator = this.input.dataset.indicator ?? this.hasIndicator;
    if (this.hasIndicator) this.paragraph = paragraph ?? this.label.nextElementSibling;

    this.input.addEventListener("change", (event) => {
      console.log(event.target.files);

      if (this.paragraph) {
        const count = event.target.files.length ?? 0;
        this.paragraph.firstChild.textContent = `${count} fichier${
          count > 1 ? "s" : ""
        } sélectionné${count > 1 ? "s" : ""}`;
      }
    });
  }

  get input() {
    return this._input;
  }

  get label() {
    return this._label;
  }

  get hasIndicator() {
    return this._hasIndicator;
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

  set hasIndicator(hasIndicator) {
    this._hasIndicator = hasIndicator;
  }

  set paragraph(paragraph) {
    this._paragraph = paragraph;
  }
}
