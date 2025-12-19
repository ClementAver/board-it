import handleError from "../utils/handleError.js";
import Board from "./Board.js";
import Canvas from "./Canvas.js";
import History from "./History.js";
import ToastGenerator from "./ToastGenerator.js";
import Toolbox from "./Toolbox.js";

class WorkFile {
  _history = new History();
  _instanciated = {};

  constructor({ snapshot } = {}) {
    if (!snapshot) snapshot = localStorage.getItem("workfile/snapshot");
    if (!snapshot) localStorage.removeItem("workfile/metadata");
    if (snapshot)
      this.load(JSON.parse(snapshot))
        .then(() => {
          ToastGenerator.center.generate("Fichier de travail chargé !", {
            type: "check",
          });
        })
        .catch(() => {
          localStorage.removeItem("workfile/metadata");
          localStorage.removeItem("workfile/snapshot");
        });
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

  read(file) {
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      this.load(reader.result)
        .then(() => {
          localStorage.setItem("workfile/metadata", this.persistFileData(file));
          ToastGenerator.center.generate("Fichier de travail chargé !", {
            type: "check",
          });
        })
        .catch((e) => console.debug(e)); // TODO : Take a look at all the channels available for the console and their roles
    };

    reader.onerror = () => {
      handleError({
        text: "Une erreur est survenue lors de la lecture des données.",
        error: reader.error,
      });
    };
  }

  /**
   *
   * @param { string } snapshot - A JavaScript Object Notation (JSON) string.
   */
  async load(snapshot) {
    let parsed;

    try {
      parsed = JSON.parse(snapshot);
    } catch (error) {
      handleError({
        text: "Une erreur est survenue lors de la transciption des données",
        error,
      });

      throw error;
    }

    this.instanciated = this.instanciateAll(parsed);

    await this.toCanvas();

    this.history.addSnapshot(snapshot);
    localStorage.setItem("workfile/snapshot", JSON.stringify(snapshot));
  }

  async toCanvas() {
    Canvas.boards = this.instanciated;

    await Canvas.draw();

    const camera = Toolbox.grab("camera");
    camera.frameAll(Canvas);
  }

  instanciateAll(json) {
    try {
      return json.map((board) => {
        return Board.mapperIn(board);
      });
    } catch (error) {
      handleError({
        text: "Une erreur est survenue lors de la création des instances à partir du fichier de travail.",
        error,
      });

      throw error;
    }
  }

  persistFileData(file) {
    return JSON.stringify({ name: file.name });
  }
}

export default new WorkFile();
