import handleError from "../utilities/handleError.js";

export default class Thumbnail extends HTMLElement {
  _alternate = "";
  _caption = "";
  _checkbox = null;
  _figcaption = document.createElement("figcaption");
  _figure = document.createElement("figure");
  _image = document.createElement("img");
  _isChecked = false;
  _isRounded = false;
  _isSelectable = false;
  _placeholderImage = `${window.location.origin}/assets/pictures/thumbnail_placehoder.png`;
  _source = "";

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
    return this._alternate;
  }

  get caption() {
    return this._caption;
  }

  get checkbox() {
    return this._checkbox;
  }

  get figcaption() {
    return this._figcaption;
  }

  get figure() {
    return this._figure;
  }

  get image() {
    return this._image;
  }

  get isChecked() {
    return this._isChecked;
  }

  get isRounded() {
    return this._isRounded;
  }

  get isSelectable() {
    return this._isSelectable;
  }

  get placeholderImage() {
    return this._placeholderImage;
  }

  get source() {
    return this._source;
  }

  set alternate(alternate) {
    if (this.getAttribute("data-alternate") !== alternate) {
      this.setAttribute("data-alternate", alternate);
      return;
    }

    this._alternate = alternate;
    this.image.alt = alternate;
  }

  set caption(caption) {
    if (this.getAttribute("data-caption") !== caption) {
      this.setAttribute("data-caption", caption);
      return;
    }

    this._caption = caption;
    this.figcaption.textContent = caption;
  }

  set checkbox(checkbox) {
    this._checkbox = checkbox;
  }

  set figcaption(figcaption) {
    this._figcaption = figcaption;
  }

  set figure(figure) {
    this._figure = figure;
  }

  set image(image) {
    this._image = image;
  }

  set isChecked(isChecked) {
    if (this.getAttribute("data-is-checked") !== isChecked.toString()) {
      this.setAttribute("data-is-checked", isChecked.toString());
      return;
    }

    this._isChecked = isChecked;

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

    this._isRounded = isRounded;

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

    this._isSelectable = isSelectable;
  }

  set placeholderImage(placeholderImage) {
    this._placeholderImage = placeholderImage;
  }

  set source(source) {
    if (this.getAttribute("data-source") !== source) {
      this.setAttribute("data-source", source);
      return;
    }

    this._internals.states.add("loading");
    this._source = source;
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
