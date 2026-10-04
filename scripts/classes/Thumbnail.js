import backIt from "../api/backIt.js";
import handleError from "../utilities/handleError.js";
import insertSibling from "../utilities/insertSibling.js";
import manageClasses from "../utilities/manageClasses.js";
import Svg from "./Svg.js";

export default class Thumbnail extends HTMLElement {
  #alternate = "";
  #caption = "";
  #checkbox = null;
  #databaseId = -1;
  #deleteButton = null;
  #deleteCallback = () => {};
  #editButton = null;
  #editCallback = () => {};
  #figcaption = null;
  #figure = null;
  #image = null;
  #isChecked = false;
  #isEditable = false;
  #isDeletable = false;
  #isRounded = false;
  #isSelectable = false;
  #placeholderImage = `${window.location.origin}/assets/pictures/thumbnail_placehoder.png`;
  #source = "";

  constructor({
    alternate,
    caption,
    databaseId,
    deleteCallback,
    editCallback,
    isChecked,
    isEditable,
    isDeletable,
    isRounded,
    isSelectable,
    source,
  } = {}) {
    super();

    this.#alternate = alternate ?? this.#alternate;
    this.#caption = caption ?? this.#caption;
    this.#databaseId = databaseId ?? this.#databaseId;
    this.#deleteCallback = deleteCallback ?? this.#deleteCallback;
    this.#editCallback = editCallback ?? this.#editCallback;
    this.#isChecked = isChecked ?? this.#isChecked;
    this.#isEditable = isEditable ?? this.#isEditable;
    this.#isDeletable = isDeletable ?? this.#isDeletable;
    this.#isRounded = isRounded ?? this.#isRounded;
    this.#isSelectable = isSelectable ?? this.#isSelectable;
    this.#source = source ?? this.#source;

    this._internals = this.attachInternals();
    this.setAttribute("role", "article");
  }

  connectedCallback() {
    this.setupDOM({
      source: this.source,
      alternate: this.alternate,
      caption: this.caption,
      deleteCallback: this.deleteCallback,
      editCallback: this.editCallback,
      isChecked: this.isChecked,
      isEditable: this.isEditable,
      isDeletable: this.isDeletable,
      isRounded: this.isRounded,
      isSelectable: this.isSelectable,
    });
    this.setupEvents(this.deleteCallback, this.editCallback);
  }

  get alternate() {
    return this.#alternate;
  }

  get caption() {
    return this.#caption;
  }

  get checkbox() {
    return this.#checkbox;
  }

  get databaseId() {
    return this.#databaseId;
  }

  get deleteButton() {
    return this.#deleteButton;
  }

  get deleteCallback() {
    return this.#deleteCallback;
  }

  get editButton() {
    return this.#editButton;
  }

  get editCallback() {
    return this.#editCallback;
  }

  get figcaption() {
    return this.#figcaption;
  }

  get figure() {
    return this.#figure;
  }

  get image() {
    return this.#image;
  }

  get isChecked() {
    return this.#isChecked;
  }

  get isEditable() {
    return this.#isEditable;
  }

  get isDeletable() {
    return this.#isDeletable;
  }

  get isRounded() {
    return this.#isRounded;
  }

  get isSelectable() {
    return this.#isSelectable;
  }

  get placeholderImage() {
    return this.#placeholderImage;
  }

  get source() {
    return this.#source;
  }

  set alternate(alternate) {
    if (this.dataset.alternate !== alternate) {
      this.dataset.alternate = alternate;
      return;
    }
    this.#alternate = alternate;
    if (this.image) this.image.alt = alternate;
  }

  set caption(caption) {
    if (this.dataset.caption !== caption) {
      this.dataset.caption = caption;
      return;
    }
    this.#caption = caption;
    if (this.figcaption) this.figcaption.textContent = caption;
  }

  set checkbox(checkbox) {
    this.#checkbox = checkbox;
  }

  set deleteButton(deleteButton) {
    this.#deleteButton = deleteButton;
  }

  set deleteCallback(deleteCallback) {
    this.#deleteCallback = deleteCallback;
  }

  set editButton(editButton) {
    this.#editButton = editButton;
  }

  set editCallback(editCallback) {
    this.#editCallback = editCallback;
  }

  set figcaption(figcaption) {
    this.#figcaption = figcaption;
  }

  set figure(figure) {
    this.#figure = figure;
  }

  set image(image) {
    this.#image = image;
  }

