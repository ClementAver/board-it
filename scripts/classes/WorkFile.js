import Board from "./Board.js";
import Canvas from "./Canvas.js";
import History from "./History.js";
import Toolbox from "./Toolbox.js";

class WorkFile {
  _file = {};
  _history = new History();

  constructor({ file } = {}) {
    this.file = file ?? this.file;

    window.addEventListener("workfileupload", (event) => {
      this.upload(event.detail);
    });
  }

  get file() {
    return this._file;
  }

  get history() {
    return this._history;
  }

  set file(file) {
    this._file = file;
  }

  set history(history) {
    this._history = history;
  }

  save(file) {
    this.history.addSnapshot(file);
    this.file = file;
  }

  upload(json) {
    const file = this.jsonToFile(json);
    this.history.addSnapshot(file);
    this.file = file;
    Canvas.boards = file;

    const camera = Toolbox.grab("camera");
    camera.frameAll(Canvas);
  }

  jsonToFile(json) {
    try {
      return JSON.parse(json).map((board) => {
        return Board.mapperIn(board);
      });
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la transformation du fichier JSON en objet de travail : ",
        error
      );
    }
  }
}

export default new WorkFile();
