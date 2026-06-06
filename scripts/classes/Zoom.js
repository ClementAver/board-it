import Canvas from "./Canvas.js";
import Toolbox from "./Toolbox.js";

export default class Zoom {
  #zoomBtn = document.querySelector("[data-widget='zoom']");
  #zoomIndicator = document.querySelector("[data-widget='zoom-indicator']");

  constructor({ zoomBtn, zoomIndicator } = {}) {
    this.zoomBtn = zoomBtn ?? this.zoomBtn;
    this.zoomIndicator = zoomIndicator ?? this.zoomIndicator;

    this.zoomBtn.addEventListener("click", () => {
      if (!Toolbox.tools.camera) return;
      Toolbox.tools.camera.cursor = "zoom-in";
      Toolbox.grab("camera").isLocked = true;
    });

    this.zoomIndicator.addEventListener("change", (e) => {
      if (!Toolbox.tools.camera) return;
      const newZoom = Toolbox.tools.camera.setZoom(Canvas, {
        zoom: e.target.value,
      });
      this.setZoomIndicator(newZoom);
    });
  }

  get zoomBtn() {
    return this.#zoomBtn;
  }

  get zoomIndicator() {
    return this.#zoomIndicator;
  }

  set zoomBtn(zoomBtn) {
    this.#zoomBtn = zoomBtn;
  }

  set zoomIndicator(zoomIndicator) {
    this.#zoomIndicator = zoomIndicator;
  }

  setZoomIndicator(zoom) {
    if (!zoom) zoom = Toolbox.tools.camera.zoom;
    this.zoomIndicator.value = zoom;
  }
}
