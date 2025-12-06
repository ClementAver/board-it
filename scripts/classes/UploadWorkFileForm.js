import WorkFile from "./WorkFile.js";

export default class UploadWorkFileForm {
  _form = null;
  _input = null;

  constructor({ form, input } = {}) {
    this.form = form ?? this.form;
    this.input = input ?? this.form.querySelector('input[type="file"]');

    this.form.addEventListener("submit", this.upload);
    this.input.addEventListener("change", this.submit);
  }

  get form() {
    return this._form;
  }

  get input() {
    return this._input;
  }

  set form(form) {
    this._form = form;
  }

  set input(input) {
    this._input = input;
  }

  submit() {
    const submitEvent = new SubmitEvent("submit");
    this.form.dispatchEvent(submitEvent);
  }

  upload = (event) => {
    event.preventDefault();
    const data = new FormData(this.form);

    const files = [];
    for (var [key, value] of data.entries()) {
      if (key === "json") files.push(value);
    }

    WorkFile.read(files[0]);
  };
}
