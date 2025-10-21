class Theme {
  _currentTheme = null;
  _prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  _switchBtn = document.querySelector("[data-theme-switch-btn]");

  constructor({ currentTheme, prefersDark, switchBtn } = {}) {
    this.currentTheme = currentTheme ?? this._currentTheme;
    this.prefersDark = prefersDark ?? this._prefersDark;
    this.switchBtn = switchBtn ?? this._switchBtn;

    this.switchBtn.addEventListener("click", () => {
      this.currentTheme =
        document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      this.setTheme(this.currentTheme);
    });

    this.prefersDark.addEventListener("change", (e) => {
      this.currentTheme = e.matches ? "dark" : "light";
      this.setTheme(this.currentTheme);
    });
  }

  get currentTheme() {
    return this._currentTheme;
  }

  get prefersDark() {
    return this._prefersDark;
  }

  get switchBtn() {
    return this._switchBtn;
  }

  set currentTheme(currentTheme) {
    this._currentTheme = currentTheme;
  }

  set prefersDark(prefersDark) {
    this._prefersDark = prefersDark;
  }

  set switchBtn(switchBtn) {
    this._switchBtn = switchBtn;
  }

  initTheme() {
    if (localStorage.getItem("theme")) {
      this.currentTheme = localStorage.getItem("theme");
    } else if (this.prefersDark.matches) {
      this.currentTheme = "dark";
    } else {
      this.currentTheme = "light";
    }
    this.setTheme(this.currentTheme);
  }

  setTheme(theme) {
    console.log(theme);

    const pressed = theme === "dark" ? "true" : "false";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    this.switchBtn.setAttribute("aria-pressed", pressed);
  }
}

export default new Theme();
