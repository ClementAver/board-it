export default class BrowserStorage {
  _mode = "session";

  get mode() {
    return this.mode;
  }

  set mode(mode) {
    if (["session", "local"].includes(mode)) {
      this._mode = mode;
    } else {
      console.warn("🟡 Wrong argument given.");
    }
  }

  setProperty({ key, value, mode } = {}) {
    if (mode) this.mode = mode;
    const storage = this.mode === "session" ? sessionStorage : localStorage;

    try {
      storage.setItem(key, value);
    } catch (error) {
      console.warn(
        `Failed to set ${this.mode} storage key: '${key}', value passed was: `,
        value,
        error
      );
    }
  }
}
