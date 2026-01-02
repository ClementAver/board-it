import handleError from "../utilities/handleError.js";

class Thumbnail extends HTMLElement {
  _alternate = "";
  _article = document.createElement("article");
  _caption = "";
  _figcaption = document.createElement("figcaption");
  _figure = document.createElement("figure");
  _image = document.createElement("img");
  _isRounded = false;
  _placeholderImage = `${window.location.origin}/assets/pictures/thumbnail_placehoder.png`;
  _source = "";

  constructor({ source, alternate, caption, isRounded } = {}) {
    super();

    this._internals = this.attachInternals();

    this.alternate =
      alternate ?? this.getAttribute("data-alternate") ?? this.alternate;
    this.caption = caption ?? this.getAttribute("data-caption") ?? this.caption;
    this.isRounded =
      isRounded ??
      this.getAttribute("data-is-rounded") === "true" ??
      this.isRounded;
    this.source = source ?? this.getAttribute("data-source") ?? this.source;

    this.image.loading = "lazy";
    this.image.onload = () => {
      this._internals.states.delete("loading");
    };
    this.image.onerror = (error) => {
      this._internals.states.delete("loading");
      handleError({
        text: `Une Erreur est survenue lors du chargement d'une image.`,
        error,
      });

      if (this.source !== this.placeholderImage) {
        this.source = this.placeholderImage;
      }
    };

    this.figure.appendChild(this.image);
    this.figure.appendChild(this.figcaption);
    this.article.appendChild(this.figure);
    this.appendChild(this.article);

    console.dir(this);
  }

  get alternate() {
    return this._alternate;
  }

  get article() {
    return this._article;
  }

  get caption() {
    return this._caption;
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

  get isRounded() {
    return this._isRounded;
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

  set article(article) {
    this._article = article;
  }

  set caption(caption) {
    if (this.getAttribute("data-caption") !== caption) {
      this.setAttribute("data-caption", caption);
      return;
    }

    this._caption = caption;
    this.figcaption.textContent = caption;
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
      case "data-is-rounded":
        this.isRounded = newValue.toString() === "true";
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
    "data-is-rounded",
    "data-source",
  ];
}

customElements.define("aeee-thumbnail", Thumbnail);
