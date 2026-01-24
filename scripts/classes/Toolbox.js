import Camera from "./Camera.js";
import Selector from "./Selector.js";
import FrameAll from "../classes/FrameAll.js";
import ToolSelector from "./ToolSelector.js";
import Pan from "../classes/Pan.js";
import Zoom from "../classes/Zoom.js";

export class Toolbox {
  _handled = null;
  _previous = null;
  _tools = {};
  _widgets = {};

  constructor({ handled, tools, widgets } = {}) {
    this.handled = handled ?? this._handled;
    this.tools = tools ?? this._tools;
    this.widgets = widgets ?? this._widgets;

    const camera = new Camera();
    const zoom = new Zoom();

    /* ⇊ Camera Proxy ⇊ */
    const cameraProxyTarget = camera;
    const cameraProxyHandler = {
      get(_, prop) {
        if (prop === "scale") zoom.zoomIndicator.value = camera.zoom;

        return Reflect.get(...arguments);
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
    return this._handled;
  }

  get previous() {
    return this._previous;
  }

  get tools() {
    return this._tools;
  }

  get widgets() {
    return this._widgets;
  }

  set handled(handled) {
    this.previous = this.handled;
    this._handled = handled;
    if (this.handled) this.emit();
  }

  set previous(previous) {
    this._previous = previous;
  }

  set tools(tools) {
    this._tools = { ...this.tools, ...tools };
  }

  set widgets(widgets) {
    this._widgets = { ...this.widgets, ...widgets };
  }

  emit() {
    window.dispatchEvent(
      new CustomEvent("grab", {
        detail: { cursor: this.handled.cursor, label: this.handled.label },
      })
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
