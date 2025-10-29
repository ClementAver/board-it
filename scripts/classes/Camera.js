import preventKeys from "../../styles/utils/preventKeys.js";
import Tool from "./Tool.js";
import Toolbox from "./Toolbox.js";

export default class Camera extends Tool {
  /*
   * Camera state (Panning refers to 2D camera movements across a scene.) :
   * scale -> zoom level
   * originX -> pan offset x
   * originY -> pan offset y
   */
  _isLocked = false;
  _isPanning = false;
  _originX = 0;
  _originY = 0;
  _scale = 1;
  _startPan = { x: 0, y: 0 };
  _zoomIntensity = 0.1;
  _zoomMax = 500;
  _zoomMin = 5;

  constructor({
    cursor = "move",
    isLocked,
    isPanning,
    label = "camera",
    originX,
    originY,
    scale,
    startPan,
    zoomIntensity,
    zoomMax,
    zoomMin,
  } = {}) {
    super({ cursor, label });
    this.isLocked = isLocked ?? this.isLocked;
    this.isPanning = isPanning ?? this.isPanning;
    this.originX = originX ?? this.originX;
    this.originY = originY ?? this.originY;
    this.scale = scale ?? this.scale;
    this.startPan = startPan ?? this.startPan;
    this.zoomIntensity = zoomIntensity ?? this.zoomIntensity;
    this.zoomMax = zoomMax ?? this.zoomMax;
    this.zoomMin = zoomMin ?? this.zoomMin;
  }

