import backIt from "../api/backIt.js";
import Dialog from "./Dialog.js";
import Gallery from "./Gallery.js";
import handleError from "../utilities/handleError.js";
import { createThumbnail } from "./Thumbnail.js";

const { request: readImagesSelection } = backIt.registered(
  "readImagesSelection",
);

export default class CreateBoardEntryDialog extends Dialog {
  #gallery;

  constructor(parameters) {
    super(parameters);
  }

  connectedCallback() {
    this.triggers =
      Array.from(document.querySelectorAll(`[data-trigger="${this.id}"]`)) ??
      this.triggers;

    this.triggers.forEach((element) => {
      element.addEventListener("click", this._trigger);
    });
    this._beforeToggle = this.beforeToggle.bind(this);
    this.addEventListener("beforetoggle", this._beforeToggle);

    this.#gallery = this.querySelector("aeee-gallery") ?? new Gallery();
  }

  disconnectedCallback() {
    this.triggers.forEach((element) => {
      element.removeEventListener("click", this._trigger);
    });
    this.removeEventListener("beforetoggle", this._beforeToggle);
  }

  get gallery() {
    return this.#gallery;
  }

  beforeToggle = async (event) => {
    if (event.newState === "open") {
      await this.fetchImages();
    }
    if (event.newState === "closed") {
      this.clean();
    }
  };

  clean() {
    window.thumbnail = null;
    window.thumbnailMode = null;
    Array.from(this.gallery.wrapper.children).forEach((child) =>
      child.remove(),
    );
    this.close();
  }

  async fetchImages() {
    const bytes = false;
    const start = (this.gallery.pagination.page - 1) * this.gallery.size;
    const size = this.gallery.size;

    try {
      const response = await readImagesSelection({
        queries: {
          bytes,
          start,
          size,
        },
      });
      const result = await response.json();
      if (response.ok) {
        // TODO : use response to instanciate thumbnails (with input to edit alt text) and update gallery pagination maxPage
        this.gallery.pagination.maxPage = Math.ceil(result.total / result.size);
        result.images.forEach((image) => {
          createThumbnail(this.gallery.wrapper, undefined, image);
        });
      }
    } catch (error) {
      handleError({
        text: `Une Erreur est survenue lors de la récupération de vos images.`,
        error,
      });
    }
  }
}

customElements.define(
  "aeee-create-board-entry-dialog",
  CreateBoardEntryDialog,
  {
    extends: "dialog",
  },
);
