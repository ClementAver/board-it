import Toolbox from "./Toolbox.js";

class PushToMove {
  _menu = document.querySelector("[data-widget='push-to-move']");

  constructor({ menu } = {}) {
    this.menu = menu ?? this.menu;

    this.menu.addEventListener("click", () => Toolbox.grab("camera", true));

    window.addEventListener("keydown", (e) => {
      if (e.key === " ") Toolbox.grab("camera", true);
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === " ") Toolbox.grabPrevious(true);
    });
  }

  get menu() {
    return this._menu;
  }

  set menu(menu) {
    this._menu = menu;
  }
}

export default new PushToMove();
