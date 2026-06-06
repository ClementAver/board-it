export default class Tool {
  #cursor = "auto";
  #label = undefined;

  constructor({ cursor, label } = {}) {
    this.cursor = cursor ?? this.#cursor;
    this.label = label ?? this.#label;
  }

  get cursor() {
    return this.#cursor;
  }

  get label() {
    return this.#label;
  }

  set cursor(cursor) {
    this.#cursor = cursor;
  }

  set label(label) {
    this.#label = label;
  }
}
