import Element from "./Element.js";
import Toolbox from "./Toolbox.js";

export default class Grid extends Element {
  #borderColor = "rgba(115, 225, 255, 1)";
  #borderWidth = 1;
  #dashes = [5, 5];
  #isEnabled = true;
  #spacing = 50;

  constructor({
    x = 100,
    y = 100,
    w = 1600,
    h = 900,
    borderColor,
    borderWidth,
    dashes,
    isEnabled,
    spacing,
  } = {}) {
    super({ x, y, w, h, elementType: "grid" });
    this.borderColor = borderColor ?? this.borderColor;
    this.borderWidth = borderWidth ?? this.borderWidth;
    this.dashes = dashes ?? this.dashes;
    this.isEnabled = isEnabled ?? this.isEnabled;
    this.spacing = spacing ?? this.spacing;
  }

  get borderColor() {
    return this.#borderColor;
  }

  get borderWidth() {
    return this.#borderWidth;
  }

  get dashes() {
    return this.#dashes;
  }

  get isEnabled() {
    return this.#isEnabled;
  }

  get spacing() {
    return this.#spacing;
  }

  set borderColor(borderColor) {
    this.#borderColor = borderColor;
  }

  set borderWidth(borderWidth) {
    this.#borderWidth = borderWidth;
  }

  set dashes(dashes) {
    this.#dashes = dashes;
  }

  set isEnabled(isEnabled) {
    this.#isEnabled = isEnabled;
  }

  set spacing(spacing) {
    this.#spacing = spacing;
  }

  draw(canvas, rect) {
    const camera = Toolbox.tools.camera;
    canvas.context.strokeStyle = this.borderColor;
    canvas.context.lineWidth = this.borderWidth / camera.scale;
    canvas.context.setLineDash(
      this.dashes.map((dash) => {
        const nb = dash / camera.scale;
        return nb < 5 ? nb : 5;
      })
    );

    const startX = Math.abs(rect.width % this.spacing) / 2;
    const startY = Math.abs(rect.height % this.spacing) / 2;

    // Draws y lines:
    for (let x = rect.originX + startX; x <= rect.originX + rect.width; x += this.spacing) {
      canvas.context.beginPath();
      canvas.context.moveTo(x, rect.originY);
      canvas.context.lineTo(x, rect.originY + rect.height);
      canvas.context.stroke();
    }

    // Draws x lines:
    for (let y = rect.originY + startY; y <= rect.originY + rect.height; y += this.spacing) {
      canvas.context.beginPath();
      canvas.context.moveTo(rect.originX, y);
      canvas.context.lineTo(rect.originX + rect.width, y);
      canvas.context.stroke();
    }

    canvas.context.strokeStyle = "rgba(0, 0, 0, 0)";
    canvas.context.lineWidth = 1;
    canvas.context.setLineDash([]);
  }

  static mapperIn({
    height: h,
    originX: x,
    originY: y,
    width: w,
    borderColor,
    borderWidth,
    dashes,
    isEnabled,
    spacing,
  }) {
    return new Grid({
      x,
      y,
      w,
      h,
      borderColor,
      borderWidth,
      dashes,
      isEnabled,
      spacing,
    });
  }
}
