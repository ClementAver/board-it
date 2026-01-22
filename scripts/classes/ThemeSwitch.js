export class ThemeSwitch extends HTMLElement {
  _currentTheme = null;
  _moon = null;
  _prefersDark = null;
  _sun = null;
  _switchBtn = null;
  _switchHandle = null;

  constructor({
    currentTheme,
    moon,
    prefersDark,
    sun,
    switchBtn,
    switchHandle,
  } = {}) {
    super();

    this.currentTheme = currentTheme ?? this.currentTheme;
    this.moon = moon ?? this.moon;
    this.prefersDark = prefersDark ?? this.prefersDark;
    this.sun = sun ?? this.sun;
    this.switchBtn = switchBtn ?? this.switchBtn;
    this.switchHandle = switchHandle ?? this.switchHandle;
  }

  connectedCallback() {
    this.moon = this.querySelector("[title = 'theme-moon']") ?? this.moon;
    this.prefersDark =
      window.matchMedia("(prefers-color-scheme: dark)") ?? this.prefersDark;
    this.sun = this.querySelector("[title = 'theme-sun']") ?? this.sun;
    this.switchBtn =
      this.querySelector("[data-theme-switch]") ?? this.switchBtn;
    this.switchHandle =
      this.querySelector("[data-theme-switch-handle]") ?? this.switchHandle;

    this.initTheme();

    this.switchBtn.addEventListener("click", this.toggle.bind(this));
    this.prefersDark.addEventListener(
      "change",
      this.updatePreferredTheme.bind(this)
    );
  }

  disconnectedCallback() {
    this.switchBtn.removeEventListener("click", this.toggle);
    this.prefersDark.removeEventListener("change", this.updatePreferredTheme);
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

  toggle() {
    this.currentTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    this.setTheme(this.currentTheme);
  }

  updatePreferredTheme(e) {
    this.currentTheme = e.matches ? "dark" : "light";
    this.setTheme(this.currentTheme);
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