export default class DragAndDrop extends HTMLElement {
  #dropZone;
  #dropZonePlaceholder;
  #id;
  #input;
  #inputPlaceholder;
  #label;
  #p;
  #span;

  constructor() {
    super();

    this._internals = this.attachInternals();

    this.#dropZone = document.createElement("div");
    this.#dropZone.classList.add("drop-zone");
    this.#p = document.createElement("p");
    this.#label = document.createElement("label");
    this.#span = document.createElement("span");
    this.#input = document.createElement("input");
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
    // this.#dropZone?.addEventListener("dragover", (e) => {
    //   e.dataTransfer.dropEffect = "copy";
    // });
    // this.#dropZone?.addEventListener("dragleave", (e) => {
    //   e.dataTransfer.dropEffect = "none";
    // });
    this.#dropZone?.addEventListener("drop", async (e) => {
      this.#updateInput([...e.dataTransfer.files]?.[0]);
    });
    this.#dropZone?.addEventListener("paste", async (e) => {
      if (
        [":hover", " :hover"].some((selector) => {
          return this.#dropZone.matches(selector);
        })
      ) {
        this.#updateInput([...e.clipboardData.files]?.[0]);
      }
    });
    this.#input.addEventListener("change", (e) => {
      if (!(e.target instanceof HTMLInputElement)) return;
      this.dropZonePlaceholder = e.target.files[0].name;
    });
  }

  set id(id) {
    id = id.toString();
    if (this.getAttribute("id") != id) {
      this.setAttribute("id", id);
      return;
    }

    this.#id = id;
    this.#input.id = id;
    this.#input.name = id;
    this.#span.setAttribute("for", id);
  }

  set inputPlaceholder(inputPlaceholder) {
    inputPlaceholder = inputPlaceholder.toString();
    if (this.getAttribute("input-placeholder") != inputPlaceholder) {
      this.setAttribute("input-placeholder", inputPlaceholder);
      return;
    }
    this.#inputPlaceholder = inputPlaceholder;
    this.#span.innerText = inputPlaceholder;
  }

  set dropZonePlaceholder(dropZonePlaceholder) {
    dropZonePlaceholder = dropZonePlaceholder.toString();
    if (this.getAttribute("drop-zone-placeholder") != dropZonePlaceholder) {
      this.setAttribute("drop-zone-placeholder", dropZonePlaceholder);
      return;
    }
    this.#dropZonePlaceholder = dropZonePlaceholder;
    this.#p.innerText = dropZonePlaceholder;
  }

  /**
   * Update the input with a given file.
   * @param { File } file A file
   */
  #updateInput(file) {
    if (!(file instanceof File))
      throw new Error(`Type missmatch: Expected File, found ${typeof file}`);
    const fileList = new DataTransfer();
    fileList.items.add(file);
    this.#input.files = fileList.files;
    this.dropZonePlaceholder = file.name;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "id":
        this.id = newValue;
        break;
      case "input-placeholder":
        this.inputPlaceholder = newValue;
        break;
      case "drop-zone-placeholder":
        this.dropZonePlaceholder = newValue;
        break;
      default:
        break;
    }
  }

  static observedAttributes = [
    "id",
    "input-placeholder",
    "drop-zone-placeholder",
  ];
}

customElements.define("aeee-drag-and-drop", DragAndDrop);