  set isChecked(isChecked) {
    if (this.dataset.isChecked !== isChecked.toString()) {
      this.dataset.isChecked = isChecked.toString();
      return;
    }

    this.#isChecked = isChecked;

    if (isChecked) {
      this.checkbox.checked = true;
      this._internals.states.add("checked");
    } else {
      this.checkbox.checked = false;
      this._internals.states.delete("checked");
    }
  }

  set isEditable(isEditable) {
    if (this.dataset.isEditable !== isEditable.toString()) {
      this.dataset.isEditable = isEditable.toString();
      return;
    }

    this.#isEditable = isEditable;

    if (isEditable) {
      this._internals.states.add("editable");
    } else {
      this._internals.states.delete("editable");
    }
  }

  set isDeletable(isDeletable) {
    if (this.dataset.isDeletable !== isDeletable.toString()) {
      this.dataset.isDeletable = isDeletable.toString();
      return;
    }

    this.#isDeletable = isDeletable;

    if (isDeletable) {
      this._internals.states.add("deletable");
    } else {
      this._internals.states.delete("deletable");
    }
  }

  set isRounded(isRounded) {
    if (this.dataset.isRounded !== isRounded.toString()) {
      this.dataset.isRounded = isRounded.toString();
      return;
    }

    this.#isRounded = isRounded;

    if (isRounded) {
      this._internals.states.add("rounded");
    } else {
      this._internals.states.delete("rounded");
    }
  }

  set isSelectable(isSelectable) {
    if (this.dataset.isSelectable !== isSelectable.toString()) {
      this.dataset.isSelectable = isSelectable.toString();
      return;
    }

    this.#isSelectable = isSelectable;
  }

  set placeholderImage(placeholderImage) {
    this.#placeholderImage = placeholderImage;
  }

  set source(source) {
    if (this.dataset.source !== source) {
      this.dataset.source = source;
      return;
    }

    this._internals.states.add("loading");
    this.#source = source;
    if (this.image) this.image.src = source;
    if (this.checkbox) this.checkbox.value = this.source;
  }

  setupDOM({
    source,
    alternate,
    caption,
    isDeletable,
    isEditable,
    isChecked,
    isRounded,
    isSelectable,
  } = {}) {
    this.figure =
      this.querySelector("figure") ?? document.createElement("figure");
    this.figure.classList.add("glint");
    this.figcaption =
      this.querySelector("figcaption") ?? document.createElement("figcaption");
    this.image = this.querySelector("img") ?? document.createElement("img");
    this.image.loading = "lazy";
    if (!this.figure.contains(this.image)) this.figure.appendChild(this.image);
    if (!this.figure.contains(this.figcaption))
      this.figure.appendChild(this.figcaption);
    if (!this.contains(this.figure)) this.appendChild(this.figure);

    this.alternate = alternate ?? this.dataset.alternate ?? this.alternate;
    this.caption = caption ?? this.dataset.caption ?? this.caption;
    this.isDeletable =
      isDeletable ?? this.dataset.isDeletable === "true" ?? this.isDeletable;
    this.isEditable =
      isEditable ?? this.dataset.isEditable === "true" ?? this.isEditable;
    this.isRounded =
      isRounded ?? this.dataset.isRounded === "true" ?? this.isRounded;
    this.isSelectable =
      isSelectable ?? this.dataset.isSelectable === "true" ?? this.isSelectable;
    this.source = source ?? this.dataset.source ?? this.source;

    this.checkbox =
      this.querySelector("input") ?? document.createElement("input");
    this.checkbox.type = "checkbox";
    this.checkbox.name = "thumbnail";
    this.checkbox.classList.add("sr-only");
    this.checkbox.value = this.source;
    if (this.checkbox && !this.contains(this.checkbox))
      this.appendChild(this.checkbox);
    this.isChecked =
      isChecked ?? this.dataset.isChecked === "true" ?? this.isChecked;

    const menu = this.querySelector("menu") ?? document.createElement("menu");

    this.editButton =
      menu.querySelector("button[data-edit]") ??
      document.createElement("button");
    this.editButton.type = "button";
    this.editButton.dataset.edit = true;
    this.editButton.dataset.trigger = "update-board-entry-dialog";
    this.editButton.dataset.action = "showModal";
    this.editSvg =
      this.editButton.querySelector("aeee-svg") ??
      new Svg({ href: "../assets/icons/sprites.svg#square-pen" });
    if (!this.editButton.contains(this.editSvg))
      this.editButton.appendChild(this.editSvg);
    if (!menu.contains(this.editButton)) menu.appendChild(this.editButton);

    this.deleteButton =
      menu.querySelector("button[data-delete]") ??
      document.createElement("button");
    this.deleteButton.type = "button";
    this.deleteButton.dataset.delete = true;
    this.deleteButton.dataset.trigger = "delete-board-entry-dialog";
    this.deleteButton.dataset.action = "showModal";
    this.deleteSvg =
      this.deleteButton.querySelector("aeee-svg") ??
      new Svg({ href: "../assets/icons/sprites.svg#trash-2" });
    if (!this.deleteButton.contains(this.deleteSvg))
      this.deleteButton.appendChild(this.deleteSvg);
    if (!menu.contains(this.deleteButton))
      insertSibling(this.deleteButton, this.editButton, "after");

    manageClasses(
      [this.editButton, this.deleteButton],
      ["swath", "smaller-border-line-icon"],
    );

    if (!this.contains(menu)) this.insertBefore(menu, this.firstElementChild);
  }

