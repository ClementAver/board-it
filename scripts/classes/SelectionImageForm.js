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
    this.processFormData();
  };

  processFormData() {
    const formData = new FormData(this.form);

    const thumbnails = [];
    for (var [key, value] of formData.entries()) {
      if (key === "thumbnail") thumbnails.push(value);
    }

    console.log(thumbnails);
  }
}
