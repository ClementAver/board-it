import backIt from "../api/backIt.js";
import handleError from "../utilities/handleError.js";
import status from "../api/status.json" with { type: "json" };

const { request: createImage } = backIt.registered("createImage");

export default class UploadImageForm extends HTMLFormElement {
  #input = null;
  #submitButton = null;

  constructor({ input, submitButton } = {}) {
    super();

    this.input =
      input ?? this.querySelector('input[type="file"]') ?? this.input;

    this.submitButton =
      submitButton ??
      this.querySelector('button[type="submit"]') ??
      this.submitButton;

    this.addEventListener("submit", this.upload);
    this.input.addEventListener("change", this.update);
    this.submitButton.addEventListener("keydown", (event) => {
      event.stopPropagation();
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

  update = () => {
    // this.processFormData();
  };

  upload = (event) => {
    event.preventDefault();
    this.processFormData().forEach(async (file) => {
      try {
        const body = new FormData();
        body.append("file", file);
        body.append("alternateText", file.name);
        const response = await createImage({
          body,
        });
        if (!response.ok) {
          throw new Error(
            `${response.status} \u2013 ${status[response.status]}`,
          );
        }
      } catch (error) {
        handleError({
          text: `Une Erreur est survenue lors de la création de l'image correspondante au fichier ${file.name}.`,
          error,
        });
      }
    });
  };

  processFormData() {
    const files = [];
    const formData = new FormData(this);
    for (var [key, value] of formData.entries()) {
      if (key === "image" || key === "drag-and-drop-file-input")
        files.push(value);
    }
    console.info("UploadImageForm.processFormData info: ", files);
    return files;
  }
}

customElements.define("aeee-upload-image-form", UploadImageForm, {
  extends: "form",
});
