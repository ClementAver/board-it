class Pagination extends HTMLElement {
  _currentInput = document.createElement("input");
  _firstButton = document.createElement("button");
  _lastButton = document.createElement("button");
  _maximumSpan = document.createElement("span");
  _nextButton = document.createElement("button");
  _page = 999;
  _maxNumber = 999;
  _previousButton = document.createElement("button");

  _chevron = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`;
  _chevronFirst = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-first-icon lucide-chevron-first"><path d="m17 18-6-6 6-6"/><path d="M7 6v12"/></svg>`;

  constructor({ page } = {}) {
    super();

    this.page = page ?? this.page;

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
    this.currentInput.value = this.page;
    this.currentInput.max = 999;
    this.currentInput.min = 1;
    this.currentInput.step = 1;

    this.maximumSpan.textContent = `/\u00a0${this.maxNumber}`;

    this.appendChild(this.firstButton);
    this.appendChild(this.previousButton);
    pageInfosP.appendChild(this.currentInput);
    pageInfosP.appendChild(this.maximumSpan);
    this.appendChild(pageInfosP);

    this.appendChild(this.nextButton);
    this.appendChild(this.lastButton);
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

  get maxNumber() {
    return this._maxNumber;
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
    this._page = page;
  }

  set maxNumber(maxNumber) {
    this._maxNumber = maxNumber;
  }

  set previousButton(previousButton) {
    this._previousButton = previousButton;
  }
}

customElements.define("aeee-pagination", Pagination);
