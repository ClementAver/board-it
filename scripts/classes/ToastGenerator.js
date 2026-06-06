import px from "../utilities/px.js";

export class ToastGenerator {
  #delay = 5000;
  #gap = 8;
  #offset = 16;
  #position = "center";
  #toasts = [];

  constructor({ delay, gap, offset, position, toasts } = {}) {
    this.delay = delay ?? this.delay;
    this.gap = gap ?? this.gap;
    this.offset = offset ?? this.offset;
    this.position = position ?? this.position;
    this.toasts = toasts ?? this.toasts;
  }

  get delay() {
    return this.#delay;
  }

  get gap() {
    return this.#gap;
  }

  get offset() {
    return this.#offset;
  }

  get position() {
    return this.#position;
  }

  get toasts() {
    return this.#toasts;
  }

  set delay(delay) {
    this.#delay = delay;
  }

  set gap(gap) {
    this.#gap = gap;
  }

  set offset(offset) {
    this.#offset = offset;
  }

  set position(position) {
    this.#position = position;
  }

  set toasts(toasts) {
    this.#toasts = toasts;
  }

  generate(text, { type = "" } = {}) {
    const toast = document.createElement("article");
    toast.classList.add("toast");
    toast.classList.add(`${this.position}`);
    toast.closedBy = "closerequest";
    toast.popover = "manual";
    toast.style.display = "flex";

    const paragraph = document.createElement("p");
    const content = document.createElement("span");
    content.textContent = text;

    if (type) {
      if (!["check", "cross"].includes(type)) return;

      const leftSign = document.createElement("span");
      leftSign.classList.add("signed");
      this.appendGlyph(leftSign, type);
      paragraph.appendChild(leftSign);
    }

    paragraph.appendChild(content);
    toast.appendChild(paragraph);
    document.body.appendChild(toast);

    this.toasts.unshift(toast);

    this.placeToasts();

    const removeOnClick = () => this.removeToast(toast, { isClicked: true });
    toast.addEventListener("click", removeOnClick);

    setTimeout(() => {
      toast.removeEventListener("click", removeOnClick);
      this.removeToast(toast);
    }, this.delay);
  }

  placeToasts() {
    let offset = this.offset;

    for (let i = 0; i < this.toasts.length; i++) {
      this.toasts[i].style.bottom = px(offset);
      offset += this.toasts[i].offsetHeight + this.gap;
    }
  }

  removeToast(toast, { isClicked = false } = {}) {
    const toastIndex = this.toasts.findIndex((t) => t === toast);
    this.toasts.splice(toastIndex, 1);

    toast.classList.add(
      `${isClicked ? "transition-out-click" : "transition-out"}`
    );

    setTimeout(() => {
      toast.remove();
    }, 500);

    this.placeToasts();
  }

  appendGlyph(element, type) {
    let glyph = "?";
    switch (type) {
      case "check":
        element.classList.add("check");
        element.textContent = "✔";
        break;
      case "cross":
        element.classList.add("cross");
        element.textContent = "✘";
        break;
      default:
        break;
    }

    return glyph;
  }
}

export default {
  center: new ToastGenerator({ position: "center" }),
  right: new ToastGenerator({ position: "right", offset: 64 }),
};
