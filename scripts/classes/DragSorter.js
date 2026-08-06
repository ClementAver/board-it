import depthFromAncestor from "../utilities/depthFromAncestor.js";
import centerCoords from "../utilities/centerCoords.js";
import elementAtCursor from "../utilities/elementAtCursor.js";
import insertSibling from "../utilities/insertSibling.js";
import px from "../utilities/px.js";
import { throttle } from "../utilities/timing.js";

export default class DragSorter extends HTMLElement {
  #_dragged = null;
  #_draggedDepth = null;

  constructor() {
    super();

    this.addEventListener("dragstart", this.dragstart.bind(this));
    this.addEventListener("drag", throttle(this.drag.bind(this), 100));
    this.addEventListener("dragover", this.dragover);
    this.addEventListener("dragend", this.dragend.bind(this));
  }

  get dragged() {
    return this.#_dragged;
  }

  get draggedDepth() {
    return this.#_draggedDepth;
  }

  set dragged(dragged) {
    this.#_dragged = dragged;
  }

  set draggedDepth(draggedDepth) {
    this.#_draggedDepth = draggedDepth;
  }

  dragstart(event) {
    this.dragged = event.target.closest('[draggable="true"]');
    this.dragged.classList.add("is-dragged");
    const { clientX, clientY } = event;
    const { left, top } = this.dragged.getBoundingClientRect();
    event.dataTransfer.setDragImage(
      this.dragged,
      clientX - left,
      clientY - top,
    );
    this.draggedDepth = depthFromAncestor(this.dragged, this);
  }

  drag(event) {
    const underneath = elementAtCursor(
      { x: event.clientX, y: event.clientY },
      '[draggable="true"]',
    );
    if (!underneath) return;
    const underneathDepth = depthFromAncestor(underneath, this);
    if (this.draggedDepth === underneathDepth) {
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      const isBefore = event.clientX < centerCoords(underneath).x;
      insertSibling(this.dragged, underneath, isBefore ? "before" : "after");
    } else if (this.draggedDepth - 1 === underneathDepth) {
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      underneath.appendChild(this.dragged);
    } else {
      event.dataTransfer.dropEffect = "none";
    }
  }

  dragover(event) {
    event.preventDefault();
  }

  dragend() {
    this.dragged.classList.remove("is-dragged");
    this.dragged = null;
    this.draggedDepth = null;
  }
}

customElements.define("aeee-drag-sorter", DragSorter);
