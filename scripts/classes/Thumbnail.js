class Thumbnail extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const article = document.createElement("article");
    const figure = document.createElement("figure");
    this.image = document.createElement("img");
    this.legend = document.createElement("legend");

    article.classList.add("aeee-thumbnail");
    this.setSource();
    this.setAlternateText();
    this.setLegend();

    article.appendChild(figure);
    figure.append(this.image);
    figure.append(this.legend);
    shadow.appendChild(article);
  }

  setSource() {
    const src = this.getAttribute("src");
    if (src) {
      this.image.src = src;
    }
  }

  setAlternateText() {
    const alt = this.getAttribute("alt");
    if (alt) {
      this.image.alt = alt;
    }
  }

  setLegend() {
    const legend = this.getAttribute("legend");
    if (legend) {
      this.legend.textContent = legend;
    }
  }
}

customElements.define("aeee-thumbnail", Thumbnail);
