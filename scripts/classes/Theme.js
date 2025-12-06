export default class Theme {
  _currentTheme = null;
  _moon = document.getElementById("theme-moon");
  _prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  _sun = document.getElementById("theme-sun");
  _switchBtn = document.getElementById("data-theme-switch-btn");
  _switchHandle = document.getElementById("data-theme-switch-handle");

  constructor({ currentTheme, moon, prefersDark, sun, switchBtn, switchHandle } = {}) {
    this.currentTheme = currentTheme ?? this.currentTheme;
    this.moon = moon ?? this.moon;
    this.prefersDark = prefersDark ?? this.prefersDark;
    this.sun = sun ?? this.sun;
    this.switchBtn = switchBtn ?? this.switchBtn;
    this.switchHandle = switchHandle ?? this.switchHandle;

    this.initTheme();

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

  get moon() {
    return this._moon;
  }

  get prefersDark() {
    return this._prefersDark;
  }

  get sun() {
    return this._sun;
  }

  get switchBtn() {
    return this._switchBtn;
  }

  get switchHandle() {
    return this._switchHandle;
  }

  set currentTheme(currentTheme) {
    this._currentTheme = currentTheme;
  }

  set moon(moon) {
    this._moon = moon;
  }

  set prefersDark(prefersDark) {
    this._prefersDark = prefersDark;
  }

  set sun(sun) {
    this._sun = sun;
  }

  set switchBtn(switchBtn) {
    this._switchBtn = switchBtn;
  }

  set switchHandle(switchHandle) {
    this._switchHandle = switchHandle;
  }

  initTheme() {
    const storedThemePreset = localStorage.getItem("theme");
    if (storedThemePreset) {
      this.currentTheme = storedThemePreset;
    } else if (this.prefersDark.matches) {
      this.currentTheme = "dark";
    } else {
      this.currentTheme = "light";
    }
    this.setTheme(this.currentTheme);
  }

  setTheme(theme) {
    const pressed = theme === "dark" ? "true" : "false";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    this.switchBtn.setAttribute("aria-pressed", pressed);
    this.updateIcon(theme);
  }

  updateIcon(theme) {
    const pressed = theme === "dark" ? true : false;

    if (pressed) {
      this.sun.style.display = "none";
      this.moon.style.display = "block";
    } else {
      this.sun.style.display = "block";
      this.moon.style.display = "none";
    }
  }
}
