import handleError from "../utilities/handleError.js";

// TODO : Add a rounded way for js.
class Thumbnail extends HTMLElement {
  _alternate = "";
  _article = document.createElement("article");
  _caption = "";
  _figcaption = null;
  _figure = document.createElement("figure");
  _image = document.createElement("img");
  _loader = document.createElement("div");
  _source = "";

  constructor({ src, alt, caption } = {}) {
    super();

    this.alternate = alt ?? this.getAttribute("alt") ?? this.alterante;
    this.caption = caption ?? this.getAttribute("caption") ?? this.caption;
    this.source = src ?? this.getAttribute("src") ?? this.source;

    this._loader.classList.add("loader"); // TODO : replace by an attribute.

    this.image.loading = "lazy";
    this.image.onload = () => {
      this.loader.style.display = "none";
      this.loader.classList.remove("error");
    };
    this.image.onerror = (error) => {
      this.loader.classList.add("error");
      handleError({
        text: `Une Erreur est survenue lors du chargement d'une image.`,
        error,
      });
    };

    this.figure.appendChild(this.image);
    this.article.appendChild(this.figure);
    this.article.appendChild(this.loader);
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

  get loader() {
    return this._loader;
  }

  get source() {
    return this._source;
  }

  set alternate(alternate) {
    if (this.getAttribute("alt") !== alternate) {
      this.setAttribute("alt", alternate);
      return;
    }

    this._alternate = alternate;
    this.image.alt = alternate;
  }

  set article(article) {
    this._article = article;
  }

  set caption(caption) {
    if (this.getAttribute("caption") !== caption) {
      this.setAttribute("caption", caption);
      return;
    }

    this._caption = caption;

    if (!this.figcaption) {
      this.figcaption = document.createElement("figcaption");
      this.figure.appendChild(this.figcaption);
    }

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

  set loader(loader) {
    this._loader = loader;
  }

  set source(source) {
    if (this.getAttribute("src") !== source) {
      this.setAttribute("src", source);
      return;
    }

    this.loader.style.display = "block";

    this._source = source;
    this.image.src = source;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "alt":
        this.alternate = newValue;
        break;
      case "caption":
        this.caption = newValue;
        break;
      case "src":
        this.source = newValue;
        break;
      default:
        break;
    }
  }

  static observedAttributes = ["alt", "caption", "src"];
}

customElements.define("aeee-thumbnail", Thumbnail);
