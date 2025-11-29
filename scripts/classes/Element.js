export default class Element {
  _elementType;
  _height;
  _originX;
  _originY;
  _width;

  constructor({ elementType, h, x, y, w } = {}) {
    this.elementType = elementType;
    this.height = h;
    this.originX = x;
    this.originY = y;
    this.width = w;
  }

  get elementType() {
    return this._elementType;
  }

  get height() {
    return this._height;
  }

  get originX() {
    return this._originX;
  }

  get originY() {
    return this._originY;
  }

  get width() {
    return this._width;
  }

  set elementType(elementType) {
    this._elementType = elementType;
  }

  set height(height) {
    this._height = height;
  }

  set originX(originX) {
    this._originX = originX;
  }

  set originY(originY) {
    this._originY = originY;
  }

  set width(width) {
    this._width = width;
  }
}
