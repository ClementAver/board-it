export default class Element {
  _originX;
  _originY;
  _width;
  _height;

  constructor(originX, originY, width, height) {
    this.originX = originX;
    this.originY = originY;
    this.width = width;
    this.height = height;
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

  get height() {
    return this._height;
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

  set height(height) {
    this._height = height;
  }
}
