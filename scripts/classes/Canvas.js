import Camera from "./Camera.js";

export default class Canvas {
  _boards = [];
  _camera = new Camera();
  _canvas = document.createElement("canvas");
  _context = this.canvas.getContext("2d");
  _cursorStyle = "grab";
  _wrapper = document.querySelector("main.board__wrapper");

  constructor({ boards, wrapper } = {}) {
    this.boards = boards ?? this.boards;
    this.wrapper = wrapper ?? this.wrapper;

    this.canvas.textContent = "Désolé, votre navigateur ne prend pas en charge les canvas.";
    this.wrapper.appendChild(this.canvas);

    this.cursorStyle = this.cursorStyle;

    // Window resize listener:
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      this.centerCamera();
    });

    // ⇊ Panning logic: ⇊
    this.canvas.addEventListener("mousedown", (e) => {
      this.camera.isPanning = true;
      const p = this.toCanvasCoords(e.clientX, e.clientY);
      this.camera.startPan.x = p.x - this.camera.originX;
      this.camera.startPan.y = p.y - this.camera.originY;
      this.canvas.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.camera.isPanning) return;
      const p = this.toCanvasCoords(e.clientX, e.clientY);
      this.camera.originX = p.x - this.camera.startPan.x;
      this.camera.originY = p.y - this.camera.startPan.y;
      this.draw();
    });

    window.addEventListener("mouseup", () => {
      this.camera.isPanning = false;
      this.canvas.style.cursor = this.cursorStyle;
    });
    // ⇈ Panning logic. ⇈

    // Zoom handler:
    this.wrapper.addEventListener("wheel", (e) => {
      if (e.ctrlKey) {
        e.preventDefault();

        const zoomIntensity = 0.1;
        /*
         * Scroll up (deltaY < 0) -> zoom in;
         * scroll down (deltaY > 0) -> zoom out.
         */
        const zoom = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity;

        const rect = this.canvas.getBoundingClientRect();

        // Converts the mouse position from viewport coordinates to canvas coordinates.
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        /*
         * Converts canvas coordinates to scene coordinates using the current camera settings (pan + zoom).
         * ↳i.e. "unproject" the screen point to the scene before scaling.
         * ⓘ unproject : going from screen coordinates (or canvas) to the original scene coordinates by applying the inverse of the camera settings.
         */
        const sceneX = (mouseX - this.camera.originX) / this.camera.scale;
        const sceneY = (mouseY - this.camera.originY) / this.camera.scale;

        // Applies the zoom multiplier to the camera scale.
        this.camera.scale *= zoom;

        // Adjust the camera origin so that the world point (x, y) remains at the same screen position
        // (Keeps the point under the cursor fixed while zooming).
        this.camera.originX = mouseX - sceneX * this.camera.scale;
        this.camera.originY = mouseY - sceneY * this.camera.scale;

        this.draw();
      }
    });

    this.resizeCanvas();
    this.centerCamera();
  }

  get boards() {
    return this._boards;
  }

  get camera() {
    return this._camera;
  }

  get canvas() {
    return this._canvas;
  }

  get context() {
    return this._context;
  }

  get cursorStyle() {
    return this._cursorStyle;
  }

  get wrapper() {
    return this._wrapper;
  }

  set boards(boards) {
    this._boards = boards;
  }

  set camera(camera) {
    this._camera = camera;
  }

  set canvas(canvas) {
    this._canvas = canvas;
  }

  set context(context) {
    this._context = context;
  }

  set cursorStyle(cursorStyle) {
    this._cursorStyle = cursorStyle;
    this.canvas.style.cursor = this.cursorStyle;
  }

  set wrapper(wrapper) {
    this._wrapper = wrapper;
  }

  draw() {
    /*
     * Resets the camera state to draw background.
     * Parameters : (scaleX, skewY, skewX, scaleY, translateX, translateY)
     */
    this.context.setTransform(1, 0, 0, 1, 0, 0);

    // Clears all the pixels of the canvas.
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Applies the 'camera' state (zoom + pan).
    this.context.setTransform(
      this.camera.scale,
      0,
      0,
      this.camera.scale,
      this.camera.originX,
      this.camera.originY
    );

    if (this.boards.length) {
      this.boards.forEach((board) => {
        board.draw(this);
      });
    }
  }

  resizeCanvas() {
    const rect = this.wrapper.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.draw();
  }

  centerCamera(padding = 40) {
    if (!this.boards.length) return;

    // Find the rectangle encompassing all content
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    this.boards.forEach((b) => {
      const rect = b.getBorderRect();
      minX = Math.min(minX, rect.originX);
      minY = Math.min(minY, rect.originY);
      maxX = Math.max(maxX, rect.originX + rect.width);
      maxY = Math.max(maxY, rect.originY + rect.height);
    });

    const boardsWidth = maxX - minX || 1;
    const boardsHeight = maxY - minY || 1;

    const cw = this.canvas.clientWidth || this.canvas.width;
    const ch = this.canvas.clientHeight || this.canvas.height;

    const availW = Math.max(1, cw - padding * 2);
    const availH = Math.max(1, ch - padding * 2);

    const scale = Math.min(availW / boardsWidth, availH / boardsHeight);

    this.camera.scale = isFinite(scale) && scale > 0 ? scale : 1;

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    this.camera.originX = cw / 2 - centerX * this.camera.scale;
    this.camera.originY = ch / 2 - centerY * this.camera.scale;

    this.draw();
  }

  toCanvasCoords(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }
}
