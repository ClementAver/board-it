export default class WorkFile {
  _file = {};
  _history;

  constructor({ file } = {}) {
    this.file = file ?? this.file;
  }

  get file() {
    return this._file;
  }

  set file(file) {
    this._file = file;
  }

  parse(file) {
    console.log(file);
  }
}
