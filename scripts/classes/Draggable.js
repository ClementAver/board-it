export default class Draggable extends HTMLElement {
  constructor() {
    super();
    this.draggable = true;
  }

  connectedCallback() {
    const svg = null;
    // TODO
  }
}

customElements.define("aeee-draggable", Draggable);
