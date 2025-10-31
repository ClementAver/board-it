import Camera from "./Camera.js";
import Selector from "./Selector.js";
import FrameAll from "../classes/FrameAll.js";
import LeftDrawer from "../classes/LeftDrawer.js";
import Pan from "../classes/Pan.js";
import Theme from "../classes/Theme.js";
import Zoom from "../classes/Zoom.js";

class Toolbox {
  _handled = null;
  _previous = null;
  _tools = [new Camera(), new Selector()];
  _widgets = {};

  constructor({ handled, tools, widgets } = {}) {
    this.handled = handled ?? this._handled;
    this.tools = tools ?? this._tools;
    this.widgets = widgets ?? this._widgets;

    this.widgets = { leftDrawer: new LeftDrawer() };
    this.widgets = { theme: new Theme() };
    this.widgets = { pan: new Pan() };
    this.widgets = { zoom: new Zoom() };
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
    this._tools = tools;
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
    if (!label) return;

    // Already handled:
    if (this.handled?.label === label) {
      if (!skipPrevious) this.previous = this.handled;
      this.emit();
      return this.handled;
    }

    // else:
    let matched;

    this.tools.forEach((tool) => {
      if (tool.label === label) matched = tool;
      if (tool.isLocked) tool.isLocked = false;
    });

    if (matched) {
      this.handled = matched;
      this.emit();
      return this.handled;
    }
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

  useSilent(label) {
    if (!label) return;

    const tool = this.tools.find((tool) => tool.label === label);
    if (tool) {
      return tool;
    }
  }
}

export default new Toolbox();
