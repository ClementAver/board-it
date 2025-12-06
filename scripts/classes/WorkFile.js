import Board from "./Board.js";
import Canvas from "./Canvas.js";
import History from "./History.js";
import Toolbox from "./Toolbox.js";

class WorkFile {
  _history = new History();
  _instanciated = {};

  constructor({ snapshot } = {}) {
    if (!snapshot) snapshot = localStorage.getItem("workfile/snapshot");
    if (!snapshot) localStorage.removeItem("workfile/metadata");
    if (snapshot) this.load(snapshot);
  }

  get history() {
    return this._history;
  }

  get instanciated() {
    return this._instanciated;
  }

  set history(history) {
    this._history = history;
  }

  set instanciated(instanciated) {
    this._instanciated = instanciated;
  }

  async read(file) {
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      localStorage.setItem("workfile/metadata", this.persistFileData(file));
      this.load(JSON.parse(reader.result));
    };

    reader.onerror = () => {
      alert("Une erreur est survenue lors de la lecture des données: ", reader.error);
      console.error(reader.error);
    };
  }

  async load(snapshot) {
    this.instanciated = this.instanciateAll(snapshot);
    this.toCanvas(snapshot);
  }

  async toCanvas(snapshot) {
    Canvas.boards = this.instanciated;
    await Canvas.draw();

    const camera = Toolbox.grab("camera");
    camera.frameAll(Canvas);

    snapshot = snapshot ?? JSON.stringify(this.instanciated);
    this.history.addSnapshot(snapshot);
    localStorage.setItem("workfile/snapshot", snapshot);
  }

  instanciateAll(json) {
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

  persistFileData(file) {
    return JSON.stringify({ name: file.name });
  }
}

export default new WorkFile();
