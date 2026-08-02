import getCenterCoords from "../utilities/getCenterCoords.js";
import insertSibling from "../utilities/insertSibling.js";
import px from "../utilities/px.js";
import { throttle } from "../utilities/timing.js";

export default class DragSorter extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("drag", throttle(this.drag, 250));
  }

  // TODO: Investigate on cursor on 'drag' events.

  drag(event) {
    event.stopImmediatePropagation();
    const dragged = event.target.closest('[draggable="true"]');
    const underneath = document
      .elementFromPoint(event.clientX, event.clientY)
      .closest('[draggable="true"]');
    if (!underneath) return;
    const { x } = getCenterCoords(underneath);
    const where = event.clientX >= x ? "after" : "before";

    if (
      dragged.parentElement.parentElement ===
      underneath.parentElement.parentElement
    ) {
      event.dataTransfer.dropEffect = "move";
      insertSibling(dragged, underneath, where);
    } else {
      event.dataTransfer.dropEffect = "none";
    }
  }
}

customElements.define("aeee-drag-sorter", DragSorter);
