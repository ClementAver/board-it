export default class ThemeSwitch extends HTMLElement {
  #currentTheme = null;
  #moon = null;
  #prefersDark = null;
  #sun = null;
  #switchBtn = null;
  #switchHandle = null;

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
    this.moon = this.querySelector('[data-href*="moon"] svg') ?? this.moon;
    this.prefersDark =
      window.matchMedia("(prefers-color-scheme: dark)") ?? this.prefersDark;
    this.sun = this.querySelector('[data-href*="sun"] svg') ?? this.sun;
    this.switchBtn =
      this.querySelector("[data-theme-switch]") ?? this.switchBtn;
    this.switchHandle =
      this.querySelector("[data-theme-switch-handle]") ?? this.switchHandle;

    this.initTheme();

    this._toggle = this.toggle.bind(this);
    this._updatePreferredTheme = this.updatePreferredTheme.bind(this);
    this.switchBtn.addEventListener("click", this._toggle);
    this.prefersDark.addEventListener("change", this._updatePreferredTheme);
  }

  disconnectedCallback() {
    this.switchBtn.removeEventListener("click", this._toggle);
    this.prefersDark.removeEventListener("change", this._updatePreferredTheme);
  }

  get currentTheme() {
    return this.#currentTheme;
  }

  get moon() {
    return this.#moon;
  }

  get prefersDark() {
    return this.#prefersDark;
  }

  get sun() {
    return this.#sun;
  }

  get switchBtn() {
    return this.#switchBtn;
  }

  get switchHandle() {
    return this.#switchHandle;
  }

  set currentTheme(currentTheme) {
    this.#currentTheme = currentTheme;
  }

  set moon(moon) {
    this.#moon = moon;
  }

  set prefersDark(prefersDark) {
    this.#prefersDark = prefersDark;
  }

  set sun(sun) {
    this.#sun = sun;
  }

  set switchBtn(switchBtn) {
    this.#switchBtn = switchBtn;
  }

  set switchHandle(switchHandle) {
    this.#switchHandle = switchHandle;
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
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    this.switchBtn.setAttribute("aria-pressed", pressed);
    this.updateIcon(theme);
  }

  toggle() {
    this.currentTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
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

customElements.define("aeee-theme-switch", ThemeSwitch);
