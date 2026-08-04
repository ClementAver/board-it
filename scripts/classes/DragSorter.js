import getCenterCoords from "../utilities/getCenterCoords.js";
import insertSibling from "../utilities/insertSibling.js";
import px from "../utilities/px.js";
import { throttle } from "../utilities/timing.js";

export default class DragSorter extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("drag", throttle(this.drag.bind(this), 250));
    this.addEventListener("dragstart", (event) => {
      event.target.closest('[draggable="true"]')?.classList.add("is-dragged");
    });
    this.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    this.addEventListener("dragend", (event) => {
      event.target
        .closest('[draggable="true"]')
        ?.classList.remove("is-dragged");
    });
  }

  drag(event) {
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
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      insertSibling(dragged, underneath, where);
    } else {
      if (event.dataTransfer) event.dataTransfer.dropEffect = "none";
    }
  }

  drag(event) {
    const dragged = event.target.closest('[draggable="true"]');
    const underneath = document
      .elementFromPoint(event.clientX, event.clientY)
      .closest('[draggable="true"]');
    if (!underneath) return;

    const { x } = getCenterCoords(underneath);
    const where = event.clientX >= x ? "after" : "before";

    if (
      // same generation
      dragged.parentElement.parentElement ===
      underneath.parentElement.parentElement
    ) {
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      insertSibling(dragged, underneath, where);
    } else if (
      // one generation gap
      dragged.parentElement.parentElement === underneath.parentElement
    ) {
      underneath.appendChild(dragged);
    } else {
      if (event.dataTransfer) event.dataTransfer.dropEffect = "none";
    }
  }
}

customElements.define("aeee-drag-sorter", DragSorter);
