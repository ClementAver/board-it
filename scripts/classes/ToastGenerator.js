import px from "../utils/px.js";

export class ToastGenerator {
  _delay = 5000;
  _gap = 8;
  _offset = 16;
  _position = "center";
  _toasts = [];

  constructor({ delay, gap, offset, position, toasts } = {}) {
    this.delay = delay ?? this.delay;
    this.gap = gap ?? this.gap;
    this.offset = offset ?? this.offset;
    this.position = position ?? this.position;
    this.toasts = toasts ?? this.toasts;
  }

  get delay() {
    return this._delay;
  }

  get gap() {
    return this._gap;
  }

  get offset() {
    return this._offset;
  }

  get position() {
    return this._position;
  }

  get toasts() {
    return this._toasts;
  }

  set delay(delay) {
    this._delay = delay;
  }

  set gap(gap) {
    this._gap = gap;
  }

  set offset(offset) {
    this._offset = offset;
  }

  set position(position) {
    this._position = position;
  }

  set toasts(toasts) {
    this._toasts = toasts;
  }

  generate(text) {
    const toast = document.createElement("article");
    toast.classList.add("toast");
    toast.classList.add(`${this.position}`);
    toast.closedBy = "closerequest";
    toast.id = this.toasts.length;
    toast.popover = "manual";
    toast.style.display = "flex";
    toast.textContent = text;

    this.toasts.unshift(toast);
    document.body.appendChild(toast);

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
}

export default {
  center: new ToastGenerator({ position: "center" }),
  right: new ToastGenerator({ position: "right", offset: 64 }),
};
