import Tooltip from "./Tooltip.js";
import { debounce } from "../utilities/timing.js";

export default class Pagination extends HTMLElement {
  _currentInput = document.createElement("input");
  _firstButton = document.createElement("button");
  _lastButton = document.createElement("button");
  _maximumSpan = document.createElement("span");
  _nextButton = document.createElement("button");
  _page = 1;
  _maxPage = 999;
  _previousButton = document.createElement("button");

  _chevron = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`;
  _chevronFirst = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-first-icon lucide-chevron-first"><path d="m17 18-6-6 6-6"/><path d="M7 6v12"/></svg>`;

  constructor({ page, maxPage } = {}) {
    super();

    this._internals = this.attachInternals();

    this.page = page ?? this.getAttribute("data-page") ?? this.page;
    this.maxPage = maxPage ?? this.getAttribute("data-max") ?? this.maxPage;

    this.setAttribute("role", "menu");

    this.firstButton.innerHTML = this._chevronFirst;
    this.previousButton.innerHTML = this._chevron;
    this.nextButton.innerHTML = this._chevron;
    this.lastButton.innerHTML = this._chevronFirst;

    this.firstButton.setAttribute("aria-label", "Première page");
    this.previousButton.setAttribute("aria-label", "Page précédente");
    this.nextButton.setAttribute("aria-label", "Page suivante");
    this.lastButton.setAttribute("aria-label", "Dernière page");

    const pageInfosP = document.createElement("p");
    pageInfosP.display = "inline-block";

    this.currentInput.type = "number";
    this.currentInput.min = 1;
    this.currentInput.max = this.maxPage;
    this.currentInput.step = 1;

    this.appendChild(this.firstButton);
    this.appendChild(this.previousButton);
    pageInfosP.appendChild(this.currentInput);
    pageInfosP.appendChild(this.maximumSpan);
    this.appendChild(pageInfosP);

    this.appendChild(this.nextButton);
    this.appendChild(this.lastButton);

    // TODO : Test tooltip, to be removed.
    const tooltip = document.createElement("aeee-tooltip");
    this.appendChild(tooltip);
    tooltip.setAttribute("data-text", "efefz");
  }

  debouncedChange = debounce(this.change.bind(this), 1000);

  connectedCallback() {
    this.firstButton.addEventListener("click", this.first.bind(this));
    this.previousButton.addEventListener("click", this.previous.bind(this));
    this.currentInput.addEventListener("change", this.debouncedChange);
    this.nextButton.addEventListener("click", this.next.bind(this));
    this.lastButton.addEventListener("click", this.last.bind(this));
  }

  disconnectedCallback() {
    this.firstButton.removeEventListener("click", this.first);
    this.previousButton.removeEventListener("click", this.previous);
    this.currentInput.removeEventListener("change", this.debouncedChange);
    this.nextButton.removeEventListener("click", this.next);
    this.lastButton.removeEventListener("click", this.last);
  }

  get currentInput() {
    return this._currentInput;
  }

  get firstButton() {
    return this._firstButton;
  }

  get lastButton() {
    return this._lastButton;
  }

  get maximumSpan() {
    return this._maximumSpan;
  }

  get nextButton() {
    return this._nextButton;
  }

  get page() {
    return this._page;
  }

  get maxPage() {
    return this._maxPage;
  }

  get previousButton() {
    return this._previousButton;
  }

  set currentInput(currentInput) {
    this._currentInput = currentInput;
  }

  set firstButton(firstButton) {
    this._firstButton = firstButton;
  }

  set lastButton(lastButton) {
    this._lastButton = lastButton;
  }

  set maximumSpan(maximumSpan) {
    this._maximumSpan = maximumSpan;
  }

  set nextButton(nextButton) {
    this._nextButton = nextButton;
  }

  set page(page) {
    page = parseInt(page);
    if (this.getAttribute("data-page") != page) {
      this.setAttribute("data-page", page);
      return;
    }

    this._page = page;
    this.updateCurrent();
  }

  set maxPage(maxPage) {
    maxPage = parseInt(maxPage);
    if (this.getAttribute("data-max") != maxPage) {
      this.setAttribute("data-max", maxPage);
      return;
    }

    this._maxPage = maxPage;
    this.updateMax();
  }

  set previousButton(previousButton) {
    this._previousButton = previousButton;
  }

  updateCurrent() {
    this.currentInput.value = this.page;
    this.updateButtonState();
  }

  updateMax() {
    this.currentInput.max = this.maxPage;
    this.maximumSpan.textContent = `/\u00a0${this.maxPage}`;
    this.updateButtonState();
  }

  updateButtonState() {
    if (this.page === this.maxPage) {
      this._internals.states.add("max");
      this.updateButtonsDisabled([this.nextButton, this.lastButton], true);
    } else {
      this._internals.states.delete("max");
      this.updateButtonsDisabled([this.nextButton, this.lastButton], false);
    }

    if (this.page === 1) {
      this._internals.states.add("min");
      this.updateButtonsDisabled([this.firstButton, this.previousButton], true);
    } else {
      this._internals.states.delete("min");
      this.updateButtonsDisabled(
        [this.firstButton, this.previousButton],
        false,
      );
    }
  }

  change(e) {
    this.page = e.target.value;
  }

  first() {
    this.page = 1;
  }

  previous() {
    if (this.page > 1) this.page = --this.page;
  }

  next() {
    if (this.page < this.maxPage) this.page = ++this.page;
  }

  last() {
    this.page = this.maxPage;
  }

  /**
   * @param {HTMLButtonElement} buttons
   * @param {boolean} disabled
   */
  updateButtonsDisabled(buttons, disabled) {
    buttons.forEach((element) => {
      element.disabled = !!disabled;
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "data-page":
        this.page = newValue;
        break;
      case "data-max":
        this.maxPage = newValue;
        break;
      default:
        break;
    }
  }

  static observedAttributes = ["data-page", "data-max"];
}
