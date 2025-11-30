import Canvas from "../classes/Canvas.js";
import CustomizableFileInput from "../classes/CustomizableFileInput.js";
import debug from "../utils/debug.js";
import Dialog from "../classes/Dialog.js";
import initDropdownMenus from "../utils/dropdowns.js";
import MainHeader from "../classes/MainHeader.js";

import Theme from "../classes/Theme.js";
import Toolbox from "../classes/Toolbox.js";
import WorkFile from "../classes/WorkFile.js";

initDropdownMenus();

const uploadWorkFileForm = document.querySelector("form:has(#json-input)");
const jsonInput = document.getElementById("json-input");
const dropzoneDialog = document.querySelector("[data-dropzone-dialog]");
const dropzoneDialogTriggers = document.querySelectorAll("[data-dropzone-dialog-trigger]");

new MainHeader();
new Theme();
new CustomizableFileInput({ input: jsonInput });
new CustomizableFileInput({ input: document.getElementById("png-input") });
new Dialog({ dialog: dropzoneDialog, triggers: dropzoneDialogTriggers });

Canvas.resize();
Canvas.resizeWith(Toolbox.widgets.leftDrawer.leftDrawerMenu);

const camera = Toolbox.grab("camera");
camera.initKeyboardActions(Canvas);

// 🚧🚧🚧🚧🚧
jsonInput.addEventListener("change", () => {
  const submitEvent = new SubmitEvent("submit");
  uploadWorkFileForm.dispatchEvent(submitEvent);
});

uploadWorkFileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(uploadWorkFileForm);
  let reader = new FileReader();

  const files = [];
  for (var [key, value] of data.entries()) {
    if (key === "json") files.push(value);
  }

  files.forEach((file) => {
    reader.readAsText(file);
  });

  reader.onload = function () {
    Canvas.boards = WorkFile.jsonToFile(reader.result);
    camera.frameAll(Canvas);
  };

  reader.onerror = function () {
    alert("Une erreur est survenue lors de la lecture des données:", reader.error);
    console.error(reader.error);
  };
});
// 🚧🚧🚧🚧🚧

debug(Canvas);
