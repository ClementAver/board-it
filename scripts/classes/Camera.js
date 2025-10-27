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
  _zoomIntensity = 0.1;
  _isLocked = false;

  constructor({
    cursor = "move",
    label = "camera",
    isPanning,
    originX,
    originY,
    scale,
    startPan,
    zoomIntensity,
    isLocked,
  } = {}) {
    super({ cursor, label });
    this.isLocked = isLocked ?? this.isLocked;
    this.isPanning = isPanning ?? this.isPanning;
    this.originX = originX ?? this.originX;
    this.originY = originY ?? this.originY;
    this.scale = scale ?? this.scale;
    this.startPan = startPan ?? this.startPan;
    this.zoomIntensity = zoomIntensity ?? this.zoomIntensity;
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

  get zoomIntensity() {
    return this._zoomIntensity;
  }

  get zoom() {
    return Math.round(this.scale * 100);
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
    if (scale < 0.05) scale = 0.05;
    if (scale > 5) scale = 5;
    this._scale = scale;
  }

  set startPan(startPan) {
    this._startPan = startPan;
  }

  set zoomIntensity(zoomIntensity) {
    this._zoomIntensity = zoomIntensity;
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
    function logKeys(e) {
      console.log(`${e.type} → ${e.code} [altKey: ${e.altKey}] [ctrlKey: ${e.ctrlKey}]`);
    }

    let isSpaceKey = false;

    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      logKeys(e);

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
      logKeys(e);

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
          console.log(e);
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
          console.log(e);
          break;
      }
    });

    window.addEventListener("mouseup", () => {
      this.isPanning = false;
    });

    // canvas.wrapper.addEventListener("wheel", (e) => {
    //   if (e.ctrlKey) {
    //     e.preventDefault();
    //     if (!Toolbox.isHandled(this.label)) return;
    //     /*
    //      * Scroll up (deltaY < 0) -> zoom in;
    //      * scroll down (deltaY > 0) -> zoom out.
    //      */
    //     const zoom = e.deltaY < 0 ? 1 + this.zoomIntensity : 1 - this.zoomIntensity;

    //     const rect = canvas.canvas.getBoundingClientRect();

    //     // Converts the mouse position from viewport coordinates to canvas coordinates.
    //     const mouseX = e.clientX - rect.left;
    //     const mouseY = e.clientY - rect.top;

    //     /*
    //      * Converts canvas coordinates to scene coordinates using the current camera settings (pan + zoom).
    //      * ↳i.e. "unproject" the screen point to the scene before scaling.
    //      * ⓘ unproject : going from screen coordinates (or canvas) to the original scene coordinates by applying the inverse of the camera settings.
    //      */
    //     const sceneX = (mouseX - this.originX) / this.scale;
    //     const sceneY = (mouseY - this.originY) / this.scale;

    //     // Applies the zoom multiplier to the camera scale.
    //     this.scale *= zoom;

    //     // Adjust the camera origin so that the world point (x, y) remains at the same screen position
    //     // (Keeps the point under the cursor fixed while zooming).
    //     this.originX = mouseX - sceneX * this.scale;
    //     this.originY = mouseY - sceneY * this.scale;

    //     canvas.draw();
    //   }
    // });
  }

  zoomIn(canvas) {
    this.scale *= 1 + this.zoomIntensity;
    canvas.draw();
  }

  zoomOut(canvas) {
    this.scale *= 1 - this.zoomIntensity;
    canvas.draw();
  }
}
