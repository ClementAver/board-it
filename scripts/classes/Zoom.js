import Toolbox from "./Toolbox.js";
import Canvas from "./Canvas.js";

class Zoom {
  _zoomBtn = document.querySelector("[data-widget='zoom']");
  _zoomInBtn = document.querySelector("[data-widget='zoom-in']");
  _zoomOutBtn = document.querySelector("[data-widget='zoom-out']");

  constructor({ zoomInBtn, zoomOutBtn } = {}) {
    this.zoomInBtn = zoomInBtn ?? this.zoomInBtn;
    this.zoomOutBtn = zoomOutBtn ?? this.zoomOutBtn;

    this.zoomBtn.addEventListener("click", () => {
      Toolbox.useSilent("camera").cursor = "zoom-in";
      Toolbox.grab("camera");
    });

    this.zoomInBtn.addEventListener("click", () => Toolbox.useSilent("camera").zoomIn(Canvas));
    this.zoomOutBtn.addEventListener("click", () => Toolbox.useSilent("camera").zoomOut(Canvas));
  }

  get zoomBtn() {
    return this._zoomBtn;
  }

  get zoomInBtn() {
    return this._zoomInBtn;
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

  set zoomOutBtn(zoomOutBtn) {
    this._zoomOutBtn = zoomOutBtn;
  }
}

export default new Zoom();
