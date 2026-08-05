import depthFromAncestor from "../utilities/depthFromAncestor.js";
import centerCoords from "../utilities/centerCoords.js";
import elementAtCursor from "../utilities/elementAtCursor.js";
import insertSibling from "../utilities/insertSibling.js";
import px from "../utilities/px.js";
import { throttle } from "../utilities/timing.js";

export default class DragSorter extends HTMLElement {
  _dragged = null;
  _rootSorter = null;
  _draggedDepth = null;

  constructor() {
    super();

    this.addEventListener("drag", throttle(this.drag.bind(this), 250));
    this.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    this.addEventListener("dragstart", (event) => {
      this._dragged = event.target.closest('[draggable="true"]');
      this._rootSorter = this._dragged.closest(
        ":not(aeee-drag-sorter) > aeee-drag-sorter",
      );
      if (this._dragged) {
        this._draggedDepth = depthFromAncestor(this._dragged, this._rootSorter);
        const { clientX, clientY } = event;
        const { left, top } = this._dragged.getBoundingClientRect();
        event.dataTransfer.setDragImage(
          this._dragged,
          clientX - left,
          clientY - top,
        );
        this._dragged.classList.add("is-dragged");
      }
    });
    this.addEventListener("dragend", (event) => {
      this._dragged?.classList.remove("is-dragged");
      this._dragged = null;
      this._rootSorter = null;
      this._draggedDepth = null;
    });
  }

  drag(event) {
    if (!this._dragged || !this._rootSorter) return;
    const underneath = elementAtCursor(
      { x: event.clientX, y: event.clientY },
      '[draggable="true"]',
    );
    if (!underneath || this._dragged === underneath) {
      if (event.dataTransfer) event.dataTransfer.dropEffect = "none";
      return;
    }

    const underneathDepth = depthFromAncestor(underneath, this._rootSorter);

    if (this._draggedDepth < underneathDepth) {
      event.dataTransfer.dropEffect = "none";
      return;
    }

    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
    if (this._draggedDepth === underneathDepth) {
      const isBefore = event.clientX < centerCoords(underneath).x;
      insertSibling(this._dragged, underneath, isBefore ? "before" : "after");
      return;
    }
    underneath.appendChild(this._dragged);
  }
}

customElements.define("aeee-drag-sorter", DragSorter);
