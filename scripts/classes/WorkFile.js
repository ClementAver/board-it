import Board from "./Board.js";

// 🚧🚧🚧🚧🚧
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

  static jsonToFile(json) {
    try {
      const js = JSON.parse(json);

      return js.map((element) => {
        return Board.mapperIn(element);
      });
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la transformation du fichier JSON en objet de travail : ",
        error
      );
    }
  }
}
// 🚧🚧🚧🚧🚧
