/**
 * Drag-to-scroll class for horizontal and/or vertical scrolling
 *
 * The ‘data-no-drag’ attribute can be used on child elements to exclude them from drag and drop
 *
 * Requirements:
 * - Element must have overflow: auto or scroll
 * - Content must be larger than the container in the scrollable direction(s)
 *
 * @example
 * // Basic usage (both axes)
 * const scrollable = document.getElementById('scrollable');
 * new ScrollOnDrag(scrollable);
 *
 * @example
 * // Toggle functionality
 * const scrollable = new ScrollOnDrag(element, { axis: 'x' });
 * scrollable.stop();  // Temporarily disable
 * scrollable.start(); // Re-enable
 *
 * @example
 * // Web component lifecycle
 * connectedCallback() {
 *   this._scrollable = new ScrollOnDrag(this, { axis: 'y' });
 * }
 * disconnectedCallback() {
 *   this._scrollable.destroy();
 * }
 *
 * @example
 * // Multiple elements
 * document.querySelectorAll('.drag-scroll').forEach(element => {
 *     new ScrollOnDrag(element, { axis: 'x' });
 * });
 */
export default class ScrollOnDrag {
  /**
   * Creates a new ScrollOnDrag instance
   * @param {HTMLElement} element - The element to make drag-scrollable
   * @param {Object} [options] - Configuration options
   * @param {string} [options.axis='xy'] - Axis to enable dragging on ('x', 'y', or 'xy')
   * @throws {Error} If element is not provided or is not an HTMLElement
   * @throws {Error} If axis is not 'x', 'y', or 'xy'
   */
  constructor(element, options = {}) {
    if (!element || !(element instanceof HTMLElement)) {
      throw new Error('ScrollOnDrag requires a valid HTML element');
    }

    const { axis = 'xy' } = options;

    if (!['x', 'y', 'xy'].includes(axis)) {
      throw new Error('Axis must be "x", "y", or "xy"');
    }

    this._element = element;
    this._axis = axis;
    this._isDragging = false;
    this._startX = 0;
    this._startY = 0;
    this._scrollLeft = 0;
    this._scrollTop = 0;
    this._hasDragged = false;
    this._isActive = false;

    this.start();
    this.startNoDragChildren();
  }

  /**
   * Starts the drag scrolling functionality
   */
  start() {
    if (this._isActive) return;

    this._isActive = true;
    this._element.style.cursor = 'grab';
    this._element.style.userSelect = 'none';

    // Store bound methods for removal
    this.boundMouseDown = (e) => this.onMouseDown(e);
    this.boundMouseMove = (e) => this.onMouseMove(e);
    this.boundMouseUp = () => this.onMouseUp();
    this.boundMouseLeave = () => this.onMouseUp();
    this.boundClickCapture = (e) => this.onClickCapture(e);

    this._element.addEventListener('mousedown', this.boundMouseDown);
    this._element.addEventListener('mousemove', this.boundMouseMove);
    this._element.addEventListener('mouseup', this.boundMouseUp);
    this._element.addEventListener('mouseleave', this.boundMouseLeave);
    this._element.addEventListener('click', this.boundClickCapture, true);
  }

  /**
   * Stops the drag scrolling functionality.
   * Can be restarted with start().
   */
  stop() {
    if (!this._isActive) return;

    this._isActive = false;
    this._isDragging = false;

    this._element.removeEventListener('mousedown', this.boundMouseDown);
    this._element.removeEventListener('mousemove', this.boundMouseMove);
    this._element.removeEventListener('mouseup', this.boundMouseUp);
    this._element.removeEventListener('mouseleave', this.boundMouseLeave);
    this._element.removeEventListener('click', this.boundClickCapture, true);

    // Reset cursor and user-select
    this._element.style.cursor = '';
    this._element.style.userSelect = '';
  }

  /**
   * Completely destroys the instance and cleans up all references
   */
  destroy() {
    this.stop();
    this.stopNoDragChildren();

    // Clear references
    this._element = null;
    this._boundMouseDown = null;
    this._boundMouseMove = null;
    this._boundMouseUp = null;
    this._boundMouseLeave = null;
    this._boundClickCapture = null;
  }

  resetNoDragChildren() {
    this.stopNoDragChildren();
    this.startNoDragChildren();
  }

  startNoDragChildren() {
    this._noDragChildren = this._element.querySelectorAll('[data-no-drag]');

    this._noDragChildren.forEach((noDragChild) => {
      noDragChild.addEventListener('mousedown', this.stopAndListen);
      noDragChild.addEventListener('mouseleave', this.startOnEvent);
    });
  }

  stopNoDragChildren() {
    this._noDragChildren.forEach((noDragChild) => {
      noDragChild.removeEventListener('mousedown', this.stopAndListen);
      noDragChild.removeEventListener('mouseleave', this.startOnEvent);
    });
  }

  onMouseDown(e) {
    e.preventDefault();
    this._isDragging = true;
    this._hasDragged = false;
    this._element.style.cursor = 'grabbing';

    if (this._axis === 'x' || this._axis === 'xy') {
      this._startX = e.pageX - this._element.offsetLeft;
      this._scrollLeft = this._element.scrollLeft;
    }

    if (this._axis === 'y' || this._axis === 'xy') {
      this._startY = e.pageY - this._element.offsetTop;
      this._scrollTop = this._element.scrollTop;
    }
  }

  onMouseMove(e) {
    if (!this._isDragging) return;
    e.preventDefault();

    if (this._axis === 'x' || this._axis === 'xy') {
      const x = e.pageX - this._element.offsetLeft;
      const walkX = (x - this._startX) * 1;
      this._element.scrollLeft = this._scrollLeft - walkX;

      if (Math.abs(walkX) > 3) {
        this._hasDragged = true;
      }
    }

    if (this._axis === 'y' || this._axis === 'xy') {
      const y = e.pageY - this._element.offsetTop;
      const walkY = (y - this._startY) * 1;
      this._element.scrollTop = this._scrollTop - walkY;

      if (Math.abs(walkY) > 3) {
        this._hasDragged = true;
      }
    }
  }

  onMouseUp() {
    this._isDragging = false;
    this._element.style.cursor = 'grab';
  }

  onClickCapture(e) {
    if (this._hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
    setTimeout(() => {
      this._hasDragged = false;
    }, 10);
  }

  stopAndListen = () => {
    this.stop();
    window.addEventListener('mouseup', this.restartDrag);
  };

  startOnEvent = (e) => {
    if (e.type === 'mouseup') {
      const isInside = e.target === this._element || this._element.contains(e.target);
      if (isInside) return;
    }

    this.start();
    window.removeEventListener('mouseup', this.startOnEvent);
  };
}