  get isLocked() {
    return this._isLocked;
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

  get zoom() {
    return Math.round(this.scale * 100);
  }

  get zoomIntensity() {
    return this._zoomIntensity;
  }

  get zoomMax() {
    return this._zoomMax;
  }

  get zoomMin() {
    return this._zoomMin;
  }

  set isLocked(isLocked) {
    this._isLocked = isLocked;
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
    if (scale < this.zoomMin / 100) scale = this.zoomMin;
    if (scale > this.zoomMax / 100) scale = this.zoomMax;
    this._scale = scale;
  }

  set startPan(startPan) {
    this._startPan = startPan;
  }

  set zoomIntensity(zoomIntensity) {
    this._zoomIntensity = zoomIntensity;
  }

  set zoomMax(zoomMax) {
    this._zoomMax = zoomMax;
  }

  set zoomMin(zoomMin) {
    this._zoomMin = zoomMin;
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

  initKeyboardActions(canvas) {
    let isSpaceKey = false;

    window.addEventListener("keydown", (e) => {
      preventKeys(e, ["space", "ControlLeft", "AltLeft"]);

      switch (e.code) {
        case "ControlLeft":
          e.altKey ? (this.cursor = "zoom-out") : (this.cursor = "zoom-in");
          Toolbox.grab(this.label, { skipPrevious: true });
          break;

        case "AltLeft":
          if (Toolbox.isHandled(this.label) && this.cursor === "zoom-in") {
            this.cursor = "zoom-out";
            Toolbox.grab(this.label, { skipPrevious: true });
          }
          break;

        case "Space":
          isSpaceKey = true;
          this.cursor = "move";
          Toolbox.grab(this.label, { skipPrevious: true });
          break;

        default:
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      e.preventDefault();

      switch (e.code) {
        case "ControlLeft":
          if (Toolbox.isHandled(this.label)) {
            if (isSpaceKey) {
              this.cursor = "move";
              Toolbox.grab(this.label, { skipPrevious: true });
            } else {
              if (!this.isLocked) Toolbox.grabPrevious();
              else Toolbox.grab(this.label, { skipPrevious: true });
            }
          }
          break;

        case "AltLeft":
          if (Toolbox.isHandled(this.label)) {
            if (this.cursor === "zoom-out") {
              this.cursor = "zoom-in";
              Toolbox.grab(this.label, { skipPrevious: true });
            } else if (!e.ctrlKey) {
              if (!this.isLocked) Toolbox.grabPrevious();
            }
          }
          break;

        case "Space":
          isSpaceKey = false;
          if (Toolbox.isHandled(this.label)) {
            if (e.ctrlKey) {
              e.altKey ? (this.cursor = "zoom-out") : (this.cursor = "zoom-in");
              Toolbox.grab(this.label, { skipPrevious: true });
            } else {
              if (!this.isLocked) Toolbox.grabPrevious();
              else Toolbox.grab(this.label, { skipPrevious: true });
            }
          }
          break;

        default:
          break;
      }
    });

    canvas.canvas.addEventListener("mousedown", (e) => {
      if (!Toolbox.isHandled(this.label)) return;

      switch (this.cursor) {
        case "move":
          this.isPanning = true;
          const p = canvas.toCanvasCoords(e.clientX, e.clientY);
          this.startPan.x = p.x - this.originX;
          this.startPan.y = p.y - this.originY;
          break;

        case "zoom-in":
          this.zoomIn(canvas);
          break;

        case "zoom-out":
          this.zoomOut(canvas);
          break;

        default:
          break;
      }
    });

    canvas.canvas.addEventListener("mousemove", (e) => {
      if (!Toolbox.isHandled(this.label)) return;

      switch (this.cursor) {
        case "move":
          if (!this.isPanning) return;
          const p = canvas.toCanvasCoords(e.clientX, e.clientY);
          this.originX = p.x - this.startPan.x;
          this.originY = p.y - this.startPan.y;
          canvas.draw();
          break;

        default:
          break;
      }
    });

    window.addEventListener("mouseup", () => {
      this.isPanning = false;
    });

    canvas.wrapper.addEventListener("wheel", (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (!Toolbox.isHandled(this.label)) return;
        /*
         * Scroll up (deltaY < 0) -> zoom in;
         * scroll down (deltaY > 0) -> zoom out.
         */
        const zoom = e.deltaY < 0 ? 1 + this.zoomIntensity : 1 - this.zoomIntensity;

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
      }
    });
  }

  setZoom(canvas, zoom) {
    if (zoom < this.zoomMin) zoom = this.zoomMin;
    else if (zoom > this.zoomMax) zoom = this.zoomMax;

    const rect = canvas.canvas.getBoundingClientRect();

    /*
     * Raw coordinates of the canvas that we will target as the new centre of the camera.
     * Default : center of the canvas.
     */
    let canvasX = rect.width / 2;
    let canvasY = rect.height / 2;

    /*
     * Converts the canvas coordinates to scene coordinates using the current camera settings (pan + zoom).
     * ↳i.e. "unproject" the screen points to the scene before scaling.
     * ⓘ unproject : going from screen coordinates (or canvas) to the original scene coordinates by applying the inverse of the camera settings.
     *
     * 1. Compensate for drift:
     * 
     * Given a screen [|0 |1 |2 |3 |4] with line 2 as its centre,
     * dragging the scene to the right is equivalent to dragging the camera to the left <-[|-1 |0 |1 |2 |3->].
     * The new centre remains halfway across the frame (i.e. 2 units out of 4).
     * The X origin of the scene has been moved one unit to the right: line 0 is now old line 1.
     * So the new scene center would be 2 - 1 = 1.
     * 
     * If we had decided to drag the scene to the left (a.k.a. dragging the camera to the right): |0 [<-|1 |2 |3 |4 |5]->,
     * then the X origin would have been at position -1, and so: 2 - (-1) = 3.
     *
     * N.B.: The originX of the scene moves when we pan, but not the originX of our canvas.
     * -> Scene coordinates = canvas coordinate - scene offset (drift)
     *
     * 2. Adjust to the scene coordinates to the current scale:
     * 
     * When we compensated for the drift, we have to adjust the result to the zoom multiplier.
     * We do so by dividing it by the scale :
     * 3 / 0.5 (zoom: 50%) = 6
     * 3 / 2 (zoom: 200%) = 1.5
     */

    /*
     * - canvasX -> the x position we target;
     * - this.originX -> the drift that we must compensate for;
     * - this.scale -> the proportion we must apply to adjust the zoom factor.
     */
    const sceneX = (canvasX - this.originX) / this.scale;
    const sceneY = (canvasY - this.originY) / this.scale;

    // 3. Assigns the new scale (zoom 10% <-> 0.1 scale).
    this.scale = zoom / 100;

    // Adjust the camera origin so that the world point (x, y) remains at the same screen position
    // (Keeps the point under the cursor fixed while zooming).
    this.originX = canvasX - sceneX * this.scale;
    this.originY = canvasY - sceneY * this.scale;

    canvas.draw();

    return this.zoom;
  }

  zoomIn(canvas, zoomIntensity = this.zoomIntensity) {
    let newScale = this.scale * (1 + zoomIntensity);
    if (newScale > this.zoomMax / 100) newScale = this.zoomMax / 100;
    this.scale = newScale;
    canvas.draw();
  }

  zoomOut(canvas, zoomIntensity = this.zoomIntensity) {
    let newScale = this.scale * (1 - zoomIntensity);
    if (newScale < this.zoomMin / 100) newScale = this.zoomMin / 100;
    this.scale = newScale;
    canvas.draw();
  }
}
