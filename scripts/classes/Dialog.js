export default class Dialog extends HTMLDialogElement {
  #triggers = [];

  constructor({ triggers } = {}) {
    super();

    this.triggers = triggers ?? this.triggers;
    this._trigger = this.trigger.bind(this);
  }

  connectedCallback() {
    this.triggers =
      Array.from(document.querySelectorAll(`[data-trigger="${this.id}"]`)) ??
      this.triggers;

    this.triggers.forEach((element) => {
      element.addEventListener("click", this._trigger);
    });
  }

  disconnectedCallback() {
    this.triggers.forEach((element) => {
      element.removeEventListener("click", this._trigger);
    });
  }

  appendTrigger(trigger) {
    console.log(trigger);
    
    this.triggers.push(trigger);
    trigger.addEventListener("click", this._trigger);
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
