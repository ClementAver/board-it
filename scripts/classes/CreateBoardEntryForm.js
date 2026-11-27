import backIt from "../api/backIt.js";
import handleError from "../utilities/handleError.js";
import Thumbnail from "./Thumbnail.js";

const { request: userCreateBoardEntries } = backIt.registered(
  "userCreateBoardEntries",
);

export default class CreateBoardEntryForm extends HTMLFormElement {
  #submitButton = null;

  constructor({ submitButton } = {}) {
    super();

    this.submitButton =
      submitButton ??
      this.querySelector('button[type="submit"]') ??
      this.submitButton;

    this._submit = this.submit.bind(this);
  }

  connectedCallback() {
    this.submitButton =
      this.querySelector('button[type="submit"]') ?? this.submitButton;

    this.addEventListener("submit", this._submit);
  }

  disconnectedCallback() {
    this.removeEventListener("submit", this._submit);
  }

  get submitButton() {
    return this.#submitButton;
  }

  set submitButton(submitButton) {
    this.#submitButton = submitButton;
  }

  async submit(event) {
    event.preventDefault();
    try {
      if (!window.board) {
        throw new Error(
          `Invalid property \`window.board\` should not be (${window.board}).`,
        );
      }
      const body = [];
      let position = window.board.querySelectorAll("aeee-thumbnail").length + 1;
      const thumbnails = Array.from(this.querySelectorAll("aeee-thumbnail"))
        .filter((thumbnail) => thumbnail.dataset.isChecked === "true")
        .map((thumbnail) => {
          const dto = {};
          dto.caption = thumbnail.caption;
          dto.position = position++;
          dto.boardId = window.board.databaseId;
          dto.imageId = thumbnail.databaseId;
          body.push(dto);
          return thumbnail;
        });

      const response = await userCreateBoardEntries({
        body: JSON.stringify(body),
      });
      const result = await response.json();

      if (response.status === 201) {
        thumbnails.forEach((thumbnail) => {
          thumbnail.isSelectable = false;
          thumbnail.isChecked = false;
          window.board.appendChild(thumbnail);
          thumbnail.databaseId = result.find(
            (it) =>
              it.position ===
              thumbnail.parentElement.getElementsByTagName("aeee-thumbnail")
                .length,
          ).id;
        });
        this.closest("dialog")?.close();
      }
    } catch (error) {
      handleError({
        text: `Une Erreur est survenue lors de la création d'une vignette au sein du tableau portant l'identifiant n°${window.board.databaseId}.`,
        error,
      });
    }
  }
}

customElements.define("aeee-create-board-entry-form", CreateBoardEntryForm, {
  extends: "form",
});
