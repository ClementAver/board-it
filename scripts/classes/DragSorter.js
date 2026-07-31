import getCenterCoords from "../utilities/getCenterCoords.js";
import insertSibling from "../utilities/insertSibling.js";
import px from "../utilities/px.js";
import { throttle } from "../utilities/timing.js";

export default class DragSorter extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("drag", throttle(this.drag, 250));
  }

  drag(event) {
    event.stopImmediatePropagation();
    const dragged = event.target.closest('[draggable="true"]');
    const underneath = document
      .elementFromPoint(event.clientX, event.clientY)
      .closest('[draggable="true"]');
    if (!underneath) return;
    const { x } = getCenterCoords(underneath);
    const where = event.clientX >= x ? "after" : "before";
  
    if (dragged.parentElement.parentElement === underneath.parentElement.parentElement)
    insertSibling(dragged, underneath, where);
  }
}

customElements.define("aeee-drag-sorter", DragSorter);
