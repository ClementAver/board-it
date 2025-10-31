import Canvas from "./Canvas.js";
import Toolbox from "./Toolbox.js";

export default class Zoom {
  _zoomBtn = document.querySelector("[data-widget='zoom']");
  _zoomIndicator = document.querySelector("[data-widget='zoom-indicator']");

  constructor({ zoomBtn, zoomIndicator } = {}) {
    this.zoomBtn = zoomBtn ?? this.zoomBtn;
    this.zoomIndicator = zoomIndicator ?? this.zoomIndicator;

    this.zoomBtn.addEventListener("click", () => {
      Toolbox.tools.camera.cursor = "zoom-in";
      Toolbox.grab("camera").isLocked = true;
    });

    this.zoomIndicator.addEventListener("change", (e) => {
      const newZoom = Toolbox.tools.camera.setZoom(Canvas, {
        zoom: e.target.value,
      });
      this.setZoomIndicator(newZoom);
    });
  }

  get zoomBtn() {
    return this._zoomBtn;
  }

  get zoomIndicator() {
    return this._zoomIndicator;
  }

  set zoomBtn(zoomBtn) {
    this._zoomBtn = zoomBtn;
  }

  set zoomIndicator(zoomIndicator) {
    this._zoomIndicator = zoomIndicator;
  }

  setZoomIndicator(zoom) {
    if (!zoom) zoom = Toolbox.tools.camera.zoom;
    this.zoomIndicator.value = zoom;
  }
}
