import backIt from "../api/backIt.js";
import Dialog from "./Dialog.js";
import handleError from "../utilities/handleError.js";

const { request: userDeleteBoard } = backIt.registered("userDeleteBoard");
const { request: userDeleteImage } = backIt.registered("userDeleteImage");
const { request: userDeleteBoardEntry } = backIt.registered(
  "userDeleteBoardEntry",
);

export default class DeleteDialog extends Dialog {
  #confirmButton = null;

  constructor(parameters) {
    super(parameters);

    this.#confirmButton = this.querySelector("main button");
    if (!this.#confirmButton)
      throw new Error("confirm button missing from deletion dialog");
  }

  connectedCallback() {
    this.triggers =
      Array.from(document.querySelectorAll(`[data-trigger="${this.id}"]`)) ??
      this.triggers;

    this.triggers.forEach((element) => {
      element.addEventListener("click", this._trigger);
    });

    this.addEventListener("beforetoggle", this.beforeToggle);
    this.#confirmButton.addEventListener("click", this.#confirm);
  }

  disconnectedCallback() {
    this.triggers.forEach((element) => {
      element.removeEventListener("click", this._trigger);
    });
    this.removeEventListener("beforetoggle", this.beforeToggle);
    this.#confirmButton.removeEventListener("click", this.#confirm);
  }

  #confirm = async () => {
    let text =
      "Une erreur est survenue lors de la suppression d'une ressource.";
    try {
      let response;
      let expected = "";

      if (!window.dialogType) {
        throw new Error(
          `Invalid value for \`window.dialogType\` (${window.dialogType}).`,
        );
      }

      switch (window.dialogType) {
        case "board":
          expected = window.board.databaseId;
          text = `Une Erreur est survenue lors de la suppression du tableau portant l'id ${expected}.`;
          response = await userDeleteBoard({
            pathname: `/${expected}`,
          });
          break;
        case "image":
          expected = window.thumbnail.databaseId;
          text = `Une erreur est survenue lors de la suppression de la vignette correspondant à l'entrée portant l'identifiant n°${expected}.`;
          response = await userDeleteImage({
            pathname: `/${expected}`,
          });
          break;
        case "boardEntry":
          expected = window.thumbnail.databaseId;
          text = `Une erreur est survenue lors de la suppression de la vignette correspondant à l'entrée portant l'identifiant n°${expected}.`;
          response = await userDeleteBoardEntry({
            pathname: `/${expected}`,
          });
          break;
        default:
          break;
      }

      const result = await response.json();
      if (response.ok) {
        if (result !== expected) {
          throw new Error(`wrong id returned on a delete operation`);
        }
        switch (window.dialogType) {
          case "board":
            window.board?.remove();
            break;
          case "image":
            window.thumbnail?.remove();
            break;
          case "boardEntry":
            window.thumbnail?.remove();
            break;

          default:
            break;
        }
      }
    } catch (error) {
      handleError({
        text,
        error,
      });
    } finally {
      this.clean();
    }
  };

  beforeToggle = (event) => {
    if (event.newState === "open") {
      setTimeout(() => {
        switch (window.dialogType) {
          case "board":
            if (!window.board) {
              this.close();
              throw new Error("property 'board' missing on window");
            }
            break;
          default:
            if (!window.thumbnail) {
              this.close();
              throw new Error("property 'thumbnail' missing on window");
            }
            break;
        }
      }, 0);
    }
    if (event.newState === "closed") {
      this.clean();
    }
  };

  clean() {
    window.board = null;
    window.thumbnail = null;
    window.dialogType = null;
    this.close();
  }
}

customElements.define("aeee-delete-dialog", DeleteDialog, {
  extends: "dialog",
});
