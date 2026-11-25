export default class UpdateBoardEntryForm extends HTMLFormElement {
  #input = null;
  #submitButton = null;

  constructor({ input, submitButton } = {}) {
    super();

    this.input = input ?? this.querySelector("input") ?? this.input;
    this.submitButton =
      submitButton ??
      this.querySelector('button[type="submit"]') ??
      this.submitButton;

    // TODO : check if useful
    this.addEventListener("submit", (event) => {
      console.log(event);
      event.preventDefault();
    });
  }

  get input() {
    return this.#input;
  }

  get submitButton() {
    return this.#submitButton;
  }

  set input(input) {
    this.#input = input;
  }

  set submitButton(submitButton) {
    this.#submitButton = submitButton;
  }
}

customElements.define("aeee-update-board-entry-form", UpdateBoardEntryForm, {
  extends: "form",
});
