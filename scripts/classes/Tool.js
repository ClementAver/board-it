export default class Tool {
  _cursor = "auto";
  _label = undefined;

  constructor({ cursor, label } = {}) {
    this.cursor = cursor ?? this._cursor;
    this.label = label ?? this._label;
  }

  get cursor() {
    return this._cursor;
  }

  get label() {
    return this._label;
  }

  set cursor(cursor) {
    this._cursor = cursor;
  }

  set label(label) {
    this._label = label;
  }
}
