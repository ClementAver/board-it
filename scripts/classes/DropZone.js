export default class Dropzone {
  _closeBtns = document.querySelectorAll("[data-dropzone-btn-close]");
  _dialog = document.querySelector("[data-dropzone]");
  _triggers = document.querySelectorAll(".dropdown-menu [data-dropzone-trigger]");

  constructor({ closeBtns, dialog, triggers } = {}) {
    this.closeBtns = closeBtns ?? this.closeBtns;
    this.dialog = dialog ?? this.dialog;
    this.triggers = triggers ?? this.triggers;

    this.triggers.forEach((element) => {
      element.addEventListener("click", () => this.dialog.showModal());
    });

    this.closeBtns.forEach((element) => {
      element.addEventListener("click", () => this.dialog.close());
    });
  }

  get closeBtns() {
    return this._closeBtns;
  }

  get dialog() {
    return this._dialog;
  }

  get triggers() {
    return this._triggers;
  }

  set closeBtns(closeBtns) {
    this._closeBtns = closeBtns;
  }

  set dialog(dialog) {
    this._dialog = dialog;
  }

  set triggers(triggers) {
    this._triggers = triggers;
  }
}
