export default class Dialog {
  _dialog = document.querySelector("[data-dialog]");
  _triggers = document.querySelectorAll("[data-dialog-trigger]");

  constructor({ dialog, triggers } = {}) {
    this.dialog = dialog ?? this.dialog;
    this.triggers = triggers ?? this.triggers;

    this.triggers.forEach((element) => {
      element.addEventListener("click", (event) => {
        switch (event.target.closest("[data-action]").dataset.action) {
          case "showModal":
            this.dialog.showModal();
            break;

          case "show":
            this.dialog.show();
            break;

          case "close":
            this.dialog.close();
            break;

          default:
            break;
        }
      });
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
