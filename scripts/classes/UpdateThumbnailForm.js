import backIt from "../api/backIt.js";
import handleError from "../utilities/handleError.js";

const { request: userUpdateImage } = backIt.registered("userUpdateImage");
const { request: userUpdateBoardEntry } = backIt.registered(
  "userUpdateBoardEntry",
);

export default class UpdateThumbnailForm extends HTMLFormElement {
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
      let response;

      if (!window.thumbnailMode) {
        throw new Error(
          `Invalid value for \`window.thumbnailMode\` (${window.thumbnailMode}). Should either be "image" or "boardEntry".`,
        );
      } else if (window.thumbnailMode === "image") {
        formData.set("alternateText", formData.get("caption"));
        formData.delete("caption");
        response = await userUpdateImage({
          pathname: `/${window.thumbnail.databaseId}`,
          body: formData,
        });
      } else if (window.thumbnailMode === "boardEntry") {
        response = await userUpdateBoardEntry({
          pathname: `/${window.thumbnail.databaseId}`,
          body: formData,
        });
      }
      const result = await response.json();
      if (response.ok) {
        if (result.id !== window.thumbnail.databaseId) {
          throw new Error(`wrong id returned on an update operation`);
        }
        window.thumbnail.caption = result.caption ?? result.alternateText;
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

customElements.define("aeee-update-thumbnail-form", UpdateThumbnailForm, {
  extends: "form",
});
