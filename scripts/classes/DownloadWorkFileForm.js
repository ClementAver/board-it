export default class DownloadWorkFileForm extends HTMLFormElement {
  #anchor = null;

  constructor({ anchor } = {}) {
    super();
    this.anchor = anchor ?? this.querySelector("a") ?? this.anchor;
    this.addEventListener("submit", this.download);
  }

  get anchor() {
    return this.#anchor;
  }

  set anchor(anchor) {
    this.#anchor = anchor;
  }

  download = (event) => {
    event.preventDefault();

    const blob = new Blob(
      [
        /* TODO : implement */
      ],
      {
        type: "application/json",
      },
    );

    const url = URL.createObjectURL(blob);
    this.anchor.href = url;

    this.anchor.download = `${
      JSON.parse(localStorage.getItem("workfile/metadata")).name ?? "boards"
    }`;

    this.anchor.click();
    URL.revokeObjectURL(url);
  };
}

customElements.define("aeee-download-workfile-form", DownloadWorkFileForm, {
  extends: "form",
});
