import handleError from "../utils/handleError.js";

class Thumbnail extends HTMLElement {
  _article = document.createElement("article");
  _figure = document.createElement("figure");
  _image = document.createElement("img");
  _caption = document.createElement("figcaption");
  _loader = document.createElement("div");
  _shadow = this.attachShadow({ mode: "open" });

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

    const style = document.createElement("style");
    style.textContent = this.style;

    this._article.appendChild(this._figure);
    this._article.appendChild(this._loader);
    this._shadow.appendChild(this._article);
    this._shadow.appendChild(style);
  }

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

  style = `
  article {
    background-color: var(--secondary);
    border-radius: var(--spacing-sm);
    height: 100%;
    max-height: 150px;
    max-width: 150px;
    overflow: hidden;
    width: 100%;
  }

  figure {
    display: none;
    margin: 0;
    height: 100%;
    width: 100%;
    grid-template-areas: "main"
  }

  img {
    grid-area: main;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  figcaption {
    background-color: var(--accent-beta);
    border-radius: var(--spacing-sm);
    box-shadow: var(--shadow-std);  
    box-sizing: border-box;
    color: var(--primary);
    grid-area: main;
    margin: auto 1rem 1rem auto;
    max-width: calc(100% - 2rem);
    overflow: hidden;
    padding-inline: var(--spacing-sm);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :has(.loader) {
    position: relative;
  }

  .loader {
    background-color: var(--secondary);
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, var(--secondary), var(--secondary-darker), var(--secondary));
    background-size: 200% 100%;
    animation: loading-background 2s infinite;
  }

  .loader.error {
    animation: unset;
    background: unset;
  }
  .loader.error::after {
    background-color: var(--invalid);
    border-radius: var(--spacing-sm);
    box-shadow: var(--shadow-std);  
    box-sizing: border-box;
    color: var(--text-swath);
    content: "Erreur";
    display: inline-block;
    height: fit-content;
    left: 50%;
    max-width: calc(100% - 2rem);
    overflow: hidden;
    padding-inline: var(--spacing-sm);
    position: absolute;
    text-overflow: ellipsis;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    white-space: nowrap;
  }

  @keyframes loading-background {
    0% {
      background-position: 0% 200%;
    }
    100% {
      background-position: -200% 0%;
    }
  }
  `;
}

customElements.define("aeee-thumbnail", Thumbnail);
