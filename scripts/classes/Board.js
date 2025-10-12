import Element from "./Element.js";
import Grid from "./Grid.js";

export default class Board extends Element {
  _backgroundColor = "#fafafa";
  _borderAlign = "outside";
  _borderColor = "rgba(180, 180, 180, 1)";
  _borderWidth = 2;
  _elements = [];
  _grid = new Grid();

  constructor({
    x = 100,
    y = 100,
    w = 1600,
    h = 900,
    backgroundColor,
    borderAlign,
    borderColor,
    borderWidth,
    elements,
    grid,
  } = {}) {
    super(x, y, w, h);
    this.backgroundColor = backgroundColor ?? this.backgroundColor;
    this.borderAlign = borderAlign ?? this.borderAlign;
    this.borderColor = borderColor ?? this.borderColor;
    this.borderWidth = borderWidth ?? this.borderWidth;
    this.elements = elements ?? this.elements;
    this.grid = grid ?? this.grid;
  }

  get backgroundColor() {
    return this._backgroundColor;
  }

  get borderAlign() {
    return this._borderAlign;
  }

  get borderColor() {
    return this._borderColor;
  }

  get borderWidth() {
    return this._borderWidth;
  }

  get elements() {
    return this._elements;
  }

  get grid() {
    return this._grid;
  }

  set backgroundColor(backgroundColor) {
    this._backgroundColor = backgroundColor;
  }

  set borderAlign(borderAlign) {
    this._borderAlign = borderAlign;
  }

  set borderColor(borderColor) {
    this._borderColor = borderColor;
  }

  set borderWidth(borderWidth) {
    this._borderWidth = borderWidth;
  }

  set elements(elements) {
    this._elements = elements;
  }

  set grid(grid) {
    this._grid = grid;
  }

  draw(canvas) {
    canvas.context.shadowColor = "rgba(0,0,0,0.5)";
    canvas.context.shadowBlur = 8;
    canvas.context.shadowOffsetX = 1;
    canvas.context.shadowOffsetY = 1;
    const borderRect = this.getBorderRect();
    canvas.context.fillRect(
      borderRect.originX,
      borderRect.originY,
      borderRect.width,
      borderRect.height
    );
    canvas.context.shadowColor = "rgba(0,0,0,0)";
    canvas.context.shadowBlur = 0;
    canvas.context.shadowOffsetX = 0;
    canvas.context.shadowOffsetY = 0;

    canvas.context.fillStyle = this.backgroundColor;
    canvas.context.fillRect(this.originX, this.originY, this.width, this.height);

    canvas.context.strokeStyle = this.borderColor;
    canvas.context.lineWidth = this.borderWidth;
    canvas.context.setLineDash([]);
    const rect = this.getBorderPathRect();
    canvas.context.strokeRect(rect.originX, rect.originY, rect.width, rect.height);

    if (this.grid.isEnabled) this.grid.draw(canvas, this.getUsableRect());

    if (this.elements.length) {
      this.elements.forEach((element) => {
        element.draw(canvas, this.getUsableRect());
      });
    }
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
}
