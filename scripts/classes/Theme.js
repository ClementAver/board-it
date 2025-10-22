class Theme {
  _currentTheme = null;
  _prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  _switchBtn = document.querySelector("[data-theme-switch-btn]");
  _switchHandle = document.querySelector("[data-theme-switch-handle]");

  constructor({ currentTheme, prefersDark, switchBtn, switchHandle } = {}) {
    this.currentTheme = currentTheme ?? this._currentTheme;
    this.prefersDark = prefersDark ?? this._prefersDark;
    this.switchBtn = switchBtn ?? this._switchBtn;
    this.switchHandle = switchHandle ?? this._switchHandle;

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

  get switchHandle() {
    return this._switchHandle;
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

  set switchHandle(switchHandle) {
    this._switchHandle = switchHandle;
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
    const pressed = theme === "dark" ? "true" : "false";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    this.switchBtn.setAttribute("aria-pressed", pressed);
    this.updateIcon(theme);
  }

  // TODO : XSS -> to be refactored.
  updateIcon(theme) {
    const pressed = theme === "dark" ? true : false;
    if (pressed) {
      this.switchHandle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="lucide lucide-moon-icon lucide-moon" viewBox="0 0 24 24">
  <path d="M21 12a9 9 0 1 1-9-9v1a6 6 0 0 0 8 8z"/>
</svg>`;
    } else {
      this.switchHandle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="lucide lucide-sun-icon lucide-sun" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="4"/>
  <path d="M12 2v2M12 20v2M5 5l1 1M18 18l1 1M2 12h2M20 12h2M6 18l-1 1M19 5l-1 1"/>
</svg>
`;
    }
  }
}

export default new Theme();
