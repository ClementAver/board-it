export default class Svg extends HTMLElement {
  #classes = "";
  #fill = "none";
  #height = "24";
  #href = "";
  #stroke = "currentColor";
  #strokeLinecap = "round";
  #strokeLinejoin = "round";
  #strokeWidth = "2";
  #svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  #use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  #width = "24";

  constructor({
    classes,
    fill,
    height,
    href,
    stroke,
    strokeLinecap,
    strokeLinejoin,
    strokeWidth,
    svg,
    use,
    width,
  } = {}) {
    super();

    this.style.display = "contents";

    this.classes = classes ?? this.dataset.classes ?? this.classes;
    this.fill = fill ?? this.dataset.fill ?? this.fill;
    this.height = height ?? this.dataset.height ?? this.height;
    this.href = href ?? this.dataset.href ?? this.href;
    this.stroke = stroke ?? this.dataset.stroke ?? this.stroke;
    this.strokeLinecap =
      strokeLinecap ?? this.dataset.strokeLinecap ?? this.strokeLinecap;
    this.strokeLinejoin =
      strokeLinejoin ?? this.dataset.strokeLinejoin ?? this.strokeLinejoin;
    this.strokeWidth =
      strokeWidth ?? this.dataset.strokeWidth ?? this.strokeWidth;
    this.svg = svg ?? this.svg;
    this.use = use ?? this.use;
    this.width = width ?? this.dataset.width ?? this.width;
  }

  connectedCallback() {
    this.svg.setAttribute("class", this.classes);
    this.svg.setAttribute("fill", this.fill);
    this.svg.setAttribute("height", this.height);
    this.use.setAttribute("href", this.href);
    this.svg.setAttribute("stroke", this.stroke);
    this.svg.setAttribute("stroke-linecap", this.strokeLinecap);
    this.svg.setAttribute("stroke-linejoin", this.strokeLinejoin);
    this.svg.setAttribute("stroke-width", this.strokeWidth);
    this.svg.setAttribute("width", this.width);

    this.svg.appendChild(this.use);
    this.appendChild(this.svg);
  }

  get classes() {
    return this.#classes;
  }

  get fill() {
    return this.#fill;
  }

  get height() {
    return this.#height;
  }

  get href() {
    return this.#href;
  }

  get stroke() {
    return this.#stroke;
  }

  get strokeLinecap() {
    return this.#strokeLinecap;
  }

  get strokeLinejoin() {
    return this.#strokeLinejoin;
  }

  get strokeWidth() {
    return this.#strokeWidth;
  }

  get svg() {
    return this.#svg;
  }

  get use() {
    return this.#use;
  }

  get width() {
    return this.#width;
  }

  set classes(classes) {
    if (this.dataset.classes != classes) {
      this.dataset.classes = classes;
      return;
    }

    this.#classes = classes;
    this.#svg.setAttribute("class", classes);
  }

  set fill(fill) {
    if (this.dataset.fill != fill) {
      this.dataset.fill = fill;
      return;
    }

    this.#fill = fill;
    this.#svg.setAttribute("fill", this.fill);
  }

  set height(height) {
    if (this.dataset.height != height) {
      this.dataset.height = height;
      return;
    }

    this.#height = height;
    this.#svg.setAttribute("height", this.height);
  }

  set href(href) {
    if (this.dataset.href != href) {
      this.dataset.href = href;
      return;
    }

    this.#href = href;
    this.use.setAttribute("href", href);
  }

  set stroke(stroke) {
    if (this.dataset.stroke != stroke) {
      this.dataset.stroke = stroke;
      return;
    }

    this.#stroke = stroke;
    this.#svg.setAttribute("stroke", this.stroke);
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

  set strokeWidth(strokeWidth) {
    if (this.dataset.strokeWidth != strokeWidth) {
      this.dataset.strokeWidth = strokeWidth;
      return;
    }

    this.#strokeWidth = strokeWidth;
    this.#svg.setAttribute("stroke-width", strokeWidth);
  }

  set svg(svg) {
    this.#svg = svg;
  }

  set use(use) {
    this.#use = use;
  }

  set width(width) {
    if (this.dataset.width != width) {
      this.dataset.width = width;
      return;
    }

    this.#width = width;
    this.#svg.setAttribute("width", this.width);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "data-classes":
        this.classes = newValue;
        break;
      case "data-fill":
        this.fill = newValue;
        break;
      case "data-height":
        this.height = newValue;
        break;
      case "data-href":
        this.href = newValue;
        break;
      case "data-stroke":
        this.stroke = newValue;
        break;
      case "data-stroke-linecap":
        this.strokeLinecap = newValue;
        break;
      case "data-stroke-linejoin":
        this.strokeLinejoin = newValue;
        break;
      case "data-stroke-width":
        this.strokeWidth = newValue;
        break;
      case "data-width":
        this.width = newValue;
        break;
      default:
        break;
    }
  }

  static observedAttributes = [
    "data-classes",
    "data-fill",
    "data-height",
    "data-href",
    "data-stroke",
    "data-stroke-linecap",
    "data-stroke-linejoin",
    "data-stroke-width",
    "data-width",
  ];
}

customElements.define("aeee-svg", Svg);
