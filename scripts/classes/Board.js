import backIt from "../api/backIt.js";
import handleError from "../utilities/handleError.js";
import insertSibling from "../utilities/insertSibling.js";
import manageClasses from "../utilities/manageClasses.js";
import CreateBoardEntryDialog from "./CreateBoardEntryDialog.js";
import Svg from "./Svg.js";
import Tooltip from "./Tooltip.js";

const { request: userUpdateBoard } = backIt.registered("userUpdateBoard");
const { request: userDeleteBoard } = backIt.registered("userDeleteBoard");

export default class Board extends HTMLElement {
  #databaseId = -1;
  #createButton = null;
  #createSvg = null;
  #deleteButton = null;
  #deleteSvg = null;
  #dragLevel = 0;
  #editButton = null;
  #editSvg = null;
  #form = null;
  #input = null;
  #title = "";
  #titleElement = null;
  #tooltipCreate = null;

  constructor({ databaseId, title, dragLevel } = {}) {
    super();

    this.draggable = true;
    this._formId = self.crypto.randomUUID();
    this.#databaseId = databaseId ?? this.#databaseId;
    this.#title = title ?? this.#title;
    this.dragLevel = dragLevel ?? this.dataset.dragLevel ?? this.dragLevel;
  }

  get createButton() {
    return this.#createButton;
  }

  get createSvg() {
    return this.#createSvg;
  }

  get databaseId() {
    return this.#databaseId;
  }

  get deleteButton() {
    return this.#deleteButton;
  }

  get deleteSvg() {
    return this.#deleteSvg;
  }

  get dragLevel() {
    return this.#dragLevel;
  }

  get editButton() {
    return this.#editButton;
  }

  get editSvg() {
    return this.#editSvg;
  }

  get form() {
    return this.#form;
  }

  get input() {
    return this.#input;
  }

  get title() {
    return this.#title;
  }

  get titleElement() {
    return this.#titleElement;
  }

  get tooltipCreate() {
    return this.#tooltipCreate;
  }

  set createButton(createButton) {
    this.#createButton = createButton;
  }

  set createSvg(createSvg) {
    this.#createSvg = createSvg;
  }
  set deleteButton(deleteButton) {
    this.#deleteButton = deleteButton;
  }

  set deleteSvg(deleteSvg) {
    this.#deleteSvg = deleteSvg;
  }

  set dragLevel(dragLevel) {
    if (this.dataset.dragLevel != dragLevel) {
      this.dataset.dragLevel = dragLevel;
      return;
    }

    this.#dragLevel = dragLevel;
  }

  set editButton(editButton) {
    this.#editButton = editButton;
  }

  set editSvg(editSvg) {
    this.#editSvg = editSvg;
  }

  set form(form) {
    this.#form = form;
  }

  set input(input) {
    this.#input = input;
  }

  set title(title) {
    if (this.dataset.title != title) {
      this.dataset.title = title;
      return;
    }

    this.#title = title;
    if (this.titleElement) this.titleElement.textContent = title;
  }

  set titleElement(titleElement) {
    this.#titleElement = titleElement;
  }

  set tooltipCreate(tooltipCreate) {
    this.#tooltipCreate = tooltipCreate;
  }

  connectedCallback() {
    this.setupDOM();

    this._edit = this.edit.bind(this);
    this.editButton.addEventListener("click", this._edit);
    this._submit = this.submit.bind(this);
    this.input.addEventListener("blur", this._submit);
    this.form.addEventListener("submit", this._submit);
    this._delete = this.delete.bind(this);
    this.deleteButton.addEventListener("click", this._delete);
    this._create = this.create.bind(this);
    this.createButton.addEventListener("click", this._create);
  }

  disconnectedCallback() {
    this.editButton.removeEventListener("click", this._edit);
    this.form.removeEventListener("submit", this._submit);
    this.deleteButton.removeEventListener("click", this._delete);
    this.input.removeEventListener("blur", this._submit);
    this.createButton.removeEventListener("click", this._create);
  }

