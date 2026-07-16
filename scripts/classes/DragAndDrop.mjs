export default class DragAndDrop extends HTMLElement {
  #accepted;
  #dropZone;
  #dropZonePlaceholder;
  #inputId;
  #input;
  #labelPlaceholder;
  #isDisabled;
  #isMultiple;
  #isRequired;
  #label;
  #p;
  #span;

  constructor() {
    super();

    this._internals = this.attachInternals();

    this.#dropZone = document.createElement("div");
    this.#dropZone.classList.add("drop-zone");
    this.#p = document.createElement("p");
    this.#p.classList.add("text-swath");
    this.#p.classList.add("truncate");
    this.#label = document.createElement("label");
    ["button", "swath"].forEach((c) => this.#label.classList.add(c));
    this.#span = document.createElement("span");
    this.#input = document.createElement("input");
    this.#input.hidden = true;
    this.#input.type = "file";

    this.#dropZone.appendChild(this.#p);
    this.#label.appendChild(this.#span);
    this.#label.appendChild(this.#input);
    this.appendChild(this.#dropZone);
    this.appendChild(this.#label);
  }

  connectedCallback() {
    ["dragenter", "dragover", "dragleave", "drop"].forEach((type) =>
      this.#dropZone?.addEventListener(type, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }),
    );
    this.#dropZone?.addEventListener("dragover", (e) => {
      e.dataTransfer.dropEffect = "move";
    });
    this.#dropZone?.addEventListener("dragleave", (e) => {
      e.dataTransfer.dropEffect = "none";
    });
    this.#dropZone?.addEventListener("drop", async (e) => {
      if (e.dataTransfer) this.#updateInput(e.dataTransfer.files);
    });
    this.#dropZone?.addEventListener("paste", async (e) => {
      if (
        [":hover", " :hover"].some((selector) => {
          return this.#dropZone.matches(selector);
        })
      ) {
        if (e.clipboardData) this.#updateInput(e.clipboardData.files);
      }
    });
    this.#input.addEventListener("change", (e) => {
      if (!(e.target instanceof HTMLInputElement)) return;
      if (e.target.files && e.target.files.length)
        this.dropZonePlaceholder = Array.from(e.target.files)
          .map((file) => file.name)
          .join("\n");
    });
  }

  set accepted(accepted) {
    if (this.getAttribute("accepted") !== accepted) {
      this.setAttribute("accepted", accepted);
      return;
    }
    this.#accepted = accepted.replace(" ", "").split(",");
    this.#input.accept = accepted;
  }

  set dropZonePlaceholder(dropZonePlaceholder) {
    dropZonePlaceholder = dropZonePlaceholder.toString();
    if (this.getAttribute("drop-zone-placeholder") !== dropZonePlaceholder) {
      this.setAttribute("drop-zone-placeholder", dropZonePlaceholder);
      return;
    }
    this.#dropZonePlaceholder = dropZonePlaceholder;
    this.#p.innerText = dropZonePlaceholder;
  }

  set inputId(id) {
    id = id.toString();
    if (this.getAttribute("input-id") !== id) {
      this.setAttribute("input-id", id);
      return;
    }

    this.#inputId = id;
    this.#input.id = id;
    this.#input.name = id;
  }

  set labelPlaceholder(labelPlaceholder) {
    labelPlaceholder = labelPlaceholder.toString();
    if (this.getAttribute("label-placeholder") !== labelPlaceholder) {
      this.setAttribute("label-placeholder", labelPlaceholder);
      return;
    }
    this.#labelPlaceholder = labelPlaceholder;
    this.#span.innerText = labelPlaceholder;
  }

  set isDisabled(isDisabled) {
    if (this.getAttribute("is-disabled") !== isDisabled.toString()) {
      this.setAttribute("is-disabled", isDisabled.toString());
      return;
    }

    this.#isDisabled = isDisabled;
    this.#input.disabled = isDisabled === "true";
  }

  set isMultiple(isMultiple) {
    if (this.getAttribute("is-multiple") !== isMultiple.toString()) {
      this.setAttribute("is-multiple", isMultiple.toString());
      return;
    }

    this.#isMultiple = isMultiple;
    this.#input.multiple = isMultiple === "true";
  }

  set isRequired(isRequired) {
    if (this.getAttribute("is-required") !== isRequired.toString()) {
      this.setAttribute("is-required", isRequired.toString());
      return;
    }

    this.#isRequired = isRequired;
    this.#input.required = isRequired === "true";
  }

  /**
   * Update the input files property with a given FileList.
   * @param { FileList } fileList
   */
  #updateInput(fileList) {
    if (!(fileList instanceof FileList))
      throw new Error(
        `type missmatch: expected filelist, found ${typeof file}`,
      );

    if (
      this.#accepted &&
      !Array.from(fileList).every((file) => this.#accepted.includes(file.type))
    )
      throw new Error(
        `at least one file type missmatch: expected ${this.#accepted.join(" or ")}`,
      );

    this.#input.files = fileList;
    this.#input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "accepted":
        this.accepted = newValue;
        break;
      case "drop-zone-placeholder":
        this.dropZonePlaceholder = newValue;
        break;
      case "input-id":
        this.inputId = newValue;
        break;
      case "label-placeholder":
        this.labelPlaceholder = newValue;
        break;
      case "is-disabled":
        this.isDisabled = newValue;
        break;
      case "is-multiple":
        this.isMultiple = newValue;
        break;
      case "is-required":
        this.isRequired = newValue;
        break;
      default:
        break;
    }
  }

  static observedAttributes = [
    "accepted",
    "drop-zone-placeholder",
    "input-id",
    "label-placeholder",
    "is-disabled",
    "is-multiple",
    "is-required",
  ];
}

customElements.define("aeee-drag-and-drop", DragAndDrop);
