import Toolbox from "./Toolbox.js";
import Canvas from "./Canvas.js";

export default class FrameAll {
  _frameAllBtn = document.querySelector("[data-widget='frame-all']");

  constructor({ frameAllBtn } = {}) {
    this.frameAllBtn = frameAllBtn ?? this.frameAllBtn;

    this.frameAllBtn.addEventListener("click", () => Toolbox.useSilent("camera").frameAll(Canvas));
  }

  get frameAllBtn() {
    return this._frameAllBtn;
  }

  set frameAllBtn(frameAllBtn) {
    this._frameAllBtn = frameAllBtn;
  }
}
