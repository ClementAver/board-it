export default class CustomizableFileInput {
  _input = document.querySelector("input[type='file']");
  _label = document.querySelector("input[type='file'] + label");

  constructor({ input, label } = {}) {
    this.input = input ?? this.input;
    this.label = label ?? this.label;
  }

  get input() {
    return this._input;
  }

  get label() {
    return this._label;
  }

  set input(input) {
    this._input = input;
  }

  set label(label) {
    this._label = label;
  }
}
