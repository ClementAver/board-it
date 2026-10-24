import backIt from "../api/backIt.js";
import Dialog from "./Dialog.js";
import handleError from "../utilities/handleError.js";

const { request: userDeleteImage } = backIt.registered(
  "userDeleteImage",
);
const { request: userDeleteBoardEntry } = backIt.registered(
  "userDeleteBoardEntry",
);

export default class DeleteThumbnailDialog extends Dialog {
  #confirmButton = null;

  constructor(parameters) {
    super(parameters);

    this.#confirmButton = this.querySelector("main button");
    if (!this.#confirmButton)
      throw new Error(
        "confirm button missing from board entry deletion dialog",
      );
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
    try {
      let response;
      if (!window.thumbnailMode) {
        throw new Error(
          `Invalid value for \`window.thumbnailMode\` (${window.thumbnailMode}). Should either be "image" or "boardEntry".`,
        );
      } else if (window.thumbnailMode === "image") {
        response = await userDeleteImage({
          pathname: `/${window.thumbnail.databaseId}`,
        });
      } else if (window.thumbnailMode === "boardEntry") {
        response = await userDeleteBoardEntry({
          pathname: `/${window.thumbnail.databaseId}`,
        });
      }
      const result = await response.json();
      if (response.ok) {
        if (result !== window.thumbnail.databaseId) {
          throw new Error(`wrong id returned on a delete operation`);
        }
        window.thumbnail.remove();
      }
    } catch (error) {
      handleError({
        text: `Une erreur est survenue lors de la suppression de la vignette correspondant à l'entrée portant l'identifiant n°${window.thumbnail.databaseId}.`,
        error,
      });
    } finally {
      this.clean();
    }
  };

  beforeToggle = (event) => {
    if (event.newState === "open") {
      if (!window.thumbnail) {
        this.close();
        throw new Error("property 'thumbnail' missing on window");
      }
    }
    if (event.newState === "closed") {
      this.clean();
    }
  };

  clean() {
    window.thumbnail = null;
    window.thumbnailMode = null;
    this.close();
  }
}

customElements.define("aeee-delete-thumbnail-dialog", DeleteThumbnailDialog, {
  extends: "dialog",
});
