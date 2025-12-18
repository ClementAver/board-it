import WorkFile from "./WorkFile.js";

export default class DownloadWorkFileForm {
  _anchor = null;
  _form = null;

  constructor({ anchor, form } = {}) {
    this.form = form ?? this.form;
    this.anchor = anchor ?? this.form.querySelector("a");

    this.form.addEventListener("submit", this.download);
  }

  get anchor() {
    return this._anchor;
  }

  get form() {
    return this._form;
  }

  set anchor(anchor) {
    this._anchor = anchor;
  }

  set form(form) {
    this._form = form;
  }

  download = (event) => {
    event.preventDefault();

    const blob = new Blob([WorkFile.history.snapshots.slice(-1)[0]], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    this.anchor.href = url;
    this.anchor.download = `${
      JSON.parse(localStorage.getItem("workfile/metadata")).name ?? "boards"
    }`;
    this.anchor.click();
    URL.revokeObjectURL(url);
  };
}
