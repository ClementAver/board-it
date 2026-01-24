import Unique from "./Unique.js";

export default class Tooltip extends HTMLElement {
  constructor() {
    super();

    if (!this.previousElementSibling) {
      this.remove();
      return;
    }

    this.id = Unique.getUniqueID();
    this.setAttribute("role", "tooltip");
    this.popover = "hint";

    this.previousElementSibling.setAttribute("aria-describedby", [this.id]);
    this.previousElementSibling.interestForElement = this;
  }
}
