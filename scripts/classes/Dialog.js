export default class Dialog extends HTMLDialogElement {
  #triggers = null;

  constructor({ triggers } = {}) {
    super();

    this.triggers = triggers ?? this.triggers;
  }

  connectedCallback() {
    this.triggers =
      document.querySelectorAll(`[data-trigger="${this.id}"]`) ?? this.triggers;

    this.triggers.forEach((element) => {
      element.addEventListener("click", this.trigger.bind(this));
    });
  }

  disconnectedCallback() {
    this.triggers.forEach((element) => {
      element.removeEventListener("click", this.trigger);
    });
  }

  get triggers() {
    return this.#triggers;
  }

  set triggers(triggers) {
    this.#triggers = triggers;
  }

  trigger(event) {
    switch (event.target.closest("[data-action]").dataset.action) {
      case "showModal":
        this.showModal();
        break;

      case "show":
        this.show();
        break;

      case "close":
        this.close();
        break;

      default:
        break;
    }
  }
}

customElements.define("aeee-dialog", Dialog, { extends: "dialog" });
