export default class BrowserStorage {
  _mode = "session";

  get mode() {
    return this.mode;
  }

  set mode(mode) {
    if (["session", "local"].includes(mode)) {
      this._mode = mode;
    } else {
      console.warn(`'${mode}' n'est pas un mode de stockage valide.`);
    }
  }

  setProperty({ key, value, mode } = {}) {
    if (mode) this.mode = mode;
    const storage = this.mode === "session" ? sessionStorage : localStorage;

    try {
      storage.setItem(key, value);
    } catch (error) {
      console.warn(
        `Impossible d'assigner le '${this.mode}' storage pour la clé : '${key}', la valeur passée était : `,
        value,
        error
      );
    }
  }
}
