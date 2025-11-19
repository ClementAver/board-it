export default class Dropzone {
  _dialog = document.querySelector("[data-dropzone]");
  _triggers = document.querySelectorAll(".dropdown-menu [data-dropzone-trigger]");

  constructor({ dialog, triggers } = {}) {
    this.dialog = dialog ?? this.dialog;
    this.triggers = triggers ?? this.triggers;

    this.triggers.forEach((element) => {
      element.addEventListener("click", () => this.dialog.showModal());
    });
  }

  get dialog() {
    return this._dialog;
  }

  get triggers() {
    return this._triggers;
  }

  set dialog(dialog) {
    this._dialog = dialog;
  }

  set triggers(triggers) {
    this._triggers = triggers;
  }
}