  setupEvents(deleteCallback, editCallback) {
    if (!this._listeners) {
      this._listeners = true;

      this.image.onload = () => {
        this._internals.states.delete("loading");
        if (this.source !== this.placeholderImage) {
          this._internals.states.delete("error");
        }
      };

      this.image.onerror = (error) => {
        this._internals.states.delete("loading");
        this._internals.states.add("error");
        handleError({
          text: `Une Erreur est survenue lors du chargement d'une image.`,
          error,
        });
        if (this.source !== this.placeholderImage) {
          this.source = this.placeholderImage;
        }
      };
    }

    if (this.checkbox) {
      this._toggleChecked = this.toggleChecked.bind(this);
      this.addEventListener("click", this._toggleChecked);
    }

    this._delete = deleteCallback.bind(this);
    this.deleteButton.addEventListener("click", this._delete);
    this._edit = editCallback.bind(this);
    this.editButton.addEventListener("click", this._edit);
  }

  disconnectedCallback() {
    if (this._toggleChecked) {
      this.removeEventListener("click", this._toggleChecked);
    }
    this.editButton.removeEventListener("click", this._edit);
    this.deleteButton.removeEventListener("click", this._delete);
  }

  toggleChecked() {
    if (this.isSelectable) this.isChecked = !this.isChecked;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "data-alternate":
        this.alternate = newValue;
        break;
      case "data-caption":
        this.caption = newValue;
        break;
      case "data-is-checked":
        this.isChecked = newValue.toString() === "true";
        break;
      case "data-is-deletable":
        this.isDeletable = newValue.toString() === "true";
        break;
      case "data-is-editable":
        this.isEditable = newValue.toString() === "true";
        break;
      case "data-is-rounded":
        this.isRounded = newValue.toString() === "true";
        break;
      case "data-is-selectable":
        this.isSelectable = newValue.toString() === "true";
        break;
      case "data-source":
        this.source = newValue;
        break;
      default:
        break;
    }
  }

  static observedAttributes = [
    "data-alternate",
    "data-caption",
    "data-is-checked",
    "data-is-deletable",
    "data-is-editable",
    "data-is-rounded",
    "data-is-selectable",
    "data-source",
  ];
}

customElements.define("aeee-thumbnail", Thumbnail);

export function createBoardThumbnail(board, boardEntry, image) {
  const thumbnail = new Thumbnail({
    alternate: image.alternateText,
    caption: boardEntry.caption,
    databaseId: boardEntry.id,
    source: `${backIt.origin}/api/image/bytes/${image.id}`,
    isEditable: true,
    isDeletable: true,
  });
  thumbnail.deleteCallback = () => (window.thumbnail = thumbnail);
  thumbnail.editCallback = () => (window.thumbnail = thumbnail);
  thumbnail.draggable = true;
  thumbnail.dataset.dragLevel = 2;
  try {
    board.appendChild(thumbnail);
  } catch (error) {
    handleError({
      text: `Une erreur est survenue lors de l'insertion de la vignette correspondant à l'entrée portant l'identifiant n°${boardEntry.id} au sein de la page.`,
      error,
    });
  }
  const deleteDialog = document.getElementById("delete-board-entry-dialog");
  if (!deleteDialog) {
    console.error(
      "`dialog#delete-board-entry-dialog` hasn't been found on the page.",
    );
  }
  deleteDialog.appendTrigger(thumbnail.deleteButton);
  const updateDialog = document.getElementById("update-board-entry-dialog");
  if (!updateDialog) {
    console.error(
      "`dialog#update-board-entry-dialog` hasn't been found on the page.",
    );
  }
  updateDialog.appendTrigger(thumbnail.editButton);
  return thumbnail;
}
