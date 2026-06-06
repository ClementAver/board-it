import Toolbox from "./Toolbox.js";
import Canvas from "./Canvas.js";

export default class FrameAll {
  #frameAllBtn = document.querySelector("[data-widget='frame-all']");

  constructor({ frameAllBtn } = {}) {
    this.frameAllBtn = frameAllBtn ?? this.frameAllBtn;

    this.frameAllBtn.addEventListener("click", () => Toolbox.tools.camera.frameAll(Canvas));
  }

  get frameAllBtn() {
    return this.#frameAllBtn;
  }

  set frameAllBtn(frameAllBtn) {
    this.#frameAllBtn = frameAllBtn;
  }
}
