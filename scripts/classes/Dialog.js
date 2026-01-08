class Dialog extends HTMLElement {
  _dialog = null;
  _triggers = null;

  constructor({ dialog, triggers } = {}) {
    super();

    this.dialog = dialog ?? this.dialog;
    this.triggers = triggers ?? this.triggers;
  }

  connectedCallback() {
    this.dialog = this.querySelector("dialog") ?? this.dialog;
    this.triggers =
      document.querySelectorAll(`[data-trigger="${this.dialog.id}"]`) ??
      this.triggers;

    this.triggers.forEach((element) => {
      element.addEventListener("click", this.trigger.bind(this));
    });
  }

  disconnectedCallback() {
    this.triggers.forEach((element) => {
      element.removeEventListener("click", this.trigger);
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

  trigger(event) {
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
  }
}

customElements.define("aeee-dialog", Dialog);
