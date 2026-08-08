import centerCoords from "../utilities/centerCoords.js";
import elementAtCursor from "../utilities/elementAtCursor.js";
import insertSibling from "../utilities/insertSibling.js";
import px from "../utilities/px.js";
import { throttle } from "../utilities/timing.js";

export default class DragSorter extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("dragstart", this.dragstart.bind(this));
    this.addEventListener("drag", throttle(this.drag.bind(this), 100));
    this.addEventListener("dragover", this.dragover);
    this.addEventListener("dragend", this.dragend.bind(this));
  }

  dragstart(event) {
    if (this.dataset.frozen) {
      this._clonedNode = event.target.cloneNode(true);
    }
    event.target.classList.add("is-dragged");
    const { clientX, clientY } = event;
    const { left, top } = event.target.getBoundingClientRect();
    event.dataTransfer.setDragImage(
      event.target,
      clientX - left,
      clientY - top,
    );
  }

  drag(event) {
    const dragged = this._clonedNode ?? event.target;
    const underneath = elementAtCursor(
      { x: event.clientX, y: event.clientY },
      "[data-drag-level]",
    );
    if (
      !underneath ||
      underneath === event.target ||
      underneath.closest("[data-frozen]")
    )
      return;
    [event.target, underneath].forEach((element) => {
      if (!element.dataset.dragLevel) {
        console.error("Missing 'data-drag-level' attribute.", element);
      }
    });
    const draggedDepth = event.target.dataset.dragLevel;
    const underneathDepth = underneath.dataset.dragLevel;

    if (draggedDepth === underneathDepth) {
      if (this.dataset.frozen && this.contains(underneath)) return;
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      const isBefore = event.clientX < centerCoords(underneath).x;
      if (
        (isBefore && dragged.nextElementSibling === underneath) ||
        (!isBefore && dragged.previousElementSibling === underneath)
      )
        return;
      insertSibling(dragged, underneath, isBefore ? "before" : "after");
    } else if (parseInt(draggedDepth) - 1 === parseInt(underneathDepth)) {
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      underneath.appendChild(dragged);
    } else {
      event.dataTransfer.dropEffect = "none";
    }
  }

  dragover(event) {
    event.preventDefault();
  }

  dragend(event) {
    event.target.classList.remove("is-dragged");
    // this._clonedNode &&= null; <- short circuit the drag event
  }
}

customElements.define("aeee-drag-sorter", DragSorter);
