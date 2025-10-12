import Element from "./Element.js";

export default class Picture extends Element {
  _backgroundColor = "transparent";
  _image = new Image();
  _source = "";

  constructor({ x = 100, y = 100, w = 1600, h = 900, backgroundColor, img, src } = {}) {
    super(x, y, w, h);
    this.backgroundColor = backgroundColor ?? this.backgroundColor;
    this.image = img ?? this.image;
    this.source = src ?? this.source;
  }

  get backgroundColor() {
    return this._backgroundColor;
  }

  get image() {
    return this._image;
  }

  get source() {
    return this._source;
  }

  set backgroundColor(backgroundColor) {
    this._backgroundColor = backgroundColor;
  }

  set image(image) {
    this._image = image;
  }

  set source(source) {
    this._source = source;
  }

  draw(canvas, rect) {
    canvas.context.fillStyle = this.backgroundColor;

    rect = {
      originX: this.originX + rect.originX,
      originY: this.originY + rect.originY,
      width: this.width,
      height: this.height,
    };

    canvas.context.fillRect(rect.originX, rect.originY, rect.width, rect.height);

    const img = new Image();
    img.src = this.source;
    img.onload = () =>
      canvas.context.drawImage(
        img,
        rect.originX,
        rect.originY,
        rect.width,
        rect.height
      );
  }
}
