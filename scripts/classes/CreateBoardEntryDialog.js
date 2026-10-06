import Dialog from "./Dialog.js";

export default class CreateBoardEntryDialog extends Dialog {
  constructor(parameters) {
    super(parameters);
  }

  connectedCallback() {
    this.triggers =
      Array.from(document.querySelectorAll(`[data-trigger="${this.id}"]`)) ??
      this.triggers;

    this.triggers.forEach((element) => {
      element.addEventListener("click", this._trigger);
    });
    this._beforeToggle = this.beforeToggle.bind(this);
    this.addEventListener("beforetoggle", this._beforeToggle);
  }

  disconnectedCallback() {
    this.triggers.forEach((element) => {
      element.removeEventListener("click", this._trigger);
    });
    this.removeEventListener("beforetoggle", this._beforeToggle);
  }

  beforeToggle = (event) => {
    if (event.newState === "open") {
      if (!window.thumbnail) {
        this.close();
        throw new Error("property 'thumbnail' missing on window");
      }
      this.querySelector('input[name="caption"]').value =
        window.thumbnail.caption;
    }
    if (event.newState === "closed") {
      this.clean();
    }
  };

  clean() {
    this.querySelector('input[name="caption"]').value = "";
    window.thumbnail = null;
    this.close();
  }
}

customElements.define(
  "aeee-create-board-entry-dialog",
  CreateBoardEntryDialog,
  {
    extends: "dialog",
  },
);
