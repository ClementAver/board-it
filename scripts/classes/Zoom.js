import Toolbox from "./Toolbox.js";
import Canvas from "./Canvas.js";

class Zoom {
  _zoomBtn = document.querySelector("[data-widget='zoom']");
  _zoomInBtn = document.querySelector("[data-widget='zoom-in']");
  _zoomOutBtn = document.querySelector("[data-widget='zoom-out']");
  _zoomIndicator = document.querySelector("[data-widget='zoom-indicator']");

  constructor({ zoomInBtn, zoomOutBtn } = {}) {
    this.zoomInBtn = zoomInBtn ?? this.zoomInBtn;
    this.zoomOutBtn = zoomOutBtn ?? this.zoomOutBtn;

    this.updateZoomIndicator();

    this.zoomBtn.addEventListener("click", () => {
      Toolbox.useSilent("camera").cursor = "zoom-in";
      Toolbox.grab("camera").isLocked = true;
      this.updateZoomIndicator();
    });

    this.zoomInBtn.addEventListener("click", () => {
      Toolbox.useSilent("camera").zoomIn(Canvas)
      this.updateZoomIndicator();
    });
    this.zoomOutBtn.addEventListener("click", () => {
      Toolbox.useSilent("camera").zoomOut(Canvas)
      this.updateZoomIndicator();
    });
  }

  get zoomBtn() {
    return this._zoomBtn;
  }

  get zoomInBtn() {
    return this._zoomInBtn;
  }

  get zoomIndicator() {
    return this._zoomIndicator;
  }

  get zoomOutBtn() {
    return this._zoomOutBtn;
  }

  set zoomBtn(zoomBtn) {
    this._zoomBtn = zoomBtn;
  }

  set zoomInBtn(zoomInBtn) {
    this._zoomInBtn = zoomInBtn;
  }

  set zoomIndicator(zoomIndicator) {
    this._zoomIndicator = zoomIndicator;
  }

  set zoomOutBtn(zoomOutBtn) {
    this._zoomOutBtn = zoomOutBtn;
  }

  updateZoomIndicator() {
    this.zoomIndicator.value = `${Toolbox.useSilent("camera").zoom} %`;
  }
}

export default new Zoom();
