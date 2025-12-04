import Canvas from "../classes/Canvas.js";
import CustomizableFileInput from "../classes/CustomizableFileInput.js";
import debug from "../utils/debug.js";
import Dialog from "../classes/Dialog.js";
import initDropdownMenus from "../utils/dropdowns.js";
import MainHeader from "../classes/MainHeader.js";
import Theme from "../classes/Theme.js";
import Toolbox from "../classes/Toolbox.js";
import WorkFile from "../classes/WorkFile.js";
import WorkFileForm from "../classes/WorkFileForm.js";

initDropdownMenus();

const uploadWorkFileForm = document.querySelector("form:has(#json-input)");
const jsonInput = document.getElementById("json-input");
const pictureInput = document.getElementById("picture-input");
const dropzoneDialog = document.querySelector("[data-dropzone-dialog]");
const dropzoneDialogTriggers = document.querySelectorAll("[data-dropzone-dialog-trigger]");

new MainHeader();
new Theme();
new CustomizableFileInput({ input: jsonInput });
new CustomizableFileInput({ input: pictureInput });
new Dialog({ dialog: dropzoneDialog, triggers: dropzoneDialogTriggers });

new WorkFileForm({ form: uploadWorkFileForm });

Canvas.resize();
Canvas.resizeWith(Toolbox.widgets.leftDrawer.leftDrawerMenu);

const camera = Toolbox.grab("camera");
camera.initKeyboardActions(Canvas);

debug(WorkFile);