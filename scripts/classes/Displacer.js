import Tool from "./Tool.js";

export default class Displacer extends Tool {
  constructor({ cursor = "move", label = "displacer" } = {}) {
    super({ cursor, label });
  }
}
