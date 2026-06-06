import Element from "./Element.js";
export default class Picture extends Element {
  #backgroundColor = "transparent";
  #image = new Image();
  #source = "";

  constructor({ x = 100, y = 100, w = 1600, h = 900, backgroundColor, img, src } = {}) {
    super({ x, y, w, h, elementType: "picture" });
    this.backgroundColor = backgroundColor ?? this.backgroundColor;
    this.image = img ?? this.image;
    this.source = src ?? this.source;
  }

  get backgroundColor() {
    return this.#backgroundColor;
  }

  get image() {
    return this.#image;
  }

  get source() {
    return this.#source;
  }

  set backgroundColor(backgroundColor) {
    this.#backgroundColor = backgroundColor;
  }

  set image(image) {
    this.#image = image;
  }

  set source(source) {
    this.#source = source;
  }

  draw(canvas, rect = { originX: 0, originY: 0 }) {
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
      canvas.context.drawImage(img, rect.originX, rect.originY, rect.width, rect.height);

    canvas.context.fillStyle = "rgba(0,0,0,0)";
  }

  static mapperIn({
    height: h,
    originX: x,
    originY: y,
    width: w,
    backgroundColor,
    image: img,
    source: src,
  }) {
    return new Picture({ h, x, y, w, backgroundColor, img, src });
  }
}
