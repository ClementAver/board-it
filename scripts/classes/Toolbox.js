import Camera from "./Camera.js";
import Selector from "./Selector.js";
import Tool from "./Tool.js";

class Toolbox {
  _handled = null;
  _previous = null;
  _tools = [new Camera(), new Selector()];

  constructor({ handled, tools } = {}) {
    this.handled = handled ?? this._handled;
    this.tools = tools ?? this._tools;
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

  set handled(handled) {
    this.previous = this.handled;
    this._handled = handled;
  }

  set previous(previous) {
    this._previous = previous;
  }

  set tools(tools) {
    this._tools = tools;
  }

  grab(label, emit = false) {
    // Already handled:
    if (this.handled?.label === label) {
      if (emit) this.emit();
      return this.handled;
    }
    // else:
    const tool = this.tools.find((tool) => tool.label === label) ?? null;
    if (tool instanceof Tool) {
      this.handled = tool;
      if (emit) this.emit();
      return this.handled;
    }
  }

  authorise(label) {
    return this.handled.label === label;
  }

  emit() {
    window.dispatchEvent(
      new CustomEvent("grab", {
        detail: { cursor: this.handled.cursor, label: this.handled.label },
      })
    );
  }

  debug() {
    console.debug(this);
  }
}

export default new Toolbox();
