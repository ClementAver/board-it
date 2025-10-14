import Tool from "./Tool.js";

export default class Selector extends Tool {
  constructor({ cursor = "select", label = "selector" } = {}) {
    super({ cursor, label });
  }
}
