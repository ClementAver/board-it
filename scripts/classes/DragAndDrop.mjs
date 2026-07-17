export default class DragAndDrop extends HTMLElement {
  #accepted;
  #dropZone;
  #dropZoneText;
  #inputId;
  #input;
  #labelText;
  #isDisabled;
  #isMultiple;
  #isRequired;
  #label;
  #p;
  #resetButton;
  #resetButtonText;
  #resetMessage;
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
    ["button", "swath", "mr-md"].forEach((c) => this.#label.classList.add(c));
    this.#span = document.createElement("span");
    this.#input = document.createElement("input");
    this.#input.hidden = true;
    this.#input.type = "file";
    this.#resetButton = document.createElement("button");
    ["rounded-xs", "swath", "semibold"].forEach((c) =>
      this.#resetButton.classList.add(c),
    );

    this.#dropZone.appendChild(this.#p);
    this.#label.appendChild(this.#span);
    this.#label.appendChild(this.#input);
    this.appendChild(this.#dropZone);
    this.appendChild(this.#label);
    this.appendChild(this.#resetButton);
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
        this.dropZoneText = Array.from(e.target.files)
          .map((file) => file.name)
          .join("\n");
    });
    this.#resetButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.reset();
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

  set dropZoneText(dropZoneText) {
    dropZoneText = dropZoneText.toString();
    if (this.getAttribute("drop-zone-text") !== dropZoneText) {
      this.setAttribute("drop-zone-text", dropZoneText);
      return;
    }
    this.#dropZoneText = dropZoneText;
    this.#p.innerText = dropZoneText;
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

  set labelText(labelText) {
    labelText = labelText.toString();
    if (this.getAttribute("label-text") !== labelText) {
      this.setAttribute("label-text", labelText);
      return;
    }
    this.#labelText = labelText;
    this.#span.innerText = labelText;
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

  set resetButtonText(resetButtonText) {
    resetButtonText = resetButtonText.toString();
    if (this.getAttribute("reset-button-text") !== resetButtonText) {
      this.setAttribute("reset-button-text", resetButtonText);
      return;
    }
    this.#resetButtonText = resetButtonText;
    this.#resetButton.innerText = resetButtonText;
  }

  set resetMessage(resetMessage) {
    resetMessage = resetMessage.toString();
    if (this.getAttribute("reset-message") !== resetMessage) {
      this.setAttribute("reset-message", resetMessage);
      return;
    }
    this.#resetMessage = resetMessage;
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
    ) {
      this.#input.dispatchEvent(
        new CustomEvent("unsupported", { bubbles: true }),
      );
      throw new Error(
        `at least one file type missmatch: expected ${this.#accepted.join(" or ")}`,
      );
    }

    this.#input.files = fileList;
    this.#input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  reset() {
    this.#input.files = new DataTransfer().files;
    this.#input.dispatchEvent(new Event("change", { bubbles: true }));
    this.#p.innerText = this.#resetMessage;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "accepted":
        this.accepted = newValue;
        break;
      case "drop-zone-text":
        this.dropZoneText = newValue;
        break;
      case "input-id":
        this.inputId = newValue;
        break;
      case "label-text":
        this.labelText = newValue;
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
      case "reset-button-text":
        this.resetButtonText = newValue;
        break;
      case "reset-message":
        this.resetMessage = newValue;
        break;
      default:
        break;
    }
  }

  static observedAttributes = [
    "accepted",
    "drop-zone-text",
    "input-id",
    "label-text",
    "is-disabled",
    "is-multiple",
    "is-required",
    "reset-button-text",
    "reset-message",
  ];
}

customElements.define("aeee-drag-and-drop", DragAndDrop);
