import Camera from "./Camera.js";
import Selector from "./Selector.js";
import FrameAll from "../classes/FrameAll.js";
import ToolSelector from "./ToolSelector.js";
import Pan from "../classes/Pan.js";
import Zoom from "../classes/Zoom.js";

export class Toolbox {
  #handled = null;
  #previous = null;
  #tools = {};
  #widgets = {};

  constructor({ handled, tools, widgets } = {}) {
    this.handled = handled ?? this.#handled;
    this.tools = tools ?? this.#tools;
    this.widgets = widgets ?? this.#widgets;

    const camera = new Camera();
    const zoom = new Zoom();

    /* ⇊ Camera Proxy ⇊ */
    const cameraProxyTarget = camera;
    const cameraProxyHandler = {
      /**
       * We don't use `Reflect` in order to access to the Camera instance itself because we need read/write permissions for privates properties.
       * `return Reflect.get(...arguments);`
       */
      get(target, prop, receiver) {
        if (prop === "scale") zoom.zoomIndicator.value = camera.zoom;
        const value = target[prop];
        if (value instanceof Function) {
          return function (...args) {
            return value.apply(this === receiver ? target : this, args);
          };
        }
        return value;
      },
      set(obj, prop, value) {
        obj[prop] = value;
        return true;
      },
    };
    const cameraProxy = new Proxy(cameraProxyTarget, cameraProxyHandler);
    /* ⇈ Camera Proxy ⇈ */

    this.tools = { camera: cameraProxy, selector: new Selector() };

    this.widgets = { toolSelector: new ToolSelector() };
    this.widgets = { pan: new Pan() };
    this.widgets = { zoom };
    this.widgets = { frameAll: new FrameAll() };
  }

  get handled() {
    return this.#handled;
  }

  get previous() {
    return this.#previous;
  }

  get tools() {
    return this.#tools;
  }

  get widgets() {
    return this.#widgets;
  }

  set handled(handled) {
    this.previous = this.handled;
    this.#handled = handled;
    if (this.handled) this.emit();
  }

  set previous(previous) {
    this.#previous = previous;
  }

  set tools(tools) {
    this.#tools = { ...this.tools, ...tools };
  }

  set widgets(widgets) {
    this.#widgets = { ...this.widgets, ...widgets };
  }

  emit() {
    window.dispatchEvent(
      new CustomEvent("grab", {
        detail: { cursor: this.handled.cursor, label: this.handled.label },
      }),
    );
  }

  grab(label, { skipPrevious = false } = {}) {
    const requested = this.tools[`${label}`];
    if (!requested) return;

    // Already handled:
    if (this.handled === requested) {
      if (!skipPrevious) this.previous = this.handled;
      this.emit();
      return this.handled;
    }

    if (requested.label !== "camera") this.tools.camera.isLocked = false;

    this.handled = requested;
    this.emit();
    return this.handled;
  }

  grabPrevious() {
    if (!this.previous) return;
    this.handled = this.previous;
    this.emit();
    return this.handled;
  }

  isHandled(label) {
    return this.handled?.label === label;
  }
}

export default new Toolbox();
