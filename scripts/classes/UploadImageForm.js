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
    this.processFormData();
  };

  upload = (event) => {
    event.preventDefault();
    this.processFormData();
  };

  processFormData() {
    const formData = new FormData(this);

    const files = [];
    for (var [key, value] of formData.entries()) {
      if (key === "image") files.push(value);
    }

    console.info(files);
  }
}

customElements.define("aeee-upload-image-form", UploadImageForm, {
  extends: "form",
});