  setupDOM() {
    const header =
      this.querySelector("header") ?? document.createElement("header");

    this.titleElement =
      header.querySelector("[data-title]") ?? document.createElement("p");
    this.titleElement.dataset.title = "";
    this.title =
      this.title || this.dataset.title || this.titleElement.textContent.trim();
    this.titleElement.hidden = false;
    this.titleElement.classList.add("text-swath");
    if (!header.contains(this.titleElement))
      header.insertBefore(this.titleElement, header.firstElementChild);

    this.form = this.querySelector("form") ?? document.createElement("form");
    this.form.id = this._formId;
    this.input = this.querySelector("input") ?? document.createElement("input");
    this.input.type = "text";
    this.input.name = "title";
    if (!this.form.contains(this.input)) {
      this.form.appendChild(this.input);
    }
    this.form.hidden = true;
    if (!header.contains(this.form)) {
      header.insertBefore(this.form, header.firstElementChild);
    }

    this.editButton =
      header.querySelector("button[data-edit]") ??
      document.createElement("button");
    this.editButton.type = "button";
    this.editButton.dataset.edit = true;
    this.editButton.classList.add("border-line-icon");
    this.editSvg =
      this.editButton.querySelector("aeee-svg") ??
      new Svg({ href: "../assets/icons/sprites.svg#square-pen" });
    if (!this.editButton.contains(this.editSvg))
      this.editButton.appendChild(this.editSvg);
    if (!header.contains(this.editButton))
      insertSibling(this.editButton, this.titleElement, "after");

    this.deleteButton =
      header.querySelector("button[data-delete]") ??
      document.createElement("button");
    this.deleteButton.type = "button";
    this.deleteButton.dataset.delete = true;
    this.deleteButton.classList.add("border-line-icon");
    this.deleteSvg =
      this.deleteButton.querySelector("aeee-svg") ??
      new Svg({ href: "../assets/icons/sprites.svg#trash-2" });
    if (!this.deleteButton.contains(this.deleteSvg))
      this.deleteButton.appendChild(this.deleteSvg);
    if (!header.contains(this.deleteButton))
      insertSibling(this.deleteButton, this.editButton, "after");

    if (!this.contains(header))
      this.insertBefore(header, this.firstElementChild);

    this.createButton =
      header.querySelector("button[data-create]") ??
      document.createElement("button");
    this.createButton.type = "button";
    this.createButton.setAttribute(
      "aria-label",
      "Fermer la boîte de dialogue modale.",
    );
    this.createButton.dataset.trigger = "create-board-entry-dialog";
    this.createButton.dataset.action = "showModal";
    this.createButton.dataset.create = true;
    manageClasses([this.createButton], ["border-line-icon", "no-dash"]);
    this.createSvg =
      this.createButton.querySelector("aeee-svg") ??
      new Svg({ href: "../assets/icons/sprites.svg#image-plus" });
    if (!this.createButton.contains(this.createSvg))
      this.createButton.appendChild(this.createSvg);
    if (!this.contains(this.createButton)) this.appendChild(this.createButton);
    const createDialog = document.getElementById("create-board-entry-dialog");
    if (!createDialog) {
      console.error(
        "`dialog#create-board-entry-dialog` hasn't been found on the page.",
      );
    }
    createDialog.appendTrigger(this.createButton);

    this.tooltipCreate = new Tooltip({ text: "Ajouter une vignette" });
    manageClasses([this.tooltipCreate], ["m-sm", "anchor-bottom-sr"]);
    if (!this.contains(this.tooltipCreate))
      this.appendChild(this.tooltipCreate);
  }

  edit() {
    if (this.editButton.type === "submit") return;
    this.input.value = this.title;
    this.titleElement.hidden = true;
    this.form.hidden = false;
    const [base, id] = this.editSvg.href.split("#");
    this.editSvg.href = base + "#save";
    this.input.focus();
    setTimeout(() => {
      this.editButton.type = "submit";
      this.editButton.setAttribute("form", this._formId);
    }, 0);
  }

  async submit(event) {
    event.preventDefault();
    // used to cancel blur's double submit
    if (
      this.form.hidden === true ||
      (event.type === "blur" && event.relatedTarget === this.editButton)
    )
      return;
    const position =
      Array.from(this.parentElement?.querySelectorAll("aeee-board")).findIndex(
        (it) => {
          return it.databaseId === this.databaseId;
        },
      ) + 1;
    const formData = new FormData(this.form);
    formData.append("position", position);
    await this.update(formData);
  }

  async update(formData) {
    try {
      const response = await userUpdateBoard({
        pathname: `/${this.databaseId}`,
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        if (result.id !== this.databaseId) {
          throw new Error(`wrong id returned on an update operation`);
        }
        this.title = result.title;
        this.titleElement.hidden = false;
        this.form.hidden = true;
        this.editButton.type = "button";
        this.editButton.removeAttribute("form");
        const [base, id] = this.editSvg.href.split("#");
        this.editSvg.href = base + "#square-pen";
      }
    } catch (error) {
      handleError({
        text: `Une Erreur est survenue lors de la mise à jour du tableau portant l'id ${this.databaseId}.`,
        error,
      });
    }
  }

  async delete() {
    try {
      const response = await userDeleteBoard({
        pathname: `/${this.databaseId}`,
      });
      const result = await response.json();
      if (response.ok) {
        if (result !== this.databaseId) {
          throw new Error(`wrong id returned on a delete operation`);
        }
        this.remove();
      }
    } catch (error) {
      handleError({
        text: `Une Erreur est survenue lors de la suppression du tableau portant l'id ${this.databaseId}.`,
        error,
      });
    }
  }

  async create() {
    console.log("create");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "data-title":
        this.title = newValue;
        break;
      case "data-drag-level":
        this.dragLevel = newValue;
        break;
      default:
        break;
    }
  }

  static observedAttributes = ["data-title"];
}

customElements.define("aeee-board", Board);
