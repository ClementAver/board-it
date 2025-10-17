import Tool from "./Tool.js";

export default class Selector extends Tool {
  constructor({ cursor = "default", label = "selector" } = {}) {
    super({ cursor, label });
  }
}
