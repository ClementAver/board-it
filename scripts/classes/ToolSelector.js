import Toolbox from "./Toolbox.js";

export default class ToolSelector {
  #cameraButton = document.querySelector('[data-tool="camera"]');
  #selectorButton = document.querySelector('[data-tool="selector"]');

  constructor() {
    window.addEventListener("grab", (e) => {
      this.updateSelected(e.detail.label);
    });

    this.cameraButton.addEventListener("click", () => {
      Toolbox.grab("camera").isLocked = true;
    });

    this.selectorButton.addEventListener("click", () => {
      Toolbox.grab("selector");
    });
  }

  get cameraButton() {
    return this.#cameraButton;
  }

  get selectorButton() {
    return this.#selectorButton;
  }

  set cameraButton(cameraButton) {
    this.#cameraButton = cameraButton;
  }

  set selectorButton(selectorButton) {
    this.#selectorButton = selectorButton;
  }

  updateSelected(label) {
    const currentSelected = document.querySelector("[data-tool].selected");
    const nextSelected = document.querySelector(`[data-tool="${label}"]`);

    if (currentSelected) currentSelected.classList.remove("selected");
    if (nextSelected) nextSelected.classList.add("selected");
  }
}
