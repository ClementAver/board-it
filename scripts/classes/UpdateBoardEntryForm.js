import backIt from "../api/backIt.js";
import handleError from "../utilities/handleError.js";

const { request: userUpdateBoardEntry } = backIt.registered(
  "userUpdateBoardEntry",
);

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
    this.addEventListener("submit", this.submit);
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

  async submit(event) {
    event.preventDefault();
    const formData = new FormData(this);
    try {
      const response = await userUpdateBoardEntry({
        pathname: `/${window.thumbnail.databaseId}`,
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        if (result.id !== window.thumbnail.databaseId) {
          throw new Error(`wrong id returned on an update operation`);
        }
        window.thumbnail.caption = result.caption;
      }
    } catch (error) {
      handleError({
        text: `Une Erreur est survenue lors de la mise à jour de la vignette correspondant à l'entrée portant l'identifiant n°${window.thumbnail.databaseId}.`,
        error,
      });
    }
  }

  updateInputValue(value = window.thumbnail.caption) {
    this.input.value = value;
  }
}

customElements.define("aeee-update-board-entry-form", UpdateBoardEntryForm, {
  extends: "form",
});
