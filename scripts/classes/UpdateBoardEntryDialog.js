import Dialog from "./Dialog.js";
import backIt from "../api/backIt.js";
import handleError from "../utilities/handleError.js";

const { request: userUpdateImage } = backIt.registered("userUpdateImage");
const { request: userUpdateBoardEntry } = backIt.registered(
  "userUpdateBoardEntry",
);

export default class updateBoardEntryDialog extends Dialog {
  #form = null;

  constructor(parameters) {
    super(parameters);

    this.#form = this.querySelector("form") ?? this.#form;

    this._beforeToggle = this.beforeToggle.bind(this);
    this._submit = this.submit.bind(this);

    window.addEventListener("submit", (event) => console.log(event));
  }

  get form() {
    return this.#form;
  }

  set form(form) {
    this.#form = form;
  }

  connectedCallback() {
    this.triggers =
      Array.from(document.querySelectorAll(`[data-trigger="${this.id}"]`)) ??
      this.triggers;

    this.triggers.forEach((element) => {
      element.addEventListener("click", this._trigger);
    });
    this.addEventListener("beforetoggle", this._beforeToggle);
    this.addEventListener("submit", this._submit);
  }

  disconnectedCallback() {
    this.triggers.forEach((element) => {
      element.removeEventListener("click", this._trigger);
    });
    this.removeEventListener("beforetoggle", this._beforeToggle);
    this.removeEventListener("submit", this._submit);
  }

  beforeToggle = (event) => {
    if (event.newState === "open") {
      if (!window.thumbnail) {
        this.close();
        throw new Error("property 'thumbnail' missing on window");
      }
      this.querySelector('input[name="caption"]').value =
        window.thumbnail.caption;
    }
    if (event.newState === "closed") {
      this.clean();
    }
  };

  async submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      let response;

      if (!window.thumbnailMode) {
        throw new Error(
          `Invalid value for \`window.thumbnailMode\` (${window.thumbnailMode}). Should either be "image" or "boardEntry".`,
        );
      } else if (window.thumbnailMode === "image") {
        formData.set("alternateText", formData.get("caption"));
        formData.delete("caption");
        response = await userUpdateImage({
          pathname: `/${window.thumbnail.databaseId}`,
          body: formData,
        });
      } else if (window.thumbnailMode === "boardEntry") {
        response = await userUpdateBoardEntry({
          pathname: `/${window.thumbnail.databaseId}`,
          body: formData,
        });
      }
      const result = await response.json();
      if (response.ok) {
        if (result.id !== window.thumbnail.databaseId) {
          throw new Error(`wrong id returned on an update operation`);
        }
        window.thumbnail.caption = result.caption ?? result.alternateText;
        this.clean();
      }
    } catch (error) {
      handleError({
        text: `Une Erreur est survenue lors de la mise à jour de la vignette correspondant à l'entrée portant l'identifiant n°${window.thumbnail.databaseId}.`,
        error,
      });
    }
  }

  clean() {
    this.querySelector('input[name="caption"]').value = "";
    window.thumbnail = null;
    window.thumbnailMode = null;
    this.close();
  }
}

customElements.define(
  "aeee-update-board-entry-dialog",
  updateBoardEntryDialog,
  {
    extends: "dialog",
  },
);
