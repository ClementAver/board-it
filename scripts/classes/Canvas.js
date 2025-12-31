import handleError from "../utilities/handleError.js";
import Toolbox from "./Toolbox.js";

class Canvas {
  _boards = [];
  _canvas = document.createElement("canvas");
  _context = this.canvas.getContext("2d");
  _wrapper = document.getElementById("canvas-wrapper");

  constructor({ boards, wrapper } = {}) {
    this.boards = boards ?? this.boards;
    this.wrapper = wrapper ?? this.wrapper;

    this.canvas.textContent =
      "Désolé, votre navigateur ne prend pas en charge les canvas.";
    this.wrapper.appendChild(this.canvas);

    // Window listeners:
    window.addEventListener("resize", () => {
      this.resize();
    });
    window.addEventListener("grab", (e) => {
      if (this.canvas) this.canvas.style.cursor = e.detail.cursor;
    });
  }

  get boards() {
    return this._boards;
  }

  get canvas() {
    return this._canvas;
  }

  get context() {
    return this._context;
  }

  get wrapper() {
    return this._wrapper;
  }

  set boards(boards) {
    this._boards = boards;
  }

  set canvas(canvas) {
    this._canvas = canvas;
  }

  set context(context) {
    this._context = context;
  }

  set wrapper(wrapper) {
    this._wrapper = wrapper;
  }

  debug() {
    console.debug(this);
  }

  /**
   * Main drawing function, which will invoke all internal drawing methods of the elements.
   * @returns { Promise<boolean> }
   */
  async draw() {
    return new Promise((resolve, reject) => {
      /*
       * Resets the camera state to draw background...
       * Parameters : (scaleX, skewY, skewX, scaleY, translateX, translateY)
       */
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      /*
       * ...then clears all the pixels of the canvas.
       */
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      /* Applies the camera state (zoom + pan). */
      const camera = Toolbox.tools.camera;
      this.context.setTransform(
        camera.scale,
        0,
        0,
        camera.scale,
        camera.originX,
        camera.originY
      );
      try {
        if (this.boards.length) {
          this.boards.forEach((board) => {
            board.draw(this);
          });
        }
      } catch (error) {
        handleError({
          text: "Une erreur est survenue lors du tracé du canvas.",
          error,
        });

        reject(false);
        return;
      }

      resolve(true);
    });
  }

  resize() {
    const rect = this.wrapper.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.draw().catch((error) =>
      handleError({
        text: "Une erreur est survenue lors du tracé du canvas à l'occasion d'un recadrage.",
        error,
      })
    );
  }

  resizeWith(element) {
    new ResizeObserver((entries) => {
      for (const _ of entries) {
        this.resize();
      }
    }).observe(element);
  }

  toCanvasCoords(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }
}

export default new Canvas();
