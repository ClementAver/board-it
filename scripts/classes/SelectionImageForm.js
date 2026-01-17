export default class SelectionImageForm {
  _form = null;

  constructor({ form } = {}) {
    this.form = form ?? this.form;

    this.form.addEventListener("submit", this.upload);
  }

  get form() {
    return this._form;
  }

  set form(form) {
    this._form = form;
  }

  upload = (event) => {
    event.preventDefault();
  };
}
