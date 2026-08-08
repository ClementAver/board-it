import handleError from "../utilities/handleError.js";

export default class Thumbnail extends HTMLElement {
  #alternate = "";
  #caption = "";
  #checkbox = null;
  #figcaption = null;
  #figure = null;
  #image = null;
  #isChecked = false;
  #isRounded = false;
  #isSelectable = false;
  #placeholderImage = `${window.location.origin}/assets/pictures/thumbnail_placehoder.png`;
  #source = "";

  constructor({
    source,
    alternate,
    caption,
    isChecked,
    isRounded,
    isSelectable,
  } = {}) {
    super();

    this._internals = this.attachInternals();
    this.setAttribute("role", "article");

    this.setupDOM({
      source,
      alternate,
      caption,
      isChecked,
      isRounded,
      isSelectable,
    });
    this.setupEvents();
  }

  get alternate() {
    return this.#alternate;
  }

  get caption() {
    return this.#caption;
  }

  get checkbox() {
    return this.#checkbox;
  }

  get figcaption() {
    return this.#figcaption;
  }

  get figure() {
    return this.#figure;
  }

  get image() {
    return this.#image;
  }

  get isChecked() {
    return this.#isChecked;
  }

  get isRounded() {
    return this.#isRounded;
  }

  get isSelectable() {
    return this.#isSelectable;
  }

  get placeholderImage() {
    return this.#placeholderImage;
  }

  get source() {
    return this.#source;
  }

  set alternate(alternate) {
    if (this.dataset.alternate !== alternate) {
      this.dataset.alternate = alternate;
      return;
    }
    this.#alternate = alternate;
    this.image.alt = alternate;
  }

  set caption(caption) {
    if (this.dataset.caption !== caption) {
      this.dataset.caption = caption;
      return;
    }
    this.#caption = caption;
    this.figcaption.textContent = caption;
  }

  set checkbox(checkbox) {
    this.#checkbox = checkbox;
  }

  set figcaption(figcaption) {
    this.#figcaption = figcaption;
  }

  set figure(figure) {
    this.#figure = figure;
  }

  set image(image) {
    this.#image = image;
  }

  set isChecked(isChecked) {
    if (this.dataset.isChecked !== isChecked.toString()) {
      this.dataset.isChecked = isChecked.toString();
      return;
    }

    this.#isChecked = isChecked;

    if (isChecked) {
      this.checkbox.checked = true;
      this._internals.states.add("checked");
    } else {
      this.checkbox.checked = false;
      this._internals.states.delete("checked");
    }
  }

  set isRounded(isRounded) {
    if (this.dataset.isRounded !== isRounded.toString()) {
      this.dataset.isRounded = isRounded.toString();
      return;
    }

    this.#isRounded = isRounded;

    if (isRounded) {
      this._internals.states.add("rounded");
    } else {
      this._internals.states.delete("rounded");
    }
  }

  set isSelectable(isSelectable) {
    if (this.dataset.isSelectable !== isSelectable.toString()) {
      this.dataset.isSelectable = isSelectable.toString();
      return;
    }

    this.#isSelectable = isSelectable;
  }

  set placeholderImage(placeholderImage) {
    this.#placeholderImage = placeholderImage;
  }

  set source(source) {
    if (this.dataset.source !== source) {
      this.dataset.source = source;
      return;
    }

    this._internals.states.add("loading");
    this.#source = source;
    this.image.src = source;
    if (this.checkbox) this.checkbox.value = this.source;
  }

  setupDOM({
    source,
    alternate,
    caption,
    isChecked,
    isRounded,
    isSelectable,
  } = {}) {
    this.figure =
      this.querySelector("figure") ?? document.createElement("figure");
    this.figure.classList.add("glint");
    this.figcaption =
      this.querySelector("figcaption") ?? document.createElement("figcaption");
    this.image = this.querySelector("img") ?? document.createElement("img");
    this.image.loading = "lazy";
    if (!this.figure.contains(this.image)) this.figure.appendChild(this.image);
    if (!this.figure.contains(this.figcaption))
      this.figure.appendChild(this.figcaption);
    if (!this.contains(this.figure)) this.appendChild(this.figure);
    this.source = source ?? this.dataset.source ?? this.source;
    this.alternate = alternate ?? this.dataset.alternate ?? this.alternate;
    this.caption = caption ?? this.dataset.caption ?? this.caption;
    this.isRounded =
      isRounded ?? this.dataset.isRounded === "true" ?? this.isRounded;
    this.isSelectable =
      isSelectable ?? this.dataset.isSelectable === "true" ?? this.isSelectable;

    if (this.isSelectable) {
      this.checkbox =
        this.querySelector("input") ?? document.createElement("input");
      this.checkbox.type = "checkbox";
      this.checkbox.name = "thumbnail";
      this.checkbox.classList.add("sr-only");
      this.checkbox.value = this.source;
      if (this.checkbox && !this.contains(this.checkbox))
        this.appendChild(this.checkbox);
      this.isChecked =
        isChecked ?? this.dataset.isChecked === "true" ?? this.isChecked;
    }
  }

  setupEvents() {
    this.image.onload = () => {
      this._internals.states.delete("loading");
      if (this.source !== this.placeholderImage) {
        this._internals.states.delete("error");
      }
    };
    this.image.onerror = (error) => {
      this._internals.states.delete("loading");
      this._internals.states.add("error");
      handleError({
        text: `Une Erreur est survenue lors du chargement d'une image.`,
        error,
      });
      if (this.source !== this.placeholderImage) {
        this.source = this.placeholderImage;
      }
    };

    if (this.checkbox) {
      this.addEventListener("click", this.toggleChecked.bind(this));
    }
  }

  toggleChecked() {
    if (this.isSelectable) this.isChecked = !this.isChecked;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "data-alternate":
        this.alternate = newValue;
        break;
      case "data-caption":
        this.caption = newValue;
        break;
      case "data-is-checked":
        this.isChecked = newValue.toString() === "true";
        break;
      case "data-is-rounded":
        this.isRounded = newValue.toString() === "true";
        break;
      case "data-is-selectable":
        this.isSelectable = newValue.toString() === "true";
        break;
      case "data-source":
        this.source = newValue;
        break;
      default:
        break;
    }
  }

  static observedAttributes = [
    "data-alternate",
    "data-caption",
    "data-is-checked",
    "data-is-rounded",
    "data-is-selectable",
    "data-source",
  ];
}

customElements.define("aeee-thumbnail", Thumbnail);
