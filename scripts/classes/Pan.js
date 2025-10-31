import Toolbox from "./Toolbox.js";

export default class Pan {
  _panBtn = document.querySelector("[data-widget='pan']");

  constructor({ panBtn } = {}) {
    this.panBtn = panBtn ?? this.panBtn;

    this.panBtn.addEventListener("click", () => {
      Toolbox.tools.camera.cursor = "move";
      Toolbox.grab("camera").isLocked = true;
    });
  }

  get panBtn() {
    return this._panBtn;
  }

  set panBtn(panBtn) {
    this._panBtn = panBtn;
  }
}
