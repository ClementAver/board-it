export default class UploadImageForm extends HTMLFormElement {
  _input = null;
  _submitButton = null;

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
  }

  get input() {
    return this._input;
  }

  get submitButton() {
    return this._submitButton;
  }

  set input(input) {
    this._input = input;
  }

  set submitButton(submitButton) {
    this._submitButton = submitButton;
  }

  update = () => {
    this.processFormData();
  };

  upload = (event) => {
    // event.preventDefault();
    this.processFormData();
  };

  processFormData() {
    const formData = new FormData(this);

    const files = [];
    for (var [key, value] of formData.entries()) {
      if (key === "image") files.push(value);
    }

    console.log(files);
  }
}

customElements.define("aeee-upload-image-form", UploadImageForm, {
  extends: "form",
});
