export default class Camera {
  /*
   * Camera state (Panning refers to 2D camera movements across a scene.) :
   * scale -> zoom level
   * originX -> pan offset x
   * originY -> pan offset y
   */
  _isPanning = false;
  _originX = 0;
  _originY = 0;
  _scale = 1;
  _startPan = { x: 0, y: 0 };

  constructor({ isPanning, originX, originY, scale, startPan } = {}) {
    this.isPanning = isPanning ?? this.isPanning;
    this.originX = originX ?? this.originX;
    this.originY = originY ?? this.originY;
    this.scale = scale ?? this.scale;
    this.startPan = startPan ?? this.startPan;
  }

  get isPanning() {
    return this._isPanning;
  }

  get originX() {
    return this._originX;
  }

  get originY() {
    return this._originY;
  }

  get scale() {
    return this._scale;
  }

  get startPan() {
    return this._startPan;
  }

  set isPanning(isPanning) {
    this._isPanning = isPanning;
  }

  set originX(originX) {
    this._originX = originX;
  }

  set originY(originY) {
    this._originY = originY;
  }

  set scale(scale) {
    this._scale = scale;
  }

  set startPan(startPan) {
    this._startPan = startPan;
  }

  reset() {
    this.isPanning = false;
    this.originX = 0;
    this.originY = 0;
    this.scale = 1;
    this.startPan = { x: 0, y: 0 };
  }
}
