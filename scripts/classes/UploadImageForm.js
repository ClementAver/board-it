export default class UploadImageForm {
  _form = null;
  _input = null;
  _submitButton = null;

  constructor({ form, input, submitButton } = {}) {
    this.form = form ?? this.form;
    this.input =
      input ?? this.form.querySelector('input[type="file"]') ?? this.input;
    this.submitButton =
      submitButton ??
      this.form.querySelector('button[type="submit"]') ??
      this.submitButton;

    this.form.addEventListener("submit", this.upload);
    this.input.addEventListener("change", this.update);
  }

  get form() {
    return this._form;
  }

  get input() {
    return this._input;
  }

  get submitButton() {
    return this._submitButton;
  }

  set form(form) {
    this._form = form;
  }

  set input(input) {
    this._input = input;
  }

  set submitButton(submitButton) {
    this._submitButton = submitButton;
  }

  update = () => {
    this.processFormData();
  }

  upload = (event) => {
    event.preventDefault();
    this.processFormData();
  };

  processFormData() {
    const formData = new FormData(this.form);

    const files = [];
    for (var [key, value] of formData.entries()) {
      if (key === "image") files.push(value);
    }

    console.log(files);
  }
}
