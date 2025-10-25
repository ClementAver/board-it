import Tool from "./Tool.js";
import Toolbox from "./Toolbox.js";

export default class Camera extends Tool {
  /*
   * Camera state (Panning refers to 2D camera movements across a scene.) :
   * scale -> zoom level
   * originX -> pan offset x
   * originY -> pan offset y
   */
  _isPanning = false;
  _originX = 0;
  _originY = 0;
  _scale = 1;
  _startPan = { x: 0, y: 0 };

  constructor({
    cursor = "move",
    label = "camera",
    isPanning,
    originX,
    originY,
    scale,
    startPan,
  } = {}) {
    super({ cursor, label });
    this.isPanning = isPanning ?? this.isPanning;
    this.originX = originX ?? this.originX;
    this.originY = originY ?? this.originY;
    this.scale = scale ?? this.scale;
    this.startPan = startPan ?? this.startPan;
  }

  get isPanning() {
    return this._isPanning;
  }

  get originX() {
    return this._originX;
  }

  get originY() {
    return this._originY;
  }

  get scale() {
    return this._scale;
  }

  get startPan() {
    return this._startPan;
  }

  set isPanning(isPanning) {
    this._isPanning = isPanning;
  }

  set originX(originX) {
    this._originX = originX;
  }

  set originY(originY) {
    this._originY = originY;
  }

  set scale(scale) {
    this._scale = scale;
  }

  set startPan(startPan) {
    this._startPan = startPan;
  }

  initPan(canvas) {
    canvas.canvas.addEventListener("mousedown", (e) => {
      if (!Toolbox.isHandled(this.label)) return;
      this.isPanning = true;
      const p = canvas.toCanvasCoords(e.clientX, e.clientY);
      this.startPan.x = p.x - this.originX;
      this.startPan.y = p.y - this.originY;
    });

    canvas.canvas.addEventListener("mousemove", (e) => {
      if (!Toolbox.isHandled(this.label)) return;
      if (!this.isPanning) return;
      const p = canvas.toCanvasCoords(e.clientX, e.clientY);
      this.originX = p.x - this.startPan.x;
      this.originY = p.y - this.startPan.y;
      canvas.draw();
    });

    window.addEventListener("mouseup", () => {
      this.isPanning = false;
    });
  }

  initZoom(canvas) {
    canvas.wrapper.addEventListener("wheel", (e) => {
      if (!Toolbox.isHandled(this.label)) return;
      const zoomIntensity = 0.1;
      /*
       * Scroll up (deltaY < 0) -> zoom in;
       * scroll down (deltaY > 0) -> zoom out.
       */
      const zoom = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity;

      const rect = canvas.canvas.getBoundingClientRect();

      // Converts the mouse position from viewport coordinates to canvas coordinates.
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      /*
       * Converts canvas coordinates to scene coordinates using the current camera settings (pan + zoom).
       * ↳i.e. "unproject" the screen point to the scene before scaling.
       * ⓘ unproject : going from screen coordinates (or canvas) to the original scene coordinates by applying the inverse of the camera settings.
       */
      const sceneX = (mouseX - this.originX) / this.scale;
      const sceneY = (mouseY - this.originY) / this.scale;

      // Applies the zoom multiplier to the camera scale.
      this.scale *= zoom;

      // Adjust the camera origin so that the world point (x, y) remains at the same screen position
      // (Keeps the point under the cursor fixed while zooming).
      this.originX = mouseX - sceneX * this.scale;
      this.originY = mouseY - sceneY * this.scale;

      canvas.draw();
    });
  }

  frameAll(canvas, padding = 40) {
    if (!canvas.boards.length) return;
    // Find the rectangle encompassing all content
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    canvas.boards.forEach((b) => {
      const rect = b.getBorderRect();
      minX = Math.min(minX, rect.originX);
      minY = Math.min(minY, rect.originY);
      maxX = Math.max(maxX, rect.originX + rect.width);
      maxY = Math.max(maxY, rect.originY + rect.height);
    });

    const boardsWidth = maxX - minX || 1;
    const boardsHeight = maxY - minY || 1;

    const cw = canvas.canvas.clientWidth || canvas.canvas.width;
    const ch = canvas.canvas.clientHeight || canvas.canvas.height;

    const availW = Math.max(1, cw - padding * 2);
    const availH = Math.max(1, ch - padding * 2);

    const scale = Math.min(availW / boardsWidth, availH / boardsHeight);

    this.scale = isFinite(scale) && scale > 0 ? scale : 1;

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    this.originX = cw / 2 - centerX * this.scale;
    this.originY = ch / 2 - centerY * this.scale;

    canvas.draw();
  }
}
