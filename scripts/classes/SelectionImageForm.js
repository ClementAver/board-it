export default class SelectionImageForm extends HTMLFormElement {
  constructor() {
    super();
    this.addEventListener("submit", this.upload);
  }

  upload = (event) => {
    event.preventDefault();
    this.processFormData();
  };

  processFormData() {
    const formData = new FormData(this);

    const thumbnails = [];
    for (var [key, value] of formData.entries()) {
      if (key === "thumbnail") thumbnails.push(value);
    }

    console.info(thumbnails);
  }
}

customElements.define("aeee-selection-image-form", SelectionImageForm, {
  extends: "form",
});
