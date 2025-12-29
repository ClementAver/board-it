import handleError from "../utils/handleError.js";

class Thumbnail extends HTMLElement {
  _article = document.createElement("article");
  _figure = document.createElement("figure");
  _image = document.createElement("img");
  _caption = document.createElement("figcaption");
  _loader = document.createElement("div");

  constructor() {
    super();

    this._loader.classList.add("loader");

    this._image.onload = () => {
      this._figure.style.display = "grid";
      this._loader.style.display = "none";
    };
    this._image.onerror = (error) => {
      this._loader.classList.add("error");
      handleError({
        text: `Une Erreur est survenue lors du chargement d'une image.`,
        error,
      });
    };
    this.setSource();
    this.setAlternateText();
    this._figure.append(this._image);

    this.setCaption();
    this._figure.append(this._caption);

    this.classList.add("thumbnail");

    this._article.appendChild(this._figure);
    this._article.appendChild(this._loader);

    this.appendChild(this._article);
  }

  static observedAttributes = ["alt", "caption", "src"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue === oldValue) return;

    switch (name) {
      case "alt":
        this.setAlternateText(newValue);
        break;
      case "caption":
        this.setCaption(newValue);
        break;
      case "src":
        this.setSource(newValue);
        break;
      default:
        break;
    }
  }
  HTMLImage;
  setAlternateText(alternateText) {
    this._image.alt = alternateText ?? this.getAttribute("alt") ?? "";
  }

  setCaption(caption) {
    this._caption.textContent = caption ?? this.getAttribute("caption") ?? "";
  }

  setSource(source) {
    this._image.src = source ?? this.getAttribute("src") ?? "";
  }
}

customElements.define("aeee-thumbnail", Thumbnail);
