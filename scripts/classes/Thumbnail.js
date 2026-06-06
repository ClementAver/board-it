import handleError from "../utilities/handleError.js";

export default class Thumbnail extends HTMLElement {
  #alternate = "";
  #caption = "";
  #checkbox = null;
  #figcaption = document.createElement("figcaption");
  #figure = document.createElement("figure");
  #image = document.createElement("img");
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

    this.alternate =
      alternate ?? this.getAttribute("data-alternate") ?? this.alternate;
    this.caption = caption ?? this.getAttribute("data-caption") ?? this.caption;
    this.isChecked =
      isChecked ??
      this.getAttribute("data-is-checked") === "true" ??
      this.isChecked;
    this.isRounded =
      isRounded ??
      this.getAttribute("data-is-rounded") === "true" ??
      this.isRounded;
    this.isSelectable =
      isSelectable ??
      this.getAttribute("data-is-selectable") === "true" ??
      this.isSelectable;
    this.source = source ?? this.getAttribute("data-source") ?? this.source;

    this.setAttribute("role", "article");

    if (this.isSelectable) {
      this.checkbox = document.createElement("input");
      this.checkbox.type = "checkbox";
      this.checkbox.name = "thumbnail";
      this.checkbox.classList.add("sr-only");
      this.checkbox.value = this.source;
    }

    this.image.loading = "lazy";
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

    if (this.checkbox) this.appendChild(this.checkbox);
    this.figure.classList.add("glint");
    this.figure.appendChild(this.image);
    this.figure.appendChild(this.figcaption);
    this.appendChild(this.figure);
  }

  connectedCallback() {
    if (this.checkbox)
      this.addEventListener("click", this.toggleChecked.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.toggleChecked);
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
    if (this.getAttribute("data-alternate") !== alternate) {
      this.setAttribute("data-alternate", alternate);
      return;
    }

    this.#alternate = alternate;
    this.image.alt = alternate;
  }

  set caption(caption) {
    if (this.getAttribute("data-caption") !== caption) {
      this.setAttribute("data-caption", caption);
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
    if (this.getAttribute("data-is-checked") !== isChecked.toString()) {
      this.setAttribute("data-is-checked", isChecked.toString());
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
    if (this.getAttribute("data-is-rounded") !== isRounded.toString()) {
      this.setAttribute("data-is-rounded", isRounded.toString());
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
    if (this.getAttribute("data-is-selectable") !== isSelectable.toString()) {
      this.setAttribute("data-is-selectable", isSelectable.toString());
      return;
    }

    this.#isSelectable = isSelectable;
  }

  set placeholderImage(placeholderImage) {
    this.#placeholderImage = placeholderImage;
  }

  set source(source) {
    if (this.getAttribute("data-source") !== source) {
      this.setAttribute("data-source", source);
      return;
    }

    this._internals.states.add("loading");
    this.#source = source;
    this.image.src = source;
    if (this.checkbox) this.checkbox.value = this.source;
  }

  toggleChecked() {
    this.isChecked = !this.isChecked;
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
