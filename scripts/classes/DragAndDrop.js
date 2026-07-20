export default class DragAndDrop extends HTMLElement {
  #dropZone = document.createElement("div");
  #input = document.createElement("input");
  #label = document.createElement("label");
  #resetButton = document.createElement("button");
  #span = document.createElement("span");

  dataAccept = "";
  dataDisabled = false;
  dataDropZoneText = "";
  dataId = "";
  dataLabel = "";
  dataMultiple = false;
  dataRequired = false;
  dataResetButtonText = "";
  dataWrongFileFormatMessage = "";

  constructor() {
    super();
    this.#dropZone.classList.add("drop-zone");
    this.#input.type = "file";
    this.#input.hidden = true;

    ["text-swath"].forEach((c) => this.#dropZone.classList.add(c));
    ["button", "swath"].forEach((c) => this.#label.classList.add(c));
    ["swath"].forEach((c) => this.#resetButton.classList.add(c));
  }

  connectedCallback() {
    this.#label.appendChild(this.#span);
    this.#label.appendChild(this.#input);
    this.appendChild(this.#dropZone);
    this.appendChild(this.#label);
    this.appendChild(this.#resetButton);

    ["dragenter", "dragover", "dragleave", "drop"].forEach((type) =>
      this.#dropZone?.addEventListener(type, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }),
    );
    this.#dropZone?.addEventListener("dragover", (e) => {
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    });
    this.#dropZone?.addEventListener("dragleave", (e) => {
      if (e.dataTransfer) e.dataTransfer.dropEffect = "none";
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
      if (e.target.files && e.target.files.length) {
        /*
         * Only one text node
         * (innerText replace all children)
         */
        // this.#dropZone.innerText = Array.from(e.target.files)
        //   .map((file) => file.name)
        //   .join("\n");

        /* Multiple spans markups */
        this.#dropZone.childNodes.forEach((cN) => cN.remove());
        Array.from(e.target.files)
          .map((file) => file.name)
          .forEach((n) => {
            const p = document.createElement("p");
            p.innerText = n;
            p.title = n;
            this.#dropZone.appendChild(p);
          });
      }
    });
    this.#resetButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.reset();
    });
  }

  set accept(accept) {
    if (this.dataset.accept !== accept) {
      this.dataset.accept = accept;
      return;
    }
    this.dataAccept = accept;
    this.#input.accept = accept;
  }

  set dropZoneText(dropZoneText) {
    dropZoneText = dropZoneText.toString();
    if (this.dataset.dropZoneText !== dropZoneText) {
      this.dataset.dropZoneText = dropZoneText;
      return;
    }
    this.dataDropZoneText = dropZoneText;
    this.#dropZone.innerText = dropZoneText;
  }

  set labelText(labelText) {
    labelText = labelText.toString();
    if (this.dataset.label !== labelText) {
      this.dataset.label = labelText;
      return;
    }
    this.dataLabel = labelText;
    this.#span.innerText = labelText;
  }

  set id(id) {
    id = id.toString();
    if (this.dataset.id !== id) {
      this.dataset.id = id;
      return;
    }
    this.dataId = id;
    this.#input.id = id;
    this.#input.name = id;
  }

  set isDisabled(isDisabled) {
    if (this.dataset.disabled !== isDisabled.toString()) {
      this.dataset.disabled = isDisabled.toString();
      return;
    }
    this.dataDisabled = isDisabled;
    this.#input.disabled = isDisabled === "true";
  }

  set isMultiple(isMultiple) {
    if (this.dataset.multiple !== isMultiple.toString()) {
      this.dataset.multiple = isMultiple.toString();
      return;
    }
    this.dataMultiple = isMultiple;
    this.#input.multiple = isMultiple === "true";
  }

  set isRequired(isRequired) {
    if (this.dataset.required !== isRequired.toString()) {
      this.dataset.required = isRequired.toString();
      return;
    }
    this.dataRequired = isRequired;
    this.#input.required = isRequired === "true";
  }

  set resetButtonText(resetButtonText) {
    resetButtonText = resetButtonText.toString();
    if (this.dataset.resetButtonText !== resetButtonText) {
      this.dataset.resetButtonText = resetButtonText;
      return;
    }
    this.dataResetButtonText = resetButtonText;
    this.#resetButton.innerText = resetButtonText;
  }

  set wrongFileFormatMessage(wrongFileFormatMessage) {
    wrongFileFormatMessage = wrongFileFormatMessage.toString();
    if (this.dataset.wrongFileFormatMessage !== wrongFileFormatMessage) {
      this.dataset.wrongFileFormatMessage = wrongFileFormatMessage;
      return;
    }
    this.dataWrongFileFormatMessage = wrongFileFormatMessage;
    this.dataWrongFileFormatMessage = wrongFileFormatMessage;
  }

  /**
   * Update the input files property with a given FileList.
   * @param { FileList } fileList
   */
  #updateInput(fileList) {
    if (this.#input.disabled) return;
    if (!(fileList instanceof FileList))
      throw new Error(
        `type missmatch: expected filelist, found ${typeof fileList}`,
      );

    if (
      this.dataAccept &&
      !Array.from(fileList).every((file) => this.dataAccept.includes(file.type))
    ) {
      this.#dropZone.innerText = this.dataWrongFileFormatMessage;
      setTimeout(() => {
        this.#dropZone.innerText = this.dataDropZoneText;
      }, 3000);
      throw new Error(
        `at least one file type missmatch: expected ${this.dataAccept.replace(" ", "").split(",").join(" or ")}`,
      );
    }

    if (this.#input.multiple) {
      this.#input.files = fileList;
    } else {
      const singleList = new DataTransfer();
      singleList.items.add(fileList[0]);
      this.#input.files = singleList.files;
    }
    this.#input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  reset() {
    if (this.#input.disabled) return;
    this.#input.files = new DataTransfer().files;
    this.#input.dispatchEvent(new Event("change", { bubbles: true }));
    this.#dropZone.innerText = this.dataDropZoneText;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "data-accept":
        this.accept = newValue;
        break;
      case "data-disabled":
        this.isDisabled = newValue;
        break;
      case "data-drop-zone-text":
        this.dropZoneText = newValue;
        break;
      case "data-id":
        this.id = newValue;
        break;
      case "data-label":
        this.labelText = newValue;
        break;
      case "data-multiple":
        this.isMultiple = newValue;
        break;
      case "data-required":
        this.isRequired = newValue;
        break;
      case "data-reset-button-text":
        this.resetButtonText = newValue;
        break;
      case "data-wrong-file-format-message":
        this.wrongFileFormatMessage = newValue;
        break;
      default:
        break;
    }
  }

  static observedAttributes = [
    "data-accept",
    "data-disabled",
    "data-drop-zone-text",
    "data-id",
    "data-label",
    "data-multiple",
    "data-required",
    "data-reset-button-text",
    "data-wrong-file-format-message",
  ];
}

customElements.define("aeee-drag-and-drop", DragAndDrop);
