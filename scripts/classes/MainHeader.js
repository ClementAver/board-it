export default class MainHeader {
  _mainHeader = document.querySelector(".main-header");
  _toggleMainHeaderBtn = document.getElementById("main-header-switch");

  constructor() {
    this.toggleMainHeaderBtn.addEventListener("click", () => {
      this.toggle();
    });

    this.updateToggleIcon();
  }

  get mainHeader() {
    return this._mainHeader;
  }

  get toggleMainHeaderBtn() {
    return this._toggleMainHeaderBtn;
  }

  set mainHeader(mainHeader) {
    this._mainHeader = mainHeader;
  }

  set toggleMainHeaderBtn(toggleMainHeaderBtn) {
    this._toggleMainHeaderBtn = toggleMainHeaderBtn;
  }

  toggle() {
    this.mainHeader.setAttribute("data-open", this.mainHeader.dataset.open != "true");
    this.updateToggleIcon();
  }

  // TODO : XSS
  updateToggleIcon() {
    if (this.mainHeader.dataset.open === "true") {
      this.toggleMainHeaderBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>';
    } else {
      this.toggleMainHeaderBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>';
    }
  }
}
