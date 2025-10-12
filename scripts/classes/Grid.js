import Element from "./Element.js";

export default class Grid extends Element {
  _borderColor = "rgba(180, 180, 180, 1)";
  _dashes = [5, 5];
  _isEnabled = true;
  _spacing = 50;

  constructor(originX = 100, originY = 100, width = 1600, height = 900, options = {}) {
    super(originX, originY, width, height);
    this.borderColor = options.borderColor ?? this.borderColor;
    this.dashes = options.dashes ?? this.dashes;
    this.isEnabled = options.isEnabled ?? this.isEnabled;
    this.spacing = options.spacing ?? this.spacing;
  }

  get borderColor() {
    return this._borderColor;
  }

  get dashes() {
    return this._dashes;
  }

  get isEnabled() {
    return this._isEnabled;
  }

  get spacing() {
    return this._spacing;
  }

  set borderColor(borderColor) {
    this._borderColor = borderColor;
  }

  set dashes(dashes) {
    this._dashes = dashes;
  }

  set isEnabled(isEnabled) {
    this._isEnabled = isEnabled;
  }

  set spacing(spacing) {
    this._spacing = spacing;
  }

  draw(canvas, rect) {
    canvas.context.strokeStyle = this.borderColor;
    canvas.context.setLineDash(
      this.dashes.map((dash) => {
        const nb = dash / canvas.camera.scale;
        return nb < 5 ? nb : 5;
      })
    );
    canvas.context.lineWidth = 1 / canvas.camera.scale;

    // Draws y lines:
    for (
      let x = rect.originX + this.spacing;
      x <= rect.originX + rect.width - this.spacing;
      x += this.spacing
    ) {
      canvas.context.beginPath();
      canvas.context.moveTo(x, rect.originY);
      canvas.context.lineTo(x, rect.originY + rect.height);
      canvas.context.stroke();
    }

    // Draws x lines:
    for (
      let y = rect.originY + this.spacing;
      y <= rect.originY + rect.height - this.spacing;
      y += this.spacing
    ) {
      canvas.context.beginPath();
      canvas.context.moveTo(rect.originX, y);
      canvas.context.lineTo(rect.originX + rect.width, y);
      canvas.context.stroke();
    }
  }
}
