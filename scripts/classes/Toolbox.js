import Displacer from "./Displacer.js";
import Selector from "./Selector.js";

class Toolbox {
  _handled = null;
  _tools = [new Displacer(), new Selector()];

  constructor({ handled, tools } = {}) {
    this._handled = handled ?? this._handled;
    this._tools = tools ?? this._tools;
  }

  get handled() {
    return this._handled;
  }

  get tools() {
    return this._tools;
  }

  set handled(handled) {
    this._handled = handled;
  }

  set tools(tools) {
    this._tools = tools;
  }

  grab(label) {
    this.handled = this.tools.find((tool) => tool.label === label) ?? null;
  }
}

export default new Toolbox();
