export default class WorkFileForm {
  _form = null;
  _input = null;

  constructor({ form, input } = {}) {
    this.form = form ?? this.form;
    this.input = input ?? this.form.querySelector('input[type="file"]');

    this.input.addEventListener("change", this.onInputChange);

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(this.form);
      let reader = new FileReader();

      const files = [];
      for (var [key, value] of data.entries()) {
        if (key === "json") files.push(value);
      }

      files.forEach((file) => {
        reader.readAsText(file);
      });

      reader.onload = function () {
        const uploadEvent = new CustomEvent("workfileupload", {
          detail: reader.result,
        });
        window.dispatchEvent(uploadEvent);
      };

      reader.onerror = function () {
        alert("Une erreur est survenue lors de la lecture des données:", reader.error);
        console.error(reader.error);
      };
    });
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

  onInputChange() {
    const submitEvent = new SubmitEvent("submit");
    this.form.dispatchEvent(submitEvent);
  }
}
