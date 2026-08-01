export default class Svg extends HTMLElement {
  #use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  #svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  #href = "";
  #width = "24";
  #height = "24";
  #fill = "none";
  #stroke = "currentColor";
  #strokeWidth = "2";
  #strokeLinecap = "round";
  #strokeLinejoin = "round";

  constructor({
    use,
    svg,
    href,
    width,
    height,
    fill,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
  } = {}) {
    super();

    this.style.display = "contents";
    this.use = use ?? this.use;
    this.svg = svg ?? this.svg;
    this.href = href ?? this.dataset.href ?? this.href;
    this.width = width ?? this.dataset.width ?? this.width;
    this.height = height ?? this.dataset.height ?? this.height;
    this.fill = fill ?? this.dataset.fill ?? this.fill;
    this.stroke = stroke ?? this.dataset.stroke ?? this.stroke;
    this.strokeWidth =
      strokeWidth ?? this.dataset.strokeWidth ?? this.strokeWidth;
    this.strokeLinecap =
      strokeLinecap ?? this.dataset.strokeLinecap ?? this.strokeLinecap;
    this.strokeLinejoin =
      strokeLinejoin ?? this.dataset.strokeLinejoin ?? this.strokeLinejoin;
  }

  connectedCallback() {
    this.use.setAttribute("href", this.href);
    this.svg.setAttribute("width", this.width);
    this.svg.setAttribute("height", this.height);
    this.svg.setAttribute("fill", this.fill);
    this.svg.setAttribute("stroke", this.stroke);
    this.svg.setAttribute("stroke-width", this.strokeWidth);
    this.svg.setAttribute("stroke-linecap", this.strokeLinecap);
    this.svg.setAttribute("stroke-linejoin", this.strokeLinejoin);

    this.svg.appendChild(this.use);
    this.appendChild(this.svg);
  }

  get use() {
    return this.#use;
  }

  get svg() {
    return this.#svg;
  }

  get href() {
    return this.#href;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get fill() {
    return this.#fill;
  }

  get stroke() {
    return this.#stroke;
  }

  get strokeWidth() {
    return this.#strokeWidth;
  }

  get strokeLinecap() {
    return this.#strokeLinecap;
  }

  get strokeLinejoin() {
    return this.#strokeLinejoin;
  }

  set use(use) {
    this.#use = use;
  }

  set svg(svg) {
    this.#svg = svg;
  }

  set href(href) {
    if (this.dataset.href != href) {
      this.dataset.href = href;
      return;
    }

    this.#href = href;
    this.use.setAttribute("href", href);
  }

  set width(width) {
    if (this.dataset.width != width) {
      this.dataset.width = width;
      return;
    }

    this.#width = width;
    this.#svg.setAttribute("width", this.width);
  }

  set height(height) {
    if (this.dataset.height != height) {
      this.dataset.height = height;
      return;
    }

    this.#height = height;
    this.#svg.setAttribute("height", this.height);
  }

  set fill(fill) {
    if (this.dataset.fill != fill) {
      this.dataset.fill = fill;
      return;
    }

    this.#fill = fill;
    this.#svg.setAttribute("fill", this.fill);
  }

  set stroke(stroke) {
    if (this.dataset.stroke != stroke) {
      this.dataset.stroke = stroke;
      return;
    }

    this.#stroke = stroke;
    this.#svg.setAttribute("stroke", this.stroke);
  }

  set strokeWidth(strokeWidth) {
    if (this.dataset.strokeWidth != strokeWidth) {
      this.dataset.strokeWidth = strokeWidth;
      return;
    }

    this.#strokeWidth = strokeWidth;
    this.#svg.setAttribute("stroke-width", strokeWidth);
  }

  set strokeLinecap(strokeLinecap) {
    if (this.dataset.strokeLinecap != strokeLinecap) {
      this.dataset.strokeLinecap = strokeLinecap;
      return;
    }

    this.#strokeLinecap = strokeLinecap;
    this.#svg.setAttribute("stroke-linecap", strokeLinecap);
  }

  set strokeLinejoin(strokeLinejoin) {
    if (this.dataset.strokeLinejoin != strokeLinejoin) {
      this.dataset.strokeLinejoin = strokeLinejoin;
      return;
    }

    this.#strokeLinejoin = strokeLinejoin;
    this.#svg.setAttribute("stroke-linejoin", strokeLinejoin);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "data-href":
        this.href = newValue;
        break;
      case "data-width":
        this.width = newValue;
        break;
      case "data-height":
        this.height = newValue;
        break;
      case "data-fill":
        this.fill = newValue;
        break;
      case "data-stroke":
        this.stroke = newValue;
        break;
      case "data-stroke-width":
        this.strokeWidth = newValue;
        break;
      case "data-stroke-linecap":
        this.strokeLinecap = newValue;
        break;
      case "data-stroke-linejoin":
        this.strokeLinejoin = newValue;
        break;
      default:
        break;
    }
  }

  static observedAttributes = [
    "data-href",
    "data-width",
    "data-height",
    "data-fill",
    "data-stroke",
    "data-stroke-width",
    "data-stroke-linecap",
    "data-stroke-linejoin",
  ];
}

customElements.define("aeee-svg", Svg);
