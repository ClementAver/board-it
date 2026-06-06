import WorkFile from "./WorkFile.js";

export default class UploadWorkFileForm extends HTMLFormElement {
  #input = null;

  constructor({ input } = {}) {
    super();

    this.input =
      input ?? this.querySelector('input[type="file"]') ?? this.input;

    this.addEventListener("submit", this.upload);
    this.input.addEventListener("change", this.submit);
  }

  get input() {
    return this.#input;
  }

  set input(input) {
    this.#input = input;
  }

  submit() {
    const submitEvent = new SubmitEvent("submit");
    this.dispatchEvent(submitEvent);
  }

  upload = (event) => {
    event.preventDefault();
    const data = new FormData(this);

    const files = [];
    for (var [key, value] of data.entries()) {
      if (key === "json") files.push(value);
    }

    WorkFile.read(files[0]);
  };
}

customElements.define("aeee-upload-work-file-form", UploadWorkFileForm, {
  extends: "form",
});
