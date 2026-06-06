import Element from "./Element.js";
import Grid from "./Grid.js";
import Picture from "./Picture.js";

export default class Board extends Element {
  #backgroundColor = "#fafafa";
  #borderAlign = "outside";
  #borderColor = "rgba(255, 255, 255, 1)";
  #borderWidth = 10;
  #elements = [];
  #grids = [new Grid()];

  constructor({
    x = 0,
    y = 0,
    w = 1600,
    h = 900,
    backgroundColor,
    borderAlign,
    borderColor,
    borderWidth,
    elements,
    grids,
  } = {}) {
    super({ x, y, w, h, elementType: "board" });
    this.backgroundColor = backgroundColor ?? this.backgroundColor;
    this.borderAlign = borderAlign ?? this.borderAlign;
    this.borderColor = borderColor ?? this.borderColor;
    this.borderWidth = borderWidth ?? this.borderWidth;
    this.elements = elements ?? this.elements;
    this.grids = grids ?? this.grids;
  }

  get backgroundColor() {
    return this.#backgroundColor;
  }

  get borderAlign() {
    return this.#borderAlign;
  }

  get borderColor() {
    return this.#borderColor;
  }

  get borderWidth() {
    return this.#borderWidth;
  }

  get elements() {
    return this.#elements;
  }

  get grids() {
    return this.#grids;
  }

  set backgroundColor(backgroundColor) {
    this.#backgroundColor = backgroundColor;
  }

  set borderAlign(borderAlign) {
    this.#borderAlign = borderAlign;
  }

  set borderColor(borderColor) {
    this.#borderColor = borderColor;
  }

  set borderWidth(borderWidth) {
    this.#borderWidth = borderWidth;
  }

  set elements(elements) {
    this.#elements = elements;
  }

  set grids(grids) {
    this.#grids = grids;
  }

  draw(canvas) {
    this.drawShadow(canvas, this.getBorderRect());

    this.drawBackground(canvas, this.getUsableRect(), this.backgroundColor);

    if (this.borderWidth) {
      this.drawBorder(canvas, this.getBorderPathRect(), this.borderWidth, {
        color: this.borderColor,
      });
    }

    if (this.grids.length) {
      this.grids.forEach((grid) => {
        if (grid.isEnabled) {
          grid.draw(canvas, this.getUsableRect());
        }
      });
    }

    if (this.elements.length) {
      this.elements.forEach((element) => {
        element.draw(canvas, this.getUsableRect());
      });
    }
  }

  drawBackground(canvas, rect, background) {
    canvas.context.fillStyle = background;
    canvas.context.fillRect(rect.originX, rect.originY, rect.width, rect.height);
    canvas.context.fillStyle = "rgba(0,0,0,0)";
  }

  drawBorder(canvas, rect, width, options = { color: "rgba(255, 255, 255, 1)" }) {
    canvas.context.strokeStyle = options.color;
    canvas.context.lineWidth = width;
    canvas.context.strokeRect(rect.originX, rect.originY, rect.width, rect.height);
    canvas.context.strokeStyle = "rgba(0,0,0,0)";
    canvas.context.lineWidth = 1;
  }

  drawShadow(canvas, rect, options = { color: "rgba(0, 0, 0, 0.5)", blur: 10 }) {
    canvas.context.fillStyle = options.color;
    canvas.context.shadowColor = options.color;
    canvas.context.shadowBlur = options.blur;
    canvas.context.shadowOffsetX = 1;
    canvas.context.shadowOffsetY = 1;
    canvas.context.fillRect(rect.originX, rect.originY, rect.width, rect.height);
    canvas.context.clearRect(rect.originX, rect.originY, rect.width, rect.height);
    canvas.context.fillStyle = "rgba(0,0,0,0)";
    canvas.context.shadowColor = "rgba(0,0,0,0)";
    canvas.context.shadowBlur = 0;
    canvas.context.shadowOffsetX = 0;
    canvas.context.shadowOffsetY = 0;
  }

  getBorderRect({ borderAlign = this.borderAlign } = {}) {
    if (borderAlign === "center" || borderAlign === "outside") {
      return this.getBorderOffsetRect(borderAlign);
    }

    if (borderAlign === "inside") {
      return {
        originX: this.originX,
        originY: this.originY,
        width: this.width,
        height: this.height,
      };
    }
  }

  getUsableRect({ borderAlign = this.borderAlign } = {}) {
    if (borderAlign === "center") {
      return {
        originX: this.originX + this.borderWidth / 2,
        originY: this.originY + this.borderWidth / 2,
        width: this.width - this.borderWidth,
        height: this.height - this.borderWidth,
      };
    }

    if (borderAlign === "outside") {
      return {
        originX: this.originX,
        originY: this.originY,
        width: this.width,
        height: this.height,
      };
    }

    if (borderAlign === "inside") {
      return this.getBorderOffsetRect(borderAlign);
    }
  }

  getBorderOffsetRect({ borderAlign = this.borderAlign } = {}) {
    if (borderAlign === "center") {
      return {
        originX: this.originX - this.borderWidth / 2,
        originY: this.originY - this.borderWidth / 2,
        width: this.width + this.borderWidth,
        height: this.height + this.borderWidth,
      };
    }

    if (borderAlign === "outside") {
      return {
        originX: this.originX - this.borderWidth,
        originY: this.originY - this.borderWidth,
        width: this.width + this.borderWidth * 2,
        height: this.height + this.borderWidth * 2,
      };
    }

    if (borderAlign === "inside") {
      return {
        originX: this.originX + this.borderWidth,
        originY: this.originY + this.borderWidth,
        width: this.width - this.borderWidth * 2,
        height: this.height - this.borderWidth * 2,
      };
    }
  }

  getBorderPathRect({ borderAlign = this.borderAlign } = {}) {
    if (borderAlign === "center") {
      return {
        originX: this.originX,
        originY: this.originY,
        width: this.width,
        height: this.height,
      };
    }

    if (borderAlign === "outside") {
      return {
        originX: this.originX - this.borderWidth / 2,
        originY: this.originY - this.borderWidth / 2,
        width: this.width + this.borderWidth,
        height: this.height + this.borderWidth,
      };
    }

    if (borderAlign === "inside") {
      return {
        originX: this.originX + this.borderWidth / 2,
        originY: this.originY + this.borderWidth / 2,
        width: this.width - this.borderWidth,
        height: this.height - this.borderWidth,
      };
    }
  }

  static mapperIn({
    height: h,
    originX: x,
    originY: y,
    width: w,
    backgroundColor,
    borderAlign,
    borderColor,
    borderWidth,
    elements,
    grids,
  }) {
    elements = elements.map((element) => {
      switch (element.elementType) {
        case "picture":
          element = Picture.mapperIn(element);
          break;

        default:
          break;
      }

      return element;
    });

    grids = grids.map((grid) => {
      return Grid.mapperIn(grid);
    });

    return new Board({
      x,
      y,
      w,
      h,
      backgroundColor,
      borderAlign,
      borderColor,
      borderWidth,
      elements,
      grids,
    });
  }
}
