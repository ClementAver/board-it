import depthFromAncestor from "../utilities/depthFromAncestor.js";
import centerCoords from "../utilities/centerCoords.js";
import elementAtCursor from "../utilities/elementAtCursor.js";
import insertSibling from "../utilities/insertSibling.js";
import px from "../utilities/px.js";
import { throttle } from "../utilities/timing.js";

export default class DragSorter extends HTMLElement {
  #_draggedDepth = null;

  constructor() {
    super();

    this.addEventListener("dragstart", this.dragstart.bind(this));
    this.addEventListener("drag", throttle(this.drag.bind(this), 100));
    this.addEventListener("dragover", this.dragover);
    this.addEventListener("dragend", this.dragend.bind(this));
  }

  get draggedDepth() {
    return this.#_draggedDepth;
  }

  set draggedDepth(draggedDepth) {
    this.#_draggedDepth = draggedDepth;
  }

  dragstart(event) {
    event.target.classList.add("is-dragged");
    const { clientX, clientY } = event;
    const { left, top } = event.target.getBoundingClientRect();
    event.dataTransfer.setDragImage(
      event.target,
      clientX - left,
      clientY - top,
    );
    this.draggedDepth = depthFromAncestor(event.target, this);
  }

  drag(event) {
    console.log(event);
    const underneath = elementAtCursor(
      { x: event.clientX, y: event.clientY },
      '[draggable="true"]',
    );
    if (!underneath || underneath === event.target) return;
    const underneathDepth = depthFromAncestor(underneath, this);
    if (this.draggedDepth === underneathDepth) {
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      const isBefore = event.clientX < centerCoords(underneath).x;
      if (
        (isBefore && event.target.nextElementSibling === underneath) ||
        (!isBefore && event.target.previousElementSibling === underneath)
      )
        return;
      insertSibling(event.target, underneath, isBefore ? "before" : "after");
    } else if (this.draggedDepth - 1 === underneathDepth) {
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      underneath.appendChild(event.target);
    } else {
      event.dataTransfer.dropEffect = "none";
    }
  }

  dragover(event) {
    event.preventDefault();
  }

  dragend(event) {
    event.target.classList.remove("is-dragged");
    this.draggedDepth = null;
  }
}

customElements.define("aeee-drag-sorter", DragSorter);
