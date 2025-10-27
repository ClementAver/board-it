import Canvas from "./Canvas.js";
import Toolbox from "./Toolbox.js";

class Zoom {
  _zoomBtn = document.querySelector("[data-widget='zoom']");
  _zoomIndicator = document.querySelector("[data-widget='zoom-indicator']");

  constructor({ zoomBtn, zoomIndicator } = {}) {
    this.zoomBtn = zoomBtn ?? this.zoomBtn;
    this.zoomIndicator = zoomIndicator ?? this.zoomIndicator;


    this.zoomBtn.addEventListener("click", () => {
      Toolbox.useSilent("camera").cursor = "zoom-in";
      Toolbox.grab("camera").isLocked = true;
    });

    this.zoomIndicator.addEventListener("change", (e) => {
      const newZoom = Toolbox.useSilent("camera").updateZoom(Canvas, e.target.value);
      this.updateZoomIndicator(newZoom);
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

  updateZoomIndicator(zoom) {
    if (!zoom) zoom = Toolbox.useSilent("camera").zoom;
    this.zoomIndicator.value = zoom;
  }
}

export default new Zoom();
