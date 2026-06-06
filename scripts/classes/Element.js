export default class Element {
  #elementType;
  #height;
  #originX;
  #originY;
  #width;

  constructor({ elementType, h, x, y, w } = {}) {
    this.elementType = elementType;
    this.height = h;
    this.originX = x;
    this.originY = y;
    this.width = w;
  }

  get elementType() {
    return this.#elementType;
  }

  get height() {
    return this.#height;
  }

  get originX() {
    return this.#originX;
  }

  get originY() {
    return this.#originY;
  }

  get width() {
    return this.#width;
  }

  set elementType(elementType) {
    this.#elementType = elementType;
  }

  set height(height) {
    this.#height = height;
  }

  set originX(originX) {
    this.#originX = originX;
  }

  set originY(originY) {
    this.#originY = originY;
  }

  set width(width) {
    this.#width = width;
  }
}
