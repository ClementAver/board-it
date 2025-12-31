import handleError from "../utilities/handleError.js";

// TODO: https://web.dev/articles/custom-elements-best-practices?hl=fr
class Thumbnail extends HTMLElement {
  _article = document.createElement("article");
  _figure = document.createElement("figure");
  _image = document.createElement("img");
  _caption = null;
  _loader = document.createElement("div");

  constructor() {
    super();

    this.classList.add("thumbnail");

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
    this._figure.appendChild(this._image);

    const caption = this.getAttribute("caption");
    if (this.getAttribute("rounded")) {
      this._article.classList.add("rounded-full");
    } else if (caption) {
      this._caption = document.createElement("figcaption");
      this.setCaption(caption);
      this._figure.appendChild(this._caption);
    }

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
    if (this._caption)
      this._caption.textContent = caption ?? this.getAttribute("caption") ?? "";
  }

  setSource(source) {
    this._image.src = source ?? this.getAttribute("src") ?? "";
  }
}

customElements.define("aeee-thumbnail", Thumbnail);
